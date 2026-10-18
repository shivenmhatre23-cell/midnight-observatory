import React, { useState, useCallback, useRef, useEffect } from 'react';

const PIP_REACTION_QUOTES = [
  'Hehe! That tickles my starlight antenna! ✦',
  'Psst! Did you know? Sleeping clouds smell like warm chamomile! ☕',
  'Look at that shooting star! Quick, make a bedtime wish! ✨',
  'I am keeping watch over every dream tonight. You are always safe here! 🌙',
  'Spinning lullabies is hard work, but visitors like you make my nightcap spin! 🌸',
  'Need a rest? There is always a soft cloud cushion waiting for you! ☁️',
  'Tuning the music box to 432 Hz... ahhh, perfectly cozy! 🎵',
];

export default function Hero({
  dreamModeActive = false,
  visitorLogbook = null,
  soundEnabled = false,
  onPlayReactionSound = null,
}) {
  const posterSrc = dreamModeActive
    ? `${import.meta.env.BASE_URL}images/pip_avatar_cloud_dream_mode.png`
    : `${import.meta.env.BASE_URL}images/pip_avatar_cloud.png`;

  const videoSrc = dreamModeActive
    ? `${import.meta.env.BASE_URL}videos/pip-living-hello-dream-mode.mp4`
    : `${import.meta.env.BASE_URL}videos/pip-living-hello.mp4`;

  const isReturning = visitorLogbook?.isReturning;
  const highScore = visitorLogbook?.highScore || 0;

  // Compute initial speech bubble text based on visitor history
  const getInitialSpeech = useCallback(() => {
    if (isReturning) {
      if (highScore > 0) {
        return `Yay, you're back! 🌟 I saved your record of ${highScore} stars! Tap me to say hello!`;
      }
      return 'Welcome back to Cloud 9, friend! 🌟 Pip fluffed up a warm cloud for your return!';
    }
    return 'Hiii, stargazer! ✨ Welcome to my little observatory!';
  }, [isReturning, highScore]);

  const [customQuote, setCustomQuote] = useState(null);
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const videoRef = useRef(null);
  const reactionTimerRef = useRef(null);
  const lastQuoteIndexRef = useRef(-1);

  const speechText = customQuote || getInitialSpeech();

  // Listen for prefers-reduced-motion changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Cleanup reaction timer on unmount
  useEffect(() => {
    return () => {
      if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    };
  }, []);

  // Autoplay video once when component mounts or theme changes, respecting prefers-reduced-motion
  useEffect(() => {
    if (videoRef.current && !prefersReducedMotion && !videoError) {
      if (!videoEnded) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Video playback notice (fallback active):', err.message);
          });
        }
      }
    }
  }, [prefersReducedMotion, dreamModeActive, videoError, videoEnded]);

  const handleVideoEnded = () => {
    setVideoEnded(true);
    // Crucial: Keep the final frame visible. Do NOT reset currentTime or pause to blank.
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  // Handle click / tap on Pip: triggers dialogue reaction without restarting the video
  const handlePipClick = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * PIP_REACTION_QUOTES.length);
    } while (nextIndex === lastQuoteIndexRef.current && PIP_REACTION_QUOTES.length > 1);

    lastQuoteIndexRef.current = nextIndex;
    setCustomQuote(PIP_REACTION_QUOTES[nextIndex]);
    setBubbleVisible(true);

    setIsReacting(true);
    if (reactionTimerRef.current) clearTimeout(reactionTimerRef.current);
    reactionTimerRef.current = setTimeout(() => {
      setIsReacting(false);
    }, 750);

    if (soundEnabled && onPlayReactionSound) {
      onPlayReactionSound();
    }
  };

  const handlePipKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePipClick();
    }
  };

  const handleDismissSpeech = (e) => {
    e.stopPropagation();
    setBubbleVisible(false);
  };

  // Determine whether to show the video or graceful poster fallback
  const showVideo = !prefersReducedMotion && !videoError;

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

          {/* Interactive Character Frame */}
          <div
            className="character-frame"
            role="button"
            tabIndex={0}
            onClick={handlePipClick}
            onKeyDown={handlePipKeyDown}
            aria-label="Pip the Skull Baby. Tap or press Enter to say hello"
            title="Tap Pip to say hello!"
          >
            {/* Friendly Living Speech Bubble */}
            {bubbleVisible && (
              <div className="pip-speech-bubble" role="status" aria-live="polite">
                <div className="speech-bubble-tail" aria-hidden="true" />
                <p className="speech-bubble-text">{speechText}</p>
                <button
                  type="button"
                  className="speech-bubble-dismiss"
                  onClick={handleDismissSpeech}
                  aria-label="Dismiss speech bubble"
                  title="Dismiss bubble"
                >
                  ✕
                </button>
              </div>
            )}

            {showVideo ? (
              <video
                ref={videoRef}
                key={dreamModeActive ? 'video-dark' : 'video-light'}
                src={videoSrc}
                poster={posterSrc}
                muted
                playsInline
                preload="auto"
                className="character-video theme-fade-img"
                onEnded={handleVideoEnded}
                onError={handleVideoError}
                width="720"
                height="1280"
                aria-label="Six-second animation of Pip the Skull Baby waking up and greeting you"
              />
            ) : (
              <img
                key={dreamModeActive ? 'hero-dream' : 'hero-light'}
                src={posterSrc}
                alt="Pip the sleepy Skull Baby resting gently atop a fluffy dream cloud"
                className="character-image theme-fade-img"
                width="500"
                height="500"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            )}

            <div className="character-caption-tag">
              <span className="caption-dot"></span>
              <span className="caption-text">
                {isReacting ? '✨ Pip says hello!' : (videoEnded ? '✨ Tap Pip to say hello' : '✨ Pip waking up...')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
