import React from 'react'

export default function ProgressIllustration({ size = 110, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Student Progress illustration - learning journey steps, streak flame, and mastery milestone flag"
    >
      <defs>
        <linearGradient id="progBg" x1="10" y1="10" x2="130" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF8F4" />
          <stop offset="100%" stopColor="#DCEAF5" />
        </linearGradient>
        <linearGradient id="flameGrad" x1="104" y1="28" x2="104" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4E5B9" />
          <stop offset="50%" stopColor="#DABCCB" />
          <stop offset="100%" stopColor="#7866A8" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="120" height="120" rx="24" fill="url(#progBg)" />

      {/* Ascending Stepping Stones of Learning */}
      {/* Step 1 */}
      <rect x="24" y="92" width="24" height="18" rx="5" fill="#FAF8F4" stroke="#EAE4F5" strokeWidth="2" />
      <text x="36" y="105" fill="#7866A8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1</text>

      {/* Step 2 */}
      <rect x="46" y="78" width="24" height="32" rx="5" fill="#FAF8F4" stroke="#B9C9BC" strokeWidth="2" />
      <text x="58" y="92" fill="#7866A8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2</text>

      {/* Step 3 */}
      <rect x="68" y="64" width="24" height="46" rx="5" fill="#FAF8F4" stroke="#DABCCB" strokeWidth="2" />
      <text x="80" y="78" fill="#7866A8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3</text>

      {/* Step 4 (Highest Peak) */}
      <rect x="90" y="50" width="26" height="60" rx="5" fill="#7866A8" stroke="#5D4B8C" strokeWidth="2" />
      <text x="103" y="66" fill="#FAF8F4" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">★</text>

      {/* Milestone Flag on Step 4 */}
      <path d="M103 24V50" stroke="#FAF8F4" strokeWidth="2" strokeLinecap="round" />
      <path d="M103 24L118 31L103 38V24Z" fill="#F4E5B9" />

      {/* Learning Streak Flame on Top-Left */}
      <circle cx="38" cy="40" r="14" fill="#FFFFFF" stroke="#EAE4F5" strokeWidth="1.5" />
      <path
        d="M38 30C38 30 42 34 42 38C42 41.5 39.5 44 38 45C36.5 44 34 41.5 34 38C34 35 36 32 38 30Z"
        fill="url(#flameGrad)"
      />
      <circle cx="38" cy="40" r="2" fill="#F4E5B9" />

      {/* Upward Growth Trendline */}
      <path d="M28 88C44 76 60 70 96 46" stroke="#B9C9BC" strokeWidth="2.5" strokeDasharray="3 3" />
      <circle cx="96" cy="46" r="3.5" fill="#B9C9BC" />
    </svg>
  )
}
