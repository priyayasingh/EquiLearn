import React from 'react'

export default function PixelLightbulb({ size = 48, className = '' }) {
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
      aria-label="Pixel Lightbulb"
    >
      {/* Lightbulb glass outline in Charcoal */}
      <rect x="8" y="4" width="8" height="2" fill="#353342" />
      <rect x="6" y="6" width="12" height="7" fill="#353342" />

      {/* Lightbulb yellow glow in Pastel Yellow */}
      <rect x="9" y="5" width="6" height="1" fill="#F4E5B9" />
      <rect x="7" y="6" width="10" height="6" fill="#F4E5B9" />
      <rect x="8" y="12" width="8" height="2" fill="#F4E5B9" />

      {/* Glossy catchlight in White */}
      <rect x="8" y="7" width="2" height="3" fill="#FFFFFF" />

      {/* Filament core in Dusty Rose */}
      <rect x="11" y="9" width="2" height="3" fill="#DABCCB" />

      {/* Screw base in Muted Sage / Grey */}
      <rect x="9" y="14" width="6" height="2" fill="#7866A8" />
      <rect x="10" y="16" width="4" height="2" fill="#B9C9BC" />
      <rect x="11" y="18" width="2" height="2" fill="#353342" />

      {/* Radiating pixel light rays */}
      <rect x="11" y="1" width="2" height="2" fill="#F4E5B9" />
      <rect x="4" y="4" width="2" height="2" fill="#F4E5B9" />
      <rect x="18" y="4" width="2" height="2" fill="#F4E5B9" />
      <rect x="2" y="9" width="2" height="2" fill="#F4E5B9" />
      <rect x="20" y="9" width="2" height="2" fill="#F4E5B9" />
    </svg>
  )
}
