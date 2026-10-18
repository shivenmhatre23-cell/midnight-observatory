import React, { useState, useRef } from 'react';
import SecretObservatoryModal from './SecretObservatoryModal';

export default function Footer({
  onEasterEggDiscovered,
  sparklesEnabled,
  onToggleSparkles,
  soundEnabled,
  onToggleSound,
  dreamModeActive = false,
}) {
  const [easterEggFound, setEasterEggFound] = useState(false);
  const [isLoftOpen, setIsLoftOpen] = useState(false);
  const triggerRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSecret = () => {
    setIsLoftOpen(true);
    setEasterEggFound(true);
    if (onEasterEggDiscovered) {
      onEasterEggDiscovered();
    }
  };

  return (
    <footer className="footer-section" id="observatory">
      <div className="container">
        {/* Early-Web Ribbon / Badges */}
        <div className="early-web-ribbon">
          <div className="web-badge">
            <span className="badge-ico">☁️</span>
            <span>Cloud 9 Certified</span>
          </div>
          <div className="web-badge">
            <span className="badge-ico">🌙</span>
            <span>Best Viewed by Moonlight</span>
          </div>
          <div className="web-badge">
            <span className="badge-ico">✨</span>
            <span>haX.baby Hackathon Track 1</span>
          </div>
          <div className="web-badge">
            <span className="badge-ico">🍵</span>
            <span>Chamomile Powered</span>
          </div>
        </div>

        {/* Ambiance Settings Bar */}
        <div className="footer-ambiance-bar" role="region" aria-label="Observatory Ambiance Settings">
          <div className="ambiance-label">
            <span className="ambiance-sparkle">✧</span>
            <span>Observatory Ambiance:</span>
          </div>
          <div className="ambiance-controls-group">
            <button
              type="button"
              className={`ambiance-toggle-btn ${sparklesEnabled ? 'active' : ''}`}
              onClick={onToggleSparkles}
              aria-pressed={sparklesEnabled}
              aria-label="Toggle celestial sparkle clicks"
            >
              <span className="toggle-ico" aria-hidden="true">{sparklesEnabled ? '✨' : '✧'}</span>
              <span>Sparkle Clicks: {sparklesEnabled ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              className={`ambiance-toggle-btn ${soundEnabled ? 'active' : ''}`}
              onClick={onToggleSound}
              aria-pressed={soundEnabled}
              aria-label="Toggle interaction chime sounds"
            >
              <span className="toggle-ico" aria-hidden="true">{soundEnabled ? '🔔' : '🔕'}</span>
              <span>Chimes: {soundEnabled ? 'ON' : 'MUTED'}</span>
            </button>
          </div>
        </div>

        {/* Secret / Hidden Hint Callout */}
        <div className="secret-hint-box">
          <button
            type="button"
            className="secret-star-btn"
            ref={triggerRef}
            onClick={handleOpenSecret}
            aria-label="Unlock Pip's Secret Observatory Loft"
          >
            <span className="secret-moon-icon" aria-hidden="true">🔭</span>
            <span className="secret-lead">
              {easterEggFound ? 'Re-enter Pip’s Secret Loft' : 'Observatory Secret Discovered?'}
            </span>
          </button>
          
          <p className="secret-text">
            {easterEggFound ? (
              <span className="easter-egg-revealed">
                🌟 <em>Secret Room Unlocked!</em> You discovered Pip’s hidden loft above Cloud 9.
                Click the telescope button anytime to visit Pip’s stargazing nook!
              </span>
            ) : (
              <span>
                Psst... The brass telescope atop the observatory holds a hidden secret mechanism. 
                Click the telescope button above to peek inside the secret loft!
              </span>
            )}
          </p>
        </div>

        {/* Secret Observatory Accessible Dialog */}
        <SecretObservatoryModal
          isOpen={isLoftOpen}
          onClose={() => setIsLoftOpen(false)}
          triggerRef={triggerRef}
          dreamModeActive={dreamModeActive}
        />

        {/* Main Footer Info */}
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo-sparkle">✦</span>
            <h4 className="footer-title">Pip&apos;s Midnight Observatory</h4>
            <p className="footer-desc">
              A tranquil haven in the clouds where gentle dreams are drafted, tested, and dispatched to sleepy woodland creatures everywhere.
            </p>
          </div>

          <div className="footer-nav">
            <div className="footer-nav-col">
              <span className="col-heading">Observatory Map</span>
              <ul>
                <li><a href="#hero">Observation Deck</a></li>
                <li><a href="#about">Custodian Profile</a></li>
                <li><a href="#showcase">Project Workshop</a></li>
                <li><a href="#story">Origin Chronicles</a></li>
                <li><a href="#attributions">Credits & Art Sources</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <span className="col-heading">Nightly Dispatch</span>
              <ul>
                <li><span>Lullaby Lab v1.0</span></li>
                <li><span>Nightlight Registry</span></li>
                <li><span>Zephyr Wind Maps</span></li>
                <li><button type="button" onClick={scrollToTop} className="back-to-top-btn">↑ Back to Stars</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Visible Attribution & Credits Box */}
        <div className="footer-credits-box" id="attributions" role="region" aria-label="Attribution and Credits">
          <div className="credits-header">
            <span className="credits-star" aria-hidden="true">✦</span>
            <h5 className="credits-title">Attributions & Acknowledgments</h5>
          </div>
          <div className="credits-grid">
            <div className="credit-category">
              <span className="credit-label">🎨 Character & Artwork</span>
              <p className="credit-text">
                Official <em>Pip the Skull Baby</em> character identity, lore, and artwork assets provided by the <strong>haX.baby Track 1 Creator Pack</strong>.
              </p>
            </div>
            <div className="credit-category">
              <span className="credit-label">🎵 Sound & Audio</span>
              <p className="credit-text">
                Original pentatonic bedtime chimes and harmonic overtone dampening synthesized procedurally via the native browser <strong>Web Audio API</strong> (no third-party audio files).
              </p>
            </div>
            <div className="credit-category">
              <span className="credit-label">🛠️ Libraries & Craft</span>
              <p className="credit-text">
                Built with <strong>React 19</strong>, <strong>Vite 8</strong>, <strong>Lucide React</strong> (icons), <strong>Motion</strong> (spring micro-interactions), and <strong>Canvas Confetti</strong> (starlight completion).
              </p>
            </div>
          </div>
        </div>

        {/* Early-Web Signature Bottom Line */}
        <div className="footer-signature-bar">
          <p className="handcrafted-note">
            Handcrafted with starlight, lavender pillows, & chamomile tea for the <strong>haX.baby Baby&apos;s First Website Hackathon</strong>.
          </p>
          <p className="copyright-note">
            © 2026 Pip the Skull Baby · Junior Dream Engineer · Midnight Nursery
          </p>
        </div>
      </div>
    </footer>
  );
}
