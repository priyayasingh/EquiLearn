import React from 'react'
import {
  BookOpen,
  Focus,
  Eye,
  Brain,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Zap
} from 'lucide-react'
import {
  DyslexiaIllustration,
  AdhdIllustration,
  LowVisionIllustration,
  PlainLanguageIllustration
} from '../assets/illustrations'
import { PixelBook, PixelTarget, PixelGlasses, PixelLightbulb, PixelBadge, PixelStar } from '../assets/pixel'
import Card3D from './Card3D'

export default function AccessibilityGuide() {
  const modes = [
    {
      title: 'Dyslexia-Friendly Mode',
      pixel: <PixelBook size={32} />,
      illus: <DyslexiaIllustration size={95} />,
      badgeLabel: 'DYSLEXIA',
      badgeVariant: 'purple',
      description: 'Alleviates visual crowding, letter reversals (b/d/p/q transposition), and reading fatigue through evidence-based typographic innovations.',
      features: [
        { title: 'Lexend Typography:', desc: 'Weighted baselines prevent perceptual letter flipping.' },
        { title: 'Expanded Spacing:', desc: 'Generous line and word tracking prevents crowding.' },
        { title: 'Irlen Tint Overlays:', desc: 'Cream, mint, and yellow backgrounds reduce glare.' }
      ]
    },
    {
      title: 'ADHD Focus Sprints',
      pixel: <PixelTarget size={32} />,
      illus: <AdhdIllustration size={95} />,
      badgeLabel: 'ADHD',
      badgeVariant: 'sage',
      description: 'Targets executive dysfunction, wandering attention, and cognitive overload through bite-sized chunking and sensory fixation cues.',
      features: [
        { title: 'Bite-Sized Focus Sprints:', desc: 'Groups text into 2–3 sentence actionable cards.' },
        { title: 'Bionic Reading:', desc: 'Bolds first letters to guide eye fixations effortlessly.' },
        { title: 'Sprint Stopwatch:', desc: 'Built-in 5-minute study timer builds momentum.' }
      ]
    },
    {
      title: 'Low-Vision Mode',
      pixel: <PixelGlasses size={32} />,
      illus: <LowVisionIllustration size={95} />,
      badgeLabel: 'LOW-VIS',
      badgeVariant: 'blue',
      description: 'Provides extreme contrast ratios conforming to WCAG AAA standards, fluid typography scaling, and built-in speech narration.',
      features: [
        { title: 'Yellow on Black Contrast:', desc: 'High-contrast palette for photophobia.' },
        { title: 'Scalable Font Size:', desc: 'Up to 32px magnification with zero layout distortion.' },
        { title: 'Speech Synthesis:', desc: 'Built-in browser audio player with speed controls.' }
      ]
    },
    {
      title: 'Plain Language Mode',
      pixel: <PixelLightbulb size={32} />,
      illus: <PlainLanguageIllustration size={95} />,
      badgeLabel: 'PLAIN',
      badgeVariant: 'gold',
      description: 'Translates convoluted bureaucratic, legal, and academic jargon into direct, conversational English while auditing fact preservation.',
      features: [
        { title: 'Smart Jargon Swapper:', desc: 'Replaces 100+ complex terms with simple synonyms.' },
        { title: 'Side-by-Side Comparison:', desc: 'Compare source and simplified text simultaneously.' },
        { title: 'Preservation Audit:', desc: 'Validates retention of all numbers, dates, and formulas.' }
      ]
    }
  ]

  return (
    <div className="section-box" role="region" aria-labelledby="guide-heading">
      <div className="section-head">
        <div className="section-head-title">
          <PixelBook size={32} />
          <div>
            <h2 id="guide-heading" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              Inclusive Learning Guide
              <PixelBadge text="4 MODES" variant="purple" />
            </h2>
            <p>The cognitive principles and educational research behind EquiLearn's adaptive views.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <PixelStar size={12} color="#7866A8" />
          <PixelStar size={12} color="#DABCCB" />
          <PixelStar size={12} color="#F4E5B9" />
        </div>
      </div>

      <div className="guide-cards-grid">
        {modes.map((mode, idx) => (
          <Card3D key={idx} intensity={7}>
            <div className="guide-pedagogy-card">
              {/* Pixel icon header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                {mode.pixel}
                <PixelBadge text={mode.badgeLabel} variant={mode.badgeVariant} />
              </div>

              {/* Illustration */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                {mode.illus}
              </div>

              <h3>{mode.title}</h3>
              <p>{mode.description}</p>

              <ul style={{ listStyle: 'none', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(120, 102, 168, 0.12)' }}>
                {mode.features.map((feat, fIdx) => (
                  <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.84rem', marginBottom: '0.5rem', color: '#353342' }}>
                    <CheckCircle2 size={16} color="#4E8659" style={{ flexShrink: 0 }} />
                    <span><strong>{feat.title}</strong> {feat.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card3D>
        ))}
      </div>

      {/* Privacy Notice */}
      <div
        style={{
          marginTop: '2.5rem',
          padding: '1.4rem 1.75rem',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #FAF8F4 0%, #F5F1FA 100%)',
          border: '1px solid #DABCCB',
          display: 'flex',
          alignItems: 'center',
          gap: '1.15rem'
        }}
      >
        <ShieldCheck size={32} color="#7866A8" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.9rem', color: '#353342' }}>
          <strong style={{ color: '#4A3A73', display: 'block', marginBottom: '2px', fontSize: '0.98rem' }}>
            Built for Privacy, Security & True Universal Design
          </strong>
          EquiLearn operates locally on your machine with a native Python Flask backend and SQLite database.
          No student documents are transmitted to external AI servers or commercial tracking pipelines.
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <PixelStar size={12} color="#7866A8" />
          <PixelStar size={12} color="#DABCCB" />
        </div>
      </div>
    </div>
  )
}
