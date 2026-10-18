import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const SECRET_STARS = [
  { id: 'star-a', name: 'Left Moon-Ear', x: 45, y: 35 },
  { id: 'star-b', name: 'Right Moon-Ear', x: 85, y: 30 },
  { id: 'star-c', name: 'Whisker Star', x: 65, y: 70 },
  { id: 'star-d', name: 'Puff Tail', x: 120, y: 95 },
];

export default function SecretObservatoryModal({
  isOpen,
  onClose,
  triggerRef,
  onSecretDiscovered,
  dreamModeActive,
}) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [litStars, setLitStars] = useState([]);
  const [recipeUnlocked, setRecipeUnlocked] = useState(false);

  const isDream =
    dreamModeActive ??
    (typeof document !== 'undefined' && document.body.classList.contains('dream-mode-active'));
  const avatarSrc = isDream
    ? `${import.meta.env.BASE_URL}images/pip_avatar_cloud_dream_mode.png`
    : `${import.meta.env.BASE_URL}images/pip_avatar_cloud.png`;

  // Focus management & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    // Save previously focused element
    const previousFocus = triggerRef?.current || document.activeElement;

    // Focus close button on open
    const focusTimeout = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    // Prevent body scroll while open
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      // Trap Tab focus inside modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimeout);
      document.body.style.overflow = originalOverflow;
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus();
      }
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const toggleStar = (starId) => {
    setLitStars((prev) => {
      const next = prev.includes(starId)
        ? prev.filter((id) => id !== starId)
        : [...prev, starId];

      if (next.length === SECRET_STARS.length && !recipeUnlocked) {
        setRecipeUnlocked(true);
        if (onSecretDiscovered) {
          onSecretDiscovered();
        }
      }
      return next;
    });
  };

  const handleStarKeyDown = (e, starId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleStar(starId);
    }
  };

  const modalContent = (
    <div
      className="secret-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="presentation"
    >
      <div
        className="secret-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="secret-dialog-title"
        aria-describedby="secret-dialog-desc"
        ref={modalRef}
      >
        {/* Header */}
        <div className="secret-modal-header">
          <div className="secret-dialog-badge">
            <span className="badge-spark" aria-hidden="true">✦</span>
            <span>Secret Chamber · 40,000 ft Above Cloud 9</span>
          </div>

          <button
            type="button"
            className="secret-modal-close"
            onClick={onClose}
            ref={closeButtonRef}
            aria-label="Close secret observatory"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="secret-modal-body">
          <div className="secret-hero-row">
            <div className="secret-avatar-box">
              <img
                key={isDream ? 'secret-dream' : 'secret-light'}
                src={avatarSrc}
                alt="Pip dozing warmly on a cloud pillow in the secret loft"
                className="secret-pip-img theme-fade-img"
                width="140"
                height="140"
              />
            </div>
            <div className="secret-welcome-text">
              <h3 id="secret-dialog-title" className="secret-dialog-title">
                Pip&apos;s Stargazing Loft
              </h3>
              <p id="secret-dialog-desc" className="secret-dialog-desc">
                &ldquo;Shhh... you found my quiet nook! When the clock tower chimes midnight and the
                workshop gets too busy, I sneak up here with chamomile tea to watch the sleeping world.&rdquo;
              </p>
            </div>
          </div>

          {/* Mini Interactive Constellation Surprise */}
          <div className="secret-interactive-box">
            <div className="secret-box-header">
              <h4 className="secret-surprise-title">
                Interactive Surprise: The Moon Rabbit Constellation
              </h4>
              <p className="secret-surprise-subtitle">
                Click each of the 4 hidden stars to awaken Pip’s favorite childhood sky-pet:
              </p>
            </div>

            <div className="secret-constellation-stage" role="region" aria-label="Moon Rabbit Star Chart">
              <svg viewBox="0 0 160 120" className="secret-sky-svg" aria-hidden="true">
                {/* Connecting lines between lit stars */}
                {litStars.includes('star-a') && litStars.includes('star-c') && (
                  <line x1="45" y1="35" x2="65" y2="70" stroke="#f3c96b" strokeWidth="2" strokeDasharray="3,3" />
                )}
                {litStars.includes('star-b') && litStars.includes('star-c') && (
                  <line x1="85" y1="30" x2="65" y2="70" stroke="#f3c96b" strokeWidth="2" strokeDasharray="3,3" />
                )}
                {litStars.includes('star-c') && litStars.includes('star-d') && (
                  <line x1="65" y1="70" x2="120" y2="95" stroke="#f3c96b" strokeWidth="2" strokeDasharray="3,3" />
                )}

                {/* Stars */}
                {SECRET_STARS.map((s) => {
                  const isLit = litStars.includes(s.id);
                  return (
                    <g
                      key={s.id}
                      role="button"
                      tabIndex={0}
                      aria-label={`${s.name} star: ${isLit ? 'Lit' : 'Unlit'}`}
                      aria-pressed={isLit}
                      transform={`translate(${s.x}, ${s.y})`}
                      onClick={() => toggleStar(s.id)}
                      onKeyDown={(e) => handleStarKeyDown(e, s.id)}
                      className="secret-star-node"
                    >
                      <circle r="16" fill="transparent" />
                      <circle
                        r={isLit ? 7 : 4.5}
                        fill={isLit ? '#fff8f1' : '#5c4033'}
                        stroke={isLit ? '#f3c96b' : '#c7bebe'}
                        strokeWidth="2"
                        className="secret-star-dot"
                      />
                      {isLit && (
                        <circle r="12" fill="none" stroke="#f3c96b" strokeWidth="1" opacity="0.6" />
                      )}
                    </g>
                  );
                })}
              </svg>

              <div className="secret-star-status" role="status" aria-live="polite">
                <span>{litStars.length} of {SECRET_STARS.length} stars glowing</span>
              </div>
            </div>

            {/* Secret Recipe Reveal */}
            {recipeUnlocked && (
              <div className="secret-recipe-card" role="status">
                <span className="recipe-sparkle" aria-hidden="true">🍵</span>
                <div className="recipe-text-wrap">
                  <strong>Pip&apos;s Secret Moonflower Tea Recipe:</strong>
                  <p>
                    Steep dried moonflower petals, crushed chamomile, and a speck of vanilla stardust
                    for exactly 3 quiet minutes. Guarantees 8 hours of peaceful, velvet-soft dreams!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="secret-modal-footer">
          <p className="secret-footer-whisper">
            ✦ Discovered in Pip&apos;s Midnight Observatory · haX.baby Special Easter Egg
          </p>
          <button
            type="button"
            className="btn-primary btn-close-loft"
            onClick={onClose}
          >
            <span>Return to Observatory Deck</span>
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}
