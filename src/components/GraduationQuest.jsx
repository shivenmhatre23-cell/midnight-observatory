import React, { useRef, useEffect, useState, useId } from 'react';
import confetti from 'canvas-confetti';
import { COMPANIONS } from '../data/companionData';
import { renderCertificateToCanvas, downloadCertificatePng } from '../utils/certificateGenerator';

export default function GraduationQuest({
  questData,
  completedMilestonesCount,
  isGraduated,
  newlyUnlocked,
  onUpdateNickname,
  soundEnabled = false,
  onPlayChime = null,
}) {
  const canvasRef = useRef(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadError, setDownloadError] = useState(null);

  const nicknameInputId = useId();

  // Re-render certificate canvas when data changes
  useEffect(() => {
    if (canvasRef.current) {
      renderCertificateToCanvas(canvasRef.current, {
        nickname: questData.apprenticeNickname,
        highScore: questData.highScore,
        completedMilestonesCount,
        unlockedCompanions: questData.unlockedCompanions,
        favoriteAura: questData.favoriteAura,
        isGraduated,
      });
    }
  }, [questData, completedMilestonesCount, isGraduated]);

  // Handle Nickname input change safely
  const handleNicknameChange = (e) => {
    onUpdateNickname(e.target.value);
  };

  // Handle Certificate PNG download
  const handleDownload = () => {
    setDownloadError(null);
    try {
      if (!canvasRef.current) {
        throw new Error('Certificate preview is still rendering. Please try again.');
      }

      downloadCertificatePng(canvasRef.current, questData.apprenticeNickname);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4500);

      // Trigger gentle celebratory chime & confetti if available
      if (soundEnabled && onPlayChime) {
        onPlayChime();
      }

      try {
        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!isReduced && typeof confetti === 'function') {
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#f3c96b', '#9ec5fe', '#f4d6d7', '#ffffff'],
          });
        }
      } catch {
        // Safe failover
      }
    } catch (err) {
      setDownloadError(err.message || 'Unable to download certificate.');
    }
  };

  return (
    <section
      className="graduation-quest-section"
      id="graduation-quest"
      aria-labelledby="quest-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="quest-eyebrow-badge">
            <span className="quest-spark" aria-hidden="true">✦</span>
            <span>The Observatory’s Little Adventure</span>
          </div>

          <h2 id="quest-heading" className="section-title">
            The Junior Dream Engineer Graduation Quest
          </h2>

          <p className="section-subtitle quest-narrative">
            “Every great Dream Engineer starts somewhere. Explore my little observatory, gather a
            little starlight, and meet the tiny guardians of the midnight sky. When you’re ready,
            I’ll prepare your very own Apprentice Certificate!”
          </p>
        </div>

        {/* Transient Celebration Banner */}
        {newlyUnlocked && (
          <div className="quest-unlock-toast" role="status" aria-live="polite">
            <span className="toast-sparkle" aria-hidden="true">✨</span>
            <span className="toast-message">{newlyUnlocked}</span>
          </div>
        )}

        {/* Quest Progress Tracker Card */}
        <div className="quest-tracker-card" role="region" aria-label="Quest Discovery Tracker">
          <div className="tracker-header">
            <div className="tracker-lead">
              <span className="tracker-compass-icon" aria-hidden="true">🧭</span>
              <span className="tracker-title">Graduation Progress:</span>
              <strong className="tracker-count">
                {completedMilestonesCount} of 3 Discoveries
              </strong>
            </div>

            <div className="tracker-badge-status">
              {isGraduated ? (
                <span className="quest-status-badge graduated">
                  🌟 Full Observatory Graduation Achieved!
                </span>
              ) : (
                <span className="quest-status-badge in-progress">
                  ✦ Apprentice in Training
                </span>
              )}
            </div>
          </div>

          <div
            className="quest-progress-track"
            role="progressbar"
            aria-valuenow={completedMilestonesCount}
            aria-valuemin={0}
            aria-valuemax={3}
            aria-label={`Graduation quest progress: ${completedMilestonesCount} of 3 milestones completed`}
          >
            <div
              className="quest-progress-fill"
              style={{ width: `${(completedMilestonesCount / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* 3 Milestones Grid */}
        <div className="quest-milestones-grid">
          {/* Milestone A */}
          <div className={`milestone-card ${questData.milestoneA ? 'completed' : 'locked'}`}>
            <div className="milestone-top">
              <div className="milestone-icon-wrap" aria-hidden="true">
                <span>⭐</span>
              </div>
              <span className={`milestone-pill ${questData.milestoneA ? 'done' : 'pending'}`}>
                {questData.milestoneA ? '✓ Milestone Complete' : 'Milestone A'}
              </span>
            </div>

            <h3 className="milestone-title">Catch the Dream Stars</h3>
            <p className="milestone-desc">
              Gather slumbering stars drifting above Cloud 9 by playing at least one round of
              <strong> Catch the Falling Dreams</strong>.
            </p>

            <div className="milestone-proof-box">
              {questData.milestoneA ? (
                <div className="proof-content completed">
                  <span className="proof-check" aria-hidden="true">✦</span>
                  <span>
                    Highest Harvest Recorded: <strong>{questData.highScore} Stars</strong>
                  </span>
                </div>
              ) : (
                <div className="proof-content pending">
                  <span className="proof-hint" aria-hidden="true">🔒</span>
                  <span>Play one round below to complete this milestone.</span>
                </div>
              )}
            </div>

            <a href="#falling-dreams" className="btn-milestone-jump">
              <span>{questData.milestoneA ? 'Play Again' : 'Catch Dreams'}</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          {/* Milestone B */}
          <div className={`milestone-card ${questData.milestoneB ? 'completed' : 'locked'}`}>
            <div className="milestone-top">
              <div className="milestone-icon-wrap" aria-hidden="true">
                <span>⛵</span>
              </div>
              <span className={`milestone-pill ${questData.milestoneB ? 'done' : 'pending'}`}>
                {questData.milestoneB ? '✓ Milestone Complete' : 'Milestone B'}
              </span>
            </div>

            <h3 className="milestone-title">Deliver a Dream</h3>
            <p className="milestone-desc">
              Chart nocturnal skyways and dispatch a warm dream to any destination along Pip’s
              <strong> Dream Delivery Flight Map</strong>.
            </p>

            <div className="milestone-proof-box">
              {questData.milestoneB ? (
                <div className="proof-content completed">
                  <span className="proof-check" aria-hidden="true">✦</span>
                  <span>Dream successfully dispatched across the nocturnal skyways!</span>
                </div>
              ) : (
                <div className="proof-content pending">
                  <span className="proof-hint" aria-hidden="true">🔒</span>
                  <span>Steer Pip’s skiff to a waypoint on the flight map.</span>
                </div>
              )}
            </div>

            <a href="#flight-map" className="btn-milestone-jump">
              <span>{questData.milestoneB ? 'View Skyways' : 'Dispatch a Dream'}</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>

          {/* Milestone C */}
          <div className={`milestone-card ${questData.milestoneC ? 'completed' : 'locked'}`}>
            <div className="milestone-top">
              <div className="milestone-icon-wrap" aria-hidden="true">
                <span>🔭</span>
              </div>
              <span className={`milestone-pill ${questData.milestoneC ? 'done' : 'pending'}`}>
                {questData.milestoneC ? '✓ Milestone Complete' : 'Milestone C'}
              </span>
            </div>

            <h3 className="milestone-title">Discover the Celestial Moth</h3>
            <p className="milestone-desc">
              Seek out Pip’s secret observatory loft and solve the four-star constellation puzzle
              hidden in the clouds.
            </p>

            <div className="milestone-proof-box">
              {questData.milestoneC ? (
                <div className="proof-content completed">
                  <span className="proof-check" aria-hidden="true">✦</span>
                  <span>Loft discovered & all 4 celestial stars awakened!</span>
                </div>
              ) : (
                <div className="proof-content pending">
                  <span className="proof-hint" aria-hidden="true">🔒</span>
                  <span>Inspect the telescope in the footer to peek inside the loft.</span>
                </div>
              )}
            </div>

            <a href="#observatory" className="btn-milestone-jump">
              <span>{questData.milestoneC ? 'Revisit Secret Loft' : 'Search Observatory'}</span>
              <span className="btn-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Feature 2: Celestial Companions Collection Panel */}
        <div className="companions-panel" role="region" aria-labelledby="companions-heading">
          <div className="companions-header text-center">
            <span className="companions-eyebrow">Pip’s Sky Menagerie</span>
            <h3 id="companions-heading" className="companions-title">
              Unlockable Celestial Companions
            </h3>
            <p className="companions-subtitle">
              Tiny nocturnal guardians who watch over the slumbering realm. Each companion joins
              your side when you complete their signature quest discovery.
            </p>
          </div>

          <div className="companions-grid">
            {COMPANIONS.map((companion) => {
              const isUnlocked = questData.unlockedCompanions.includes(companion.id);

              return (
                <article
                  key={companion.id}
                  className={`companion-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                  style={{ '--companion-accent': companion.accentColor }}
                >
                  <div className="companion-visual-box">
                    {companion.svgArt(!isUnlocked)}
                    <span className="companion-badge-pill">
                      {isUnlocked ? `✦ ${companion.name}` : '🔒 Mystery Companion'}
                    </span>
                  </div>

                  <div className="companion-body">
                    <h4 className="companion-name">
                      {isUnlocked ? companion.name : 'Hidden Sky Guardian'}
                    </h4>
                    <span className="companion-role">
                      {isUnlocked ? companion.title : 'Awaiting Stargazer Discovery'}
                    </span>

                    {isUnlocked ? (
                      <>
                        <p className="companion-personality">
                          <strong>Nature:</strong> {companion.personality}
                        </p>
                        <p className="companion-lore">{companion.lore}</p>
                      </>
                    ) : (
                      <div className="companion-lock-info">
                        <span className="lock-icon" aria-hidden="true">🗝️</span>
                        <p className="lock-clue">
                          <strong>How to unlock:</strong> {companion.unlockCondition}
                        </p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Feature 3: Personalized Apprentice Certificate Generator */}
        <div className="certificate-section-card" role="region" aria-labelledby="certificate-heading">
          <div className="certificate-header text-center">
            <span className="cert-eyebrow">Ceremonial Keepsake</span>
            <h3 id="certificate-heading" className="cert-title">
              Personalized Apprentice Certificate
            </h3>
            <p className="cert-subtitle">
              Awarded by Pip atop Cloud 9 to commemorate your time in the Midnight Observatory.
              Enter your stargazing nickname and download a crisp, high-resolution PNG keepsake.
            </p>
          </div>

          {/* Nickname Customization Bar */}
          <div className="certificate-controls-bar">
            <div className="nickname-input-group">
              <label htmlFor={nicknameInputId} className="nickname-label">
                <span>Stargazer Nickname:</span>
                <span className="nickname-hint">(shown on certificate)</span>
              </label>
              <input
                id={nicknameInputId}
                type="text"
                className="input-nickname"
                value={questData.apprenticeNickname}
                onChange={handleNicknameChange}
                maxLength={28}
                placeholder="Stargazer"
                aria-label="Enter your nickname for the certificate"
              />
            </div>

            <div className="certificate-status-summary">
              <div className="summary-pill">
                <span className="pill-dot-gold" aria-hidden="true" />
                <span>Score: <strong>{questData.highScore} Stars</strong></span>
              </div>
              <div className="summary-pill">
                <span className="pill-dot-gold" aria-hidden="true" />
                <span>Aura: <strong>{questData.favoriteAura.replace(/\(.*\)/, '').trim()}</strong></span>
              </div>
              <div className="summary-pill">
                <span className="pill-dot-gold" aria-hidden="true" />
                <span>Companions: <strong>{questData.unlockedCompanions.length} / 3</strong></span>
              </div>
            </div>
          </div>

          {/* Live Certificate Canvas Preview */}
          <div className="certificate-canvas-wrapper">
            <canvas
              ref={canvasRef}
              className="certificate-canvas-preview"
              aria-label={`Preview of ${questData.apprenticeNickname}'s Junior Dream Engineer Certificate`}
            />
          </div>

          {/* Download Action & Feedback */}
          <div className="certificate-actions-bar text-center">
            <button
              type="button"
              className="btn-download-cert"
              onClick={handleDownload}
              aria-label="Download your official Junior Dream Engineer Certificate as a high-resolution PNG image"
            >
              <span className="cert-btn-icon" aria-hidden="true">📜</span>
              <span>Download My Certificate (PNG)</span>
            </button>

            {downloadSuccess && (
              <div className="cert-feedback success" role="status" aria-live="polite">
                ✨ Certificate generated and downloaded successfully! Check your downloads folder.
              </div>
            )}

            {downloadError && (
              <div className="cert-feedback error" role="alert">
                ⚠️ {downloadError}
              </div>
            )}

            <p className="certificate-disclaimer">
              {isGraduated
                ? '🌟 All 3 milestones verified! Your certificate is officially certified with the Full Observatory Graduation Seal.'
                : '✦ In-Training Accreditation: Complete remaining milestones to earn the Full Observatory Graduation Seal.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
