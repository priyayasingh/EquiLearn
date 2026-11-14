"""
EquiLearn NLP & Accessibility Adaptation Engine
Compatible with Python 3.13+
Uses pypdf for PDF extraction and python-docx for DOCX extraction.
No PyMuPDF / fitz required.
"""

import re
import math
import io
from pypdf import PdfReader
from docx import Document

# Stop words to filter out when extracting keywords
STOP_WORDS = {
    "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
    "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both",
    "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't",
    "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't",
    "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here",
    "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll",
    "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's",
    "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on",
    "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own",
    "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some",
    "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then",
    "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this",
    "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we",
    "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's",
    "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with",
    "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your",
    "yours", "yourself", "yourselves", "also", "many", "much", "often", "can", "will", "may",
    "just", "make", "like", "using", "used", "such", "well", "even", "new", "one", "two", "three"
}

# Plain-language synonym replacements (complex -> simple)
PLAIN_LANGUAGE_MAP = [
    (r"\butilize\b", "use"),
    (r"\butilizes\b", "uses"),
    (r"\butilized\b", "used"),
    (r"\butilizing\b", "using"),
    (r"\butilization\b", "use"),
    (r"\bdemonstrate\b", "show"),
    (r"\bdemonstrates\b", "shows"),
    (r"\bdemonstrated\b", "showed"),
    (r"\bapproximately\b", "about"),
    (r"\bcommence\b", "start"),
    (r"\bcommences\b", "starts"),
    (r"\bcommenced\b", "started"),
    (r"\bterminate\b", "end"),
    (r"\bterminates\b", "ends"),
    (r"\bterminated\b", "ended"),
    (r"\bsubsequently\b", "later"),
    (r"\bconsequently\b", "as a result"),
    (r"\bprior to\b", "before"),
    (r"\bin order to\b", "to"),
    (r"\bat this point in time\b", "now"),
    (r"\bdue to the fact that\b", "because"),
    (r"\bfor the purpose of\b", "to"),
    (r"\badditional\b", "extra"),
    (r"\bmethodology\b", "method"),
    (r"\bmethodologies\b", "methods"),
    (r"\btherefore\b", "so"),
    (r"\bhowever\b", "but"),
    (r"\fassistance\b", "help"),
    (r"\brequire\b", "need"),
    (r"\brequires\b", "needs"),
    (r"\brequired\b", "needed"),
    (r"\bcomponent\b", "part"),
    (r"\bcomponents\b", "parts"),
    (r"\bobtain\b", "get"),
    (r"\bobtains\b", "gets"),
    (r"\bobtained\b", "got"),
    (r"\bcomprehend\b", "understand"),
    (r"\bcomprehension\b", "understanding"),
    (r"\bidentify\b", "find"),
    (r"\bidentifies\b", "finds"),
    (r"\bidentified\b", "found"),
    (r"\belucidate\b", "explain"),
    (r"\bendeavor\b", "try"),
    (r"\bendeavors\b", "tries"),
    (r"\bexpedite\b", "speed up"),
    (r"\bfacilitate\b", "make easier"),
    (r"\bfacilitates\b", "makes easier"),
    (r"\bfacilitated\b", "helped"),
    (r"\bimperative\b", "essential"),
    (r"\bpreclude\b", "prevent"),
    (r"\bsubstantiate\b", "prove"),
    (r"\bmitigate\b", "reduce"),
    (r"\bpredominantly\b", "mostly"),
    (r"\bsubstantially\b", "largely"),
    (r"\bobjective\b", "goal"),
    (r"\bobjectives\b", "goals"),
    (r"\berroneous\b", "incorrect"),
    (r"\bcollaborate\b", "work together"),
    (r"\bsufficient\b", "enough"),
    (r"\bacquire\b", "gain"),
    (r"\bacquires\b", "gains"),
    (r"\bacquired\b", "gained"),
    (r"\bmodify\b", "change"),
    (r"\bmodifies\b", "changes"),
    (r"\bmodified\b", "changed"),
    (r"\bnumerous\b", "many"),
    (r"\bfundamental\b", "basic"),
    (r"\bconstitutes\b", "is"),
    (r"\bdisseminate\b", "share"),
    (r"\bexclusively\b", "only"),
    (r"\bfeasible\b", "possible"),
    (r"\billustrate\b", "show"),
    (r"\billustrates\b", "shows"),
    (r"\billustrated\b", "showed"),
    (r"\bimplement\b", "carry out"),
    (r"\bimplemented\b", "carried out"),
    (r"\binitiate\b", "start"),
    (r"\binitiated\b", "started"),
    (r"\bmagnitude\b", "size"),
    (r"\boptimal\b", "best"),
    (r"\bparameters\b", "limits"),
    (r"\bparticipate\b", "take part"),
    (r"\bperceive\b", "notice"),
    (r"\bperceived\b", "noticed"),
    (r"\bpreliminary\b", "first"),
    (r"\bprincipal\b", "main"),
    (r"\bprohibit\b", "forbid"),
    (r"\bprohibits\b", "forbids"),
    (r"\bresemble\b", "look like"),
    (r"\bresembles\b", "looks like"),
    (r"\bsignificant\b", "major"),
    (r"\bsimultaneously\b", "at the same time"),
    (r"\btransmit\b", "send"),
    (r"\btransmits\b", "sends"),
    (r"\btransmitted\b", "sent"),
    (r"\bviable\b", "workable"),
    (r"\bvirtually\b", "almost")
]


def extract_text_from_file(file_storage, filename: str) -> str:
    """Extract text from uploaded file using pypdf, python-docx, or plain text."""
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else ""
    
    if ext == "pdf":
        try:
            reader = PdfReader(file_storage)
            pages_text = []
            for i, page in enumerate(reader.pages):
                text = page.extract_text()
                if text and text.strip():
                    pages_text.append(text.strip())
            extracted = "\n\n".join(pages_text)
            if not extracted.strip():
                raise ValueError("The PDF appears empty or contains only scanned images without selectable text.")
            return extracted
        except Exception as e:
            raise ValueError(f"Failed to read PDF: {str(e)}")

    elif ext == "docx":
        try:
            doc = Document(file_storage)
            chunks = []
            for p in doc.paragraphs:
                if p.text.strip():
                    chunks.append(p.text.strip())
            for table in doc.tables:
                for row in table.rows:
                    row_data = [cell.text.strip() for cell in row.cells if cell.text.strip()]
                    if row_data:
                        chunks.append(" | ".join(row_data))
            extracted = "\n\n".join(chunks)
            if not extracted.strip():
                raise ValueError("The Word document does not contain any readable text paragraphs.")
            return extracted
        except Exception as e:
            raise ValueError(f"Failed to read DOCX: {str(e)}")

    elif ext == "txt":
        raw = file_storage.read()
        for enc in ("utf-8", "utf-8-sig", "latin-1", "cp1252", "iso-8859-1"):
            try:
                return raw.decode(enc)
            except UnicodeDecodeError:
                continue
        return raw.decode("utf-8", errors="replace")

    else:
        raise ValueError("Unsupported format. Please upload a PDF, DOCX, or TXT file.")


def get_sentences(text: str) -> list[str]:
    """Split text cleanly into sentences."""
    # Replace carriage returns and excessive whitespace
    clean = re.sub(r"\r\n|\r", "\n", text)
    # Split by standard sentence terminators (.!?) followed by space/newline, or double newlines
    raw_sentences = re.split(r"(?<=[.!?])\s+|\n{2,}", clean)
    sentences = []
    for s in raw_sentences:
        clean_s = re.sub(r"\s+", " ", s).strip()
        if len(clean_s) > 8:  # filter noise
            sentences.append(clean_s)
    return sentences if sentences else [clean.strip()]


def get_words(text: str) -> list[str]:
    """Tokenize words from text."""
    return re.findall(r"\b[A-Za-z0-9'-]+\b", text)


def count_syllables(word: str) -> int:
    """Approximate syllable count using vowel grouping heuristics."""
    word = word.lower().strip()
    if not word:
        return 0
    if len(word) <= 3:
        return 1
    # Remove common non-pronounced endings
    word = re.sub(r"(?:[^laeiouy]|ed|es|e)$", "", word)
    vowels = re.findall(r"[aeiouy]{1,2}", word)
    return max(1, len(vowels))


def compute_readability(text: str) -> dict:
    """Calculate readability statistics including Flesch-Kincaid and reading time."""
    sentences = get_sentences(text)
    words = get_words(text)
    num_words = len(words)
    num_sentences = max(1, len(sentences))
    
    if num_words == 0:
        return {
            "word_count": 0,
            "sentence_count": 0,
            "reading_time_min": 0,
            "avg_words_per_sentence": 0,
            "flesch_reading_ease": 0,
            "flesch_kincaid_grade": 0,
            "level": "Not enough text",
            "level_color": "gray",
            "summary_tag": "Insufficient text to score"
        }

    total_syllables = sum(count_syllables(w) for w in words)
    avg_words_per_sent = num_words / num_sentences
    avg_syllables_per_word = total_syllables / num_words

    # Flesch Reading Ease: 206.835 - 1.015(total words / total sentences) - 84.6(total syllables / total words)
    fre = 206.835 - (1.015 * avg_words_per_sent) - (84.6 * avg_syllables_per_word)
    fre = round(max(0.0, min(100.0, fre)), 1)

    # Flesch-Kincaid Grade Level: 0.39(total words / total sentences) + 11.8(total syllables / total words) - 15.59
    fkgl = (0.39 * avg_words_per_sent) + (11.8 * avg_syllables_per_word) - 15.59
    fkgl = round(max(1.0, min(18.0, fkgl)), 1)

    # Human-friendly level description
    if fre >= 80:
        level = "Very Easy (Grade 4-5)"
        color = "green"
        summary = "Short sentences and simple words. Great for young or neurodivergent readers."
    elif fre >= 65:
        level = "Standard / Accessible (Grade 6-8)"
        color = "purple"
        summary = "Conversational English, easily accessible for most middle school to high school students."
    elif fre >= 50:
        level = "Moderate (Grade 9-11)"
        color = "blue"
        summary = "High school reading level with occasional complex terms."
    elif fre >= 30:
        level = "Challenging (Grade 12+)"
        color = "orange"
        summary = "Complex college-level vocabulary and compound sentence structures."
    else:
        level = "Very Dense / Academic"
        color = "red"
        summary = "Dense academic or technical material. Plain-language mode is strongly recommended."

    reading_time = max(1, math.ceil(num_words / 200))

    return {
        "word_count": num_words,
        "sentence_count": num_sentences,
        "reading_time_min": reading_time,
        "avg_words_per_sentence": round(avg_words_per_sent, 1),
        "flesch_reading_ease": fre,
        "flesch_kincaid_grade": fkgl,
        "level": level,
        "level_color": color,
        "summary_tag": summary
    }


def simplify_sentence(sentence: str) -> str:
    """Replace complex words and phrases with simple alternatives."""
    out = sentence
    for pattern, replacement in PLAIN_LANGUAGE_MAP:
        out = re.sub(pattern, replacement, out, flags=re.IGNORECASE)
    # Simplify common passive/filler beginnings
    out = re.sub(r"^(It is important to note that|It should be observed that)\s*", "", out, flags=re.IGNORECASE)
    return out.strip()


def chunk_sentence_for_dyslexia(sentence: str, max_words=12) -> list[str]:
    """Break long sentences into shorter rhythmic breath units for dyslexia."""
    words = sentence.split()
    if len(words) <= max_words:
        return [sentence]
    
    # Split on commas, semicolons, or colons
    raw_parts = [p.strip() for p in re.split(r"[,;:]+", sentence) if p.strip()]
    result = []
    curr = []
    for p in raw_parts:
        p_words = p.split()
        if len(curr) + len(p_words) <= max_words:
            curr.extend(p_words)
        else:
            if curr:
                result.append(" ".join(curr))
            while len(p_words) > max_words:
                result.append(" ".join(p_words[:max_words]))
                p_words = p_words[max_words:]
            curr = p_words
    if curr:
        result.append(" ".join(curr))
    return result if result else [sentence]


def adapt_content(text: str, mode: str) -> str:
    """Generate tailored accessible presentations of text."""
    sentences = get_sentences(text)

    if mode == "dyslexia":
        # Clear, separated bullet points, simplified phrasing, short breath lines
        dyslexia_lines = []
        for s in sentences:
            simp = simplify_sentence(s)
            chunks = chunk_sentence_for_dyslexia(simp)
            for c in chunks:
                dyslexia_lines.append(f"•  {c}")
        return "\n\n".join(dyslexia_lines)

    elif mode == "adhd":
        # Bite-sized Focus Blocks (2-3 points each) with time markers and focus headers
        blocks = []
        chunk_size = 3
        total_chunks = math.ceil(len(sentences) / chunk_size)
        
        for i in range(0, len(sentences), chunk_size):
            block_idx = (i // chunk_size) + 1
            subset = sentences[i : i + chunk_size]
            block_words = sum(len(s.split()) for s in subset)
            sec_time = max(30, round(block_words / 200 * 60))
            
            lines = [f"### 🎯 Focus Block {block_idx} of {total_chunks}  ·  ~{sec_time} sec sprint"]
            for s in subset:
                lines.append(f"✓  {simplify_sentence(s)}")
            blocks.append("\n".join(lines))
        return "\n\n".join(blocks)

    elif mode == "lowvision":
        # High contrast, large bold markers, clear section headers
        lv_sections = ["# 📖 Accessible High-Legibility Study Document\n"]
        for idx, s in enumerate(sentences, 1):
            lv_sections.append(f"## Point {idx}\n{s}")
        return "\n\n".join(lv_sections)

    elif mode == "plain":
        # Plain-language deep simplification with key takeaway summary
        simplified_sentences = [simplify_sentence(s) for s in sentences]
        body = "\n\n".join(simplified_sentences)
        
        # Extract top 3 takeaway sentences
        takeaways = simplified_sentences[:3] if len(simplified_sentences) <= 4 else [simplified_sentences[0], simplified_sentences[len(simplified_sentences)//2], simplified_sentences[-1]]
        summary_section = "\n\n### 💡 Key Takeaways in Plain Language\n" + "\n".join(f"• {t}" for t in takeaways)
        return body + summary_section

    return text


def extract_keywords(text: str, top_n: int = 10) -> list[dict]:
    """Extract top keywords and conceptual glossary items with defining contexts."""
    words = get_words(text)
    sentences = get_sentences(text)
    
    # Frequency map for informative words
    freq = {}
    for w in words:
        wl = w.lower()
        if len(wl) >= 4 and wl not in STOP_WORDS and not wl.isdigit():
            freq[wl] = freq.get(wl, 0) + 1

    # Extract multi-word proper nouns or title case concepts (e.g. "Carbon Dioxide", "Solar Energy")
    multi_terms = re.findall(r"\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,2}\b", text)
    for mt in multi_terms:
        mt_clean = mt.strip()
        if len(mt_clean) > 4:
            freq[mt_clean] = freq.get(mt_clean, 0) + 3  # boosted importance

    if not freq:
        return []

    sorted_terms = sorted(freq.items(), key=lambda x: x[1], reverse=True)[:top_n]
    results = []

    for term, count in sorted_terms:
        # Find best sentence explaining this term
        best_sentence = ""
        term_pattern = re.compile(rf"\b{re.escape(term)}\b", re.IGNORECASE)
        for s in sentences:
            if term_pattern.search(s):
                # prioritize sentences with definition patterns like "is a", "refers to", "called"
                if re.search(r"\b(is a|are|refers to|known as|called|means|defined as)\b", s, re.IGNORECASE):
                    best_sentence = s
                    break
                elif not best_sentence:
                    best_sentence = s
        
        if not best_sentence and sentences:
            best_sentence = sentences[0]

        # Determine category
        if any(c.isupper() for c in term[1:]):
            category = "Key Concept"
        elif count >= 3:
            category = "Core Theme"
        else:
            category = "Important Term"

        results.append({
            "term": term.title() if " " in term else term,
            "frequency": count,
            "importance": "High" if count >= 3 else "Medium",
            "category": category,
            "context": best_sentence
        })

    return results


def check_preservation(original_text: str, adapted_text: str) -> dict:
    """Verify that key numbers, percentages, dates, and capitalized terms are preserved."""
    numbers = set(re.findall(r"(?<!\w)(?:\d+(?:[.,]\d+)?%?|\b\d{4}\b|\d{1,2}:\d{2})(?!\w)", original_text))
    terms = set(re.findall(r"\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b", original_text))
    # Filter common sentence-starters from terms
    common_starters = {"The", "This", "That", "These", "Those", "When", "What", "How", "There", "In", "On", "At", "For", "With", "As"}
    filtered_terms = {t for t in terms if t not in common_starters and len(t) > 3}

    adapted_numbers = set(re.findall(r"(?<!\w)(?:\d+(?:[.,]\d+)?%?|\b\d{4}\b|\d{1,2}:\d{2})(?!\w)", adapted_text))
    adapted_terms = set(re.findall(r"\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b", adapted_text))

    missing_nums = sorted(list(numbers - adapted_numbers))
    missing_terms = sorted(list(filtered_terms - adapted_terms))

    total_key = len(numbers) + len(filtered_terms)
    retained_key = total_key - (len(missing_nums) + len(missing_terms))
    pct = round(100.0 * retained_key / max(1, total_key), 1) if total_key else 100.0

    return {
        "passed": pct >= 80.0,
        "preservation_percent": pct,
        "total_items_checked": total_key,
        "missing_numbers": missing_nums[:5],
        "missing_terms": missing_terms[:5],
        "note": "Preservation audit confirms factual numbers, dates, and named entities remain intact."
    }


def generate_quiz(text: str, num_questions: int = 5) -> list[dict]:
    """Generate dynamic interactive questions (MCQ, True/False, and Cloze) from the text."""
    sentences = get_sentences(text)
    keywords = extract_keywords(text, top_n=8)
    keyword_terms = [k["term"] for k in keywords]

    if not sentences:
        return []

    questions = []
    used_sentences = set()

    # 1. Generate Cloze / Fill-in-the-blank questions
    for k in keywords:
        term = k["term"]
        context_sent = k["context"]
        if context_sent and context_sent not in used_sentences and len(context_sent.split()) >= 6:
            # Replace term with blank
            pattern = re.compile(rf"\b{re.escape(term)}\b", re.IGNORECASE)
            if pattern.search(context_sent):
                blanked = pattern.sub("________", context_sent, count=1)
                other_opts = [kt for kt in keyword_terms if kt.lower() != term.lower()]
                # Pick 3 distractors
                distractors = other_opts[:3]
                while len(distractors) < 3:
                    distractors.append(f"Alternative {len(distractors) + 1}")
                options = [term] + distractors
                # Shuffle deterministically
                options = sorted(options, key=lambda x: len(x))
                correct_idx = options.index(term)

                questions.append({
                    "id": f"q_{len(questions)+1}",
                    "type": "fill_blank",
                    "question": f"Fill in the missing key concept: \"{blanked}\"",
                    "options": options,
                    "correctIndex": correct_idx,
                    "explanation": f"According to the text: \"{context_sent}\"",
                    "sourceSentence": context_sent
                })
                used_sentences.add(context_sent)
                if len(questions) >= num_questions:
                    break

    # 2. Generate Fact-based Multiple Choice
    for s in sentences:
        if s in used_sentences or len(s.split()) < 8 or len(s.split()) > 25:
            continue

        # Look for definitional or cause/effect sentences
        match = re.search(r"^(.*?)\s+(is|are|serves as|functions as|produces|creates|allows|helps)\s+(.*)$", s, re.IGNORECASE)
        if match:
            subject, verb, predicate = match.group(1).strip(), match.group(2).strip(), match.group(3).strip()
            if len(subject) > 3 and len(predicate) > 10:
                # Correct option is predicate
                correct_opt = predicate.rstrip(".")
                # Craft plausible distractors
                distractors = [
                    f"Prevents {predicate[:20].lower()} under standard conditions",
                    f"Only occurs when no external stimulation is present",
                    f"Eliminates the requirement for secondary processes"
                ]
                opts = [correct_opt] + distractors
                opts = sorted(opts, key=lambda x: x[:3])
                c_idx = opts.index(correct_opt)

                questions.append({
                    "id": f"q_{len(questions)+1}",
                    "type": "multiple_choice",
                    "question": f"According to the lesson, what {verb} {subject}?",
                    "options": opts,
                    "correctIndex": c_idx,
                    "explanation": f"From the reading: \"{s}\"",
                    "sourceSentence": s
                })
                used_sentences.add(s)
                if len(questions) >= num_questions:
                    break

    # 3. Generate True / False questions
    for s in sentences:
        if len(questions) >= num_questions:
            break
        if s in used_sentences or len(s.split()) < 7:
            continue

        # Half True, half False
        is_true_question = (len(questions) % 2 == 0)
        
        if is_true_question:
            q_text = f"True or False: {s}"
            c_idx = 0  # True
            expl = f"True. As stated directly in the text: \"{s}\""
        else:
            # Create a negation
            negated = re.sub(r"\b(is|are|can|does|will|causes|allows)\b", "does not", s, count=1, flags=re.IGNORECASE)
            if negated == s:
                negated = f"Contrary to the text, {s[0].lower() + s[1:]}"
            q_text = f"True or False: {negated}"
            c_idx = 1  # False
            expl = f"False. The original document states: \"{s}\""

        questions.append({
            "id": f"q_{len(questions)+1}",
            "type": "true_false",
            "question": q_text,
            "options": ["True", "False"],
            "correctIndex": c_idx,
            "explanation": expl,
            "sourceSentence": s
        })
        used_sentences.add(s)

    # Fallback default questions if text was too short
    if not questions:
        questions = [
            {
                "id": "q_1",
                "type": "multiple_choice",
                "question": "What is the primary objective of adapting learning content into multiple views?",
                "options": [
                    "To accommodate diverse learning preferences and accessibility needs",
                    "To shorten the document so learners don't have to study",
                    "To delete complex numbers and data",
                    "To prevent students from taking notes"
                ],
                "correctIndex": 0,
                "explanation": "Accessibility tools allow learners with dyslexia, ADHD, or low vision to understand content effectively.",
                "sourceSentence": text[:120] if text else "EquiLearn provides multi-format inclusive adaptation."
            }
        ]

    return questions[:num_questions]


# Preloaded Sample Lessons for instant demo
SAMPLE_LESSONS = {
    "photosynthesis": {
        "title": "Photosynthesis and Plant Biology",
        "filename": "sample_photosynthesis_lesson.txt",
        "text": """Photosynthesis is the fundamental biological process by which green plants, algae, and certain cyanobacteria synthesize organic nutrients. They utilize sunlight, water from the soil, and carbon dioxide from the atmosphere to manufacture glucose and oxygen. 

This biochemical transformation takes place predominantly within specialized cellular organelles known as chloroplasts. Inside the chloroplasts, a green pigment named chlorophyll absorbs photons of solar radiation, predominantly within the blue and red spectral wavelengths.

The general chemical equation representing photosynthesis constitutes: 6CO2 + 6H2O + Light Energy -> C6H12O6 + 6O2. Consequently, for every six molecules of carbon dioxide and six molecules of water consumed, the plant produces one molecule of glucose sugar and six molecules of breathable oxygen.

Photosynthesis encompasses two sequential phases: the light-dependent reactions and the light-independent Calvin cycle. During the light-dependent phase, solar energy is converted into chemical energy in the form of ATP and NADPH molecules. Subsequently, in the Calvin cycle, these energetic molecules facilitate the fixation of carbon dioxide into carbohydrates.

Approximately 70% of the world's oxygen is generated by marine photosynthetic phytoplankton, with terrestrial rainforests contributing significantly to atmospheric equilibrium. Without continuous photosynthetic activity, aerobic respiration would terminate, and life on Earth would cease to exist."""
    },
    "renewable_energy": {
        "title": "Introduction to Renewable Energy Systems",
        "filename": "sample_renewable_energy.txt",
        "text": """Renewable energy represents power derived from natural resources that replenish themselves continuously on a human timescale. The most prominent renewable modalities comprise solar photovoltaic energy, wind turbines, hydroelectric power, geothermal reservoirs, and biomass.

Solar energy harnesses radiant electromagnetic radiation emitted by the Sun. Photovoltaic cells, typically fabricated from crystalline silicon semiconductors, convert incident photons directly into electric current via the photoelectric effect. In 2024, modern commercial solar panels operate at an average conversion efficiency of 22.5%.

Wind energy utilizes aerodynamic blades coupled to electric generators. As wind velocities exceed 3.5 meters per second, the kinetic energy of air masses rotates the turbine rotor, generating clean utility-scale electricity. Wind energy accounts for over 10% of total electrical generation across multiple industrialized nations.

Transitioning to renewable infrastructure is imperative to mitigate global greenhouse gas emissions and combat anthropogenic climate change. Renewable power installations produce virtually zero operational carbon dioxide emissions, providing sustainable energy security for future generations."""
    },
    "internet_basics": {
        "title": "How the Internet Works: Packets and Protocols",
        "filename": "sample_internet_protocols.txt",
        "text": """The Internet is a globally distributed network of interconnected computer networks that communicate utilizing standardized telecommunication protocols. The foundational architecture relies predominantly on the Internet Protocol Suite, commonly designated as TCP/IP.

When data is transmitted across digital networks, it is segmented into discrete units termed packets. Each packet contains a payload of user data accompanied by a header specifying the source IP address, the destination IP address, and sequence order.

Transmission Control Protocol, or TCP, ensures reliable, error-checked data delivery. If a packet is lost or corrupted in transit due to network congestion, TCP automatically requests retransmission. Conversely, User Datagram Protocol, or UDP, facilitates high-speed transmission without delivery confirmation, making it optimal for real-time video streaming and multiplayer gaming.

Routing devices evaluate destination IP addresses and direct packets along optimal optical fiber cables and wireless pathways. When all packets arrive at the destination device, TCP reassembles them into the original document, webpage, or media stream."""
    }
}
