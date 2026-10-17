import React, { useState, useRef } from 'react';

const STARS = [
  {
    id: 0,
    order: 1,
    name: 'Observatory Peak',
    x: 60,
    y: 70,
    role: 'Base Station',
    icon: '🔭',
    altitude: '40,000 ft · Cloud 9 Summit',
    story:
      'High above the clouds in the clock tower dome, Pip loads the wooden skiff with spun stardust vials and freshly steamed chamomile tea. The brass astrolabe points true north, waiting for the first night breeze to lift the sails.',
    waypointNote: 'Departure launchpad for all 18 bedtime flight paths.',
  },
  {
    id: 1,
    order: 2,
    name: 'North Moonbeam',
    x: 200,
    y: 55,
    role: 'High Navigation Lantern',
    icon: '🌙',
    altitude: '34,000 ft · Lunar Corridor',
    story:
      'A brilliant shaft of pale lunar glow cuts through the silver fog. Pip aligns the skiff’s copper compass here, catching the steady thermal current that keeps the sleeping skyway calm and undisturbed.',
    waypointNote: 'Guides the skiff safely past cumulus cloudbanks.',
  },
  {
    id: 2,
    order: 3,
    name: 'Badger Hollow',
    x: 330,
    y: 120,
    role: 'Nocturnal Waypoint',
    icon: '🦡',
    altitude: '18,000 ft · Forest Tree-line',
    story:
      'Descending toward the sleepy forest canopy, Pip drops off a warm lavender-scented nightlight above the old oak roots where the badger kits are already yawning and nestling into moss.',
    waypointNote: 'First low-altitude dream delivery station.',
  },
  {
    id: 3,
    order: 4,
    name: 'Owl Perch',
    x: 250,
    y: 220,
    role: 'Breeze Guidance Node',
    icon: '🦉',
    altitude: '12,000 ft · Whispering Pines',
    story:
      'The Midnight Nursery Elder Owls blink with gentle approval as Pip glides past the pine branches. They signal favorable tailwinds and whisper tonight’s final bedtime coordinates.',
    waypointNote: 'Weather station and zephyr flight clearance.',
  },
  {
    id: 4,
    order: 5,
    name: 'Cradle of Dreams',
    x: 100,
    y: 200,
    role: 'Safe Slumber Haven',
    icon: '☁️',
    altitude: '6,000 ft · Valley of Sleep',
    story:
      'The final and coziest sanctuary in the valley. Pip releases the remaining sparks of sweet dreams over the sleepy creatures, ensuring 8 hours of velvet-soft, peaceful rest before returning to Cloud 9.',
    waypointNote: 'The grand harbor where all nightly lullabies resolve.',
  },
];

export default function ConstellationTelescope({ onConstellationComplete }) {
  const [selectedStars, setSelectedStars] = useState([]);
  const [activeStarIndex, setActiveStarIndex] = useState(0);
  const [feedback, setFeedback] = useState({
    text: 'Click or press Enter on Star 1 (Observatory Peak) to begin charting tonight’s route.',
    type: 'info',
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const slideRef = useRef(null);

  const nextExpectedOrder = selectedStars.length + 1;
  const currentStar = STARS[activeStarIndex] || STARS[0];
  const isCurrentCharted = selectedStars.includes(currentStar.id);
  const isCurrentNext = currentStar.order === nextExpectedOrder && !isCompleted;

  const scrollToSlide = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768 && slideRef.current) {
      const navOffset = 85;
      const rect = slideRef.current.getBoundingClientRect();
      const targetY = rect.top + window.scrollY - navOffset;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    }
  };

  const handleStarSelect = (star) => {
    setActiveStarIndex(star.id);

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
        if (onConstellationComplete) {
          onConstellationComplete();
        }
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

  const handleSvgStarClick = (star) => {
    handleStarSelect(star);
    scrollToSlide();
  };

  const handleNavStarClick = (star, idx) => {
    setActiveStarIndex(idx);
    scrollToSlide();
  };

  const handleKeyDown = (e, star) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSvgStarClick(star);
    }
  };

  const goToSlide = (idx) => {
    if (idx >= 0 && idx < STARS.length) {
      setActiveStarIndex(idx);
      scrollToSlide();
    }
  };

  const handleReset = () => {
    setSelectedStars([]);
    setIsCompleted(false);
    setActiveStarIndex(0);
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
            const isFocusedInStory = activeStarIndex === star.id;

            return (
              <g
                key={star.id}
                role="button"
                tabIndex={0}
                aria-label={`Star ${star.order}: ${star.name}. ${isSelected ? 'Connected' : isNext ? 'Next target' : 'Pending'}`}
                aria-pressed={isSelected}
                className={`star-node-group ${isSelected ? 'selected' : ''} ${isNext ? 'pulse-next' : ''} ${isFocusedInStory ? 'story-active' : ''}`}
                transform={`translate(${star.x}, ${star.y})`}
                onClick={() => handleSvgStarClick(star)}
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

                {/* Active story focus ring indicator */}
                {isFocusedInStory && (
                  <circle
                    r="13"
                    fill="none"
                    stroke="#f4d6d7"
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                    className="star-active-story-ring"
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
                  className={`star-label ${isSelected ? 'active-label' : ''} ${isFocusedInStory ? 'story-focused-label' : ''}`}
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

      {/* Constellation Waypoint Quick-Jump Navigation Bar */}
      <div
        className="constellation-nav-bar"
        role="tablist"
        aria-label="Constellation waypoint star chapters"
      >
        {STARS.map((star, idx) => {
          const isCharted = selectedStars.includes(star.id);
          const isActive = activeStarIndex === idx;
          const isNextTarget = star.order === nextExpectedOrder && !isCompleted;

          return (
            <button
              key={star.id}
              type="button"
              role="tab"
              id={`star-tab-${star.id}`}
              aria-selected={isActive}
              aria-controls={`star-slide-${star.id}`}
              className={`constellation-nav-btn ${isActive ? 'active' : ''} ${isCharted ? 'charted' : ''} ${isNextTarget ? 'next-target' : ''}`}
              onClick={() => handleNavStarClick(star, idx)}
            >
              <span className="nav-btn-order">{star.order}</span>
              <span className="nav-btn-icon" aria-hidden="true">
                {isCharted ? '★' : star.icon}
              </span>
              <span className="nav-btn-name">{star.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Mobile & Desktop Waypoint Story Slide */}
      <div
        ref={slideRef}
        id={`star-slide-${currentStar.id}`}
        role="tabpanel"
        aria-labelledby={`star-tab-${currentStar.id}`}
        className={`constellation-story-slide ${isCurrentCharted ? 'slide-charted' : ''}`}
      >
        <div className="slide-header">
          <div className="slide-progress">
            <span>Star {currentStar.order} of {STARS.length}</span>
          </div>

          <div className="slide-badge-wrap">
            {isCurrentCharted ? (
              <span className="slide-status-badge charted">
                <span aria-hidden="true">✦</span> Connected to Skyway
              </span>
            ) : isCurrentNext ? (
              <span className="slide-status-badge next">
                <span aria-hidden="true">★</span> Next Target to Chart
              </span>
            ) : (
              <span className="slide-status-badge pending">
                <span aria-hidden="true">✧</span> Waypoint {currentStar.order}
              </span>
            )}
          </div>
        </div>

        <div className="slide-body">
          <div className="slide-title-row">
            <span className="slide-location-icon" aria-hidden="true">
              {currentStar.icon}
            </span>
            <div className="slide-title-group">
              <h5 className="slide-title">{currentStar.name}</h5>
              <div className="slide-meta">
                <span className="slide-role">{currentStar.role}</span>
                <span className="slide-meta-divider" aria-hidden="true">·</span>
                <span className="slide-altitude">{currentStar.altitude}</span>
              </div>
            </div>
          </div>

          <p className="slide-story-text">&ldquo;{currentStar.story}&rdquo;</p>

          <div className="slide-note-box">
            <span className="slide-note-star" aria-hidden="true">✦</span>
            <span className="slide-note-text">
              <strong>Skyway Dispatch:</strong> {currentStar.waypointNote}
            </span>
          </div>
        </div>

        {/* Quick Connect Action Button on Slide */}
        {!isCompleted && !isCurrentCharted && (
          <div className="slide-action-box">
            <button
              type="button"
              className={`btn-chart-waypoint ${isCurrentNext ? 'btn-chart-ready' : 'btn-chart-locked'}`}
              onClick={() => handleStarSelect(currentStar)}
              aria-label={`Connect Star ${currentStar.order} (${currentStar.name}) to flight corridor`}
            >
              <span>
                {isCurrentNext
                  ? `✦ Connect Star ${currentStar.order} to Skyway Corridor`
                  : `Connect Star ${currentStar.order} (Next expected: Star ${nextExpectedOrder})`}
              </span>
            </button>
          </div>
        )}

        {/* Slide Navigation: Previous / Next & Step Indicator */}
        <div className="slide-nav-controls">
          <button
            type="button"
            className="btn-slide-nav btn-prev-star"
            onClick={() => goToSlide(activeStarIndex - 1)}
            disabled={activeStarIndex === 0}
            aria-label="Go to previous star story slide"
          >
            <span aria-hidden="true">←</span>
            <span>Previous Star</span>
          </button>

          <div className="slide-counter-indicator" aria-live="polite">
            <span className="counter-current">{activeStarIndex + 1}</span>
            <span className="counter-slash">/</span>
            <span className="counter-total">{STARS.length}</span>
          </div>

          {isCompleted && activeStarIndex === STARS.length - 1 ? (
            <button
              type="button"
              className="btn-slide-nav btn-reset-slide"
              onClick={handleReset}
              aria-label="Constellation complete, reset and chart anew"
            >
              <span aria-hidden="true">↺</span>
              <span>Chart Anew</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn-slide-nav btn-next-star"
              onClick={() => goToSlide(activeStarIndex + 1)}
              disabled={activeStarIndex === STARS.length - 1}
              aria-label="Go to next star story slide"
            >
              <span>Next Star</span>
              <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
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
