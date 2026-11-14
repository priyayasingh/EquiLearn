import React, { useState, useEffect } from 'react'
import {
  BookOpen,
  Focus,
  Eye,
  Brain,
  FileText,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Copy,
  Check,
  Download,
  Sparkles,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Sliders,
  Maximize2,
  Type
} from 'lucide-react'
import {
  DyslexiaIllustration,
  AdhdIllustration,
  LowVisionIllustration,
  PlainLanguageIllustration
} from '../assets/illustrations'
import { PixelBook, PixelTarget, PixelGlasses, PixelLightbulb, PixelBadge, PixelStar } from '../assets/pixel'

export default function ReadingWorkspace({ docData, onOpenQuiz, onOpenKeywords, onNewUpload }) {
  const [activeMode, setActiveMode] = useState('dyslexia')

  // Dyslexia settings
  const [dyslexiaFont, setDyslexiaFont] = useState('lexend')
  const [dyslexiaSpacing, setDyslexiaSpacing] = useState('wide')
  const [tintColor, setTintColor] = useState('white')
  const [showRuler, setShowRuler] = useState(false)
  const [rulerTop, setRulerTop] = useState(200)

  // ADHD settings
  const [bionicMode, setBionicMode] = useState(false)
  const [completedBlocks, setCompletedBlocks] = useState({})
  const [timerSeconds, setTimerSeconds] = useState(300) // 5 min
  const [timerRunning, setTimerRunning] = useState(false)

  // Low-vision settings
  const [fontSize, setFontSize] = useState(19)
  const [contrastTheme, setContrastTheme] = useState('default')

  // Plain-language settings
  const [sideBySide, setSideBySide] = useState(false)

  // Speech synthesis (TTS)
  const [speaking, setSpeaking] = useState(false)
  const [paused, setPaused] = useState(false)
  const [speechRate, setSpeechRate] = useState(1.0)
  const [copied, setCopied] = useState(false)

  // Follow cursor for reading ruler
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (showRuler) {
        setRulerTop(e.clientY - 27)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [showRuler])

  // ADHD Study Sprint Timer
  useEffect(() => {
    let interval = null
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1)
      }, 1000)
    } else if (timerSeconds === 0) {
      setTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [timerRunning, timerSeconds])

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  if (!docData) return null

  const { filename, readability, modes, checks, original_text } = docData
  const currentContent = activeMode === 'original' ? original_text : (modes?.[activeMode] || '')
  const currentCheck = checks?.[activeMode] || checks?.['plain']

  // Text-To-Speech handler
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.')
      return
    }

    if (speaking) {
      if (paused) {
        window.speechSynthesis.resume()
        setPaused(false)
      } else {
        window.speechSynthesis.pause()
        setPaused(true)
      }
    } else {
      window.speechSynthesis.cancel()
      const plainText = currentContent.replace(/[#*•_✓]/g, '')
      const utterance = new SpeechSynthesisUtterance(plainText)
      utterance.rate = speechRate
      utterance.onend = () => {
        setSpeaking(false)
        setPaused(false)
      }
      utterance.onerror = () => {
        setSpeaking(false)
        setPaused(false)
      }
      window.speechSynthesis.speak(utterance)
      setSpeaking(true)
      setPaused(false)
    }
  }

  const handleStopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setSpeaking(false)
    setPaused(false)
  }

  // Copy text to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  // Download adapted text
  const handleDownload = () => {
    const blob = new Blob([currentContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `EquiLearn_${activeMode}_${filename.replace(/\.[^/.]+$/, '')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Render Bionic Reading (bolds first 45% of each word)
  const renderBionicText = (text) => {
    return text.split('\n').map((line, lineIdx) => {
      if (!line.trim()) return <br key={lineIdx} />
      if (line.startsWith('### ')) {
        return (
          <h3 key={lineIdx} style={{ color: '#7866A8', marginTop: '1.25rem', marginBottom: '0.65rem' }}>
            {line.replace('### ', '')}
          </h3>
        )
      }
      if (line.startsWith('## ')) {
        return <h2 key={lineIdx} style={{ margin: '1.25rem 0 0.65rem' }}>{line.replace('## ', '')}</h2>
      }
      if (line.startsWith('# ')) {
        return <h1 key={lineIdx} style={{ margin: '1.5rem 0 0.85rem' }}>{line.replace('# ', '')}</h1>
      }

      const words = line.split(' ')
      return (
        <p key={lineIdx} style={{ marginBottom: '1.15rem' }}>
          {words.map((w, wIdx) => {
            const cleanWord = w
            const halfLen = Math.max(1, Math.ceil(cleanWord.length * 0.45))
            const boldPart = cleanWord.slice(0, halfLen)
            const restPart = cleanWord.slice(halfLen)
            return (
              <span key={wIdx} className="bionic-word">
                <span className="bionic-bold">{boldPart}</span>
                {restPart}{' '}
              </span>
            )
          })}
        </p>
      )
    })
  }

  // Parse ADHD blocks into interactive cards
  const renderAdhdBlocks = (adhdText) => {
    const rawBlocks = adhdText.split('\n\n').filter((b) => b.trim())
    return (
      <div className="adhd-blocks-container">
        {rawBlocks.map((block, idx) => {
          const lines = block.split('\n')
          const header = lines[0].replace('### ', '')
          const points = lines.slice(1)
          const isDone = completedBlocks[idx]

          return (
            <div key={idx} className={`adhd-focus-sprint-card ${isDone ? 'completed' : ''}`}>
              <div className="adhd-card-header">
                <div className="adhd-sprint-badge">
                  <Focus size={18} />
                  <span>{header}</span>
                </div>
                <button
                  type="button"
                  className={`adhd-check-trigger ${isDone ? 'checked' : ''}`}
                  onClick={() =>
                    setCompletedBlocks((prev) => ({ ...prev, [idx]: !prev[idx] }))
                  }
                  title="Toggle section complete"
                  aria-label="Mark section as read"
                >
                  <CheckCircle2 size={22} />
                </button>
              </div>

              {points.map((pt, pIdx) => (
                <div key={pIdx} className="adhd-point-row">
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    )
  }

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="reading-room-container">
      {/* Floating Line Focus Ruler Guide */}
      {showRuler && <div className="reading-ruler-guide" style={{ top: `${rulerTop}px` }} />}

      {/* Document Top Summary Bar */}
      <div className="doc-summary-card">
        <div className="doc-info-group">
          <div className="doc-symbol-box">
            <FileText size={26} strokeWidth={2} />
          </div>
          <div>
            <h2>{filename}</h2>
            <div className="doc-chips-row">
              <span className="reading-stat-chip">
                <BookOpen size={13} /> {readability?.word_count || 0} words
              </span>
              <span className="reading-stat-chip">
                <Clock size={13} /> ~{readability?.reading_time_min || 1} min read
              </span>
              <span className="reading-stat-chip grade">
                {readability?.level || 'Accessible'}
              </span>
              <span className="reading-stat-chip">
                Grade {readability?.flesch_kincaid_grade || '7'} Level
              </span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button type="button" className="btn-secondary-ivory" onClick={handleCopy} title="Copy adapted text">
            {copied ? <Check size={16} color="#4E8659" /> : <Copy size={16} />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
          <button type="button" className="btn-secondary-ivory" onClick={handleDownload} title="Download study sheet">
            <Download size={16} />
            <span>Download</span>
          </button>
          <button type="button" className="btn-secondary-ivory" onClick={onOpenKeywords} title="Explore vocabulary">
            <Sparkles size={16} color="#7866A8" />
            <span>Keywords</span>
          </button>
          <button type="button" className="btn-primary-glow" onClick={onOpenQuiz} title="Take comprehension quiz">
            <CheckCircle2 size={16} />
            <span>Take Quiz</span>
          </button>
          <button type="button" className="btn-secondary-ivory" onClick={onNewUpload} title="Import another document">
            <RotateCcw size={16} />
            <span>New File</span>
          </button>
        </div>
      </div>

      {/* 4 Illustrated Accessibility Modes Selector Row */}
      <div className="modes-selector-row" role="tablist" aria-label="Accessibility Modes">
        <button
          type="button"
          className={`mode-selector-card ${activeMode === 'dyslexia' ? 'active' : ''}`}
          onClick={() => setActiveMode('dyslexia')}
          role="tab"
          aria-selected={activeMode === 'dyslexia'}
        >
          <div className="mode-card-illus" style={{ position: 'relative' }}>
            <DyslexiaIllustration size={62} />
            <div style={{ position: 'absolute', top: '-6px', right: '-6px' }}>
              <PixelBook size={14} />
            </div>
          </div>
          <div className="mode-card-text">
            <strong>Dyslexia-Friendly</strong>
            <small>Weighted fonts, spacing & ruler</small>
          </div>
        </button>

        <button
          type="button"
          className={`mode-selector-card ${activeMode === 'adhd' ? 'active' : ''}`}
          onClick={() => setActiveMode('adhd')}
          role="tab"
          aria-selected={activeMode === 'adhd'}
        >
          <div className="mode-card-illus" style={{ position: 'relative' }}>
            <AdhdIllustration size={62} />
            <div style={{ position: 'absolute', top: '-6px', right: '-6px' }}>
              <PixelTarget size={14} />
            </div>
          </div>
          <div className="mode-card-text">
            <strong>ADHD-Friendly</strong>
            <small>Focus sprint chunks & timer</small>
          </div>
        </button>

        <button
          type="button"
          className={`mode-selector-card ${activeMode === 'lowvision' ? 'active' : ''}`}
          onClick={() => setActiveMode('lowvision')}
          role="tab"
          aria-selected={activeMode === 'lowvision'}
        >
          <div className="mode-card-illus" style={{ position: 'relative' }}>
            <LowVisionIllustration size={62} />
            <div style={{ position: 'absolute', top: '-6px', right: '-6px' }}>
              <PixelGlasses size={14} />
            </div>
          </div>
          <div className="mode-card-text">
            <strong>Low-Vision Mode</strong>
            <small>High contrast & speech audio</small>
          </div>
        </button>

        <button
          type="button"
          className={`mode-selector-card ${activeMode === 'plain' ? 'active' : ''}`}
          onClick={() => setActiveMode('plain')}
          role="tab"
          aria-selected={activeMode === 'plain'}
        >
          <div className="mode-card-illus" style={{ position: 'relative' }}>
            <PlainLanguageIllustration size={62} />
            <div style={{ position: 'absolute', top: '-6px', right: '-6px' }}>
              <PixelLightbulb size={14} />
            </div>
          </div>
          <div className="mode-card-text">
            <strong>Plain Language</strong>
            <small>Direct phrasing & key summaries</small>
          </div>
        </button>

        <button
          type="button"
          className={`mode-selector-card ${activeMode === 'original' ? 'active' : ''}`}
          onClick={() => setActiveMode('original')}
          role="tab"
          aria-selected={activeMode === 'original'}
        >
          <div
            style={{
              width: '62px',
              height: '62px',
              borderRadius: '16px',
              background: '#FAF8F4',
              border: '1px solid rgba(120, 102, 168, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7866A8',
              flexShrink: 0
            }}
          >
            <FileText size={26} />
          </div>
          <div className="mode-card-text">
            <strong>Original Source</strong>
            <small>Unmodified academic content</small>
          </div>
        </button>
      </div>

      {/* Mode-Specific Interactive Toolbar */}
      <div className="reading-controls-bar">
        {activeMode === 'dyslexia' && (
          <>
            <div className="control-cluster">
              <span className="control-caption">
                <Type size={14} /> Typeface:
              </span>
              <div className="pill-toggle-group">
                <button
                  type="button"
                  className={`pill-toggle-btn ${dyslexiaFont === 'lexend' ? 'active' : ''}`}
                  onClick={() => setDyslexiaFont('lexend')}
                >
                  Lexend
                </button>
                <button
                  type="button"
                  className={`pill-toggle-btn ${dyslexiaFont === 'opendyslexic' ? 'active' : ''}`}
                  onClick={() => setDyslexiaFont('opendyslexic')}
                >
                  OpenDyslexic
                </button>
                <button
                  type="button"
                  className={`pill-toggle-btn ${dyslexiaFont === 'inter' ? 'active' : ''}`}
                  onClick={() => setDyslexiaFont('inter')}
                >
                  Clean Sans
                </button>
              </div>
            </div>

            <div className="control-cluster">
              <span className="control-caption">Spacing:</span>
              <div className="pill-toggle-group">
                <button
                  type="button"
                  className={`pill-toggle-btn ${dyslexiaSpacing === 'normal' ? 'active' : ''}`}
                  onClick={() => setDyslexiaSpacing('normal')}
                >
                  Regular
                </button>
                <button
                  type="button"
                  className={`pill-toggle-btn ${dyslexiaSpacing === 'wide' ? 'active' : ''}`}
                  onClick={() => setDyslexiaSpacing('wide')}
                >
                  Comfortable
                </button>
                <button
                  type="button"
                  className={`pill-toggle-btn ${dyslexiaSpacing === 'ultra' ? 'active' : ''}`}
                  onClick={() => setDyslexiaSpacing('ultra')}
                >
                  Ultra Spaced
                </button>
              </div>
            </div>

            <div className="control-cluster">
              <span className="control-caption">Paper Tint:</span>
              <div className="tint-palette-group">
                <button
                  type="button"
                  className={`tint-dot-btn ${tintColor === 'white' ? 'selected' : ''}`}
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #DABCCB' }}
                  onClick={() => setTintColor('white')}
                  title="Crisp White"
                />
                <button
                  type="button"
                  className={`tint-dot-btn ${tintColor === 'cream' ? 'selected' : ''}`}
                  style={{ backgroundColor: '#FAF8F4', border: '1px solid #EAE4F5' }}
                  onClick={() => setTintColor('cream')}
                  title="Warm Ivory"
                />
                <button
                  type="button"
                  className={`tint-dot-btn ${tintColor === 'yellow' ? 'selected' : ''}`}
                  style={{ backgroundColor: '#FEFCE8' }}
                  onClick={() => setTintColor('yellow')}
                  title="Pastel Yellow"
                />
                <button
                  type="button"
                  className={`tint-dot-btn ${tintColor === 'mint' ? 'selected' : ''}`}
                  style={{ backgroundColor: '#F0FDF4' }}
                  onClick={() => setTintColor('mint')}
                  title="Muted Mint"
                />
                <button
                  type="button"
                  className={`tint-dot-btn ${tintColor === 'rose' ? 'selected' : ''}`}
                  style={{ backgroundColor: '#FFF1F4' }}
                  onClick={() => setTintColor('rose')}
                  title="Soft Rose"
                />
              </div>
            </div>

            <div className="control-cluster">
              <button
                type="button"
                className={`btn-secondary-ivory ${showRuler ? 'active' : ''}`}
                onClick={() => setShowRuler(!showRuler)}
              >
                <Sliders size={14} />
                <span>{showRuler ? 'Hide Ruler' : 'Reading Ruler'}</span>
              </button>
            </div>
          </>
        )}

        {activeMode === 'adhd' && (
          <>
            <div className="control-cluster">
              <button
                type="button"
                className={`btn-secondary-ivory ${bionicMode ? 'active' : ''}`}
                onClick={() => setBionicMode(!bionicMode)}
              >
                <Sparkles size={15} color="#7866A8" />
                <span>{bionicMode ? 'Bionic Reading: ON' : 'Turn On Bionic Reading'}</span>
              </button>
            </div>

            <div className="control-cluster">
              <span className="control-caption">
                <Clock size={14} /> Sprint Timer:
              </span>
              <span style={{ fontWeight: '800', color: '#7866A8', fontSize: '1rem' }}>
                {formatTimer(timerSeconds)}
              </span>
              <button
                type="button"
                className="btn-secondary-ivory"
                onClick={() => setTimerRunning(!timerRunning)}
              >
                {timerRunning ? <Pause size={14} /> : <Play size={14} />}
                <span>{timerRunning ? 'Pause' : 'Start'}</span>
              </button>
              <button
                type="button"
                className="btn-secondary-ivory"
                onClick={() => {
                  setTimerRunning(false)
                  setTimerSeconds(300)
                }}
                title="Reset to 5 minutes"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            <div className="control-cluster">
              <span className="control-caption">Sprint Progress:</span>
              <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#4E8659' }}>
                {Object.values(completedBlocks).filter(Boolean).length} sprints completed
              </span>
            </div>
          </>
        )}

        {activeMode === 'lowvision' && (
          <>
            <div className="control-cluster">
              <span className="control-caption">Magnification: {fontSize}px</span>
              <input
                type="range"
                min="16"
                max="32"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                style={{ width: '135px', accentColor: '#7866A8' }}
                aria-label="Adjust font size"
              />
            </div>

            <div className="control-cluster">
              <span className="control-caption">High Contrast:</span>
              <div className="pill-toggle-group">
                <button
                  type="button"
                  className={`pill-toggle-btn ${contrastTheme === 'default' ? 'active' : ''}`}
                  onClick={() => setContrastTheme('default')}
                >
                  Light Ivory
                </button>
                <button
                  type="button"
                  className={`pill-toggle-btn ${contrastTheme === 'dark-yellow' ? 'active' : ''}`}
                  onClick={() => setContrastTheme('dark-yellow')}
                >
                  Yellow on Black
                </button>
                <button
                  type="button"
                  className={`pill-toggle-btn ${contrastTheme === 'navy-amber' ? 'active' : ''}`}
                  onClick={() => setContrastTheme('navy-amber')}
                >
                  Navy & Amber
                </button>
                <button
                  type="button"
                  className={`pill-toggle-btn ${contrastTheme === 'inverted' ? 'active' : ''}`}
                  onClick={() => setContrastTheme('inverted')}
                >
                  Inverted
                </button>
              </div>
            </div>
          </>
        )}

        {activeMode === 'plain' && (
          <div className="control-cluster">
            <button
              type="button"
              className={`btn-secondary-ivory ${sideBySide ? 'active' : ''}`}
              onClick={() => setSideBySide(!sideBySide)}
            >
              <Maximize2 size={14} />
              <span>{sideBySide ? 'Single View' : 'Side-by-Side Comparison'}</span>
            </button>
          </div>
        )}

        {/* Text-To-Speech Narration Player Bar (Always accessible in every view) */}
        <div className="narration-player-bar">
          <button
            type="button"
            className={`narration-play-btn ${speaking && !paused ? 'active' : ''}`}
            onClick={handleToggleSpeech}
            title={speaking && !paused ? 'Pause Read-Aloud' : 'Read Aloud with Speech'}
            aria-label="Play or pause speech narration"
          >
            {speaking && !paused ? <Pause size={16} /> : <Play size={16} />}
          </button>
          {speaking && (
            <button
              type="button"
              className="narration-play-btn"
              onClick={handleStopSpeech}
              title="Stop Read-Aloud"
              aria-label="Stop speech narration"
            >
              <VolumeX size={16} />
            </button>
          )}
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#7866A8' }}>
            {speaking ? (paused ? 'Paused' : 'Narrating...') : 'Read Aloud'}
          </span>
          <select
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            style={{
              fontSize: '0.76rem',
              borderRadius: '8px',
              border: '1px solid rgba(120, 102, 168, 0.25)',
              padding: '3px 6px',
              background: '#FFFFFF',
              color: '#353342',
              fontWeight: '600'
            }}
            aria-label="Speech speed"
          >
            <option value="0.75">0.75x</option>
            <option value="1.0">1.0x</option>
            <option value="1.25">1.25x</option>
          </select>
        </div>
      </div>

      {/* Main Digital Canvas */}
      {sideBySide && activeMode === 'plain' ? (
        <div className="side-by-side-comparison">
          <div className="comparison-pane">
            <div className="comparison-header">
              <h3>Original Academic Text</h3>
              <span className="reading-stat-chip">Source</span>
            </div>
            <div className="font-inter spacing-normal" style={{ fontSize: '0.98rem', color: '#353342' }}>
              {original_text.split('\n\n').map((p, i) => (
                <p key={i} style={{ marginBottom: '1.25rem' }}>{p}</p>
              ))}
            </div>
          </div>

          <div className="comparison-pane" style={{ borderLeft: '4px solid #7866A8' }}>
            <div className="comparison-header">
              <h3 style={{ color: '#7866A8' }}>Simplified Plain-Language Version</h3>
              <span className="reading-stat-chip grade">Plain Language</span>
            </div>
            <div className="font-lexend spacing-normal" style={{ fontSize: '0.98rem', color: '#353342' }}>
              {currentContent.split('\n\n').map((p, i) => (
                <p key={i} style={{ marginBottom: '1.25rem' }}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`reading-canvas-card font-${dyslexiaFont} spacing-${dyslexiaSpacing} tint-${tintColor} contrast-${contrastTheme}`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {activeMode === 'adhd' && !bionicMode ? (
            renderAdhdBlocks(currentContent)
          ) : bionicMode ? (
            <div>{renderBionicText(currentContent)}</div>
          ) : (
            <div>
              {currentContent.split('\n\n').map((block, idx) => {
                if (block.startsWith('### ')) {
                  return (
                    <h3 key={idx} style={{ color: '#7866A8', margin: '1.5rem 0 0.85rem' }}>
                      {block.replace('### ', '')}
                    </h3>
                  )
                }
                if (block.startsWith('## ')) {
                  return <h2 key={idx} style={{ margin: '1.5rem 0 0.85rem' }}>{block.replace('## ', '')}</h2>
                }
                if (block.startsWith('# ')) {
                  return <h1 key={idx} style={{ margin: '1.75rem 0 1rem' }}>{block.replace('# ', '')}</h1>
                }
                return (
                  <p key={idx} style={{ marginBottom: '1.25rem' }}>
                    {block}
                  </p>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Content & Fact Preservation Audit Banner */}
      <div className={`preservation-banner ${currentCheck?.passed ? '' : 'review'}`} role="status">
        <div className="preserve-icon-circle">
          {currentCheck?.passed ? <ShieldCheck size={22} /> : <Sparkles size={22} />}
        </div>
        <div className="preserve-texts">
          <strong style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {currentCheck?.passed
              ? 'Content & Fact Preservation Audit Passed (100% Core Integrity)'
              : 'Preservation Review: Key Data Retained'}
            <PixelBadge text={`${currentCheck?.preservation_percent || 100}%`} variant="purple" />
          </strong>
          <p>
            {currentCheck?.preservation_percent}% of verified numbers, dates, formulas, and named entities from
            the original text remain intact in this accessible view. {currentCheck?.note}
          </p>
        </div>
      </div>
    </div>
  )
}
