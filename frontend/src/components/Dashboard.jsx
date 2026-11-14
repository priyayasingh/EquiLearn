import React from 'react'
import {
  FileText,
  GraduationCap,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Trash2,
  CheckCircle2,
  RotateCcw,
  Layers,
  Zap,
  FileCode,
  Compass,
  Award
} from 'lucide-react'
import {
  DashboardHeroIllustration,
  ReadingRoomIllustration,
  UploadIllustration,
  DyslexiaIllustration,
  AdhdIllustration,
  LowVisionIllustration,
  PlainLanguageIllustration,
  KeywordsIllustration,
  QuizIllustration,
  ProgressIllustration
} from '../assets/illustrations'
import {
  PixelCharacter,
  PixelBook,
  PixelComputer,
  PixelTrophy,
  PixelTarget,
  PixelGlasses,
  PixelLightbulb,
  PixelFolder,
  PixelStar,
  PixelBadge
} from '../assets/pixel'
import Card3D from './Card3D'
import Floating3DShapes from './Floating3DShapes'

export default function Dashboard({
  dashboardData,
  onOpenDoc,
  onDeleteDoc,
  onResetDashboard,
  onLoadSample,
  onStartUpload,
  onNavigateTab
}) {
  const stats = dashboardData?.stats || {
    total_documents: 0,
    total_quizzes: 0,
    average_quiz_score: 0,
    learning_streak_days: 1,
    total_reading_minutes: 0
  }

  const recentDocs = dashboardData?.recent_documents || []
  const recentAttempts = dashboardData?.recent_quiz_attempts || []

  // Determine RPG Player Level based on completed quizzes
  const playerLevel = Math.max(1, Math.floor((stats.total_quizzes || 0) / 2) + 1)
  const playerRank = playerLevel >= 4 ? 'Master Scholar' : playerLevel >= 2 ? 'Active Explorer' : 'Novice Reader'

  return (
    <div>
      {/* Y2K Retro-Futuristic Hero Section with Interactive 3D Objects */}
      <section className="hero-section" aria-labelledby="hero-title">
        {/* Floating 3D Background Objects (Chrome sphere, Holo ring, 3D cube, Pixel stars) */}
        <Floating3DShapes />

        <div className="hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <div className="hero-tag">
              <Sparkles size={14} color="#7866A8" />
              <span>Y2K FUTURISTIC EDTECH · VERSION 2.0</span>
            </div>
            <PixelBadge text={`LVL ${playerLevel} ${playerRank}`} variant="purple" />
            <PixelBadge text="EXP +250" variant="gold" size="small" />
          </div>

          <h1 id="hero-title" className="hero-title">
            Welcome to EquiLearn! <em>Knowledge should have no barriers.</em>
          </h1>
          <p className="hero-subtitle">
            A retro-futuristic, neurodivergent-friendly learning world designed for curious minds.
            Upload any textbook, lecture slide, or note to transform it into rhythmic dyslexia typography,
            ADHD focus blocks, high-contrast low-vision reading, and simplified plain language.
          </p>

          <div className="hero-badges">
            <span className="feature-pill">
              <PixelBook size={18} /> Dyslexia Typography
            </span>
            <span className="feature-pill">
              <PixelTarget size={18} /> ADHD Bionic Sprints
            </span>
            <span className="feature-pill">
              <PixelGlasses size={18} /> Low-Vision Contrast
            </span>
            <span className="feature-pill">
              <PixelLightbulb size={18} /> Plain Language & Quizzes
            </span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div style={{ position: 'relative' }}>
            <DashboardHeroIllustration width={330} height={230} />
            {/* Waving Pixel Character mascot positioned on hero */}
            <div
              style={{
                position: 'absolute',
                bottom: '-8px',
                right: '12px',
                filter: 'drop-shadow(3px 3px 0px #353342)'
              }}
            >
              <PixelCharacter size={68} />
            </div>
          </div>
        </div>
      </section>

      {/* KPI Momentum Row (Retro Y2K + Pixel Art Badges) */}
      <div className="stats-row" role="region" aria-label="Learning Progress Statistics">
        <Card3D maxTilt={6}>
          <div className="kpi-card">
            <div className="kpi-icon purple">
              <PixelFolder size={28} />
            </div>
            <div className="kpi-details">
              <small>Documents Studied</small>
              <strong>{stats.total_documents}</strong>
            </div>
          </div>
        </Card3D>

        <Card3D maxTilt={6}>
          <div className="kpi-card">
            <div className="kpi-icon blue">
              <PixelComputer size={28} />
            </div>
            <div className="kpi-details">
              <small>Quizzes Completed</small>
              <strong>{stats.total_quizzes}</strong>
            </div>
          </div>
        </Card3D>

        <Card3D maxTilt={6}>
          <div className="kpi-card">
            <div className="kpi-icon green">
              <PixelTrophy size={28} />
            </div>
            <div className="kpi-details">
              <small>Average Mastery</small>
              <strong>{stats.average_quiz_score}%</strong>
            </div>
          </div>
        </Card3D>

        <Card3D maxTilt={6}>
          <div className="kpi-card">
            <div className="kpi-icon amber">
              <Flame size={26} color="#99732A" />
            </div>
            <div className="kpi-details">
              <small>Learning Streak</small>
              <strong>
                {stats.learning_streak_days} Day{stats.learning_streak_days !== 1 ? 's' : ''}
              </strong>
            </div>
          </div>
        </Card3D>

        <Card3D maxTilt={6}>
          <div className="kpi-card">
            <div className="kpi-icon rose">
              <Clock size={26} color="#A3485E" />
            </div>
            <div className="kpi-details">
              <small>Focus Time</small>
              <strong>{stats.total_reading_minutes} Mins</strong>
            </div>
          </div>
        </Card3D>
      </div>

      {/* Quick Launch & Preloaded Sample Lessons Section */}
      <div className="section-box">
        <div className="section-head">
          <div className="section-head-title">
            <Compass size={24} color="#7866A8" />
            <div>
              <h2>Quick Start a Study Session</h2>
              <p>Upload your own document or jump into an instant pre-adapted lesson.</p>
            </div>
          </div>
          <button type="button" className="btn-primary-glow" onClick={onStartUpload}>
            <PixelFolder size={20} />
            <span>Upload My Document</span>
          </button>
        </div>

        <div className="samples-grid-redesigned">
          <Card3D maxTilt={5}>
            <button
              type="button"
              className="sample-lesson-card"
              style={{ width: '100%', height: '100%' }}
              onClick={() => onLoadSample('photosynthesis')}
            >
              <div className="sample-badge-icon purple">
                <Zap size={22} />
              </div>
              <div className="sample-lesson-info">
                <strong>Photosynthesis & Plant Energy</strong>
                <small>Biology & Natural Science · 195 words</small>
              </div>
              <ArrowRight size={16} color="#7866A8" style={{ marginLeft: 'auto' }} />
            </button>
          </Card3D>

          <Card3D maxTilt={5}>
            <button
              type="button"
              className="sample-lesson-card"
              style={{ width: '100%', height: '100%' }}
              onClick={() => onLoadSample('renewable_energy')}
            >
              <div className="sample-badge-icon sage">
                <Layers size={22} />
              </div>
              <div className="sample-lesson-info">
                <strong>Renewable Energy Systems</strong>
                <small>Environmental Engineering · 170 words</small>
              </div>
              <ArrowRight size={16} color="#7866A8" style={{ marginLeft: 'auto' }} />
            </button>
          </Card3D>

          <Card3D maxTilt={5}>
            <button
              type="button"
              className="sample-lesson-card"
              style={{ width: '100%', height: '100%' }}
              onClick={() => onLoadSample('internet_basics')}
            >
              <div className="sample-badge-icon blue">
                <FileCode size={22} />
              </div>
              <div className="sample-lesson-info">
                <strong>How the Internet Works</strong>
                <small>Computer Science & TCP/IP · 165 words</small>
              </div>
              <ArrowRight size={16} color="#7866A8" style={{ marginLeft: 'auto' }} />
            </button>
          </Card3D>
        </div>
      </div>

      {/* Bespoke Feature Cards Grid with Interactive 3D Tilt */}
      <div className="section-box">
        <div className="section-head">
          <div className="section-head-title">
            <Sparkles size={24} color="#7866A8" />
            <div>
              <h2>Explore EquiLearn's Inclusive Features</h2>
              <p>Interactive 3D cards with bespoke artwork and pixel art badges.</p>
            </div>
          </div>
          <PixelBadge text="8 ACCESSIBLE TOOLS" variant="sage" />
        </div>

        <div className="features-grid">
          {/* Card 1: Reading Room */}
          <Card3D onClick={() => onNavigateTab && onNavigateTab('workspace')}>
            <div className="feature-showcase-card">
              <div className="feature-illustration-wrap">
                <ReadingRoomIllustration size={110} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <PixelBook size={20} />
                <h3>Digital Reading Room</h3>
              </div>
              <p>Distraction-free digital library with personalized font scaling, paper tints, and voice narration.</p>
              <div className="feature-card-action">
                <span>OPEN LIBRARY</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Card3D>

          {/* Card 2: Dyslexia Mode */}
          <Card3D onClick={() => onNavigateTab && onNavigateTab('workspace')}>
            <div className="feature-showcase-card">
              <div className="feature-illustration-wrap">
                <DyslexiaIllustration size={110} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <PixelStar size={18} color="#F4E5B9" />
                <h3>Dyslexia-Friendly Mode</h3>
              </div>
              <p>Weighted Lexend typography, comfortable letter tracking, and an interactive reading ruler.</p>
              <div className="feature-card-action">
                <span>EXPLORE MODE</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Card3D>

          {/* Card 3: ADHD Focus Blocks */}
          <Card3D onClick={() => onNavigateTab && onNavigateTab('workspace')}>
            <div className="feature-showcase-card">
              <div className="feature-illustration-wrap">
                <AdhdIllustration size={110} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <PixelTarget size={20} />
                <h3>ADHD Focus Sprints</h3>
              </div>
              <p>Bionic reading fixation cues, bite-sized paragraph blocks, and a 5-minute study sprint stopwatch.</p>
              <div className="feature-card-action">
                <span>TRY SPRINTS</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Card3D>

          {/* Card 4: Low-Vision Mode */}
          <Card3D onClick={() => onNavigateTab && onNavigateTab('workspace')}>
            <div className="feature-showcase-card">
              <div className="feature-illustration-wrap">
                <LowVisionIllustration size={110} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <PixelGlasses size={20} />
                <h3>Low-Vision Mode</h3>
              </div>
              <p>WCAG AAA Yellow-on-Black contrast, fluid 32px magnification, and native voice narration.</p>
              <div className="feature-card-action">
                <span>TEST CONTRAST</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Card3D>

          {/* Card 5: Plain Language */}
          <Card3D onClick={() => onNavigateTab && onNavigateTab('workspace')}>
            <div className="feature-showcase-card">
              <div className="feature-illustration-wrap">
                <PlainLanguageIllustration size={110} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <PixelLightbulb size={20} />
                <h3>Plain Language Mode</h3>
              </div>
              <p>Simplifies complex jargon into clear everyday words while verifying 100% fact retention.</p>
              <div className="feature-card-action">
                <span>SIMPLIFY TEXT</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Card3D>

          {/* Card 6: Keywords & Glossary */}
          <Card3D onClick={() => onNavigateTab && onNavigateTab('keywords')}>
            <div className="feature-showcase-card">
              <div className="feature-illustration-wrap">
                <KeywordsIllustration size={110} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <PixelStar size={18} color="#DABCCB" />
                <h3>Conceptual Keywords</h3>
              </div>
              <p>Automatically extracted key vocabulary with contextual definitions and frequency counts.</p>
              <div className="feature-card-action">
                <span>VIEW GLOSSARY</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Card3D>

          {/* Card 7: Quiz & Feedback */}
          <Card3D onClick={() => onNavigateTab && onNavigateTab('quiz')}>
            <div className="feature-showcase-card">
              <div className="feature-illustration-wrap">
                <QuizIllustration size={110} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <PixelTrophy size={20} />
                <h3>Interactive Quizzes</h3>
              </div>
              <p>Dynamic Multiple Choice, True/False, and Cloze questions citing exact source sentences.</p>
              <div className="feature-card-action">
                <span>TAKE QUIZ</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Card3D>

          {/* Card 8: Progress & Milestones */}
          <Card3D onClick={() => onNavigateTab && onNavigateTab('dashboard')}>
            <div className="feature-showcase-card">
              <div className="feature-illustration-wrap">
                <ProgressIllustration size={110} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <PixelComputer size={20} />
                <h3>Learning Milestones</h3>
              </div>
              <p>Track your study momentum, quiz mastery percentages, and daily streaks saved in SQLite.</p>
              <div className="feature-card-action">
                <span>REVIEW STATS</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Card3D>
        </div>
      </div>

      {/* Recent Documents Table Section */}
      <div className="section-box">
        <div className="section-head">
          <div className="section-head-title">
            <BookOpen size={24} color="#7866A8" />
            <div>
              <h2>Recent Documents & Study Library</h2>
              <p>Quickly reopen past lessons or test your comprehension.</p>
            </div>
          </div>
          {recentDocs.length > 0 && (
            <button
              type="button"
              className="btn-secondary-ivory"
              onClick={onResetDashboard}
              title="Clear all saved history"
            >
              <RotateCcw size={15} />
              <span>Reset History</span>
            </button>
          )}
        </div>

        {recentDocs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: '#777484' }}>
            <PixelFolder size={44} style={{ margin: '0 auto 0.85rem' }} />
            <p>No documents studied yet. Upload a file or click a sample lesson above to get started.</p>
          </div>
        ) : (
          <div className="table-responsive-box">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Length</th>
                  <th>Est. Time</th>
                  <th>Reading Level</th>
                  <th>Date Added</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentDocs.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <strong style={{ color: '#353342' }}>{doc.filename}</strong>
                    </td>
                    <td>{doc.word_count} words</td>
                    <td>~{doc.reading_time_min} min</td>
                    <td>
                      <span className="reading-stat-chip grade">
                        {doc.level} (Grade {doc.flesch_grade})
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: '#777484' }}>
                        {new Date(doc.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button
                          type="button"
                          className="btn-secondary-ivory"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                          onClick={() => onOpenDoc(doc.id, 'reading')}
                        >
                          <BookOpen size={14} />
                          <span>Read</span>
                        </button>
                        <button
                          type="button"
                          className="btn-secondary-ivory"
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                          onClick={() => onOpenDoc(doc.id, 'quiz')}
                        >
                          <GraduationCap size={14} />
                          <span>Quiz</span>
                        </button>
                        <button
                          type="button"
                          className="btn-secondary-ivory"
                          style={{ padding: '0.4rem 0.65rem', color: '#A3485E' }}
                          onClick={() => onDeleteDoc(doc.id)}
                          title="Delete from history"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Quiz Attempts History */}
      {recentAttempts.length > 0 && (
        <div className="section-box">
          <div className="section-head">
            <div className="section-head-title">
              <GraduationCap size={24} color="#7866A8" />
              <div>
                <h2>Recent Quiz Achievements</h2>
                <p>Recorded comprehension scores and mastery levels.</p>
              </div>
            </div>
            <PixelBadge text="SAVED IN SQLITE" variant="gold" />
          </div>

          <div className="table-responsive-box">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Lesson Document</th>
                  <th>Raw Score</th>
                  <th>Mastery</th>
                  <th>Level Awarded</th>
                  <th>Date Taken</th>
                </tr>
              </thead>
              <tbody>
                {recentAttempts.map((att) => (
                  <tr key={att.id}>
                    <td>
                      <strong>{att.filename}</strong>
                    </td>
                    <td>
                      {att.score} of {att.total}
                    </td>
                    <td>
                      <span
                        style={{
                          fontWeight: '800',
                          color: att.percentage >= 70 ? '#4E8659' : '#99732A'
                        }}
                      >
                        {att.percentage}%
                      </span>
                    </td>
                    <td>
                      <span className="reading-stat-chip">{att.level}</span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: '#777484' }}>
                        {new Date(att.created_at).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
