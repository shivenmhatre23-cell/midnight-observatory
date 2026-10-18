import React, { useState, useEffect, useRef, useCallback } from 'react';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 380;
const GAME_DURATION = 30; // 30-second cozy round
const BASKET_WIDTH = 84;
const BASKET_HEIGHT = 28;

const STAR_TYPES = [
  { type: 'golden', name: 'Classic Starlight', symbol: '⭐', points: 10, color: '#f3c96b', glow: '#ffeaa7', radius: 14, speed: 1.8 },
  { type: 'wisp', name: 'Sweet Slumber', symbol: '🌸', points: 15, color: '#a34063', glow: '#e84393', radius: 13, speed: 1.5 },
  { type: 'nebula', name: 'Lucid Flare', symbol: '✨', points: 20, color: '#f4d6d7', glow: '#ffb8b8', radius: 16, speed: 2.2 },
];

export default function FallingDreamsGame({
  soundEnabled = false,
  onCatchSound,
  dreamModeActive = false,
  highScore = 0,
  onHighScoreUpdate,
}) {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'paused' | 'gameover'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [starsCaught, setStarsCaught] = useState(0);
  const [accessibleStatus, setAccessibleStatus] = useState('');

  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Mutable game state inside refs to avoid re-binding 60fps animation loops
  const basketRef = useRef({ x: CANVAS_WIDTH / 2 - BASKET_WIDTH / 2, targetX: CANVAS_WIDTH / 2 - BASKET_WIDTH / 2, speed: 9 });
  const starsRef = useRef([]);
  const particlesRef = useRef([]);
  const keysRef = useRef({ left: false, right: false });
  const scoreRef = useRef(0);
  const starsCaughtRef = useRef(0);
  const spawnTimerRef = useRef(0);

  // Check reduced motion preference
  const isReducedMotion = useRef(false);
  useEffect(() => {
    try {
      isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      isReducedMotion.current = false;
    }
  }, []);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Spawn a falling star
  const spawnStar = useCallback(() => {
    const template = STAR_TYPES[Math.floor(Math.random() * STAR_TYPES.length)];
    const speedMultiplier = isReducedMotion.current ? 0.6 : 1;
    const margin = 30;
    const newStar = {
      id: Math.random(),
      ...template,
      x: margin + Math.random() * (CANVAS_WIDTH - margin * 2),
      y: -20,
      vy: template.speed * speedMultiplier + (Math.random() * 0.6 - 0.3),
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.05 + Math.random() * 0.04,
    };
    starsRef.current.push(newStar);
  }, []);

  // Spawn visual sparkle particles when caught
  const spawnCatchParticles = useCallback((x, y, color) => {
    if (isReducedMotion.current) return;
    const count = 7;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 1.5 + Math.random() * 2.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.2,
        alpha: 1,
        color,
        size: 3 + Math.random() * 3,
        life: 0,
        maxLife: 24,
      });
    }
  }, []);

  // Handle Game Over
  const handleGameOver = useCallback(() => {
    setGameState('gameover');
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    keysRef.current.left = false;
    keysRef.current.right = false;

    const finalScore = scoreRef.current;
    const finalCaught = starsCaughtRef.current;
    if (onHighScoreUpdate) {
      onHighScoreUpdate(finalScore);
    }
    setAccessibleStatus(`Game over! You caught ${finalCaught} dream stars for a total score of ${finalScore}.`);
  }, [onHighScoreUpdate]);

  // Pause / Resume Game
  const pauseGame = useCallback(() => {
    setGameState((currentState) => {
      if (currentState === 'playing') {
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        keysRef.current.left = false;
        keysRef.current.right = false;
        setAccessibleStatus('Game paused. Press Space or P to resume.');
        return 'paused';
      } else if (currentState === 'paused') {
        setAccessibleStatus('Game resumed.');
        timerIntervalRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timerIntervalRef.current);
              handleGameOver();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        if (canvasRef.current) canvasRef.current.focus();
        return 'playing';
      }
      return currentState;
    });
  }, [handleGameOver]);

  // Start / Restart Game
  const startGame = useCallback(() => {
    if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    scoreRef.current = 0;
    starsCaughtRef.current = 0;
    starsRef.current = [];
    particlesRef.current = [];
    spawnTimerRef.current = 0;
    keysRef.current.left = false;
    keysRef.current.right = false;
    basketRef.current.x = CANVAS_WIDTH / 2 - BASKET_WIDTH / 2;
    basketRef.current.targetX = CANVAS_WIDTH / 2 - BASKET_WIDTH / 2;

    setScore(0);
    setStarsCaught(0);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
    setAccessibleStatus('Game started! Move your cloud basket left and right to catch dream stars.');

    // 1-second countdown timer
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Focus canvas for instant keyboard control
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
  }, [handleGameOver]);

  // Main 60fps Canvas Animation Loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      // 1. Clear & draw sky background
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
      if (dreamModeActive) {
        skyGrad.addColorStop(0, '#131627');
        skyGrad.addColorStop(1, '#1e233d');
      } else {
        skyGrad.addColorStop(0, '#1c223c');
        skyGrad.addColorStop(1, '#2c3559');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Subtle background stars
      ctx.fillStyle = 'rgba(255, 248, 241, 0.4)';
      ctx.beginPath();
      ctx.arc(60, 45, 1.2, 0, Math.PI * 2);
      ctx.arc(140, 90, 1.5, 0, Math.PI * 2);
      ctx.arc(280, 50, 1.8, 0, Math.PI * 2);
      ctx.arc(360, 110, 1.2, 0, Math.PI * 2);
      ctx.arc(490, 60, 1.6, 0, Math.PI * 2);
      ctx.arc(560, 85, 1.4, 0, Math.PI * 2);
      ctx.fill();

      // 2. Spawn stars periodically
      spawnTimerRef.current += 1;
      const spawnInterval = isReducedMotion.current ? 45 : 32;
      if (spawnTimerRef.current >= spawnInterval) {
        spawnTimerRef.current = 0;
        spawnStar();
      }

      // 3. Move basket based on keyboard or pointer target
      const basket = basketRef.current;
      if (keysRef.current.left) {
        basket.targetX = Math.max(0, basket.targetX - basket.speed);
      }
      if (keysRef.current.right) {
        basket.targetX = Math.min(CANVAS_WIDTH - BASKET_WIDTH, basket.targetX + basket.speed);
      }
      // Smooth lerp to target
      basket.x += (basket.targetX - basket.x) * 0.35;
      const basketY = CANVAS_HEIGHT - BASKET_HEIGHT - 12;

      // 4. Update and render falling stars
      const stars = starsRef.current;
      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.y += star.vy;
        star.wobble += star.wobbleSpeed;
        const wobbleOffset = Math.sin(star.wobble) * 2;

        // Collision detection with basket
        const starX = star.x + wobbleOffset;
        const starY = star.y;
        const inX = starX >= basket.x - 4 && starX <= basket.x + BASKET_WIDTH + 4;
        const inY = starY >= basketY - 8 && starY <= basketY + BASKET_HEIGHT;

        if (inX && inY) {
          // Caught!
          scoreRef.current += star.points;
          starsCaughtRef.current += 1;
          setScore(scoreRef.current);
          setStarsCaught(starsCaughtRef.current);
          spawnCatchParticles(starX, starY, star.color);

          if (soundEnabled && onCatchSound) {
            onCatchSound();
          }

          stars.splice(i, 1);
          continue;
        }

        // Offscreen removal
        if (star.y > CANVAS_HEIGHT + 20) {
          stars.splice(i, 1);
          continue;
        }

        // Draw star
        ctx.save();
        ctx.shadowColor = star.glow;
        ctx.shadowBlur = 10;
        ctx.font = '22px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(star.symbol, star.x + wobbleOffset, star.y);
        ctx.restore();
      }

      // 5. Update and render particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 1;
        p.alpha = Math.max(0, 1 - p.life / p.maxLife);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      // 6. Draw Pip's Cloud Basket
      ctx.save();
      // Fluffy cloud puffs beneath basket
      ctx.fillStyle = 'rgba(255, 248, 241, 0.9)';
      ctx.beginPath();
      ctx.arc(basket.x + 14, basketY + 22, 10, 0, Math.PI * 2);
      ctx.arc(basket.x + 35, basketY + 25, 12, 0, Math.PI * 2);
      ctx.arc(basket.x + 55, basketY + 25, 12, 0, Math.PI * 2);
      ctx.arc(basket.x + 72, basketY + 22, 10, 0, Math.PI * 2);
      ctx.fill();

      // Golden Woven Basket Body
      ctx.fillStyle = '#f3c96b';
      ctx.strokeStyle = '#a34063';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(basket.x, basketY, BASKET_WIDTH, BASKET_HEIGHT, [4, 4, 12, 12]);
      ctx.fill();
      ctx.stroke();

      // Woven basket weave lines
      ctx.strokeStyle = 'rgba(163, 64, 99, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(basket.x + 20, basketY);
      ctx.lineTo(basket.x + 20, basketY + BASKET_HEIGHT);
      ctx.moveTo(basket.x + 42, basketY);
      ctx.lineTo(basket.x + 42, basketY + BASKET_HEIGHT);
      ctx.moveTo(basket.x + 64, basketY);
      ctx.lineTo(basket.x + 64, basketY + BASKET_HEIGHT);
      ctx.stroke();

      // Center Star Emblem
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', basket.x + BASKET_WIDTH / 2, basketY + BASKET_HEIGHT / 2);
      ctx.restore();

      gameLoopRef.current = requestAnimationFrame(render);
    };

    gameLoopRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState, dreamModeActive, soundEnabled, onCatchSound, spawnStar, spawnCatchParticles]);

  // Full Keyboard Gameplay Listener on window
  useEffect(() => {
    // Only listen when actively playing or paused
    if (gameState !== 'playing' && gameState !== 'paused') {
      keysRef.current.left = false;
      keysRef.current.right = false;
      return;
    }

    const isInteractiveInput = (target) => {
      if (!target || !(target instanceof HTMLElement)) return false;
      const tag = target.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
      if (target.isContentEditable) return true;
      if ((tag === 'button' || tag === 'a') && !target.closest('.game-card')) return true;
      return false;
    };

    const handleGlobalKeyDown = (e) => {
      if (isInteractiveInput(e.target)) return;

      if (gameState === 'playing') {
        if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          e.preventDefault();
          keysRef.current.left = true;
        } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          e.preventDefault();
          keysRef.current.right = true;
        } else if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
          if (e.key === ' ' && e.target?.tagName?.toLowerCase() === 'button') {
            return;
          }
          e.preventDefault();
          pauseGame();
        }
      } else if (gameState === 'paused') {
        if (e.key === ' ' || e.key === 'p' || e.key === 'P') {
          if (e.key === ' ' && e.target?.tagName?.toLowerCase() === 'button') {
            return;
          }
          e.preventDefault();
          pauseGame();
        }
      }
    };

    const handleGlobalKeyUp = (e) => {
      if (isInteractiveInput(e.target)) return;

      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysRef.current.left = false;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysRef.current.right = false;
      }
    };

    const handleWindowBlur = () => {
      keysRef.current.left = false;
      keysRef.current.right = false;
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    window.addEventListener('keyup', handleGlobalKeyUp);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('keyup', handleGlobalKeyUp);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [gameState, pauseGame]);

  // Pointer / Touch move on canvas
  const handlePointerMove = (e) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const clientX = e.clientX - rect.left;
    const canvasX = clientX * scaleX;
    basketRef.current.targetX = Math.max(
      0,
      Math.min(CANVAS_WIDTH - BASKET_WIDTH, canvasX - BASKET_WIDTH / 2)
    );
  };

  // Touch button controls
  const handleMoveLeft = () => {
    basketRef.current.targetX = Math.max(0, basketRef.current.targetX - 45);
  };

  const handleMoveRight = () => {
    basketRef.current.targetX = Math.min(CANVAS_WIDTH - BASKET_WIDTH, basketRef.current.targetX + 45);
  };

  // Rank title computation
  const getRankBadge = (pts) => {
    if (pts >= 180) return { title: 'Master Dream Gatherer 🌟', quote: 'Incredible! You caught almost every falling dream in the velvet sky!' };
    if (pts >= 110) return { title: 'Certified Star Scout ✨', quote: 'Wonderful job! Pip’s cloud basket is full of warm, peaceful slumber!' };
    return { title: 'Gentle Stargazer 🌙', quote: 'A gentle bedtime effort! Even a single captured dream warms weary thoughts.' };
  };

  const rank = getRankBadge(score);

  return (
    <section className="mini-game-section" id="starlight-catcher" aria-labelledby="mini-game-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-eyebrow">Interactive Bedroom Play</span>
          <h2 id="mini-game-heading" className="section-title">
            Catch the Falling Dreams
          </h2>
          <p className="section-subtitle">
            Gentle dream stars are drifting from Cloud 9 before sunrise! Slide Pip’s woven cloud
            basket across the night sky to gather tonight’s bedtime slumber.
          </p>
        </div>

        {/* Live Accessibility Status Region */}
        <div className="sr-only" role="status" aria-live="polite">
          {accessibleStatus}
        </div>

        {/* Game Arena Outer Card */}
        <div className="game-card">
          {/* Top Score & Time Bar */}
          <div className="game-status-bar">
            <div className="game-stat-item">
              <span className="stat-label">⭐ Score:</span>
              <strong className="stat-value score-text">{score}</strong>
            </div>

            <div className="game-stat-item">
              <span className="stat-label">🏆 Best:</span>
              <strong className="stat-value">{Math.max(highScore, score)}</strong>
            </div>

            <div className="game-stat-item">
              <span className="stat-label">⏳ Time Left:</span>
              <strong className={`stat-value time-text ${timeLeft <= 5 ? 'time-low' : ''}`}>
                {timeLeft}s
              </strong>
            </div>

            <div className="game-stat-item">
              <span className="stat-label">🧺 Caught:</span>
              <strong className="stat-value">{starsCaught} Stars</strong>
            </div>

            <div className="game-controls-actions">
              {gameState === 'playing' && (
                <button
                  type="button"
                  className="btn-game-toggle"
                  onClick={pauseGame}
                  aria-label="Pause game"
                >
                  ⏸ Pause
                </button>
              )}
              {gameState === 'paused' && (
                <button
                  type="button"
                  className="btn-game-toggle active"
                  onClick={pauseGame}
                  aria-label="Resume game"
                >
                  ▶ Resume
                </button>
              )}
              {(gameState === 'playing' || gameState === 'paused') && (
                <button
                  type="button"
                  className="btn-game-reset"
                  onClick={startGame}
                  aria-label="Restart game round"
                >
                  ↺ Restart
                </button>
              )}
            </div>
          </div>

          {/* Interactive Canvas Area & Overlays */}
          <div className={`game-canvas-wrapper ${gameState === 'idle' ? 'is-idle' : ''}`}>
            <canvas
              ref={canvasRef}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              className="falling-dreams-canvas"
              tabIndex={0}
              role="application"
              aria-label="Catch the Falling Dreams play area. Use Left and Right arrow keys or touch to move Pip's basket."
              onPointerMove={handlePointerMove}
              onPointerDown={handlePointerMove}
            />

            {/* Start Screen Overlay */}
            {gameState === 'idle' && (
              <div className="game-overlay start-screen">
                <div className="overlay-content start-screen-content">
                  <span className="overlay-icon" aria-hidden="true">🧺</span>
                  <h3 className="overlay-title">Catch the Falling Dreams</h3>
                  <p className="overlay-desc">
                    Help Pip gather falling bedtime dreams in his cloud basket before the <strong>30-second</strong> night watch ends!
                  </p>

                  {/* Pre-Game Instructions & Star Guide Panel */}
                  <div className="pre-game-instructions-card" aria-label="Game instructions and star point guide">
                    <div className="instructions-section-tag">
                      <span aria-hidden="true">✨</span>
                      <span>Star Types &amp; Point Values</span>
                    </div>

                    <div className="star-types-grid" role="list" aria-label="Star types and point values">
                      {STAR_TYPES.map((star) => (
                        <div key={star.name} className={`star-type-item star-${star.type}`} role="listitem">
                          <span className="star-type-icon" aria-hidden="true">{star.symbol}</span>
                          <div className="star-type-meta">
                            <strong className="star-type-name">{star.name}</strong>
                            <span className="star-type-points">+{star.points} points</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="how-to-play-grid">
                      <div className="instruction-step">
                        <span className="step-icon" aria-hidden="true">⌨️</span>
                        <div className="step-text">
                          <strong>Move:</strong> <kbd>←</kbd> <kbd>→</kbd> or <kbd>A</kbd> <kbd>D</kbd> keys (or touch &amp; drag on mobile)
                        </div>
                      </div>
                      <div className="instruction-step">
                        <span className="step-icon" aria-hidden="true">🧺</span>
                        <div className="step-text">
                          <strong>Catch:</strong> Slide Pip&apos;s basket under falling stars to score within <strong>30 seconds</strong>
                        </div>
                      </div>
                      <div className="instruction-step">
                        <span className="step-icon" aria-hidden="true">⏸</span>
                        <div className="step-text">
                          <strong>Pause / Resume:</strong> Press <kbd>Space</kbd> or <kbd>P</kbd> at any time during play
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn-primary btn-start-game"
                    onClick={startGame}
                    aria-label="Start Catch the Falling Dreams game"
                  >
                    <span>Start Dream Gathering ✨</span>
                  </button>
                </div>
              </div>
            )}

            {/* Paused Screen Overlay */}
            {gameState === 'paused' && (
              <div className="game-overlay paused-screen">
                <div className="overlay-content">
                  <span className="overlay-icon" aria-hidden="true">⏸</span>
                  <h3 className="overlay-title">Dream Gathering Paused</h3>
                  <p className="overlay-desc">The falling stars are gently resting on their clouds.</p>
                  <div className="paused-actions">
                    <button type="button" className="btn-primary" onClick={pauseGame}>
                      ▶ Resume Game
                    </button>
                    <button type="button" className="btn-secondary" onClick={startGame}>
                      ↺ Restart Round
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Game Over Screen Overlay */}
            {gameState === 'gameover' && (
              <div className="game-overlay gameover-screen">
                <div className="overlay-content">
                  <span className="overlay-icon" aria-hidden="true">🌟</span>
                  <h3 className="overlay-title">Nightly Gathering Complete!</h3>
                  <div className="final-score-badge">
                    <span className="final-score-num">{score} Points</span>
                    <span className="final-caught-num">({starsCaught} Dream Stars Caught)</span>
                    {score > highScore && score > 0 && (
                      <span className="new-high-score-tag">🎉 New Personal Best!</span>
                    )}
                  </div>
                  <div className="rank-award-box">
                    <span className="rank-title">{rank.title}</span>
                    <p className="rank-quote">&ldquo;{rank.quote}&rdquo;</p>
                  </div>
                  <button
                    type="button"
                    className="btn-primary btn-play-again"
                    onClick={startGame}
                    aria-label="Play Catch the Falling Dreams again"
                  >
                    <span>Play Another Round ↺</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Accessible Touch Controls for Mobile */}
          <div className="mobile-touch-controls" aria-label="Touch arrow controls for mobile">
            <button
              type="button"
              className="btn-touch-move"
              onClick={handleMoveLeft}
              aria-label="Move basket left"
            >
              ◀ Move Left
            </button>
            <span className="touch-hint-text">or touch / drag across the sky</span>
            <button
              type="button"
              className="btn-touch-move"
              onClick={handleMoveRight}
              aria-label="Move basket right"
            >
              Move Right ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
