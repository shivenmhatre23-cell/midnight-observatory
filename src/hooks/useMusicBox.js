import { useState, useRef, useEffect, useCallback } from 'react';

// Original calming lullaby sequence (100% original, copyright-free)
const MELODY = [
  { note: 'C5', freq: 523.25, time: 0.0, label: 'Star chime 1' },
  { note: 'E5', freq: 659.25, time: 0.6, label: 'Star chime 2' },
  { note: 'G5', freq: 783.99, time: 1.2, label: 'Star chime 3' },
  { note: 'A5', freq: 880.00, time: 1.8, label: 'Star chime 4' },
  { note: 'G5', freq: 783.99, time: 2.5, label: 'Star chime 5' },
  { note: 'E5', freq: 659.25, time: 3.1, label: 'Star chime 6' },
  { note: 'D5', freq: 587.33, time: 3.7, label: 'Star chime 7' },
  { note: 'C5', freq: 523.25, time: 4.3, label: 'Star chime 8' },
  { note: 'D5', freq: 587.33, time: 5.0, label: 'Star chime 9' },
  { note: 'E5', freq: 659.25, time: 5.6, label: 'Star chime 10' },
  { note: 'C5', freq: 523.25, time: 6.3, label: 'Bedtime Rest' },
];

const TOTAL_DURATION_MS = 7500;

export default function useMusicBox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNoteIndex, setActiveNoteIndex] = useState(null);
  const [error, setError] = useState(null);

  const audioCtxRef = useRef(null);
  const activeNodesRef = useRef([]);
  const timerHandlesRef = useRef([]);

  // Clean stop for all scheduled audio and UI timers
  const stop = useCallback(() => {
    // 1. Clear UI and finish timers
    timerHandlesRef.current.forEach((id) => clearTimeout(id));
    timerHandlesRef.current = [];

    // 2. Silence all active oscillators quickly and smoothly
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state !== 'closed') {
      const now = ctx.currentTime;
      activeNodesRef.current.forEach(({ osc, harmonicOsc, gainNode }) => {
        try {
          gainNode.gain.cancelScheduledValues(now);
          gainNode.gain.setValueAtTime(gainNode.gain.value, now);
          gainNode.gain.linearRampToValueAtTime(0.0001, now + 0.04);
          setTimeout(() => {
            try {
              osc.stop();
              harmonicOsc.stop();
              osc.disconnect();
              harmonicOsc.disconnect();
              gainNode.disconnect();
            } catch {
              // Ignore if already disconnected
            }
          }, 50);
        } catch {
          // Ignore if node already inactive
        }
      });
    }

    activeNodesRef.current = [];
    setIsPlaying(false);
    setActiveNoteIndex(null);
  }, []);

  const play = useCallback(async () => {
    // Prevent overlapping sessions
    if (isPlaying) return;

    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) {
        setError('Web Audio is not supported in this browser.');
        return;
      }

      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtxClass();
      }

      const ctx = audioCtxRef.current;

      // Browser policy: resume audio context after user interaction
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      setIsPlaying(true);
      setError(null);
      activeNodesRef.current = [];

      const startTime = ctx.currentTime + 0.05;

      MELODY.forEach((item, index) => {
        const noteStartTime = startTime + item.time;

        // Primary fundamental bell oscillator
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.freq, noteStartTime);

        // Harmonic sparkle overtone (octave higher, subtle bell shimmer)
        const harmonicOsc = ctx.createOscillator();
        harmonicOsc.type = 'sine';
        harmonicOsc.frequency.setValueAtTime(item.freq * 2, noteStartTime);

        // Dedicated note gain node with bell decay envelope
        const noteGain = ctx.createGain();
        noteGain.gain.setValueAtTime(0, noteStartTime);
        noteGain.gain.linearRampToValueAtTime(0.18, noteStartTime + 0.015);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, noteStartTime + 1.25);

        // Subtle harmonic gain
        const harmonicGain = ctx.createGain();
        harmonicGain.gain.setValueAtTime(0.04, noteStartTime);

        harmonicOsc.connect(harmonicGain);
        harmonicGain.connect(noteGain);
        osc.connect(noteGain);
        noteGain.connect(ctx.destination);

        osc.start(noteStartTime);
        harmonicOsc.start(noteStartTime);

        const noteStopTime = noteStartTime + 1.3;
        osc.stop(noteStopTime);
        harmonicOsc.stop(noteStopTime);

        activeNodesRef.current.push({ osc, harmonicOsc, gainNode: noteGain });

        // Synchronize visual note highlight for accessibility / muted visitors
        const uiTimer = setTimeout(() => {
          setActiveNoteIndex(index);
        }, item.time * 1000);
        timerHandlesRef.current.push(uiTimer);
      });

      // Finish timer
      const finishTimer = setTimeout(() => {
        setIsPlaying(false);
        setActiveNoteIndex(null);
      }, TOTAL_DURATION_MS);
      timerHandlesRef.current.push(finishTimer);
    } catch {
      setError('Could not initialize audio playback.');
      setIsPlaying(false);
      setActiveNoteIndex(null);
    }
  }, [isPlaying]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stop();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stop]);

  return {
    play,
    stop,
    isPlaying,
    activeNoteIndex,
    notes: MELODY,
    error,
  };
}
