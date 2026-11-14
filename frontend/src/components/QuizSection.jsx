import React, { useState } from 'react'
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Sparkles,
  Award,
  HelpCircle,
  Trophy
} from 'lucide-react'
import { QuizIllustration } from '../assets/illustrations'
import { PixelTrophy, PixelStar, PixelBadge, PixelTarget } from '../assets/pixel'
import Card3D from './Card3D'

export default function QuizSection({ quiz, sessionId, docTitle, onSubmitQuiz, onGoToReading }) {
  const [answers, setAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [quizResult, setQuizResult] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  if (!quiz || quiz.length === 0) {
    return (
      <div className="section-box" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <PixelTarget size={80} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: '#353342', marginBottom: '0.5rem' }}>
          No Comprehension Quiz Available
        </h2>
        <p style={{ color: '#777484', maxWidth: '480px', margin: '0 auto 1.75rem', lineHeight: '1.6' }}>
          Upload a lesson or select a sample document in the Reading Room to dynamically generate an interactive comprehension quiz.
        </p>
        <button type="button" className="btn-primary-glow" onClick={onGoToReading}>
          Go to Digital Reading Room
        </button>
      </div>
    )
  }

  const handleSelectOption = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }))
    setErrorMessage('')
  }

  const handleSubmit = async () => {
    const answeredCount = Object.keys(answers).length
    if (answeredCount < quiz.length) {
      setErrorMessage(
        `Please answer all ${quiz.length} questions before submitting (currently answered ${answeredCount}).`
      )
      return
    }

    setSubmitting(true)
    setErrorMessage('')

    try {
      const result = await onSubmitQuiz(sessionId, answers)
      setQuizResult(result)
    } catch (err) {
      setErrorMessage(err.message || 'Error grading quiz. Please ensure the backend engine is running.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRetake = () => {
    setAnswers({})
    setQuizResult(null)
    setErrorMessage('')
  }

  const getQuizTypeBadge = (type) => {
    if (type === 'fill_blank') return { label: 'CLOZE', color: '#B9C9BC' }
    if (type === 'true_false') return { label: 'T / F', color: '#DCEAF5' }
    return { label: 'MCQ', color: '#EAE4F5' }
  }

  return (
    <div className="quiz-showcase-wrapper" role="region" aria-labelledby="quiz-heading">
      {/* Y2K Quiz Hero Banner */}
      <div className="quiz-hero-banner">
        <div style={{ maxWidth: '640px' }}>
          <div className="hero-tag" style={{ marginBottom: '0.65rem' }}>
            <PixelTrophy size={16} />
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.6rem', letterSpacing: '0.07em' }}>
              INTERACTIVE COMPREHENSION CHECK
            </span>
          </div>
          <h2 id="quiz-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800', color: '#353342', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            Lesson Quiz: {docTitle || 'Current Document'}
            <PixelBadge text={`${quiz.length} Qs`} variant="purple" />
          </h2>
          <p style={{ color: '#777484', fontSize: '0.925rem', marginTop: '4px' }}>
            Questions are generated dynamically from your uploaded material to reinforce active recall and conceptual understanding.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div aria-hidden="true">
            <QuizIllustration size={90} />
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button type="button" className="btn-secondary-ivory" onClick={onGoToReading}>
              <BookOpen size={16} />
              <span>Review Content</span>
            </button>
            {quizResult && (
              <button type="button" className="btn-secondary-ivory" onClick={handleRetake}>
                <RotateCcw size={16} />
                <span>Retake Quiz</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Y2K Score Triumph Card with PixelTrophy */}
      {quizResult && (
        <div className="score-triumph-card" role="status" aria-live="polite">
          <div className="score-triumph-visual">
            {/* Pixel star celebration burst */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', justifyContent: 'center' }}>
              {[...Array(5)].map((_, i) => (
                <PixelStar key={i} size={14} color={i % 2 === 0 ? '#F4E5B9' : '#7866A8'} />
              ))}
            </div>

            <div className="score-circle-meter">
              <strong>{quizResult.percentage}%</strong>
              <small>
                {quizResult.score} of {quizResult.total}
              </small>
            </div>

            <div className="score-triumph-details">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                <PixelTrophy size={28} />
                <h2>{quizResult.level}</h2>
              </div>
              <p>{quizResult.recommendation}</p>
            </div>
          </div>

          <button type="button" className="btn-primary-glow" onClick={handleRetake}>
            <RotateCcw size={16} />
            <span>Attempt Another Quiz</span>
          </button>
        </div>
      )}

      {/* Questions List */}
      {!quizResult ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          {quiz.map((q, idx) => {
            const badge = getQuizTypeBadge(q.type)
            return (
              <Card3D key={q.id || idx} intensity={5}>
                <div className="quiz-card-question">
                  <div className="quiz-q-meta">
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.95rem' }}>
                      <div className="quiz-q-num-badge">{idx + 1}</div>
                      <div className="quiz-q-title">{q.question}</div>
                    </div>
                    {/* Y2K pixel-font quiz type badge */}
                    <span
                      className="reading-stat-chip"
                      style={{
                        fontFamily: 'var(--font-pixel)',
                        fontSize: '0.58rem',
                        letterSpacing: '0.07em',
                        background: badge.color
                      }}
                    >
                      {badge.label}
                    </span>
                  </div>

                  <div className="quiz-choices-stack">
                    {q.options.map((opt, oIdx) => {
                      const isChosen = answers[q.id] === oIdx
                      return (
                        <label
                          key={oIdx}
                          className={`quiz-choice-card ${isChosen ? 'selected' : ''}`}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                        >
                          <input
                            type="radio"
                            name={q.id}
                            checked={isChosen}
                            onChange={() => handleSelectOption(q.id, oIdx)}
                            aria-label={opt}
                          />
                          <span>{opt}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </Card3D>
            )
          })}

          {/* Submission Bar */}
          <div
            className="section-box"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
              padding: '1.4rem 2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <PixelStar size={20} color="#7866A8" />
              <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#353342' }}>
                {Object.keys(answers).length} of {quiz.length} questions completed
              </span>
            </div>

            <button
              type="button"
              className="btn-primary-glow"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Evaluating Answers...' : 'Submit & Check My Answers'}
              <ArrowRight size={17} />
            </button>
          </div>

          {errorMessage && (
            <div
              style={{
                padding: '1rem 1.4rem',
                borderRadius: '14px',
                backgroundColor: '#FDF1F4',
                color: '#A3485E',
                border: '1px solid #DABCCB',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.925rem'
              }}
              role="alert"
            >
              <AlertCircle size={20} />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      ) : (
        /* Detailed Question-by-Question Review */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: '800', color: '#353342' }}>
            Question-by-Question Breakdown & Citations
          </h3>

          {quizResult.feedback?.map((item, idx) => (
            <div
              key={idx}
              className={`feedback-review-card ${item.isCorrect ? 'correct' : 'incorrect'}`}
            >
              <div className="feedback-status-head">
                {item.isCorrect ? (
                  <>
                    <CheckCircle2 size={22} />
                    <span>Question {idx + 1}: Correct!</span>
                    <PixelStar size={14} color="#4E8659" style={{ marginLeft: '4px' }} />
                  </>
                ) : (
                  <>
                    <XCircle size={22} />
                    <span>Question {idx + 1}: Review Recommended</span>
                  </>
                )}
              </div>

              <p style={{ fontWeight: '700', color: '#353342', marginBottom: '0.85rem' }}>
                {item.question}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', fontSize: '0.925rem' }}>
                <div>
                  <span style={{ color: '#777484' }}>Your Selected Answer: </span>
                  <strong style={{ color: item.isCorrect ? '#4E8659' : '#A3485E' }}>
                    {item.userChoice !== undefined ? item.options[item.userChoice] : 'Not answered'}
                  </strong>
                </div>

                {!item.isCorrect && (
                  <div>
                    <span style={{ color: '#777484' }}>Verified Correct Answer: </span>
                    <strong style={{ color: '#4E8659' }}>{item.options[item.correctIndex]}</strong>
                  </div>
                )}
              </div>

              {item.sourceSentence && (
                <div className="feedback-source-box">
                  <strong>Source Sentence from Document:</strong>
                  "{item.sourceSentence}"
                </div>
              )}
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <button type="button" className="btn-primary-glow" onClick={onGoToReading}>
              <BookOpen size={17} />
              <span>Return to Digital Reading Room</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
