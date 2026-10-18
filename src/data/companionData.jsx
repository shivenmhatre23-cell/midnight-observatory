import React from 'react';

export const COMPANIONS = [
  {
    id: 'cloud-kitten',
    name: 'Cloud Kitten',
    alias: 'Kiki the Eaves Prowler',
    title: 'Slumbering Eaves Guardian',
    milestoneKey: 'milestoneB',
    unlockCondition: 'Dispatch a dream to any nocturnal destination on the Flight Map',
    personality: 'Sleepy, curious, and endlessly gentle.',
    lore: 'Curled up atop warm silver chimneys, this fluffy kitten chases drifting stardust sparks and purrs a soothing lullaby across the sleeping rooftops.',
    accentColor: '#9ec5fe',
    badgeSymbol: '🐱',
    svgArt: (isLocked) => (
      <svg viewBox="0 0 160 160" className={`companion-svg ${isLocked ? 'locked' : ''}`} aria-hidden="true">
        <defs>
          <radialGradient id="cloudKittenGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8f1" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#9ec5fe" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#9ec5fe" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cloudBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#dbeafe" />
          </linearGradient>
        </defs>

        {/* Ambient Halo */}
        <circle cx="80" cy="80" r="68" fill="url(#cloudKittenGlow)" />

        {/* Cloud Cushion Base */}
        <path
          d="M 40 115 C 30 115, 20 105, 25 95 C 22 80, 38 72, 48 76 C 55 60, 80 58, 92 70 C 105 60, 130 68, 132 85 C 142 90, 142 108, 132 115 Z"
          fill="url(#cloudBodyGrad)"
          stroke="#93c5fd"
          strokeWidth="2.5"
        />

        {/* Sleeping Kitten Body */}
        <ellipse cx="80" cy="88" rx="32" ry="24" fill="#fdfbf7" stroke="#7dd3fc" strokeWidth="2" />
        
        {/* Sleeping Kitten Head */}
        <circle cx="62" cy="76" r="18" fill="#ffffff" stroke="#7dd3fc" strokeWidth="2" />

        {/* Kitten Ears */}
        <polygon points="50,65 54,48 64,60" fill="#fbcfe8" stroke="#7dd3fc" strokeWidth="1.5" />
        <polygon points="66,60 74,48 78,65" fill="#fbcfe8" stroke="#7dd3fc" strokeWidth="1.5" />

        {/* Sleeping Eyes (Closed Arcs) */}
        <path d="M 54 77 Q 58 82 62 77" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
        <path d="M 66 77 Q 70 82 74 77" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />

        {/* Kitten Nose & Mouth */}
        <polygon points="64,80 62,83 66,83" fill="#f472b6" />
        <path d="M 64 83 Q 61 86 59 84 M 64 83 Q 67 86 69 84" fill="none" stroke="#64748b" strokeWidth="1.5" />

        {/* Kitten Whiskers */}
        <line x1="48" y1="78" x2="40" y2="76" stroke="#94a3b8" strokeWidth="1" />
        <line x1="48" y1="81" x2="40" y2="82" stroke="#94a3b8" strokeWidth="1" />
        <line x1="78" y1="78" x2="86" y2="76" stroke="#94a3b8" strokeWidth="1" />
        <line x1="78" y1="81" x2="86" y2="82" stroke="#94a3b8" strokeWidth="1" />

        {/* Curling Fluffy Tail */}
        <path
          d="M 108 92 C 122 92, 128 80, 120 74 C 114 70, 108 76, 112 82"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Moonlit Forehead Crescent */}
        <path d="M 63 64 A 4 4 0 0 0 65 70 A 5 5 0 0 1 63 64" fill="#f3c96b" />

        {/* Floating Stardust Sparkles */}
        <text x="32" y="52" fill="#f3c96b" fontSize="13">✦</text>
        <text x="126" y="60" fill="#f4d6d7" fontSize="11">✧</text>
        <text x="110" y="125" fill="#f3c96b" fontSize="12">⋆</text>
      </svg>
    ),
  },
  {
    id: 'golden-badger',
    name: 'Barnaby the Golden Badger',
    alias: 'Old Barnaby of the Burrow',
    title: 'Keeper of the Cedar Hearth',
    milestoneKey: 'milestoneA_100',
    unlockCondition: 'Score 100+ points in Catch the Falling Dreams',
    personality: 'Proud, kind, and a little adventurous.',
    lore: 'Burrowed beneath the ancient cedar roots of Badger Hollow, Barnaby guards young woodland kits against midnight chills with his trusty Honey Amber ember-lantern.',
    accentColor: '#f3c96b',
    badgeSymbol: '🦡',
    svgArt: (isLocked) => (
      <svg viewBox="0 0 160 160" className={`companion-svg ${isLocked ? 'locked' : ''}`} aria-hidden="true">
        <defs>
          <radialGradient id="badgerEmberGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f3c96b" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#ff8a60" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ff8a60" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Hearth Ambient Glow */}
        <circle cx="80" cy="80" r="68" fill="url(#badgerEmberGlow)" />

        {/* Cedar Root Mound */}
        <ellipse cx="80" cy="125" rx="55" ry="16" fill="#452a1e" stroke="#f3c96b" strokeWidth="2" />

        {/* Stout Badger Body */}
        <ellipse cx="74" cy="88" rx="34" ry="28" fill="#d97706" stroke="#92400e" strokeWidth="2.5" />

        {/* Badger Head */}
        <ellipse cx="62" cy="65" rx="22" ry="18" fill="#ffffff" stroke="#92400e" strokeWidth="2" />

        {/* Signature Badger Stripes */}
        <path d="M 46 54 Q 62 60 48 76" fill="#b45309" />
        <path d="M 72 54 Q 60 62 70 76" fill="#b45309" />

        {/* Badger Snout */}
        <ellipse cx="58" cy="74" rx="8" ry="6" fill="#ffffff" stroke="#92400e" strokeWidth="1.5" />
        <circle cx="58" cy="72" r="3" fill="#1e293b" />

        {/* Kind Eyes */}
        <circle cx="52" cy="62" r="3" fill="#1e293b" />
        <circle cx="68" cy="62" r="3" fill="#1e293b" />
        <circle cx="53" cy="61" r="1" fill="#ffffff" />
        <circle cx="69" cy="61" r="1" fill="#ffffff" />

        {/* Little Rounded Ears */}
        <circle cx="44" cy="50" r="6" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />
        <circle cx="78" cy="50" r="6" fill="#fef3c7" stroke="#92400e" strokeWidth="1.5" />

        {/* Cozy Starry Nightcap */}
        <path d="M 50 48 Q 62 36 76 48 Z" fill="#a34063" stroke="#f3c96b" strokeWidth="1.5" />
        <circle cx="78" cy="46" r="4" fill="#f3c96b" />

        {/* Glowing Ember Lantern on Brass Chain */}
        <line x1="108" y1="65" x2="108" y2="82" stroke="#f3c96b" strokeWidth="2" />
        <path d="M 100 82 L 116 82 L 112 104 L 104 104 Z" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
        <circle cx="108" cy="92" r="8" fill="#f3c96b" opacity="0.8" />
        <text x="108" y="96" fill="#b45309" fontSize="10" textAnchor="middle">✦</text>

        {/* Floating Sparks */}
        <text x="24" y="60" fill="#f3c96b" fontSize="12">✨</text>
        <text x="125" y="115" fill="#f3c96b" fontSize="11">✦</text>
      </svg>
    ),
  },
  {
    id: 'celestial-moth',
    name: 'The Celestial Moth',
    alias: 'Aura the Star-Moth',
    title: 'Watcher of Secret Constellations',
    milestoneKey: 'milestoneC',
    unlockCondition: 'Solve the 4-star secret puzzle in Pip’s hidden observatory loft',
    personality: 'Mysterious, friendly, and quiet.',
    lore: 'Awakened only when the four stars of Pip’s secret sky-pet are aligned, this mystical moth leaves a glowing trail of chamomile dreams wherever its velvety wings flutter.',
    accentColor: '#d8b4fe',
    badgeSymbol: '🦋',
    svgArt: (isLocked) => (
      <svg viewBox="0 0 160 160" className={`companion-svg ${isLocked ? 'locked' : ''}`} aria-hidden="true">
        <defs>
          <radialGradient id="mothVioletGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f3c96b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#c084fc" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="mothWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="50%" stopColor="#6b21a8" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Ambient Starlight Nebula */}
        <circle cx="80" cy="80" r="68" fill="url(#mothVioletGlow)" />

        {/* Left Upper Wing with Constellations */}
        <path
          d="M 80 82 C 60 40, 20 40, 24 75 C 26 95, 55 98, 80 84 Z"
          fill="url(#mothWingGrad)"
          stroke="#f3c96b"
          strokeWidth="2"
        />
        {/* Left Wing Star Marks */}
        <circle cx="42" cy="62" r="2.5" fill="#fef08a" />
        <circle cx="58" cy="68" r="2" fill="#fef08a" />
        <line x1="42" y1="62" x2="58" y2="68" stroke="#fef08a" strokeWidth="1" strokeDasharray="2,2" />

        {/* Right Upper Wing with Constellations */}
        <path
          d="M 80 82 C 100 40, 140 40, 136 75 C 134 95, 105 98, 80 84 Z"
          fill="url(#mothWingGrad)"
          stroke="#f3c96b"
          strokeWidth="2"
        />
        {/* Right Wing Star Marks */}
        <circle cx="118" cy="62" r="2.5" fill="#fef08a" />
        <circle cx="102" cy="68" r="2" fill="#fef08a" />
        <line x1="118" y1="62" x2="102" y2="68" stroke="#fef08a" strokeWidth="1" strokeDasharray="2,2" />

        {/* Left Lower Wing */}
        <path
          d="M 80 84 C 65 95, 42 108, 48 122 C 55 130, 75 110, 80 92 Z"
          fill="url(#mothWingGrad)"
          stroke="#f3c96b"
          strokeWidth="1.5"
        />

        {/* Right Lower Wing */}
        <path
          d="M 80 84 C 95 95, 118 108, 112 122 C 105 130, 85 110, 80 92 Z"
          fill="url(#mothWingGrad)"
          stroke="#f3c96b"
          strokeWidth="1.5"
        />

        {/* Fluffy Moth Body */}
        <ellipse cx="80" cy="85" rx="7" ry="18" fill="#fef3c7" stroke="#7e22ce" strokeWidth="2" />

        {/* Moth Head & Eyes */}
        <circle cx="80" cy="66" r="6" fill="#fef3c7" stroke="#7e22ce" strokeWidth="1.5" />
        <circle cx="77" cy="65" r="1.8" fill="#1e1b4b" />
        <circle cx="83" cy="65" r="1.8" fill="#1e1b4b" />

        {/* Feathery Antennae */}
        <path d="M 78 61 C 70 50, 60 48, 54 52" fill="none" stroke="#f3c96b" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 82 61 C 90 50, 100 48, 106 52" fill="none" stroke="#f3c96b" strokeWidth="1.8" strokeLinecap="round" />

        {/* Glowing Center Star */}
        <text x="80" y="89" fill="#f3c96b" fontSize="9" textAnchor="middle">✨</text>

        {/* Star Sparkles */}
        <text x="24" y="115" fill="#c084fc" fontSize="13">✧</text>
        <text x="128" y="110" fill="#f3c96b" fontSize="12">✦</text>
      </svg>
    ),
  },
];
