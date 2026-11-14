import React from 'react'

export default function LowVisionIllustration({ size = 110, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Low-Vision Mode illustration - high-contrast magnifying lens and audio read-aloud waves"
    >
      <defs>
        <linearGradient id="lvBg" x1="10" y1="10" x2="130" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF8F4" />
          <stop offset="100%" stopColor="#DCEAF5" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="120" height="120" rx="24" fill="url(#lvBg)" />

      {/* High-Contrast Card (Dark Yellow-on-Black preview) */}
      <rect x="24" y="28" width="62" height="74" rx="10" fill="#201E28" stroke="#F4E5B9" strokeWidth="1.5" />
      <rect x="32" y="38" width="28" height="4" rx="2" fill="#F4E5B9" />
      <rect x="32" y="46" width="46" height="3" rx="1.5" fill="#FAF8F4" opacity="0.9" />
      <rect x="32" y="53" width="40" height="3" rx="1.5" fill="#FAF8F4" opacity="0.9" />
      <rect x="32" y="60" width="44" height="3" rx="1.5" fill="#FAF8F4" opacity="0.9" />

      {/* Prominent Optical Magnifying Glass */}
      <circle cx="78" cy="74" r="26" fill="#FFFFFF" fillOpacity="0.9" stroke="#7866A8" strokeWidth="3" />
      <path d="M96 92L116 112" stroke="#7866A8" strokeWidth="5" strokeLinecap="round" />
      <path d="M96 92L116 112" stroke="#FAF8F4" strokeWidth="2" strokeLinecap="round" />

      {/* Magnified High-Legibility Bold Character inside lens */}
      <text x="68" y="83" fill="#7866A8" fontSize="24" fontWeight="900" fontFamily="sans-serif">A</text>
      <circle cx="92" cy="62" r="3" fill="#F4E5B9" />

      {/* Text-to-Speech Audio Waves on the right */}
      <circle cx="106" cy="36" r="10" fill="#7866A8" />
      {/* Speaker icon */}
      <path d="M101 36L104 33H107L110 30V42L107 39H104L101 36Z" fill="#FFFFFF" />
      {/* Sound waves in Soft Sky Blue */}
      <path d="M114 32C116 34 116 38 114 40" stroke="#7866A8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M118 29C122 33 122 39 118 43" stroke="#7866A8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
