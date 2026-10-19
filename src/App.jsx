import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CharacterIntro from './components/CharacterIntro';
import ProjectShowcase from './components/ProjectShowcase';
import DreamDeliveryMap from './components/DreamDeliveryMap';
import StoryPreview from './components/StoryPreview';
import StarlightTelegraph from './components/StarlightTelegraph';
import DreamDropForm from './components/DreamDropForm';
import FallingDreamsGame from './components/FallingDreamsGame';
import GraduationQuest from './components/GraduationQuest';
import Footer from './components/Footer';
import SparkleCursor from './components/SparkleCursor';
import useSoundEffects from './hooks/useSoundEffects';
import useVisitorLogbook from './hooks/useVisitorLogbook';
import useGraduationQuest from './hooks/useGraduationQuest';
import './App.css';

function App() {
  const [dreamModeActive, setDreamModeActive] = useState(() => {
    try {
      return localStorage.getItem('pip-dream-mode') === 'true';
    } catch {
      return false;
    }
  });
  const [sparklesEnabled, setSparklesEnabled] = useState(() => {
    try {
      return localStorage.getItem('pip-sparkles-enabled') === 'true';
    } catch {
      return false;
    }
  });

  const {
    soundEnabled,
    toggleSound,
    playConstellationSound,
    playSecretSound,
    playDreamSubmittedSound,
    playCatchSound,
  } = useSoundEffects();

  const visitorLogbook = useVisitorLogbook();
  const graduationQuest = useGraduationQuest();

  // Defer preloading alternate theme hero asset during browser idle time
  useEffect(() => {
    const preloadAlternateHero = () => {
      const altHeroSrc = dreamModeActive
        ? `${import.meta.env.BASE_URL}images/pip_avatar_cloud.png`
        : `${import.meta.env.BASE_URL}images/pip_avatar_cloud_dream_mode.png`;
      const img = new Image();
      img.src = altHeroSrc;
    };

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(preloadAlternateHero, { timeout: 2500 });
      return () => window.cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(preloadAlternateHero, 1200);
      return () => clearTimeout(timer);
    }
  }, [dreamModeActive]);

  useEffect(() => {
    if (dreamModeActive) {
      document.body.classList.add('dream-mode-active');
    } else {
      document.body.classList.remove('dream-mode-active');
    }
    try {
      localStorage.setItem('pip-dream-mode', String(dreamModeActive));
    } catch {
      // Safe fallback if localStorage is blocked
    }
  }, [dreamModeActive]);

  const toggleDreamMode = () => {
    setDreamModeActive((prev) => !prev);
  };

  const toggleSparkles = () => {
    setSparklesEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('pip-sparkles-enabled', String(next));
      } catch {
        // Safe fallback if localStorage is blocked
      }
      return next;
    });
  };

  return (
    <div className="app-wrapper">
      {/* Decorative celestial background layer */}
      <div className="starfield-layer" aria-hidden="true" />

      {/* Navigation */}
      <Navbar
        onToggleDreamMode={toggleDreamMode}
        dreamModeActive={dreamModeActive}
      />

      {/* Main Content Area */}
      <main>
        {/* Hero Section */}
        <Hero
          dreamModeActive={dreamModeActive}
          visitorLogbook={visitorLogbook}
          soundEnabled={soundEnabled}
          onPlayReactionSound={playConstellationSound}
        />

        {/* Character Introduction Section */}
        <CharacterIntro dreamModeActive={dreamModeActive} />

        {/* Project Showcase Section */}
        <ProjectShowcase
          onConstellationComplete={playConstellationSound}
          dreamModeActive={dreamModeActive}
          onAuraSelect={graduationQuest.recordFavoriteAura}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
        />

        {/* Dream Delivery Flight Map Section (Phase 7) */}
        <DreamDeliveryMap
          soundEnabled={soundEnabled}
          onPlayDeliverySound={playDreamSubmittedSound}
          dreamModeActive={dreamModeActive}
          onDreamDelivered={graduationQuest.recordDreamDelivery}
        />

        {/* Junior Dream Engineer Graduation Quest & Sky Companions */}
        <GraduationQuest
          questData={graduationQuest.questData}
          completedMilestonesCount={graduationQuest.completedMilestonesCount}
          isGraduated={graduationQuest.isGraduated}
          newlyUnlocked={graduationQuest.newlyUnlocked}
          onUpdateNickname={graduationQuest.updateNickname}
          dreamModeActive={dreamModeActive}
          soundEnabled={soundEnabled}
          onPlayChime={playConstellationSound}
        />

        {/* Origin Story Preview Section */}
        <StoryPreview />

        {/* Starlight Telegraph Dialogue Console */}
        <StarlightTelegraph
          dreamModeActive={dreamModeActive}
          soundEnabled={soundEnabled}
          onPlayChime={playConstellationSound}
          highScore={visitorLogbook.highScore}
        />

        {/* Ephemeral Dream Drop Form Section */}
        <DreamDropForm onDreamSubmitted={playDreamSubmittedSound} />

        {/* Catch the Falling Dreams Mini-Game (Phase 8) */}
        <FallingDreamsGame
          soundEnabled={soundEnabled}
          onCatchSound={playCatchSound}
          dreamModeActive={dreamModeActive}
          highScore={visitorLogbook.highScore}
          onHighScoreUpdate={(newScore) => {
            visitorLogbook.updateHighScore(newScore);
            graduationQuest.recordGameCompletion(newScore);
          }}
          onRoundComplete={({ score }) => {
            graduationQuest.recordGameCompletion(score);
          }}
        />
      </main>

      {/* Optional Celestial Sparkle Cursor Layer */}
      <SparkleCursor enabled={sparklesEnabled} />

      {/* Observatory Footer with Ambiance Controls */}
      <Footer
        sparklesEnabled={sparklesEnabled}
        onToggleSparkles={toggleSparkles}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onEasterEggDiscovered={playSecretSound}
        onSecretPuzzleSolved={graduationQuest.recordEasterEggSolved}
        dreamModeActive={dreamModeActive}
      />
    </div>
  );
}

export default App;
