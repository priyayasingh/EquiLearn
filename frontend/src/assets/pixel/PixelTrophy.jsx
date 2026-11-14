import React from 'react'

export default function PixelTrophy({ size = 48, className = '' }) {
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
      aria-label="Pixel Achievement Trophy"
    >
      {/* Trophy rim & cup in Pastel Yellow & Gold */}
      <rect x="6" y="4" width="12" height="2" fill="#353342" />
      <rect x="7" y="5" width="10" height="2" fill="#F4E5B9" />

      {/* Main Cup */}
      <rect x="6" y="6" width="12" height="6" fill="#F4E5B9" />
      <rect x="7" y="12" width="10" height="2" fill="#F4E5B9" />
      <rect x="8" y="14" width="8" height="2" fill="#F4E5B9" />
      <rect x="10" y="16" width="4" height="2" fill="#F4E5B9" />

      {/* Glossy highlight on left */}
      <rect x="7" y="6" width="2" height="6" fill="#FFFFFF" />

      {/* Trophy Handles */}
      <rect x="4" y="6" width="2" height="4" fill="#353342" />
      <rect x="4" y="6" width="1" height="4" fill="#F4E5B9" />
      <rect x="18" y="6" width="2" height="4" fill="#353342" />
      <rect x="19" y="6" width="1" height="4" fill="#F4E5B9" />

      {/* Stem */}
      <rect x="11" y="17" width="2" height="2" fill="#353342" />

      {/* Trophy Base in Royal Lavender */}
      <rect x="7" y="19" width="10" height="3" fill="#7866A8" />
      <rect x="6" y="21" width="12" height="2" fill="#353342" />
      <rect x="9" y="20" width="6" height="1" fill="#FAF8F4" />

      {/* Sparkling pixel star top right */}
      <rect x="19" y="2" width="2" height="2" fill="#DABCCB" />
      <rect x="18" y="3" width="4" height="1" fill="#FFFFFF" />
    </svg>
  )
}
