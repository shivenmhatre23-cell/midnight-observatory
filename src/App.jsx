import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CharacterIntro from './components/CharacterIntro';
import ProjectShowcase from './components/ProjectShowcase';
import DreamDeliveryMap from './components/DreamDeliveryMap';
import StoryPreview from './components/StoryPreview';
import DreamDropForm from './components/DreamDropForm';
import FallingDreamsGame from './components/FallingDreamsGame';
import Footer from './components/Footer';
import SparkleCursor from './components/SparkleCursor';
import useSoundEffects from './hooks/useSoundEffects';
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

  // Preload light and dark assets for seamless crossfade
  useEffect(() => {
    const imagesToPreload = [
      `${import.meta.env.BASE_URL}images/pip_avatar_cloud.png`,
      `${import.meta.env.BASE_URL}images/pip_avatar_cloud_dream_mode.png`,
      `${import.meta.env.BASE_URL}images/pip_portrait.png`,
      `${import.meta.env.BASE_URL}images/pip_portrait_dream_mode.png`,
      `${import.meta.env.BASE_URL}images/pip_lullaby_box.png`,
      `${import.meta.env.BASE_URL}images/pip_lullaby_box_dream_mode.png`,
      `${import.meta.env.BASE_URL}images/pip_dream_lantern.png`,
      `${import.meta.env.BASE_URL}images/pip_dream_lantern_dream_mode.png`,
    ];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

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
        <Hero dreamModeActive={dreamModeActive} />

        {/* Character Introduction Section */}
        <CharacterIntro dreamModeActive={dreamModeActive} />

        {/* Project Showcase Section */}
        <ProjectShowcase
          onConstellationComplete={playConstellationSound}
          dreamModeActive={dreamModeActive}
        />

        {/* Dream Delivery Flight Map Section (Phase 7) */}
        <DreamDeliveryMap
          soundEnabled={soundEnabled}
          onPlayDeliverySound={playDreamSubmittedSound}
          dreamModeActive={dreamModeActive}
        />

        {/* Origin Story Preview Section */}
        <StoryPreview />

        {/* Ephemeral Dream Drop Form Section */}
        <DreamDropForm onDreamSubmitted={playDreamSubmittedSound} />

        {/* Catch the Falling Dreams Mini-Game (Phase 8) */}
        <FallingDreamsGame
          soundEnabled={soundEnabled}
          onCatchSound={playCatchSound}
          dreamModeActive={dreamModeActive}
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
        dreamModeActive={dreamModeActive}
      />
    </div>
  );
}

export default App;
