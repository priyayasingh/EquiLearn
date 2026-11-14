import React, { useState } from 'react'
import {
  Sparkles,
  Search,
  BookOpen,
  Filter,
  Tag,
  ArrowRight,
  Bookmark
} from 'lucide-react'
import { KeywordsIllustration } from '../assets/illustrations'
import { PixelLightbulb, PixelBadge, PixelStar } from '../assets/pixel'
import Card3D from './Card3D'

export default function KeywordsGlossary({ keywords, docTitle, onSelectKeyword, onGoToReading }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  if (!keywords || keywords.length === 0) {
    return (
      <div className="section-box" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <PixelLightbulb size={80} />
        </div>
        <h2 style={{ fontFamily: 'var(--font-heading)', color: '#353342', marginBottom: '0.5rem' }}>
          No Keywords Extracted Yet
        </h2>
        <p style={{ color: '#777484', maxWidth: '480px', margin: '0 auto 1.75rem', lineHeight: '1.6' }}>
          Upload a lesson or select a sample document in the Reading Room to automatically extract
          core conceptual keywords and contextual definitions.
        </p>
        <button type="button" className="btn-primary-glow" onClick={onGoToReading}>
          Go to Digital Reading Room
        </button>
      </div>
    )
  }

  const categories = ['All', ...new Set(keywords.map((k) => k.category))]

  const filtered = keywords.filter((k) => {
    const matchesSearch =
      k.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      k.context.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = selectedCategory === 'All' || k.category === selectedCategory
    return matchesSearch && matchesCat
  })

  return (
    <div className="section-box" role="region" aria-labelledby="keywords-heading">
      {/* Y2K Header with Pixel Lightbulb */}
      <div className="keywords-header-showcase">
        <div style={{ maxWidth: '650px' }}>
          <div className="hero-tag" style={{ marginBottom: '0.65rem' }}>
            <PixelLightbulb size={16} />
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.6rem', letterSpacing: '0.07em' }}>
              INTERACTIVE CONCEPTUAL GLOSSARY
            </span>
          </div>
          <h2 id="keywords-heading" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '800', color: '#353342', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            Important Keywords & Vocabulary
            <PixelBadge text={`${keywords.length} terms`} variant="purple" />
          </h2>
          <p style={{ color: '#777484', fontSize: '0.925rem', marginTop: '4px' }}>
            Extracted directly from <strong>{docTitle || 'your document'}</strong> using semantic term frequency and pattern analysis.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div aria-hidden="true">
            <KeywordsIllustration size={80} />
          </div>
          <button type="button" className="btn-secondary-ivory" onClick={onGoToReading}>
            <BookOpen size={16} />
            <span>Return to Reading</span>
          </button>
        </div>
      </div>

      {/* Interactive Keyword Cloud with pixel freq badges */}
      <div className="keywords-cloud-interactive" role="group" aria-label="Keyword Cloud">
        {keywords.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className="keyword-chip-btn"
            onClick={() => setSearchTerm(item.term)}
            title={`Appears ${item.frequency} times. Click to filter definition.`}
          >
            <span>{item.term}</span>
            <span className="keyword-freq-badge">{item.frequency}x</span>
          </button>
        ))}
      </div>

      {/* Search & Category Filter Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem',
          padding: '0.95rem 1.25rem',
          background: '#FAF8F4',
          borderRadius: '16px',
          border: '1px solid rgba(120, 102, 168, 0.16)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: '1', minWidth: '240px' }}>
          <Search size={19} color="#777484" />
          <input
            type="text"
            placeholder="Search keywords, concepts, or definition snippets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              background: 'transparent',
              fontSize: '0.925rem',
              outline: 'none',
              color: '#353342',
              fontFamily: 'inherit'
            }}
            aria-label="Search keywords"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              style={{ fontSize: '0.78rem', color: '#777484', fontWeight: '700' }}
            >
              Clear
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
          <Filter size={15} color="#777484" />
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.58rem', fontWeight: '700', color: '#777484', marginRight: '4px', letterSpacing: '0.07em' }}>
            CATEGORY:
          </span>
          {categories.map((cat, i) => (
            <button
              key={i}
              type="button"
              className={`pill-toggle-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Glossary Cards Grid — wrapped in Card3D */}
      <div className="glossary-cards-grid">
        {filtered.map((item, idx) => (
          <Card3D key={idx} intensity={6}>
            <div className="glossary-card-item">
              <div className="glossary-item-top">
                <strong>{item.term}</strong>
                <div style={{ display: 'flex', gap: '0.45rem' }}>
                  <span className="glossary-category-pill">{item.category}</span>
                  <span
                    className="keyword-freq-badge"
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '800',
                      background: '#EAE4F5',
                      color: '#625091',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '999px'
                    }}
                  >
                    {item.frequency} {item.frequency === 1 ? 'mention' : 'mentions'}
                  </span>
                </div>
              </div>

              <p>
                {item.context ||
                  `Important conceptual term identified throughout the document with an importance rating of ${item.importance}.`}
              </p>
            </div>
          </Card3D>
        ))}
      </div>
    </div>
  )
}
