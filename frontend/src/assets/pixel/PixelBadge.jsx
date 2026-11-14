import React from 'react'

export default function PixelBadge({ text = 'XP +100', variant = 'purple', size = 'normal' }) {
  const getColors = () => {
    switch (variant) {
      case 'gold':
        return { bg: '#F4E5B9', border: '#D4C085', text: '#353342' }
      case 'rose':
        return { bg: '#DABCCB', border: '#C09EA9', text: '#353342' }
      case 'sage':
        return { bg: '#B9C9BC', border: '#97AA9A', text: '#2A3C2B' }
      case 'blue':
        return { bg: '#DCEAF5', border: '#ABC4D8', text: '#2A4A63' }
      default:
        return { bg: '#EAE4F5', border: '#C6B8DE', text: '#554284' }
    }
  }

  const { bg, border, text: textColor } = getColors()

  return (
    <span
      className={`pixel-badge pixel-badge-${size}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: bg,
        border: `2px solid ${border}`,
        boxShadow: `2px 2px 0px #353342`,
        color: textColor,
        fontFamily: "'Silkscreen', monospace",
        fontSize: size === 'small' ? '0.65rem' : '0.75rem',
        fontWeight: '700',
        padding: size === 'small' ? '2px 6px' : '3px 8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        imageRendering: 'pixelated',
        userSelect: 'none'
      }}
    >
      <span style={{ fontSize: '0.7em', color: '#7866A8' }}>✦</span>
      {text}
    </span>
  )
}
