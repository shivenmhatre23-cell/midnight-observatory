import React from 'react';
import useMusicBox from '../hooks/useMusicBox';

export default function LullabyMusicBox({
  soundEnabled = false,
  onToggleSound = null,
}) {
  const { play, stop, isPlaying, activeNoteIndex, notes, error } = useMusicBox({ soundEnabled });

  return (
    <div className="lullaby-interactive-widget" role="region" aria-label="Interactive Lullaby Music Box">
      <div className="music-box-controls">
        <button
          type="button"
          onClick={play}
          disabled={isPlaying}
          className={`btn-audio-control btn-play ${isPlaying ? 'playing' : ''}`}
          aria-label={
            isPlaying
              ? soundEnabled
                ? 'Music box playing chimes'
                : 'Music box playing silent visual chimes'
              : soundEnabled
              ? 'Play gentle bedtime lullaby'
              : 'Play silent visual bedtime lullaby'
          }
        >
          <span className="btn-icon" aria-hidden="true">
            {isPlaying ? '♪' : '▶'}
          </span>
          <span>{isPlaying ? (soundEnabled ? 'Chiming...' : 'Animating...') : 'Wind & Play Box'}</span>
        </button>

        <button
          type="button"
          onClick={stop}
          disabled={!isPlaying}
          className="btn-audio-control btn-stop"
          aria-label="Stop lullaby playback"
        >
          <span className="btn-icon" aria-hidden="true">⏹</span>
          <span>Stop</span>
        </button>
      </div>

      {/* Global Audio Synchronization & Quick Unmute Prompt */}
      <div className="lullaby-sound-status-bar">
        {!soundEnabled ? (
          <div className="lullaby-mute-indicator">
            <span className="mute-tag">🔕 Chimes Muted (Visual Mode)</span>
            {onToggleSound && (
              <button
                type="button"
                className="btn-unmute-shortcut"
                onClick={onToggleSound}
                aria-label="Enable observatory sound chimes"
              >
                <span>Tap to Unmute</span>
                <span aria-hidden="true">🔔</span>
              </button>
            )}
          </div>
        ) : (
          <div className="lullaby-audio-indicator">
            <span className="audio-live-dot" aria-hidden="true" />
            <span className="audio-live-text">🔔 Chimes Active</span>
          </div>
        )}
      </div>

      {error && (
        <div className="audio-error-banner" role="alert">
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* Visual Chime Melody Tracker (for accessible/muted listening) */}
      <div className="melody-track-container" aria-label="Melody chime notes visualizer">
        <span className="tracker-lead-text">
          {isPlaying
            ? `Chiming Note ${activeNoteIndex !== null ? activeNoteIndex + 1 : '-'}: ${activeNoteIndex !== null ? notes[activeNoteIndex].note : ''}${!soundEnabled ? ' (Visual Mode)' : ''}`
            : !soundEnabled
            ? 'Click Wind & Play to watch the silent star chimes'
            : 'Click Wind & Play to hear the star chimes'}
        </span>

        <div
          className="notes-chime-bar"
          role="progressbar"
          aria-valuenow={activeNoteIndex !== null ? activeNoteIndex + 1 : 0}
          aria-valuemin={0}
          aria-valuemax={notes.length}
        >
          {notes.map((item, idx) => {
            const isActive = activeNoteIndex === idx;
            const isPassed = activeNoteIndex !== null && idx < activeNoteIndex;

            return (
              <div
                key={idx}
                className={`chime-pin ${isActive ? 'pin-active' : ''} ${isPassed ? 'pin-passed' : ''}`}
                title={`${item.label} (${item.note})`}
              >
                <span className="pin-dot"></span>
                <span className="pin-name">{item.note}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
