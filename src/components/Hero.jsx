import React from 'react';

export default function Hero({ dreamModeActive = false, visitorLogbook = null }) {
  const heroImageSrc = dreamModeActive
    ? `${import.meta.env.BASE_URL}images/pip_avatar_cloud_dream_mode.png`
    : `${import.meta.env.BASE_URL}images/pip_avatar_cloud.png`;

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        {/* Content Side */}
        <div className="hero-content">
          {/* Visitor Memory Greeting Banner */}
          {visitorLogbook && !visitorLogbook.isDismissed && (
            <div className="visitor-welcome-banner" role="status" aria-live="polite">
              <div className="visitor-welcome-content">
                <span className="visitor-welcome-icon" aria-hidden="true">
                  {visitorLogbook.isReturning ? '🌟' : '✦'}
                </span>
                <div className="visitor-welcome-text">
                  <strong className="visitor-welcome-title">{visitorLogbook.greetingTitle}</strong>
                  <span className="visitor-welcome-body"> {visitorLogbook.greetingBody}</span>
                </div>
              </div>
              <button
                type="button"
                className="btn-dismiss-greeting"
                onClick={visitorLogbook.dismissGreeting}
                aria-label="Dismiss welcome message"
                title="Dismiss greeting"
              >
                ✕
              </button>
            </div>
          )}

          <div className="identity-badge">
            <span className="badge-sparkle">✦</span>
            <span className="badge-text">Junior Dream Engineer · Midnight Nursery</span>
          </div>

          <h1 className="hero-title">
            Welcome to the <br />
            <span className="hero-title-accent">Midnight Observatory</span>
          </h1>

          <p className="hero-intro">
            High above the sleeping world, nestled atop fluffy chamomile clouds, a gentle little
            skull baby named <strong>Pip</strong> spins starlight into lullabies, crafts cozy
            nightlights, and charts dream routes for nocturnal wanderers.
          </p>

          <div className="hero-actions">
            <a href="#showcase" className="btn-primary">
              <span>Explore Pip&apos;s Work</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
            <a href="#about" className="btn-secondary">
              <span>Meet Pip</span>
              <span className="btn-subtle" aria-hidden="true">📖</span>
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-pill">
              <span className="stat-number">1,402</span>
              <span className="stat-label">Lullabies Hummed</span>
            </div>
            <div className="stat-divider" aria-hidden="true">·</div>
            <div className="stat-pill">
              <span className="stat-number">100%</span>
              <span className="stat-label">Gentle Whispers</span>
            </div>
            <div className="stat-divider" aria-hidden="true">·</div>
            <div className="stat-pill">
              <span className="stat-number">Cloud 9</span>
              <span className="stat-label">Observatory Post</span>
            </div>
          </div>
        </div>

        {/* Character Visual Side */}
        <div className="hero-visual">
          <div className="celestial-backdrop" aria-hidden="true">
            <div className="halo-glow"></div>
            <div className="floating-star star-1">✧</div>
            <div className="floating-star star-2">✦</div>
            <div className="floating-star star-3">⋆</div>
            <div className="floating-star star-4">✨</div>
          </div>

          <div className="character-frame">
            <img
              key={dreamModeActive ? 'hero-dream' : 'hero-light'}
              src={heroImageSrc}
              alt="Pip the sleepy Skull Baby resting gently atop a fluffy dream cloud"
              className="character-image theme-fade-img"
              width="500"
              height="500"
              loading="eager"
            />
            <div className="character-caption-tag">
              <span className="caption-dot"></span>
              <span className="caption-text">Pip in active nap-shift</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
