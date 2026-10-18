import React, { useState } from 'react';

export default function NightlightAmbience() {
  const [warmthLevel, setWarmthLevel] = useState(0);

  const levels = [
    { name: 'Honey Amber', temp: '2200K', desc: 'Bedside Safe Soft Glow', icon: '🌙' },
    { name: 'Golden Moonbeam', temp: '2400K', desc: 'Calming Slumber Aura', icon: '⭐' },
    { name: 'Velvet Ember', temp: '1900K', desc: 'Deep Shadow-Dispelling Charm', icon: '🕯️' },
  ];

  const current = levels[warmthLevel];

  const cycleWarmth = () => {
    setWarmthLevel((prev) => (prev + 1) % levels.length);
  };

  return (
    <div className="nightlight-interactive-widget" role="region" aria-label="Nightlight Luminescence Calibration">
      <div className="nightlight-widget-header">
        <div className="nightlight-aura-indicator">
          <span className="aura-pulse-dot" aria-hidden="true" />
          <span className="aura-mode-label">
            Bedside Aura: <strong>{current.name}</strong>
          </span>
        </div>
        <button
          type="button"
          onClick={cycleWarmth}
          className="btn-cycle-warmth"
          aria-label={`Current warmth ${current.name} (${current.temp}). Click to switch to next bedside aura`}
        >
          <span aria-hidden="true">{current.icon}</span>
          <span>{current.temp}</span>
        </button>
      </div>

      <div className="nightlight-glow-bar" role="group" aria-label="Bedside aura modes">
        {levels.map((lvl, idx) => (
          <button
            key={lvl.name}
            type="button"
            className={`glow-pill-btn ${idx === warmthLevel ? 'active' : ''}`}
            onClick={() => setWarmthLevel(idx)}
            aria-pressed={idx === warmthLevel}
            aria-label={`${lvl.name} ${lvl.temp}`}
          >
            <span className="pill-dot" aria-hidden="true" />
            <span className="pill-text">{lvl.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
