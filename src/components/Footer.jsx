import React, { useState } from 'react';

export default function Footer() {
  const [easterEggFound, setEasterEggFound] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

        {/* Secret / Hidden Hint Callout */}
        <div className="secret-hint-box">
          <button
            type="button"
            className="secret-star-btn"
            onClick={() => setEasterEggFound(!easterEggFound)}
            aria-label="Observatory secret hint"
          >
            <span className="secret-moon-icon" aria-hidden="true">🔭</span>
            <span className="secret-lead">Observatory Secret Discovered?</span>
          </button>
          
          <p className="secret-text">
            {easterEggFound ? (
              <span className="easter-egg-revealed">
                🌟 <em>You found the hidden note!</em> Legend whispers that in <strong>Phase 2</strong>, 
                aligning three moonstones atop the observatory unlocks the <strong>Celestial Dream Weaver</strong>—an 
                interactive synthesizer where visitors can compose custom starry lullabies for Pip to deliver!
              </span>
            ) : (
              <span>
                Psst... The brass telescope atop the observatory holds a hidden mechanism. 
                Keep your ears open for the midnight chime in Phase 2! (Click telescope above to peek)
              </span>
            )}
          </p>
        </div>

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
