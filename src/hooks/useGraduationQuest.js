import { useState, useCallback, useEffect } from 'react';

const QUEST_STORAGE_KEY = 'pip-graduation-quest-v1';
const HIGH_SCORE_KEY = 'pip-high-score';
const VISITOR_LOG_KEY = 'pip-visitor-log';

function safeGetJson(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function safeSetJson(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Fail gracefully if localStorage is disabled / quota exceeded
  }
}

/**
 * Initialize quest state, reconciling with existing game records if present.
 */
function getInitialQuestData() {
  const saved = safeGetJson(QUEST_STORAGE_KEY, null);

  // If previous quest data was saved (including explicitly reset milestones), respect it
  if (saved !== null) {
    return {
      milestoneA: !!saved.milestoneA,
      milestoneB: !!saved.milestoneB,
      milestoneC: !!saved.milestoneC,
      highScore: typeof saved.highScore === 'number' ? saved.highScore : 0,
      unlockedCompanions: Array.isArray(saved.unlockedCompanions) ? saved.unlockedCompanions : [],
      favoriteAura: saved.favoriteAura || 'Honey Amber (2200K)',
      apprenticeNickname: saved.apprenticeNickname || 'Stargazer',
    };
  }

  // Check existing high score from prior sessions (only for first-time migration)
  let existingHighScore = 0;
  try {
    const hsVal = parseInt(localStorage.getItem(HIGH_SCORE_KEY) || '0', 10);
    if (!isNaN(hsVal)) existingHighScore = hsVal;
  } catch {
    existingHighScore = 0;
  }

  // Also check existing visitor logbook
  const visitorLog = safeGetJson(VISITOR_LOG_KEY, null);
  if (visitorLog && typeof visitorLog.highScore === 'number') {
    existingHighScore = Math.max(existingHighScore, visitorLog.highScore);
  }

  const milestoneA = existingHighScore > 0;
  const companions = new Set();
  if (existingHighScore >= 100) companions.add('golden-badger');

  return {
    milestoneA,
    milestoneB: false,
    milestoneC: false,
    highScore: existingHighScore,
    unlockedCompanions: Array.from(companions),
    favoriteAura: 'Honey Amber (2200K)',
    apprenticeNickname: 'Stargazer',
  };
}

export default function useGraduationQuest() {
  const [questData, setQuestData] = useState(getInitialQuestData);
  const [newlyUnlocked, setNewlyUnlocked] = useState(null);

  // Auto-clear celebration notification
  useEffect(() => {
    if (!newlyUnlocked) return;
    const timer = setTimeout(() => setNewlyUnlocked(null), 4500);
    return () => clearTimeout(timer);
  }, [newlyUnlocked]);

  // Persist whenever questData changes
  const persistQuest = useCallback((updater) => {
    setQuestData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      safeSetJson(QUEST_STORAGE_KEY, next);
      return next;
    });
  }, []);

  // Milestone A: Game round completed
  const recordGameCompletion = useCallback((score) => {
    const validScore = typeof score === 'number' && !isNaN(score) ? score : 0;

    persistQuest((prev) => {
      const nextHighScore = Math.max(prev.highScore, validScore);
      const unlockBarnaby = nextHighScore >= 100;
      const companions = new Set(prev.unlockedCompanions);

      let newUnlockMsg = null;
      if (!prev.milestoneA) {
        newUnlockMsg = 'Milestone Unlocked: Catch the Dream Stars! 🌟';
      }

      if (unlockBarnaby && !companions.has('golden-badger')) {
        companions.add('golden-badger');
        newUnlockMsg = 'Barnaby the Golden Badger has joined your sky companions! 🦡✨';
      }

      if (newUnlockMsg) setNewlyUnlocked(newUnlockMsg);

      return {
        ...prev,
        milestoneA: true,
        highScore: nextHighScore,
        unlockedCompanions: Array.from(companions),
      };
    });
  }, [persistQuest]);

  // Milestone B: Dream delivered via map
  const recordDreamDelivery = useCallback((_destination) => {
    persistQuest((prev) => {
      const companions = new Set(prev.unlockedCompanions);
      let newUnlockMsg = null;

      if (!prev.milestoneB) {
        newUnlockMsg = 'Milestone Unlocked: Dream Delivery Dispatched! ⛵';
      }

      if (!companions.has('cloud-kitten')) {
        companions.add('cloud-kitten');
        newUnlockMsg = 'Cloud Kitten has curled up among your companions! 🐱☁️';
      }

      if (newUnlockMsg) setNewlyUnlocked(newUnlockMsg);

      return {
        ...prev,
        milestoneB: true,
        unlockedCompanions: Array.from(companions),
      };
    });
  }, [persistQuest]);

  // Milestone C: Easter egg puzzle solved
  const recordEasterEggSolved = useCallback(() => {
    persistQuest((prev) => {
      const companions = new Set(prev.unlockedCompanions);
      let newUnlockMsg = null;

      if (!prev.milestoneC) {
        newUnlockMsg = 'Milestone Unlocked: Secret Observatory Loft Discovered! 🔭';
      }

      if (!companions.has('celestial-moth')) {
        companions.add('celestial-moth');
        newUnlockMsg = 'The Celestial Moth has emerged into your sky collection! 🦋✨';
      }

      if (newUnlockMsg) setNewlyUnlocked(newUnlockMsg);

      return {
        ...prev,
        milestoneC: true,
        unlockedCompanions: Array.from(companions),
      };
    });
  }, [persistQuest]);

  // Update favorite Bedside Aura preference
  const recordFavoriteAura = useCallback((auraName) => {
    if (!auraName || typeof auraName !== 'string') return;
    persistQuest((prev) => ({
      ...prev,
      favoriteAura: auraName,
    }));
  }, [persistQuest]);

  // Update apprentice nickname
  const updateNickname = useCallback((nickname) => {
    const sanitized = (nickname || 'Stargazer').slice(0, 32).trim() || 'Stargazer';
    persistQuest((prev) => ({
      ...prev,
      apprenticeNickname: sanitized,
    }));
  }, [persistQuest]);

  // Derived progress stats
  const completedMilestonesCount =
    (questData.milestoneA ? 1 : 0) +
    (questData.milestoneB ? 1 : 0) +
    (questData.milestoneC ? 1 : 0);

  const isGraduated = completedMilestonesCount === 3;

  // Reset all quest milestones and sky companions
  const resetQuest = useCallback(() => {
    const freshState = {
      milestoneA: false,
      milestoneB: false,
      milestoneC: false,
      highScore: 0,
      unlockedCompanions: [],
      favoriteAura: 'Honey Amber (2200K)',
      apprenticeNickname: questData.apprenticeNickname || 'Stargazer',
    };
    safeSetJson(QUEST_STORAGE_KEY, freshState);
    setQuestData(freshState);
    setNewlyUnlocked('Quest milestones have been reset! Begin your adventure anew ✨');
  }, [questData.apprenticeNickname]);

  return {
    questData,
    completedMilestonesCount,
    isGraduated,
    newlyUnlocked,
    recordGameCompletion,
    recordDreamDelivery,
    recordEasterEggSolved,
    recordFavoriteAura,
    updateNickname,
    resetQuest,
  };
}
