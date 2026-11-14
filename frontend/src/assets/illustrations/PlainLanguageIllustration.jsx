import React from 'react'

export default function PlainLanguageIllustration({ size = 110, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Plain Language Mode illustration - tangled complex text simplifying into clear lightbulb understanding"
    >
      <defs>
        <linearGradient id="plBg" x1="10" y1="10" x2="130" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF8F4" />
          <stop offset="100%" stopColor="#EAE4F5" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="120" height="120" rx="24" fill="url(#plBg)" />

      {/* Tangled complex path on left (representing dense academic jargon) */}
      <path
        d="M26 62C26 50 42 50 36 68C30 84 52 82 46 64C42 52 56 50 62 64"
        stroke="#DABCCB"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="28" cy="62" r="3" fill="#DABCCB" />

      {/* Transform Arrow */}
      <path d="M64 64L76 64" stroke="#7866A8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M72 59L77 64L72 69" stroke="#7866A8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Clear, structured, plain language lines on right */}
      <rect x="84" y="52" width="34" height="4" rx="2" fill="#7866A8" />
      <rect x="84" y="60" width="28" height="3" rx="1.5" fill="#B9C9BC" />
      <rect x="84" y="67" width="32" height="3" rx="1.5" fill="#B9C9BC" />
      <rect x="84" y="74" width="22" height="3" rx="1.5" fill="#F4E5B9" />

      {/* Radiant Lightbulb of clarity above */}
      <path
        d="M70 24C63.3726 24 58 29.3726 58 36C58 40.125 60.1 43.75 63.3 45.8V49C63.3 49.6 63.7 50 64.3 50H75.7C76.3 50 76.7 49.6 76.7 49V45.8C79.9 43.75 82 40.125 82 36C82 29.3726 76.6274 24 70 24Z"
        fill="#F4E5B9"
        stroke="#E0CD91"
        strokeWidth="1.5"
      />
      <rect x="66" y="50" width="8" height="3" rx="1" fill="#7866A8" />
      {/* Lightbulb glow rays */}
      <path d="M70 17V20" stroke="#F4E5B9" strokeWidth="2" strokeLinecap="round" />
      <path d="M54 22L57 24" stroke="#F4E5B9" strokeWidth="2" strokeLinecap="round" />
      <path d="M86 22L83 24" stroke="#F4E5B9" strokeWidth="2" strokeLinecap="round" />

      {/* Speech bubble of simple dialogue below */}
      <path
        d="M44 88H80C85.5228 88 90 92.4772 90 98C90 103.523 85.5228 108 80 108H54L42 114V102C42 94.268 44 88 44 88Z"
        fill="#FFFFFF"
        stroke="#EAE4F5"
        strokeWidth="1.5"
      />
      <circle cx="56" cy="98" r="2.5" fill="#7866A8" />
      <circle cx="66" cy="98" r="2.5" fill="#B9C9BC" />
      <circle cx="76" cy="98" r="2.5" fill="#DABCCB" />
    </svg>
  )
}
