"""
EquiLearn Flask Backend API
Provides document extraction, multi-modal accessible text adaptations,
content preservation auditing, keyword extraction, and dynamic quiz generation.
100% compatible with Python 3.13+.
"""

import os
import json
import uuid
import sqlite3
from datetime import datetime
from pathlib import Path
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

from nlp_engine import (
    extract_text_from_file,
    compute_readability,
    adapt_content,
    extract_keywords,
    check_preservation,
    generate_quiz,
    SAMPLE_LESSONS
)

app = Flask(__name__)
# Enable CORS for all routes and origins for local development
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config["MAX_CONTENT_LENGTH"] = 20 * 1024 * 1024  # 20 MB max file upload
ALLOWED_EXTENSIONS = {"pdf", "docx", "txt"}
DB_PATH = Path(__file__).resolve().parent / "equilearn.db"


def get_db():
    """Create a SQLite database connection with row factory."""
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initialize database tables for sessions, quiz attempts, and student profile."""
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                filename TEXT NOT NULL,
                original_text TEXT NOT NULL,
                readability_json TEXT NOT NULL,
                modes_json TEXT NOT NULL,
                checks_json TEXT NOT NULL,
                keywords_json TEXT NOT NULL,
                quiz_json TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS quiz_attempts (
                id TEXT PRIMARY KEY,
                session_id TEXT NOT NULL,
                filename TEXT NOT NULL,
                score INTEGER NOT NULL,
                total INTEGER NOT NULL,
                percentage INTEGER NOT NULL,
                level TEXT NOT NULL,
                recommendation TEXT NOT NULL,
                answers_json TEXT,
                created_at TEXT NOT NULL,
                FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
            )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS student_profile (
                id TEXT PRIMARY KEY,
                streak_count INTEGER DEFAULT 1,
                last_active_date TEXT,
                total_reading_minutes INTEGER DEFAULT 0
            )
        """)
        conn.commit()


@app.get("/api/health")
def health():
    return jsonify({
        "status": "ok",
        "app": "EquiLearn API",
        "version": "1.0.0",
        "python_version": os.sys.version.split()[0],
        "message": "Inclusive Learning Content Tool is running smoothly."
    })


def process_document_text(text: str, filename: str) -> dict:
    """Helper to analyze text, generate 4 modes, keywords, preservation checks, and quizzes."""
    sid = str(uuid.uuid4())
    readability = compute_readability(text)
    
    # Generate 4 accessibility modes
    modes = {
        "dyslexia": adapt_content(text, "dyslexia"),
        "adhd": adapt_content(text, "adhd"),
        "lowvision": adapt_content(text, "lowvision"),
        "plain": adapt_content(text, "plain")
    }

    # Preservation audit for each mode
    checks = {
        m: check_preservation(text, adapted_content)
        for m, adapted_content in modes.items()
    }

    # Extract important keywords
    keywords = extract_keywords(text, top_n=10)

    # Dynamically generate quiz based on the uploaded content
    quiz = generate_quiz(text, num_questions=6)

    now_iso = datetime.now().isoformat()

    # Save to SQLite database
    with get_db() as conn:
        conn.execute("""
            INSERT INTO sessions (
                id, filename, original_text, readability_json, modes_json,
                checks_json, keywords_json, quiz_json, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            sid,
            filename,
            text,
            json.dumps(readability),
            json.dumps(modes),
            json.dumps(checks),
            json.dumps(keywords),
            json.dumps(quiz),
            now_iso
        ))
        
        # Update student profile stats
        today = datetime.now().strftime("%Y-%m-%d")
        row = conn.execute("SELECT * FROM student_profile WHERE id = 'default_user'").fetchone()
        read_mins = readability.get("reading_time_min", 2)
        if not row:
            conn.execute("""
                INSERT INTO student_profile (id, streak_count, last_active_date, total_reading_minutes)
                VALUES ('default_user', 1, ?, ?)
            """, (today, read_mins))
        else:
            last_date = row["last_active_date"]
            streak = row["streak_count"]
            if last_date != today:
                streak += 1
            new_mins = row["total_reading_minutes"] + read_mins
            conn.execute("""
                UPDATE student_profile SET streak_count = ?, last_active_date = ?, total_reading_minutes = ?
                WHERE id = 'default_user'
            """, (streak, today, new_mins))

        conn.commit()

    return {
        "session_id": sid,
        "filename": filename,
        "original_text": text,
        "readability": readability,
        "modes": modes,
        "checks": checks,
        "keywords": keywords,
        "quiz": quiz,
        "created_at": now_iso
    }


@app.post("/api/upload")
def upload():
    """Handle document file upload (PDF, DOCX, TXT)."""
    if "file" not in request.files:
        return jsonify({"error": "No file part in the request. Please choose a file to upload."}), 400

    file = request.files["file"]
    if not file or file.filename == "":
        return jsonify({"error": "No file was selected. Please choose a document."}), 400

    filename = secure_filename(file.filename)
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    if ext not in ALLOWED_EXTENSIONS:
        return jsonify({
            "error": f"File type '.{ext}' is not supported. Please upload a PDF, DOCX, or TXT file."
        }), 400

    try:
        text = extract_text_from_file(file, filename)
    except Exception as exc:
        return jsonify({"error": f"Error reading file: {str(exc)}"}), 400

    if not text or not text.strip():
        return jsonify({
            "error": "No readable text found. If this is a scanned PDF, it may only contain images."
        }), 400

    data = process_document_text(text.strip(), filename)
    return jsonify(data), 200


@app.post("/api/sample")
def load_sample():
    """Load a pre-configured sample lesson for quick instant testing."""
    body = request.get_json(silent=True) or {}
    sample_key = body.get("sample", "photosynthesis")
    sample = SAMPLE_LESSONS.get(sample_key, SAMPLE_LESSONS["photosynthesis"])
    
    data = process_document_text(sample["text"], sample["filename"])
    data["is_sample"] = True
    data["sample_title"] = sample["title"]
    return jsonify(data), 200


@app.post("/api/quiz/submit")
def submit_quiz():
    """Grade quiz answers, calculate score & percentage, and save attempt."""
    data = request.get_json(silent=True) or {}
    session_id = data.get("session_id")
    user_answers = data.get("answers", {})  # e.g. {"q_1": 0, "q_2": 1, ...}

    if not session_id:
        return jsonify({"error": "Missing session_id for quiz submission."}), 400

    with get_db() as conn:
        row = conn.execute("SELECT * FROM sessions WHERE id = ?", (session_id,)).fetchone()
        if not row:
            return jsonify({"error": "Session not found."}), 404

        quiz_list = json.loads(row["quiz_json"])
        filename = row["filename"]

    total = len(quiz_list)
    if total == 0:
        return jsonify({"error": "This session has no quiz questions."}), 400

    score = 0
    feedback_details = []
    missed_topics = []

    for q in quiz_list:
        qid = q["id"]
        correct_idx = q["correctIndex"]
        user_choice = user_answers.get(qid)
        
        is_correct = (user_choice is not None and int(user_choice) == int(correct_idx))
        if is_correct:
            score += 1
        else:
            missed_topics.append(q.get("sourceSentence", q["question"]))

        feedback_details.append({
            "id": qid,
            "question": q["question"],
            "options": q["options"],
            "userChoice": user_choice,
            "correctIndex": correct_idx,
            "isCorrect": is_correct,
            "explanation": q.get("explanation", ""),
            "sourceSentence": q.get("sourceSentence", "")
        })

    percentage = round((score / total) * 100)

    if percentage >= 85:
        level = "Mastery Achieved"
        recommendation = "Outstanding work! You demonstrated comprehensive mastery of this content."
    elif percentage >= 65:
        level = "Proficient Understanding"
        recommendation = "Great job! A quick review of the highlighted concepts will solidify your mastery."
    elif percentage >= 40:
        level = "Developing Comprehension"
        recommendation = "Good effort. Try switching to the Plain-Language view or ADHD focus chunks to reinforce key points before retesting."
    else:
        level = "Needs Focused Review"
        recommendation = "Take your time. Use the Dyslexia-friendly or Plain-Language mode to read one small paragraph at a time, then try again."

    attempt_id = str(uuid.uuid4())
    now_iso = datetime.now().isoformat()

    with get_db() as conn:
        conn.execute("""
            INSERT INTO quiz_attempts (
                id, session_id, filename, score, total, percentage,
                level, recommendation, answers_json, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            attempt_id,
            session_id,
            filename,
            score,
            total,
            percentage,
            level,
            recommendation,
            json.dumps(user_answers),
            now_iso
        ))
        conn.commit()

    return jsonify({
        "attempt_id": attempt_id,
        "score": score,
        "total": total,
        "percentage": percentage,
        "level": level,
        "recommendation": recommendation,
        "feedback": feedback_details,
        "missed_count": total - score
    })


@app.get("/api/dashboard")
def get_dashboard():
    """Retrieve student dashboard statistics, recent documents, and quiz history."""
    with get_db() as conn:
        sessions_cursor = conn.execute("""
            SELECT id, filename, readability_json, created_at
            FROM sessions
            ORDER BY created_at DESC
            LIMIT 10
        """).fetchall()

        recent_sessions = []
        for s in sessions_cursor:
            readability = json.loads(s["readability_json"]) if s["readability_json"] else {}
            recent_sessions.append({
                "id": s["id"],
                "filename": s["filename"],
                "word_count": readability.get("word_count", 0),
                "reading_time_min": readability.get("reading_time_min", 1),
                "level": readability.get("level", "Standard"),
                "flesch_grade": readability.get("flesch_kincaid_grade", 0),
                "created_at": s["created_at"]
            })

        attempts_cursor = conn.execute("""
            SELECT id, session_id, filename, score, total, percentage, level, created_at
            FROM quiz_attempts
            ORDER BY created_at DESC
            LIMIT 10
        """).fetchall()

        recent_attempts = [dict(a) for a in attempts_cursor]

        total_sessions = conn.execute("SELECT COUNT(*) FROM sessions").fetchone()[0]
        total_quizzes = conn.execute("SELECT COUNT(*) FROM quiz_attempts").fetchone()[0]
        avg_score_row = conn.execute("SELECT AVG(percentage) FROM quiz_attempts").fetchone()[0]
        avg_score = round(avg_score_row) if avg_score_row is not None else 0

        profile_row = conn.execute("SELECT * FROM student_profile WHERE id = 'default_user'").fetchone()
        streak = profile_row["streak_count"] if profile_row else 1
        total_mins = profile_row["total_reading_minutes"] if profile_row else 0

    return jsonify({
        "stats": {
            "total_documents": total_sessions,
            "total_quizzes": total_quizzes,
            "average_quiz_score": avg_score,
            "learning_streak_days": streak,
            "total_reading_minutes": total_mins
        },
        "recent_documents": recent_sessions,
        "recent_quiz_attempts": recent_attempts
    })


@app.get("/api/session/<sid>")
def get_session(sid):
    """Retrieve full data for a previously adapted session to resume reading or quiz."""
    with get_db() as conn:
        row = conn.execute("SELECT * FROM sessions WHERE id = ?", (sid,)).fetchone()
        if not row:
            return jsonify({"error": "Session not found."}), 404

        return jsonify({
            "session_id": row["id"],
            "filename": row["filename"],
            "original_text": row["original_text"],
            "readability": json.loads(row["readability_json"]),
            "modes": json.loads(row["modes_json"]),
            "checks": json.loads(row["checks_json"]),
            "keywords": json.loads(row["keywords_json"]),
            "quiz": json.loads(row["quiz_json"]),
            "created_at": row["created_at"]
        })


@app.delete("/api/session/<sid>")
def delete_session(sid):
    """Delete a session from history."""
    with get_db() as conn:
        conn.execute("DELETE FROM quiz_attempts WHERE session_id = ?", (sid,))
        conn.execute("DELETE FROM sessions WHERE id = ?", (sid,))
        conn.commit()
    return jsonify({"success": True, "message": "Session removed."})


@app.post("/api/dashboard/reset")
def reset_dashboard():
    """Clear activity history if user requests."""
    with get_db() as conn:
        conn.execute("DELETE FROM quiz_attempts")
        conn.execute("DELETE FROM sessions")
        conn.execute("UPDATE student_profile SET total_reading_minutes = 0, streak_count = 1")
        conn.commit()
    return jsonify({"success": True, "message": "Dashboard activity reset."})


@app.errorhandler(413)
def request_entity_too_large(_):
    return jsonify({"error": "File size exceeds the 20 MB limit. Please upload a smaller file."}), 413


if __name__ == "__main__":
    init_db()
    port = int(os.environ.get("PORT", 5000))
    print(f"EquiLearn Backend starting on http://127.0.0.1:{port}")
    app.run(host="127.0.0.1", port=port, debug=True)
