import React, { useState } from 'react'
import {
  Sparkles,
  Zap,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCode,
  BookOpen
} from 'lucide-react'
import { UploadIllustration } from '../assets/illustrations'
import { PixelFolder, PixelStar, PixelBadge } from '../assets/pixel'
import Card3D from './Card3D'

export default function UploadSection({ onUpload, onLoadSample, loading, error }) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0])
    }
  }

  return (
    <div className="section-box" role="region" aria-labelledby="upload-heading">
      <div className="section-head">
        <div className="section-head-title">
          <PixelFolder size={32} />
          <div>
            <h2 id="upload-heading" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              Digital Reading Room
              <PixelBadge text="UPLOAD" variant="purple" />
            </h2>
            <p>Upload any study material to instantly generate 4 tailored accessible formats.</p>
          </div>
        </div>
        <span className="section-badge" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.65rem', letterSpacing: '0.08em' }}>
          Step 1: Choose Content
        </span>
      </div>

      <div
        className={`upload-card-redesigned ${dragActive ? 'dragging' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          accept=".pdf,.docx,.txt"
          onChange={handleChange}
          disabled={loading}
          aria-label="Upload PDF, Word DOCX or TXT file"
        />

        <div className="upload-illustration-box" style={{ position: 'relative' }}>
          <UploadIllustration size={135} />
          {/* Pixel star decorations */}
          <div style={{ position: 'absolute', top: '-8px', right: '-8px' }}>
            <PixelStar size={18} color="#F4E5B9" />
          </div>
          <div style={{ position: 'absolute', bottom: '-4px', left: '10px' }}>
            <PixelStar size={12} color="#DABCCB" />
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--font-heading)' }}>
          {loading ? 'Analyzing & Adapting Content...' : 'Drag & Drop Your Learning Material Here'}
        </h3>
        <p>Supports textbooks, lecture notes, syllabus guides, scientific papers, and plain notes.</p>

        <div className="format-tags-bar">
          <span className="format-pill pdf" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.6rem', letterSpacing: '0.05em' }}>PDF (.pdf)</span>
          <span className="format-pill docx" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.6rem', letterSpacing: '0.05em' }}>Word (.docx)</span>
          <span className="format-pill txt" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.6rem', letterSpacing: '0.05em' }}>Plain Text (.txt)</span>
          <span className="format-pill" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.6rem', letterSpacing: '0.05em' }}>Up to 20 MB</span>
        </div>

        <button
          type="button"
          className="btn-primary-glow"
          onClick={() => document.getElementById('file-upload').click()}
          disabled={loading}
        >
          {loading ? 'Processing Document...' : 'Browse Computer'}
          <ArrowRight size={17} />
        </button>
      </div>

      {error && (
        <div
          style={{
            marginTop: '1.4rem',
            padding: '1.1rem 1.4rem',
            borderRadius: '14px',
            backgroundColor: '#FDF1F4',
            color: '#A3485E',
            border: '1px solid #DABCCB',
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            fontSize: '0.925rem'
          }}
          role="alert"
        >
          <AlertCircle size={22} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      {/* Preloaded Sample Lessons */}
      <div className="samples-bar-redesigned">
        <div className="samples-label-text">
          <PixelStar size={16} color="#7866A8" />
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.65rem', letterSpacing: '0.07em', color: '#7866A8' }}>
            OR TRY A SAMPLE LESSON:
          </span>
        </div>

        <div className="samples-grid-redesigned">
          <Card3D intensity={8}>
            <button
              type="button"
              className="sample-lesson-card"
              onClick={() => onLoadSample('photosynthesis')}
              disabled={loading}
            >
              <div className="sample-badge-icon purple">
                <Zap size={20} />
              </div>
              <div className="sample-lesson-info">
                <strong>Photosynthesis & Plant Energy</strong>
                <small>Biology & Natural Science · 195 words</small>
              </div>
            </button>
          </Card3D>

          <Card3D intensity={8}>
            <button
              type="button"
              className="sample-lesson-card"
              onClick={() => onLoadSample('renewable_energy')}
              disabled={loading}
            >
              <div className="sample-badge-icon sage">
                <Layers size={20} />
              </div>
              <div className="sample-lesson-info">
                <strong>Renewable Energy Systems</strong>
                <small>Environmental Engineering · 170 words</small>
              </div>
            </button>
          </Card3D>

          <Card3D intensity={8}>
            <button
              type="button"
              className="sample-lesson-card"
              onClick={() => onLoadSample('internet_basics')}
              disabled={loading}
            >
              <div className="sample-badge-icon blue">
                <FileCode size={20} />
              </div>
              <div className="sample-lesson-info">
                <strong>How the Internet Works</strong>
                <small>Computer Science & TCP/IP · 165 words</small>
              </div>
            </button>
          </Card3D>
        </div>
      </div>

      <div
        style={{
          marginTop: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          fontSize: '0.8rem',
          color: '#777484'
        }}
      >
        <ShieldCheck size={18} color="#4E8659" />
        <span>
          100% Offline & Private. Document extraction and quiz generation run locally on your Python engine with zero external cloud transmission.
        </span>
      </div>
    </div>
  )
}
