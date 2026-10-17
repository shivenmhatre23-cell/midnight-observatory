import React from 'react';
import useMusicBox from '../hooks/useMusicBox';

export default function LullabyMusicBox() {
  const { play, stop, isPlaying, activeNoteIndex, notes, error } = useMusicBox();

  return (
    <div className="lullaby-interactive-widget" role="region" aria-label="Interactive Lullaby Music Box">
      <div className="music-box-controls">
        <button
          type="button"
          onClick={play}
          disabled={isPlaying}
          className={`btn-audio-control btn-play ${isPlaying ? 'playing' : ''}`}
          aria-label={isPlaying ? 'Music box playing' : 'Play gentle bedtime lullaby'}
        >
          <span className="btn-icon" aria-hidden="true">
            {isPlaying ? '♪' : '▶'}
          </span>
          <span>{isPlaying ? 'Chiming...' : 'Wind & Play Box'}</span>
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

      {error && (
        <div className="audio-error-banner" role="alert">
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* Visual Chime Melody Tracker (for accessible/muted listening) */}
      <div className="melody-track-container" aria-label="Melody chime notes visualizer">
        <span className="tracker-lead-text">
          {isPlaying
            ? `Chiming Note ${activeNoteIndex !== null ? activeNoteIndex + 1 : '-'}: ${activeNoteIndex !== null ? notes[activeNoteIndex].note : ''}`
            : 'Click Wind & Play to hear the star chimes'}
        </span>

        <div className="notes-chime-bar" role="progressbar" aria-valuenow={activeNoteIndex !== null ? activeNoteIndex + 1 : 0} aria-valuemin={0} aria-valuemax={notes.length}>
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
