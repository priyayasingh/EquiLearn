# EquiLearn – Inclusive Learning Content Tool

> **A premium, modern EdTech web platform that transforms textbooks, lecture slides, and study notes into neurodivergent-friendly, universally accessible learning views with verified content preservation.**

EquiLearn blends the playful engagement of **Duolingo**, the clean clarity of **Khan Academy**, and the refined elegance of **modern SaaS dashboards** into an educational product for learners of all ages: young children, school/college students, educators, and lifelong adult learners.

---

## 🎨 Premium EdTech Design System

- **Primary Brand**: Royal Lavender (`#7866A8`), Soft Lilac (`#EAE4F5`), Warm Ivory (`#FAF8F4`), Pure White (`#FFFFFF`).
- **Pastel Accents**: Dusty Rose (`#DABCCB`), Muted Sage (`#B9C9BC`), Soft Sky Blue (`#DCEAF5`), Pastel Yellow (`#F4E5B9`).
- **Typography**: Charcoal (`#353342`), Muted Grey (`#777484`) with **Lexend** (evidence-based readability) & **Plus Jakarta Sans**.
- **11 Bespoke Vector Illustrations**: Every major feature card, mode, and workflow has its own dedicated vector artwork stored locally in `frontend/src/assets/illustrations/` (100% offline, crisp on Retina displays, zero external CDN dependencies).

---

## 🌟 Key Features & Visual Innovations

1. **Dashboard & Learning Momentum**:
   - Distinctive EquiLearn brand emblem (open book with lavender leaf of growth).
   - Inspiring welcome hero with `DashboardHeroIllustration`.
   - Real-time KPI momentum cards (*Documents Studied*, *Quizzes Completed*, *Average Mastery %*, *Learning Streak*, *Focus Time*).
   - Illustrated feature showcase cards with direct navigation.
   - Recent study history & quiz attempts persisted locally in SQLite.

2. **Digital Reading Room**:
   - Digital library atmosphere with distraction-free layout.
   - Attractive drag-and-drop file upload with `UploadIllustration` supporting **PDF**, **DOCX**, and **TXT**.
   - One-click instant sample lessons (*Photosynthesis*, *Renewable Energy*, *Internet Protocols*).
   - Document metadata chips, estimated reading time, and reading progress indicators.

3. **Four Tailored Accessibility Modes**:
   - **📘 Dyslexia-Friendly** (`DyslexiaIllustration`): Weighted Lexend typography, comfortable letter/line spacing, warm tint overlays (Cream, Yellow, Mint, Rose), and a line-tracking **Reading Ruler Guide**.
   - **🎯 ADHD-Friendly** (`AdhdIllustration`): Bite-sized focus blocks, **Bionic Reading** fixation cues, completion checkmarks, and an integrated **5-minute study sprint timer**.
   - **👁️ Low-Vision Mode** (`LowVisionIllustration`): WCAG AAA high-contrast themes (*Yellow on Black*, *Amber on Deep Navy*, *Inverted*), scalable font magnification up to 32px, and native **Text-to-Speech** narration with speed controls.
   - **💡 Plain Language Mode** (`PlainLanguageIllustration`): 100+ formal word substitutions to everyday synonyms, active-voice transformations, key takeaway summaries, and a **Side-by-Side Comparison** with the original text.

4. **Fact & Content Preservation Audit**:
   - Verifies that numbers, dates, percentages, formulas, and named entities from the source document are retained in every view, calculating a real-time preservation score.

5. **Conceptual Keywords & Study Glossary**:
   - Illustrated header with `KeywordsIllustration`.
   - Extracted key terms with frequency tags and contextual defining sentences from the document.
   - Searchable and filterable by category (*Core Theme*, *Key Concept*, *Important Term*).

6. **Interactive Comprehension Quiz & Celebratory Feedback**:
   - Illustrated quiz intro with `QuizIllustration`.
   - Questions generated dynamically from the document (Multiple Choice, True/False, and Cloze fill-in-the-blank).
   - Score triumph card with circular percentage meter, performance badge (*Mastery Achieved*), and question-by-question breakdown with source sentence citations.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Lucide React, Custom SVG Illustration System, Responsive CSS with Reduced-Motion Support.
- **Backend**: Python 3.13 / 3.14 Compatible Flask REST API with CORS.
- **Document Extraction**: `pypdf>=5.0.0` (PDF) and `python-docx>=1.1.2` (Word). **Zero PyMuPDF.**
- **Database**: SQLite (`backend/equilearn.db`) storing sessions, quiz attempts, and user streaks.
- **Privacy**: 100% offline-first. No external paid APIs or third-party cloud data transmission.

---

## 🚀 How to Run in Windows PowerShell

Open **two separate Windows PowerShell terminal windows**:

### Terminal 1: Start the Backend (Flask API)
```powershell
cd backend
.venv\Scripts\activate
python app.py
```
*(Runs on **`http://127.0.0.1:5000`**)*

---

### Terminal 2: Start the Frontend (React + Vite)
```powershell
cd frontend
npm run dev
```
*(Open **`http://localhost:5173`** in your browser)*

---

## 🧪 Verification & Demonstration

To run the complete automated test battery:
```powershell
backend\.venv\Scripts\python.exe verify_all.py
```
*Tests server health, SQLite database, PDF/DOCX/TXT extraction, 4 modes, keywords, quiz scoring, and dashboard analytics.*
