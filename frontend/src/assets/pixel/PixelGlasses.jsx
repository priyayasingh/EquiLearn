import React from 'react'

export default function PixelGlasses({ size = 48, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={`pixel-art ${className}`}
      role="img"
      aria-label="Pixel Futuristic Visor Glasses"
    >
      {/* Frame in Charcoal */}
      <rect x="2" y="8" width="20" height="2" fill="#353342" />

      {/* Left Lens Frame */}
      <rect x="3" y="10" width="8" height="6" fill="#353342" />
      {/* Left Lens glass in Icy Soft Sky Blue */}
      <rect x="4" y="10" width="6" height="5" fill="#DCEAF5" />
      <rect x="5" y="11" width="2" height="2" fill="#FFFFFF" />

      {/* Bridge in Lavender */}
      <rect x="11" y="9" width="2" height="2" fill="#7866A8" />

      {/* Right Lens Frame */}
      <rect x="13" y="10" width="8" height="6" fill="#353342" />
      {/* Right Lens glass in Icy Soft Sky Blue */}
      <rect x="14" y="10" width="6" height="5" fill="#DCEAF5" />
      <rect x="15" y="11" width="2" height="2" fill="#FFFFFF" />

      {/* Retro cyber ear stems */}
      <rect x="1" y="9" width="2" height="4" fill="#7866A8" />
      <rect x="21" y="9" width="2" height="4" fill="#7866A8" />

      {/* High-contrast yellow beam underneath */}
      <rect x="6" y="17" width="2" height="2" fill="#F4E5B9" />
      <rect x="16" y="17" width="2" height="2" fill="#F4E5B9" />
    </svg>
  )
}
