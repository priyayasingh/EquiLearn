import React from 'react'

export default function DyslexiaIllustration({ size = 110, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Dyslexia-Friendly Mode illustration - weighted legible letterforms and reading ruler guide"
    >
      <defs>
        <linearGradient id="dysBg" x1="10" y1="10" x2="130" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF8F4" />
          <stop offset="100%" stopColor="#EAE4F5" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="120" height="120" rx="24" fill="url(#dysBg)" />

      {/* Sheet of readable paper with warm tint */}
      <rect x="26" y="24" width="88" height="92" rx="12" fill="#FFFFFF" stroke="#EAE4F5" strokeWidth="2" />

      {/* Reading Ruler Guide Bar in Pastel Yellow */}
      <rect x="22" y="60" width="96" height="24" rx="6" fill="#F4E5B9" fillOpacity="0.65" stroke="#E6D399" strokeWidth="1" />
      <circle cx="26" cy="72" r="2" fill="#7866A8" />
      <circle cx="114" cy="72" r="2" fill="#7866A8" />

      {/* Large weighted 'A a' characters on the ruler */}
      <text x="44" y="78" fill="#353342" fontSize="18" fontWeight="800" fontFamily="system-ui, sans-serif">A</text>
      <text x="60" y="78" fill="#7866A8" fontSize="18" fontWeight="800" fontFamily="system-ui, sans-serif">a</text>
      <text x="76" y="78" fill="#353342" fontSize="18" fontWeight="800" fontFamily="system-ui, sans-serif">b</text>

      {/* Surrounding text lines with generous line spacing */}
      <rect x="36" y="38" width="46" height="4" rx="2" fill="#7866A8" />
      <rect x="36" y="47" width="64" height="3" rx="1.5" fill="#B9C9BC" />

      <rect x="36" y="94" width="58" height="3.5" rx="1.75" fill="#B9C9BC" />
      <rect x="36" y="102" width="42" height="3.5" rx="1.75" fill="#DABCCB" />

      {/* Stability anchor checkmark */}
      <circle cx="106" cy="36" r="10" fill="#B9C9BC" />
      <path d="M102 36L105 39L111 33" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
