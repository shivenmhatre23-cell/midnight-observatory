import React, { useState } from 'react';

const STARS = [
  { id: 0, order: 1, name: 'Observatory Peak', x: 60, y: 70, role: 'Base Station' },
  { id: 1, order: 2, name: 'North Moonbeam', x: 200, y: 55, role: 'High Navigation Lantern' },
  { id: 2, order: 3, name: 'Badger Hollow', x: 330, y: 120, role: 'Nocturnal Waypoint' },
  { id: 3, order: 4, name: 'Owl Perch', x: 250, y: 220, role: 'Breeze Guidance Node' },
  { id: 4, order: 5, name: 'Cradle of Dreams', x: 100, y: 200, role: 'Safe Slumber Haven' },
];

export default function ConstellationTelescope() {
  const [selectedStars, setSelectedStars] = useState([]);
  const [feedback, setFeedback] = useState({
    text: 'Click or press Enter on Star 1 (Observatory Peak) to begin charting tonight’s route.',
    type: 'info',
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const nextExpectedOrder = selectedStars.length + 1;

  const handleStarSelect = (star) => {
    if (isCompleted) {
      setFeedback({
        text: 'The Slumber Skiff constellation is complete! Click Reset to re-align.',
        type: 'info',
      });
      return;
    }

    // Already selected
    if (selectedStars.includes(star.id)) {
      const nextStar = STARS.find((s) => s.order === nextExpectedOrder);
      setFeedback({
        text: `"${star.name}" is already linked! Find Star ${nextExpectedOrder} (${nextStar ? nextStar.name : ''}) next.`,
        type: 'warning',
      });
      return;
    }

    // Correct next star
    if (star.order === nextExpectedOrder) {
      const newSelection = [...selectedStars, star.id];
      setSelectedStars(newSelection);

      if (newSelection.length === STARS.length) {
        setIsCompleted(true);
        setFeedback({
          text: '✦ Constellation fully awakened! All 5 skyway stars linked.',
          type: 'success',
        });
      } else {
        const nextStar = STARS.find((s) => s.order === newSelection.length + 1);
        setFeedback({
          text: `✦ Connected to ${star.name}! Next target: Star ${nextStar.order} (${nextStar.name}).`,
          type: 'success',
        });
      }
    } else {
      // Out of order
      const nextStar = STARS.find((s) => s.order === nextExpectedOrder);
      setFeedback({
        text: `Not quite yet! Pip’s skiff needs Star ${nextExpectedOrder} (${nextStar ? nextStar.name : 'Start'}) next so the route does not drift.`,
        type: 'warning',
      });
    }
  };

  const handleKeyDown = (e, star) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStarSelect(star);
    }
  };

  const handleReset = () => {
    setSelectedStars([]);
    setIsCompleted(false);
    setFeedback({
      text: 'Telescope re-aligned! Select Star 1 (Observatory Peak) to chart the route anew.',
      type: 'info',
    });
  };

  // Build connecting lines path between selected stars
  const lines = [];
  for (let i = 0; i < selectedStars.length - 1; i++) {
    const fromStar = STARS.find((s) => s.id === selectedStars[i]);
    const toStar = STARS.find((s) => s.id === selectedStars[i + 1]);
    if (fromStar && toStar) {
      lines.push({
        x1: fromStar.x,
        y1: fromStar.y,
        x2: toStar.x,
        y2: toStar.y,
        id: `line-${fromStar.id}-${toStar.id}`,
      });
    }
  }

  // If completed, add loop line closing the constellation
  if (isCompleted && selectedStars.length === STARS.length) {
    const lastStar = STARS.find((s) => s.id === selectedStars[selectedStars.length - 1]);
    const firstStar = STARS.find((s) => s.id === selectedStars[0]);
    if (lastStar && firstStar) {
      lines.push({
        x1: lastStar.x,
        y1: lastStar.y,
        x2: firstStar.x,
        y2: firstStar.y,
        id: 'line-closing-loop',
        isLoop: true,
      });
    }
  }

  return (
    <div className="constellation-telescope-card" role="region" aria-label="Interactive Constellation Telescope">
      {/* Telescope Header */}
      <div className="telescope-header">
        <div className="telescope-title-wrap">
          <span className="telescope-icon" aria-hidden="true">🔭</span>
          <h4 className="telescope-title">Celestial Telescope</h4>
        </div>
        <div className="telescope-status-pill">
          <span className="status-dot-sparkle" aria-hidden="true">
            {isCompleted ? '★' : '✦'}
          </span>
          <span className="status-text">
            {isCompleted ? 'Constellation Complete' : `Progress: ${selectedStars.length} of ${STARS.length}`}
          </span>
        </div>
      </div>

      <p className="telescope-instructions">
        Chart Pip’s nocturnal delivery skiff by connecting stars in order: <strong>1 → 2 → 3 → 4 → 5</strong>.
      </p>

      {/* Interactive SVG Canvas */}
      <div className="telescope-canvas-wrapper">
        <svg
          viewBox="0 0 400 280"
          className={`telescope-svg ${isCompleted ? 'completed' : ''}`}
          role="img"
          aria-label="Celestial star chart with interactive star nodes"
        >
          <defs>
            <radialGradient id="skyGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2e3454" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#151726" stopOpacity="1" />
            </radialGradient>

            <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Night Sky Background */}
          <rect width="400" height="280" rx="16" fill="url(#skyGradient)" />

          {/* Ambient Background Starfield */}
          <g className="ambient-stars" aria-hidden="true">
            <circle cx="35" cy="40" r="1.5" fill="#f3c96b" opacity="0.4" />
            <circle cx="95" cy="130" r="1.2" fill="#fff8f1" opacity="0.3" />
            <circle cx="370" cy="50" r="1.6" fill="#fff8f1" opacity="0.4" />
            <circle cx="380" cy="240" r="1" fill="#f4d6d7" opacity="0.4" />
            <circle cx="160" cy="25" r="1.5" fill="#f3c96b" opacity="0.4" />
            <circle cx="280" cy="170" r="1.2" fill="#f3c96b" opacity="0.3" />
            <circle cx="30" cy="240" r="1.4" fill="#fff8f1" opacity="0.3" />
          </g>

          {/* Connected Route Lines */}
          <g className="connected-lines" filter="url(#lineGlow)">
            {lines.map((line) => (
              <line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.isLoop ? '#f4d6d7' : '#f3c96b'}
                strokeWidth={isCompleted ? '3' : '2.5'}
                strokeDasharray={line.isLoop ? '4,4' : 'none'}
                className="animated-route-line"
              />
            ))}
          </g>

          {/* Interactive Star Nodes */}
          {STARS.map((star) => {
            const isSelected = selectedStars.includes(star.id);
            const isNext = star.order === nextExpectedOrder && !isCompleted;

            return (
              <g
                key={star.id}
                role="button"
                tabIndex={0}
                aria-label={`Star ${star.order}: ${star.name}. ${isSelected ? 'Connected' : isNext ? 'Next target' : 'Pending'}`}
                aria-pressed={isSelected}
                className={`star-node-group ${isSelected ? 'selected' : ''} ${isNext ? 'pulse-next' : ''}`}
                transform={`translate(${star.x}, ${star.y})`}
                onClick={() => handleStarSelect(star)}
                onKeyDown={(e) => handleKeyDown(e, star)}
              >
                {/* Generous invisible hit target circle (44x44px accessible touch area) */}
                <circle r="22" fill="transparent" className="star-hit-area" />

                {/* Visible Focus Indicator Ring */}
                <circle r="16" className="star-focus-ring" />

                {/* Pulsing Next Target Aura */}
                {isNext && (
                  <circle
                    r="12"
                    fill="none"
                    stroke="#f3c96b"
                    strokeWidth="1.5"
                    className="star-pulse-ring"
                  />
                )}

                {/* Completed Star Outer Aura */}
                {isSelected && (
                  <circle
                    r="9"
                    fill="rgba(243, 201, 107, 0.35)"
                    filter="url(#starGlow)"
                  />
                )}

                {/* Core Star Body */}
                <circle
                  r={isSelected ? '6.5' : isNext ? '5.5' : '4.5'}
                  fill={isSelected ? '#fff8f1' : isNext ? '#f3c96b' : '#c7bebe'}
                  stroke={isSelected ? '#f3c96b' : isNext ? '#fff8f1' : '#5c4033'}
                  strokeWidth="2"
                  className="star-core"
                />

                {/* Star Order Number Badge */}
                <text
                  y={star.y > 180 ? -12 : 20}
                  textAnchor="middle"
                  className={`star-label ${isSelected ? 'active-label' : ''}`}
                >
                  {star.order}. {star.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Completed Constellation Pip Letter Overlay */}
        {isCompleted && (
          <div className="constellation-completed-banner" role="status">
            <span className="banner-sparkle" aria-hidden="true">🌟</span>
            <div className="banner-body">
              <strong>Pip&apos;s Slumber Skiff is charted!</strong>
              <p>
                &ldquo;Oh, look! The night wind corridor is safe and calm. All 18 dream
                deliveries have a glowing skyway to glide across tonight. Thank you for charting with me!&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Live Status and Controls */}
      <div className="telescope-footer">
        <div
          className={`telescope-feedback-box feedback-${feedback.type}`}
          role="status"
          aria-live="polite"
        >
          <span className="feedback-icon" aria-hidden="true">
            {feedback.type === 'success' ? '✦' : feedback.type === 'warning' ? '☁️' : '✧'}
          </span>
          <span className="feedback-message">{feedback.text}</span>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="btn-reset-telescope"
          aria-label="Reset telescope constellation"
        >
          <span aria-hidden="true">↺</span> Reset Skyway
        </button>
      </div>
    </div>
  );
}
