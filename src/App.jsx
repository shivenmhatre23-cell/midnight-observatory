import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CharacterIntro from './components/CharacterIntro';
import ProjectShowcase from './components/ProjectShowcase';
import StoryPreview from './components/StoryPreview';
import DreamDropForm from './components/DreamDropForm';
import Footer from './components/Footer';
import SparkleCursor from './components/SparkleCursor';
import useSoundEffects from './hooks/useSoundEffects';
import './App.css';

function App() {
  const [dreamModeActive, setDreamModeActive] = useState(false);
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
  } = useSoundEffects();

  useEffect(() => {
    if (dreamModeActive) {
      document.body.classList.add('dream-mode-active');
    } else {
      document.body.classList.remove('dream-mode-active');
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
        <Hero />

        {/* Character Introduction Section */}
        <CharacterIntro />

        {/* Project Showcase Section */}
        <ProjectShowcase onConstellationComplete={playConstellationSound} />

        {/* Origin Story Preview Section */}
        <StoryPreview />

        {/* Ephemeral Dream Drop Form Section */}
        <DreamDropForm onDreamSubmitted={playDreamSubmittedSound} />
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
      />
    </div>
  );
}

export default App;
