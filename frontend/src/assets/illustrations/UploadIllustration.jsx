import React from 'react'

export default function UploadIllustration({ size = 120, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Document Upload illustration - PDF, DOCX, and TXT files smoothly transferring"
    >
      <defs>
        <linearGradient id="upBgGrad" x1="15" y1="15" x2="145" y2="145" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF8F4" />
          <stop offset="100%" stopColor="#EAE4F5" />
        </linearGradient>
        <linearGradient id="pdfGrad" x1="28" y1="52" x2="68" y2="108" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DABCCB" />
          <stop offset="100%" stopColor="#C99BAF" />
        </linearGradient>
        <linearGradient id="docxGrad" x1="88" y1="36" x2="132" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DCEAF5" />
          <stop offset="100%" stopColor="#B4D2EA" />
        </linearGradient>
        <linearGradient id="txtGrad" x1="56" y1="28" x2="104" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#EAE4F5" />
        </linearGradient>
      </defs>

      {/* Rounded soft container */}
      <rect x="12" y="12" width="136" height="136" rx="28" fill="url(#upBgGrad)" />

      {/* Upload Cloud Base */}
      <path
        d="M50 114C43.3726 114 38 108.627 38 102C38 96.0825 42.2743 91.166 48.006 90.1706C49.2562 78.8525 58.8557 70 70.5 70C79.8732 70 87.8927 75.7369 91.1718 83.8569C93.0033 82.6841 95.1741 82 97.5 82C104.404 82 110 87.5964 110 94.5C110 95.2346 109.936 95.9542 109.814 96.6534C115.521 97.7716 119.8 102.73 119.8 108.7C119.8 115.438 114.338 120.9 107.6 120.9H50V114Z"
        fill="#FFFFFF"
        opacity="0.9"
      />

      {/* Left document: PDF card in Dusty Rose */}
      <g transform="rotate(-12 48 78)">
        <rect x="30" y="52" width="36" height="48" rx="6" fill="url(#pdfGrad)" stroke="#FFFFFF" strokeWidth="2" />
        <rect x="36" y="60" width="16" height="4" rx="2" fill="#FFFFFF" />
        <rect x="36" y="68" width="24" height="3" rx="1.5" fill="#FFFFFF" opacity="0.8" />
        <rect x="36" y="74" width="20" height="3" rx="1.5" fill="#FFFFFF" opacity="0.8" />
        <rect x="36" y="86" width="16" height="8" rx="3" fill="#7866A8" />
        <text x="44" y="92.5" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PDF</text>
      </g>

      {/* Right document: DOCX card in Soft Sky Blue */}
      <g transform="rotate(10 110 74)">
        <rect x="92" y="48" width="36" height="48" rx="6" fill="url(#docxGrad)" stroke="#FFFFFF" strokeWidth="2" />
        <rect x="98" y="56" width="18" height="4" rx="2" fill="#7866A8" />
        <rect x="98" y="64" width="24" height="3" rx="1.5" fill="#7866A8" opacity="0.7" />
        <rect x="98" y="70" width="18" height="3" rx="1.5" fill="#7866A8" opacity="0.7" />
        <rect x="98" y="82" width="18" height="8" rx="3" fill="#7866A8" />
        <text x="107" y="88.5" fill="#FFFFFF" fontSize="5.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">DOC</text>
      </g>

      {/* Central prominent document: TXT card in Pure White & Royal Lavender */}
      <rect x="62" y="38" width="40" height="52" rx="7" fill="url(#txtGrad)" stroke="#7866A8" strokeWidth="2" />
      <path d="M88 38V50H102" fill="#FAF8F4" stroke="#7866A8" strokeWidth="1.5" />
      <rect x="70" y="56" width="18" height="3.5" rx="1.75" fill="#7866A8" />
      <rect x="70" y="63" width="24" height="2.5" rx="1.25" fill="#B9C9BC" />
      <rect x="70" y="68" width="20" height="2.5" rx="1.25" fill="#B9C9BC" />
      <rect x="70" y="73" width="22" height="2.5" rx="1.25" fill="#B9C9BC" />

      {/* Upward Transfer Arrow in Royal Lavender */}
      <circle cx="82" cy="118" r="16" fill="#7866A8" />
      <path d="M82 126V110" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M76 115L82 109L88 115" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Sparkles of readiness */}
      <circle cx="124" cy="38" r="3" fill="#F4E5B9" />
      <circle cx="34" cy="40" r="2.5" fill="#B9C9BC" />
    </svg>
  )
}
