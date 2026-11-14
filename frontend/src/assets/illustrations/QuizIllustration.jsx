import React from 'react'

export default function QuizIllustration({ size = 110, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Quiz and Feedback illustration - achievement trophy, graduation cap, and mastery checkmark"
    >
      <defs>
        <linearGradient id="qzBg" x1="10" y1="10" x2="130" y2="130" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF8F4" />
          <stop offset="100%" stopColor="#F4E5B9" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="120" height="120" rx="24" fill="url(#qzBg)" />

      {/* Graduation Cap floating top-left */}
      <path d="M36 40L60 30L84 40L60 50L36 40Z" fill="#7866A8" />
      <path d="M46 45V58C46 64 60 67 60 67C60 67 74 64 74 58V45" fill="#5D4B8C" />
      <path d="M78 43V58C78 60 76 61 74 61" stroke="#F4E5B9" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="74" cy="62" r="2.5" fill="#F4E5B9" />

      {/* Golden Achievement Trophy */}
      {/* Trophy cup */}
      <path
        d="M60 60H80C86.6274 60 92 65.3726 92 72V76C92 84 86 90 78 92V98H86C87.1 98 88 98.9 88 100V104H52V100C52 98.9 52.9 98 54 98H62V92C54 90 48 84 48 76V72C48 65.3726 53.3726 60 60 60Z"
        fill="#F4E5B9"
        stroke="#E6D399"
        strokeWidth="1.5"
      />
      {/* Trophy handles */}
      <path d="M48 66H42C38 66 36 70 36 74C36 80 40 84 48 84" stroke="#E6D399" strokeWidth="2" strokeLinecap="round" />
      <path d="M92 66H98C102 66 104 70 104 74C104 80 100 84 92 84" stroke="#E6D399" strokeWidth="2" strokeLinecap="round" />

      {/* Central Star on Trophy in Royal Lavender */}
      <path d="M70 70L71.5 74.5L76 74.5L72.5 77.5L74 82L70 79L66 82L67.5 77.5L64 74.5L68.5 74.5L70 70Z" fill="#7866A8" />

      {/* Score checkmark badge top-right in Muted Sage */}
      <circle cx="106" cy="38" r="14" fill="#B9C9BC" />
      <path d="M100 38L104 42L112 34" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Sparkles of success */}
      <circle cx="28" cy="78" r="2.5" fill="#7866A8" />
      <circle cx="112" cy="74" r="3" fill="#DABCCB" />
      <circle cx="114" cy="98" r="2.5" fill="#F4E5B9" />
    </svg>
  )
}
