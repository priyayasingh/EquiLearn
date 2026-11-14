import React from 'react'

export default function DashboardHeroIllustration({ width = 320, height = 240, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 340 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Illustration of happy students exploring inclusive learning materials with books and gentle sunlight"
    >
      <defs>
        <linearGradient id="bgGlow" x1="170" y1="20" x2="170" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EAE4F5" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FAF8F4" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="deskGrad" x1="40" y1="180" x2="300" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EAE4F5" />
          <stop offset="100%" stopColor="#DCEAF5" />
        </linearGradient>
        <linearGradient id="bookCoverGrad" x1="130" y1="130" x2="210" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7866A8" />
          <stop offset="100%" stopColor="#5E4E8A" />
        </linearGradient>
        <linearGradient id="sunGrad" x1="260" y1="30" x2="300" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4E5B9" />
          <stop offset="100%" stopColor="#F9D776" />
        </linearGradient>
      </defs>

      {/* Gentle background circular glow */}
      <circle cx="170" cy="120" r="105" fill="url(#bgGlow)" />
      
      {/* Floating gentle clouds / orbits */}
      <path d="M40 70C55 55 85 55 100 70" stroke="#DABCCB" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 4" opacity="0.6" />
      <path d="M240 180C260 195 290 190 310 175" stroke="#7866A8" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 4" opacity="0.4" />

      {/* Warm rising sun / inspiration orb */}
      <circle cx="280" cy="50" r="24" fill="url(#sunGrad)" />
      <circle cx="280" cy="50" r="32" stroke="#F4E5B9" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

      {/* Left Student Character - Joyful Reader */}
      {/* Body / Sweater in Muted Sage */}
      <path d="M72 195C72 165 92 145 118 145C144 145 164 165 164 195V210H72V195Z" fill="#B9C9BC" />
      {/* Head */}
      <circle cx="118" cy="120" r="22" fill="#FAF8F4" stroke="#7866A8" strokeWidth="2" />
      {/* Hair in Charcoal */}
      <path d="M96 118C96 100 110 94 125 94C140 94 142 108 142 118C136 108 126 105 118 105C110 105 102 110 96 118Z" fill="#353342" />
      {/* Joyful Eyes & Smile */}
      <path d="M109 119C111 122 115 122 117 119" stroke="#353342" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M125 119C127 122 131 122 133 119" stroke="#353342" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M117 128C121 132 127 132 131 128" stroke="#7866A8" strokeWidth="1.75" strokeLinecap="round" />
      {/* Cheeks in Dusty Rose */}
      <circle cx="106" cy="124" r="3.5" fill="#DABCCB" opacity="0.8" />
      <circle cx="138" cy="124" r="3.5" fill="#DABCCB" opacity="0.8" />

      {/* Right Student Character - Curious Explorer */}
      {/* Body / Sweater in Dusty Rose */}
      <path d="M180 195C180 168 198 150 222 150C246 150 264 168 264 195V210H180V195Z" fill="#DABCCB" />
      {/* Head */}
      <circle cx="222" cy="124" r="21" fill="#FAF8F4" stroke="#7866A8" strokeWidth="2" />
      {/* Curly Hair in Charcoal */}
      <path d="M203 124C201 106 215 98 226 98C238 98 245 106 244 120C240 110 232 106 224 106C216 106 208 112 203 124Z" fill="#353342" />
      <circle cx="206" cy="108" r="7" fill="#353342" />
      <circle cx="238" cy="108" r="7" fill="#353342" />
      {/* Smile & Glasses */}
      <circle cx="216" cy="124" r="5" stroke="#7866A8" strokeWidth="1.5" fill="none" />
      <circle cx="230" cy="124" r="5" stroke="#7866A8" strokeWidth="1.5" fill="none" />
      <path d="M221 124H225" stroke="#7866A8" strokeWidth="1.5" />
      <path d="M220 133C223 135 227 135 230 133" stroke="#7866A8" strokeWidth="1.5" strokeLinecap="round" />

      {/* The Central Glowing Open Book */}
      <ellipse cx="170" cy="188" rx="80" ry="24" fill="#FAF8F4" stroke="#EAE4F5" strokeWidth="2" />
      {/* Open pages */}
      <path d="M170 178C140 170 115 174 95 186V198C115 186 140 182 170 190V178Z" fill="#FFFFFF" stroke="#EAE4F5" strokeWidth="1" />
      <path d="M170 178C200 170 225 174 245 186V198C225 186 200 182 170 190V178Z" fill="#FFFFFF" stroke="#EAE4F5" strokeWidth="1" />
      <path d="M170 178V190" stroke="#7866A8" strokeWidth="2" strokeLinecap="round" />

      {/* Floating Sparkles & Knowledge Stars */}
      <path d="M170 100L172 108L180 110L172 112L170 120L168 112L160 110L168 108L170 100Z" fill="#7866A8" />
      <path d="M142 80L143.5 85L148 86.5L143.5 88L142 93L140.5 88L136 86.5L140.5 85L142 80Z" fill="#F4E5B9" />
      <path d="M198 84L199.5 89L204 90.5L199.5 92L198 97L196.5 92L192 90.5L196.5 89L198 84Z" fill="#B9C9BC" />

      {/* Heart of inclusion */}
      <path d="M170 148C167 142 160 142 157 146C153 151 158 157 170 164C182 157 187 151 183 146C180 142 173 142 170 148Z" fill="#DABCCB" opacity="0.9" />
    </svg>
  )
}
