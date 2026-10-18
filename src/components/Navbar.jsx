import React, { useState } from 'react';

export default function Navbar({ onToggleDreamMode, dreamModeActive }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDreamNotice, setShowDreamNotice] = useState(false);

  const handleDreamClick = () => {
    onToggleDreamMode();
    setShowDreamNotice(true);
    setTimeout(() => setShowDreamNotice(false), 3500);
  };

  const navLinks = [
    { label: 'About Pip', href: '#about' },
    { label: 'Dream Works', href: '#showcase' },
    { label: 'Flight Map', href: '#flight-map' },
    { label: 'Origin Story', href: '#story' },
    { label: 'Telegraph', href: '#starlight-telegraph' },
    { label: 'Whisper a Dream', href: '#dream-drop' },
  ];

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        <a href="#" className="navbar-brand" aria-label="Pip's Midnight Observatory home">
          <div className="brand-icon-wrapper" aria-hidden="true">
            <span className="star-sparkle">✦</span>
            <span className="crescent-moon">☽</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">Pip&apos;s Observatory</span>
            <span className="brand-subtitle">Midnight Nursery · Cloud 9</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="navbar-actions">
          <div className="dream-btn-container">
            <button
              type="button"
              className={`btn-dream-mode ${dreamModeActive ? 'active' : ''}`}
              onClick={handleDreamClick}
              aria-label="Toggle Dream Mode ambiance"
            >
              <span className="dream-indicator" aria-hidden="true">
                {dreamModeActive ? '★' : '✧'}
              </span>
              <span className="dream-label-desktop">
                {dreamModeActive ? 'Dreaming...' : 'Enter Dream Mode'}
              </span>
              <span className="dream-label-tablet">
                {dreamModeActive ? 'Dreaming' : 'Dream Mode'}
              </span>
              <span className="dream-label-mobile">
                {dreamModeActive ? 'Dreaming' : 'Dream'}
              </span>
            </button>
            {showDreamNotice && (
              <div className="dream-notice-popup" role="status">
                <span className="sparkle-icon">✨</span>
                <span>
                  {dreamModeActive
                    ? 'Midnight aura awakened! Celestial telescope unlocks in Phase 2.'
                    : 'Sunlight returns gently to the nursery.'}
                </span>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-box" aria-hidden="true">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
