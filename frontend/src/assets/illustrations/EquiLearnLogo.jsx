import React from 'react'

export default function EquiLearnLogo({ size = 40, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="EquiLearn Logo - Inclusive Learning for Everyone"
    >
      <defs>
        <linearGradient id="eqLogoGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7866A8" />
          <stop offset="100%" stopColor="#5D4B8C" />
        </linearGradient>
        <linearGradient id="eqLeafGrad" x1="20" y1="8" x2="36" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#B9C9BC" />
          <stop offset="100%" stopColor="#7866A8" />
        </linearGradient>
        <filter id="eqLogoShadow" x="0" y="2" width="48" height="46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#7866A8" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Rounded squircle emblem */}
      <rect x="4" y="4" width="40" height="40" rx="14" fill="url(#eqLogoGrad)" filter="url(#eqLogoShadow)" />

      {/* Book base pages */}
      <path
        d="M12 32C15.5 30 19.5 30 24 31.5C28.5 30 32.5 30 36 32V19C32.5 17 28.5 17 24 18.5C19.5 17 15.5 17 12 19V32Z"
        fill="#FAF8F4"
        fillOpacity="0.95"
      />
      {/* Book spine curve */}
      <path
        d="M24 18.5V31.5"
        stroke="#7866A8"
        strokeWidth="1.75"
        strokeLinecap="round"
      />

      {/* Sprouting leaf of inclusive growth */}
      <path
        d="M24 18C24 13.5 28.5 10 32.5 10.5C33 14.5 29.5 18 24 18Z"
        fill="#F4E5B9"
      />
      <path
        d="M24 18C24 14 20 11.5 16.5 12C16 15.5 19 18 24 18Z"
        fill="#B9C9BC"
      />
      
      {/* Star / sparkle of accessibility */}
      <circle cx="24" cy="11" r="1.75" fill="#FAF8F4" />
    </svg>
  )
}
