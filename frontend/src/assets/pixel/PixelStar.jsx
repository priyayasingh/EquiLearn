import React from 'react'

export default function PixelStar({ size = 20, color = '#F4E5B9', className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={`pixel-art pixel-twinkle ${className}`}
      role="img"
      aria-label="Twinkling Pixel Star"
    >
      <rect x="7" y="1" width="2" height="14" fill={color} />
      <rect x="1" y="7" width="14" height="2" fill={color} />
      <rect x="5" y="4" width="6" height="8" fill={color} />
      <rect x="4" y="5" width="8" height="6" fill={color} />
      <rect x="6" y="6" width="4" height="4" fill="#FFFFFF" />
    </svg>
  )
}
