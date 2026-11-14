import React from 'react'

export default function PixelFolder({ size = 48, className = '' }) {
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
      aria-label="Pixel Y2K Translucent Folder"
    >
      {/* Folder Tab back in Charcoal & Royal Lavender */}
      <rect x="3" y="5" width="8" height="3" fill="#353342" />
      <rect x="4" y="6" width="6" height="2" fill="#7866A8" />

      {/* Main folder body in Royal Lavender */}
      <rect x="3" y="7" width="18" height="13" fill="#353342" />
      <rect x="4" y="8" width="16" height="11" fill="#7866A8" />

      {/* Document sticking out in Warm Ivory */}
      <rect x="7" y="4" width="11" height="8" fill="#FAF8F4" />
      <rect x="9" y="6" width="6" height="1" fill="#7866A8" />
      <rect x="9" y="8" width="7" height="1" fill="#B9C9BC" />

      {/* Front flap in Soft Lilac / Translucent gloss */}
      <rect x="3" y="11" width="18" height="8" fill="#EAE4F5" />
      <rect x="4" y="12" width="16" height="6" fill="#EAE4F5" />
      <rect x="4" y="11" width="16" height="1" fill="#FFFFFF" />

      {/* Y2K Star label on folder */}
      <rect x="11" y="14" width="2" height="2" fill="#F4E5B9" />
    </svg>
  )
}
