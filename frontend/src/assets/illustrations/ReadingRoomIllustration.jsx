import React from 'react'

export default function ReadingRoomIllustration({ size = 120, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Reading Room illustration - comfortable digital library with open books and soft glow"
    >
      <defs>
        <linearGradient id="rrBgGrad" x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EAE4F5" />
          <stop offset="100%" stopColor="#DCEAF5" />
        </linearGradient>
        <linearGradient id="rrBookGrad" x1="40" y1="80" x2="120" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7866A8" />
          <stop offset="100%" stopColor="#5D4B8C" />
        </linearGradient>
      </defs>

      {/* Rounded pastel background container */}
      <rect x="12" y="12" width="136" height="136" rx="28" fill="url(#rrBgGrad)" />

      {/* Subtle library window arc */}
      <path d="M48 68C48 50 62 36 80 36C98 36 112 50 112 68V80H48V68Z" fill="#FAF8F4" opacity="0.7" />
      <path d="M80 36V80" stroke="#EAE4F5" strokeWidth="1.5" />
      <path d="M48 58H112" stroke="#EAE4F5" strokeWidth="1.5" />

      {/* Reading Desk surface */}
      <rect x="28" y="112" width="104" height="6" rx="3" fill="#DABCCB" />

      {/* Stack of books on the right */}
      <rect x="100" y="98" width="26" height="6" rx="2" fill="#B9C9BC" />
      <rect x="98" y="104" width="28" height="6" rx="2" fill="#F4E5B9" />

      {/* Central Large Open Book */}
      {/* Book cover shadow */}
      <path d="M42 108C58 100 70 102 80 108C90 102 102 100 118 108L116 112C100 104 90 106 80 112C70 106 60 104 44 112L42 108Z" fill="#353342" opacity="0.15" />
      
      {/* Book pages */}
      <path d="M80 82C64 74 50 76 38 86V108C50 98 64 96 80 104V82Z" fill="#FFFFFF" stroke="#EAE4F5" strokeWidth="1.5" />
      <path d="M80 82C96 74 110 76 122 86V108C110 98 96 96 80 104V82Z" fill="#FFFFFF" stroke="#EAE4F5" strokeWidth="1.5" />
      <path d="M80 82V104" stroke="#7866A8" strokeWidth="2" strokeLinecap="round" />

      {/* Ribbon bookmark in Dusty Rose */}
      <path d="M78 82C78 74 86 70 86 64" stroke="#DABCCB" strokeWidth="2.5" strokeLinecap="round" />

      {/* Reading Lamp with soft light beam */}
      <path d="M38 112V64C38 56 46 50 56 50" stroke="#7866A8" strokeWidth="2.5" strokeLinecap="round" />
      {/* Lampshade */}
      <path d="M52 48L64 42L68 56L56 60L52 48Z" fill="#F4E5B9" />
      {/* Warm lamp glow ray */}
      <path d="M62 56L96 88L76 96L58 60Z" fill="#F4E5B9" fillOpacity="0.25" />

      {/* Floating gentle sparkles */}
      <circle cx="80" cy="54" r="2.5" fill="#7866A8" />
      <circle cx="118" cy="48" r="3" fill="#B9C9BC" />
      <circle cx="36" cy="78" r="2" fill="#DABCCB" />
    </svg>
  )
}
