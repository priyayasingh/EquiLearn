import React from 'react'

export default function PixelBook({ size = 48, className = '' }) {
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
      aria-label="Pixel Open Book"
    >
      {/* Outer border in Charcoal */}
      <rect x="2" y="5" width="20" height="15" fill="#353342" />

      {/* Book Cover back in Royal Lavender */}
      <rect x="3" y="6" width="18" height="13" fill="#7866A8" />

      {/* Pages in Warm Ivory */}
      <rect x="4" y="7" width="7" height="10" fill="#FAF8F4" />
      <rect x="13" y="7" width="7" height="10" fill="#FAF8F4" />

      {/* Spine divider */}
      <rect x="11" y="7" width="2" height="11" fill="#625091" />

      {/* Text lines in Muted Grey */}
      <rect x="5" y="9" width="5" height="1" fill="#B9C9BC" />
      <rect x="5" y="11" width="4" height="1" fill="#777484" />
      <rect x="5" y="13" width="5" height="1" fill="#777484" />

      <rect x="14" y="9" width="5" height="1" fill="#B9C9BC" />
      <rect x="14" y="11" width="5" height="1" fill="#777484" />
      <rect x="14" y="13" width="3" height="1" fill="#777484" />

      {/* Golden Bookmark Ribbon in Pastel Yellow */}
      <rect x="11" y="6" width="2" height="6" fill="#F4E5B9" />
      <rect x="10" y="12" width="2" height="2" fill="#F4E5B9" />

      {/* Twinkling star above in Dusty Rose */}
      <rect x="18" y="2" width="2" height="2" fill="#DABCCB" />
      <rect x="17" y="3" width="4" height="1" fill="#DABCCB" />
    </svg>
  )
}
