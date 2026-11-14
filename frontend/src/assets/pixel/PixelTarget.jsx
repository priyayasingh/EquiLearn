import React from 'react'

export default function PixelTarget({ size = 48, className = '' }) {
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
      aria-label="Pixel Focus Target"
    >
      {/* Outer target ring in Muted Sage */}
      <rect x="7" y="3" width="10" height="2" fill="#B9C9BC" />
      <rect x="7" y="19" width="10" height="2" fill="#B9C9BC" />
      <rect x="3" y="7" width="2" height="10" fill="#B9C9BC" />
      <rect x="19" y="7" width="2" height="10" fill="#B9C9BC" />

      {/* Middle ring in Royal Lavender */}
      <rect x="8" y="6" width="8" height="2" fill="#7866A8" />
      <rect x="8" y="16" width="8" height="2" fill="#7866A8" />
      <rect x="6" y="8" width="2" height="8" fill="#7866A8" />
      <rect x="16" y="8" width="2" height="8" fill="#7866A8" />

      {/* Bullseye Center in Pastel Yellow & Dusty Rose */}
      <rect x="10" y="10" width="4" height="4" fill="#DABCCB" />
      <rect x="11" y="11" width="2" height="2" fill="#F4E5B9" />

      {/* Crosshairs in Charcoal */}
      <rect x="11" y="2" width="2" height="3" fill="#353342" />
      <rect x="11" y="19" width="2" height="3" fill="#353342" />
      <rect x="2" y="11" width="3" height="2" fill="#353342" />
      <rect x="19" y="11" width="3" height="2" fill="#353342" />
    </svg>
  )
}
