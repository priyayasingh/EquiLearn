import React from 'react'

export default function AdhdIllustration({ size = 110, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ADHD-Friendly Mode illustration - focus sprint blocks, timer stopwatch, and mindful clarity"
    >
      <defs>
        <linearGradient id="adhdBg" x1="10" y1="10" x2="130" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF8F4" />
          <stop offset="100%" stopColor="#DCEAF5" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="120" height="120" rx="24" fill="url(#adhdBg)" />

      {/* Target Focus concentric rings */}
      <circle cx="70" cy="70" r="46" stroke="#B9C9BC" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
      <circle cx="70" cy="70" r="32" stroke="#7866A8" strokeWidth="1.5" opacity="0.4" />

      {/* Structured Bite-Sized Focus Cards */}
      {/* Block 1 (Completed with check) */}
      <rect x="30" y="32" width="62" height="18" rx="6" fill="#FFFFFF" stroke="#B9C9BC" strokeWidth="1.5" />
      <circle cx="40" cy="41" r="5" fill="#B9C9BC" />
      <path d="M38 41L40 43L43 39" stroke="#FFFFFF" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="50" y="39" width="34" height="4" rx="2" fill="#7866A8" opacity="0.8" />

      {/* Block 2 (Active Focus Block with glow border) */}
      <rect x="30" y="56" width="76" height="26" rx="8" fill="#FFFFFF" stroke="#7866A8" strokeWidth="2" />
      <rect x="38" y="64" width="8" height="8" rx="2" fill="#F4E5B9" />
      {/* Bionic reading representation: bold first syllable */}
      <text x="52" y="72" fill="#353342" fontSize="9" fontWeight="800" fontFamily="sans-serif">Fo</text>
      <text x="64" y="72" fill="#777484" fontSize="9" fontWeight="500" fontFamily="sans-serif">cus block</text>
      <rect x="38" y="75" width="58" height="2.5" rx="1.25" fill="#EAE4F5" />

      {/* Block 3 (Upcoming sprint) */}
      <rect x="30" y="88" width="56" height="18" rx="6" fill="#FFFFFF" stroke="#EAE4F5" strokeWidth="1.5" opacity="0.8" />
      <circle cx="40" cy="97" r="4" fill="#DABCCB" />
      <rect x="49" y="95" width="28" height="3" rx="1.5" fill="#777484" opacity="0.6" />

      {/* Focus Timer Stopwatch in Pastel Yellow & Royal Lavender */}
      <circle cx="106" cy="40" r="14" fill="#F4E5B9" stroke="#7866A8" strokeWidth="2" />
      <path d="M106 23V26" stroke="#7866A8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="106" cy="40" r="2" fill="#7866A8" />
      <path d="M106 40L112 36" stroke="#7866A8" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M106 40V33" stroke="#7866A8" strokeWidth="1.75" strokeLinecap="round" />

      {/* Sparkle of accomplishment */}
      <circle cx="114" cy="98" r="3" fill="#7866A8" />
    </svg>
  )
}
