import React from 'react'

export default function PixelComputer({ size = 48, className = '' }) {
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
      aria-label="Y2K Pixel Computer"
    >
      {/* Outer monitor shell in Charcoal */}
      <rect x="3" y="3" width="18" height="14" fill="#353342" />

      {/* Translucent Y2K chassis in Royal Lavender */}
      <rect x="4" y="4" width="16" height="12" fill="#7866A8" />
      {/* Glossy reflection on top corner */}
      <rect x="4" y="4" width="8" height="2" fill="#EAE4F5" />
      <rect x="4" y="6" width="3" height="2" fill="#EAE4F5" />

      {/* Screen area in Soft Sky Blue */}
      <rect x="6" y="6" width="12" height="8" fill="#DCEAF5" />

      {/* Pixel smiley face on screen */}
      <rect x="8" y="8" width="2" height="2" fill="#353342" />
      <rect x="14" y="8" width="2" height="2" fill="#353342" />
      <rect x="9" y="11" width="6" height="1" fill="#7866A8" />
      <rect x="8" y="10" width="1" height="1" fill="#7866A8" />
      <rect x="15" y="10" width="1" height="1" fill="#7866A8" />

      {/* Stand neck */}
      <rect x="10" y="17" width="4" height="2" fill="#353342" />
      <rect x="11" y="17" width="2" height="2" fill="#EAE4F5" />

      {/* Stand Base */}
      <rect x="7" y="19" width="10" height="2" fill="#353342" />
      <rect x="8" y="19" width="8" height="1" fill="#DCEAF5" />

      {/* Keyboard bar in Muted Sage */}
      <rect x="5" y="22" width="14" height="1" fill="#B9C9BC" />
    </svg>
  )
}
