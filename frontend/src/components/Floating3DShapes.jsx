import React, { useEffect, useState } from 'react'
import { PixelStar } from '../assets/pixel'

export default function Floating3DShapes() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePos({ x, y })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="floating-3d-scene" aria-hidden="true">
      {/* 1. Chrome Metallic Sphere with Specular Glow */}
      <div
        className="chrome-sphere-3d float-anim-1"
        style={{
          transform: `translate3d(${mousePos.x * 0.8}px, ${mousePos.y * 0.8}px, 0)`
        }}
      >
        <div className="chrome-reflection-line" />
      </div>

      {/* 2. Holographic Floating Torus / Glass Ring */}
      <div
        className="holo-ring-3d float-anim-2"
        style={{
          transform: `translate3d(${-mousePos.x * 0.6}px, ${-mousePos.y * 0.6}px, 0)`
        }}
      />

      {/* 3. Pastel Lavender 3D Cube with Soft Shadows */}
      <div
        className="pastel-cube-3d float-anim-3"
        style={{
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`
        }}
      >
        <span className="cube-face front">✦</span>
      </div>

      {/* 4. Twinkling Pixel Stars in the Background */}
      <div className="pixel-star-anchor star-pos-1">
        <PixelStar size={18} color="#F4E5B9" />
      </div>
      <div className="pixel-star-anchor star-pos-2">
        <PixelStar size={14} color="#DABCCB" />
      </div>
      <div className="pixel-star-anchor star-pos-3">
        <PixelStar size={16} color="#DCEAF5" />
      </div>
    </div>
  )
}
