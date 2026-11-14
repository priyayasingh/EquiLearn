import React from 'react'

export default function PixelCharacter({ size = 56, className = '' }) {
  // A friendly Y2K pixel robot mascot with antenna, blinking eyes, and waving hand
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      className={`pixel-art ${className}`}
      role="img"
      aria-label="EquiBot - Friendly Pixel Learning Mascot"
    >
      {/* Antenna Sparkle in Pastel Yellow */}
      <rect x="15" y="2" width="2" height="2" fill="#F4E5B9" />
      <rect x="14" y="4" width="4" height="2" fill="#F4E5B9" />
      <rect x="15" y="6" width="2" height="3" fill="#7866A8" />

      {/* Head Outer Border in Charcoal */}
      <rect x="8" y="9" width="16" height="12" fill="#353342" />
      {/* Head Fill in Royal Lavender */}
      <rect x="9" y="10" width="14" height="10" fill="#7866A8" />
      {/* Glossy highlight on forehead */}
      <rect x="10" y="10" width="12" height="2" fill="#EAE4F5" opacity="0.6" />

      {/* Screen Face Glass in Icy Soft Sky Blue */}
      <rect x="10" y="12" width="12" height="6" fill="#DCEAF5" />
      {/* Big Friendly Pixel Eyes */}
      <rect x="12" y="13" width="2" height="3" fill="#353342" />
      <rect x="18" y="13" width="2" height="3" fill="#353342" />
      {/* Eye catchlight */}
      <rect x="12" y="13" width="1" height="1" fill="#FFFFFF" />
      <rect x="18" y="13" width="1" height="1" fill="#FFFFFF" />
      {/* Smiling Mouth */}
      <rect x="14" y="16" width="4" height="1" fill="#7866A8" />
      <rect x="13" y="15" width="1" height="1" fill="#7866A8" />
      <rect x="18" y="15" width="1" height="1" fill="#7866A8" />
      {/* Cheeks in Dusty Rose */}
      <rect x="11" y="15" width="1" height="1" fill="#DABCCB" />
      <rect x="20" y="15" width="1" height="1" fill="#DABCCB" />

      {/* Neck */}
      <rect x="14" y="21" width="4" height="1" fill="#353342" />

      {/* Body Chassis in Lilac & Chrome */}
      <rect x="9" y="22" width="14" height="7" fill="#EAE4F5" />
      <rect x="9" y="22" width="14" height="1" fill="#FFFFFF" />
      <rect x="8" y="22" width="1" height="7" fill="#353342" />
      <rect x="23" y="22" width="1" height="7" fill="#353342" />
      <rect x="9" y="29" width="14" height="1" fill="#353342" />

      {/* Heart / Battery Core in Dusty Rose */}
      <rect x="14" y="24" width="4" height="3" fill="#DABCCB" />
      <rect x="15" y="25" width="2" height="1" fill="#FFFFFF" />

      {/* Left Arm (Relaxed) */}
      <rect x="6" y="23" width="2" height="5" fill="#7866A8" />
      <rect x="6" y="28" width="2" height="2" fill="#FAF8F4" />

      {/* Right Arm (Joyfully Waving Upwards) */}
      <rect x="24" y="21" width="2" height="3" fill="#7866A8" />
      <rect x="26" y="18" width="2" height="4" fill="#7866A8" />
      <rect x="26" y="16" width="3" height="2" fill="#FAF8F4" />

      {/* Little Wheels / Feet in Muted Sage */}
      <rect x="11" y="30" width="3" height="2" fill="#B9C9BC" />
      <rect x="18" y="30" width="3" height="2" fill="#B9C9BC" />
    </svg>
  )
}
