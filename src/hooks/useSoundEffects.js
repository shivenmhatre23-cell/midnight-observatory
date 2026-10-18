import { useState, useRef, useEffect, useCallback } from 'react';

export default function useSoundEffects() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem('pip-sound-effects-enabled') === 'true';
    } catch {
      return false; // Default to muted
    }
  });

  const audioCtxRef = useRef(null);

  const getAudioContext = useCallback(() => {
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return null;

      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtxClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume().catch(() => {});
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('pip-sound-effects-enabled', String(next));
      } catch {
        // Safe fallback
      }
      // If turning on, unlock AudioContext on this explicit user click
      if (next) {
        getAudioContext();
      }
      return next;
    });
  }, [getAudioContext]);

  // Clean up AudioContext on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // 1. Constellation completion chime (harmonious triple chord C5 + G5 + C6)
  const playConstellationSound = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 783.99, 1046.5]; // C5, G5, C6
      const startTime = ctx.currentTime + 0.02;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime + idx * 0.1);

        gain.gain.setValueAtTime(0, startTime + idx * 0.1);
        gain.gain.linearRampToValueAtTime(0.12, startTime + idx * 0.1 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + idx * 0.1 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime + idx * 0.1);
        osc.stop(startTime + idx * 0.1 + 1.25);
      });
    } catch {
      // Graceful fallback if audio is blocked
    }
  }, [soundEnabled, getAudioContext]);

  // 2. Secret Observatory discovery chime (ascending arpeggio E5 -> G5 -> B5 -> E6)
  const playSecretSound = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const notes = [659.25, 783.99, 987.77, 1318.51];
      const startTime = ctx.currentTime + 0.02;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime + idx * 0.08);

        gain.gain.setValueAtTime(0, startTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.1, startTime + idx * 0.08 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + idx * 0.08 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime + idx * 0.08);
        osc.stop(startTime + idx * 0.08 + 0.95);
      });
    } catch {
      // Graceful fallback
    }
  }, [soundEnabled, getAudioContext]);

  // 3. Dream note submitted chime (gentle dual bell ping G5 -> C6)
  const playDreamSubmittedSound = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const notes = [783.99, 1046.5];
      const startTime = ctx.currentTime + 0.02;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime + idx * 0.12);

        gain.gain.setValueAtTime(0, startTime + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.1, startTime + idx * 0.12 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + idx * 0.12 + 0.85);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime + idx * 0.12);
        osc.stop(startTime + idx * 0.12 + 0.9);
      });
    } catch {
      // Graceful fallback
    }
  }, [soundEnabled, getAudioContext]);

  // 4. Catch falling dream star ping (gentle high bell chime C6)
  const playCatchSound = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const startTime = ctx.currentTime + 0.01;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1046.5, startTime); // C6
      osc.frequency.exponentialRampToValueAtTime(1318.5, startTime + 0.08); // E6

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.08, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    } catch {
      // Graceful fallback
    }
  }, [soundEnabled, getAudioContext]);

  return {
    soundEnabled,
    toggleSound,
    playConstellationSound,
    playSecretSound,
    playDreamSubmittedSound,
    playCatchSound,
  };
}
