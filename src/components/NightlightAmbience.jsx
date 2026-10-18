import React, { useState } from 'react';
import { NIGHTLIGHT_AURAS } from '../data/nightlightAuras';

export default function NightlightAmbience({
  selectedIndex,
  onSelectAura,
  auras = NIGHTLIGHT_AURAS,
}) {
  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = typeof selectedIndex === 'number' && typeof onSelectAura === 'function';
  const activeIndex = isControlled ? selectedIndex : internalIndex;
  const current = auras[activeIndex] || auras[0];

  const handleSelect = (idx) => {
    if (isControlled) {
      onSelectAura(idx);
    } else {
      setInternalIndex(idx);
    }
  };

  const cycleWarmth = () => {
    const nextIdx = (activeIndex + 1) % auras.length;
    handleSelect(nextIdx);
  };

  return (
    <div className="nightlight-interactive-widget" role="region" aria-label="Nightlight Luminescence Calibration">
      <div className="nightlight-widget-header">
        <div className="nightlight-aura-indicator">
          <span
            className={`aura-pulse-dot pulse-${current.id}`}
            style={{ backgroundColor: current.pulseColor, boxShadow: `0 0 8px ${current.pulseColor}` }}
            aria-hidden="true"
          />
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
        {auras.map((lvl, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={lvl.name}
              type="button"
              className={`glow-pill-btn pill-${lvl.id} ${isSelected ? 'active' : ''}`}
              onClick={() => handleSelect(idx)}
              aria-pressed={isSelected}
              aria-label={`${lvl.name} ${lvl.temp}`}
            >
              <span
                className="pill-dot"
                style={isSelected ? { backgroundColor: lvl.pulseColor, boxShadow: `0 0 6px ${lvl.pulseColor}` } : {}}
                aria-hidden="true"
              />
              <span className="pill-text">{lvl.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
