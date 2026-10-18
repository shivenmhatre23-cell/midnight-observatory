import { useState, useCallback } from 'react';

const STORAGE_KEY = 'pip-visitor-log';
const HIGH_SCORE_KEY = 'pip-high-score';
const SESSION_VISITED_KEY = 'pip-session-visited';
const SESSION_DISMISSED_KEY = 'pip-greeting-dismissed';

/**
 * Safely parse JSON from localStorage
 */
function safeGetJson(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Safely write JSON to localStorage
 */
function safeSetJson(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Fail silently if storage is blocked (e.g. private browsing quota)
  }
}

/**
 * Initialize visitor state once during mount
 */
function getInitialVisitorData() {
  let storedHighScore = 0;
  try {
    storedHighScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10);
    if (isNaN(storedHighScore)) storedHighScore = 0;
  } catch {
    storedHighScore = 0;
  }

  const existing = safeGetJson(STORAGE_KEY, null);
  const now = Date.now();

  try {
    const alreadyVisitedInSession = sessionStorage.getItem(SESSION_VISITED_KEY);
    if (!alreadyVisitedInSession) {
      sessionStorage.setItem(SESSION_VISITED_KEY, 'true');

      let updated;
      if (existing && typeof existing.visits === 'number') {
        updated = {
          visits: existing.visits + 1,
          firstVisit: existing.firstVisit || now,
          lastVisit: now,
          prevVisit: existing.lastVisit || null,
          highScore: Math.max(existing.highScore || 0, storedHighScore),
          sessionStart: now,
        };
      } else {
        updated = {
          visits: 1,
          firstVisit: now,
          lastVisit: now,
          prevVisit: null,
          highScore: storedHighScore,
          sessionStart: now,
        };
      }

      safeSetJson(STORAGE_KEY, updated);
      return updated;
    }
  } catch {
    // Sandboxed iframe / disabled storage fallback
  }

  if (existing && typeof existing.visits === 'number') {
    return {
      visits: existing.visits,
      firstVisit: existing.firstVisit || now,
      lastVisit: existing.lastVisit || now,
      prevVisit: existing.prevVisit || null,
      highScore: Math.max(existing.highScore || 0, storedHighScore),
      sessionStart: existing.sessionStart || now,
    };
  }

  return {
    visits: 1,
    firstVisit: now,
    lastVisit: now,
    prevVisit: null,
    highScore: storedHighScore,
    sessionStart: now,
  };
}

/**
 * Hook to manage returning visitor memory, contextual greetings, and mini-game high scores.
 * Uses localStorage only — zero external tracking, zero PII collection.
 */
export default function useVisitorLogbook() {
  const [visitorData, setVisitorData] = useState(getInitialVisitorData);

  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_DISMISSED_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Update high score callback
  const updateHighScore = useCallback((score) => {
    if (typeof score !== 'number' || isNaN(score)) return;

    setVisitorData((prev) => {
      const nextHigh = Math.max(prev.highScore || 0, score);
      if (nextHigh > (prev.highScore || 0)) {
        try {
          localStorage.setItem(HIGH_SCORE_KEY, String(nextHigh));
        } catch {
          // ignore
        }
        const updated = { ...prev, highScore: nextHigh };
        safeSetJson(STORAGE_KEY, updated);
        return updated;
      }
      return prev;
    });
  }, []);

  // Dismiss greeting for the current session
  const dismissGreeting = useCallback(() => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem(SESSION_DISMISSED_KEY, 'true');
    } catch {
      // ignore
    }
  }, []);

  // Generate in-character Pip greeting text based on visitor history
  const isReturning = (visitorData.visits || 1) > 1;

  let greetingTitle = '';
  let greetingBody = '';

  if (!isReturning) {
    greetingTitle = '✦ First time above the clouds?';
    greetingBody = 'Welcome to the Midnight Observatory! Pip fluffed up a warm chamomile cloud for your visit.';
  } else {
    greetingTitle = `🌟 Welcome back to Cloud 9! (Visit #${visitorData.visits})`;

    // Compute friendly time-since-last-visit using sessionStart snapshot
    const prevTime = visitorData.prevVisit || visitorData.lastVisit;
    const diffHours = (visitorData.sessionStart - prevTime) / (1000 * 60 * 60);

    let timeNote = 'Pip kept your telescope polished!';
    if (diffHours < 1) {
      timeNote = 'Pip just brewed a fresh kettle of starlight tea!';
    } else if (diffHours < 24) {
      timeNote = 'Wonderful to see you back under the night sky again today.';
    } else {
      timeNote = 'The constellations were waiting for your return.';
    }

    if (visitorData.highScore > 0) {
      greetingBody = `${timeNote} Your dream-gathering record: ${visitorData.highScore} pts ⭐`;
    } else {
      greetingBody = `${timeNote} Explore Pip's latest inventions or catch falling dreams below!`;
    }
  }

  return {
    visits: visitorData.visits,
    isReturning,
    highScore: visitorData.highScore,
    updateHighScore,
    isDismissed,
    dismissGreeting,
    greetingTitle,
    greetingBody,
  };
}
