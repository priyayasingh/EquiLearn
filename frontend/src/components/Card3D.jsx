import React, { useRef, useState } from 'react'

export default function Card3D({ children, className = '', maxTilt = 8, scale = 1.02, onClick }) {
  const cardRef = useRef(null)
  const [transformStyle, setTransformStyle] = useState('')
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
    )

    // Holographic cursor glare sheen
    setGlareStyle({
      opacity: 0.18,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.85) 0%, rgba(220,234,245,0.4) 30%, transparent 70%)`
    })
  }

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlareStyle({ opacity: 0 })
  }

  return (
    <div
      ref={cardRef}
      className={`card-3d-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        position: 'relative'
      }}
    >
      {/* Glare Sheen Layer */}
      <div
        className="card-3d-glare"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 10,
          transition: 'opacity 0.25s ease',
          ...glareStyle
        }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
