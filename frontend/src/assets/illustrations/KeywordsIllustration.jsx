import React from 'react'

export default function KeywordsIllustration({ size = 110, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Keywords and Vocabulary illustration - highlighted conceptual keyword pills and dictionary index"
    >
      <defs>
        <linearGradient id="kwBg" x1="10" y1="10" x2="130" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF8F4" />
          <stop offset="100%" stopColor="#EAE4F5" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="120" height="120" rx="24" fill="url(#kwBg)" />

      {/* Dictionary / Glossary Book Base in Dusty Rose */}
      <rect x="26" y="32" width="88" height="78" rx="10" fill="#FFFFFF" stroke="#DABCCB" strokeWidth="2" />
      {/* Index tab on side */}
      <path d="M114 42H118C120.2 42 122 43.8 122 46V54C122 56.2 120.2 58 118 58H114V42Z" fill="#7866A8" />
      <path d="M114 62H118C120.2 62 122 63.8 122 66V74C122 76.2 120.2 78 118 78H114V62Z" fill="#B9C9BC" />

      {/* Floating Highlighted Keyword Pills */}
      {/* Pill 1: Key Concept in Royal Lavender */}
      <g transform="rotate(-4 66 48)">
        <rect x="36" y="42" width="60" height="18" rx="9" fill="#7866A8" />
        <circle cx="45" cy="51" r="3" fill="#F4E5B9" />
        <rect x="52" y="49" width="34" height="4" rx="2" fill="#FFFFFF" />
      </g>

      {/* Pill 2: Vocabulary in Pastel Yellow */}
      <g transform="rotate(3 74 68)">
        <rect x="44" y="62" width="56" height="16" rx="8" fill="#F4E5B9" stroke="#E6D399" strokeWidth="1" />
        <circle cx="53" cy="70" r="2.5" fill="#7866A8" />
        <rect x="60" y="68" width="30" height="3.5" rx="1.75" fill="#353342" />
      </g>

      {/* Pill 3: Definition in Muted Sage */}
      <g transform="rotate(-2 68 88)">
        <rect x="38" y="82" width="64" height="16" rx="8" fill="#B9C9BC" />
        <circle cx="47" cy="90" r="2.5" fill="#FAF8F4" />
        <rect x="54" y="88" width="38" height="3.5" rx="1.75" fill="#FAF8F4" />
      </g>

      {/* Golden Search/Inspection Key of Knowledge */}
      <circle cx="32" cy="30" r="12" fill="#FAF8F4" stroke="#7866A8" strokeWidth="2" />
      <path d="M26 30L32 36L40 26" stroke="#7866A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="106" cy="100" r="3" fill="#DABCCB" />
    </svg>
  )
}
