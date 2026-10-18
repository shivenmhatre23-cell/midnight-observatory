import React, { useState } from 'react';

export default function StoryPreview() {
  const [activeTab, setActiveTab] = useState(0);

  const scenes = [
    {
      id: 'first-star',
      number: 'Scene 01',
      title: 'The First Star',
      subtitle: 'A gentle awakening in the twilight',
      icon: '⭐',
      wordCount: 76,
      text: 'Long before the observatory had brass gears or cloud-compasses, Pip was just a quiet little wanderer sitting on the edge of Cloud 9. One evening, a tiny star slipped from the velvet twilight and rolled right into Pip’s mittens. It wasn’t hot or terrifying; it vibrated like a sleeping kitten and hummed a sleepy lullaby. In that gentle moment, Pip understood: the night sky wasn’t empty darkness—it was a cradle waiting for someone to sing it to sleep.',
      moral: 'Even the smallest light hums a melody when held with tenderness.',
    },
    {
      id: 'midnight-workshop',
      number: 'Scene 02',
      title: 'The Midnight Workshop',
      subtitle: 'Building dreams from stardust and clocks',
      icon: '🕰️',
      wordCount: 82,
      text: 'With that fallen star as a compass, Pip discovered an abandoned bell tower poking through the cumulus mist. With patient hands and spools of spun stardust, Pip began crafting. Empty jars became warm lanterns; old pocket-watch gears were tuned to wind-up lullabies. The Midnight Nursery owls took notice, presenting Pip with a miniature engineer’s badge and blueprints for a brass telescope. Thus, the Midnight Observatory was born, dedicated to peaceful slumber for all little creatures.',
      moral: 'Every cozy invention begins with curiosity and a warm cup of tea.',
    },
    {
      id: 'first-delivery',
      number: 'Scene 03',
      title: 'The First Dream Delivery',
      subtitle: 'Silent skiffs across slumbering rooftops',
      icon: '⛵',
      wordCount: 78,
      text: 'Pip’s maiden voyage launched on a brisk autumn midnight. Guiding a lightweight cloud-skiff over sleeping chimneys and silent pine groves, Pip carried a single glass vial filled with honeysuckle and clover dreams. The destination was a trembling baby dormouse tucked in an oak hollow. Pip tipped the vial gently; golden sparks drifted down the chimney flue. Moments later, the dormouse sighed, curled into a tight ball, and smiled in deep, uninterrupted slumber.',
      moral: 'A timely dream can banish the deepest midnight fear.',
    },
  ];

  const handleTabClick = (idx, sceneId) => {
    setActiveTab(idx);
    const cardEl = document.getElementById(`story-card-${sceneId}`);
    if (cardEl) {
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const navHeader = document.querySelector('.navbar-header');
      const navHeight = navHeader ? navHeader.getBoundingClientRect().height : 60;
      const elementPosition = cardEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - (navHeight + 20);

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <section className="story-section" id="story">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">The Chronicles of Cloud 9</span>
          <h2 className="section-title">Pip&apos;s Origin Story</h2>
          <p className="section-subtitle">
            Three short storybook scenes tracing how a sleepy skull baby became the trusted guardian of bedtime.
          </p>
        </div>

        {/* Tab Controls for Mobile & Quick Browsing */}
        <div className="story-tabs-nav" role="tablist" aria-label="Story chapters">
          {scenes.map((scene, idx) => (
            <button
              key={scene.id}
              type="button"
              role="tab"
              aria-selected={activeTab === idx}
              aria-controls={`story-card-${scene.id}`}
              className={`story-tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={() => handleTabClick(idx, scene.id)}
            >
              <span className="tab-icon" aria-hidden="true">{scene.icon}</span>
              <span className="tab-title-text">{scene.title}</span>
            </button>
          ))}
        </div>

        {/* Story Scenes Layout */}
        <div className="story-cards-container">
          {scenes.map((scene, idx) => (
            <article
              key={scene.id}
              id={`story-card-${scene.id}`}
              className={`story-card ${activeTab === idx ? 'highlighted' : ''}`}
            >
              <div className="story-card-header">
                <div className="story-number-badge">
                  <span>{scene.number}</span>
                </div>
                <div className="story-icon-wrap" aria-hidden="true">
                  <span>{scene.icon}</span>
                </div>
              </div>

              <div className="story-card-body">
                <h3 className="story-card-title">{scene.title}</h3>
                <span className="story-card-subtitle">{scene.subtitle}</span>
                <p className="story-text">{scene.text}</p>
              </div>

              <div className="story-card-footer">
                <div className="story-moral">
                  <span className="moral-sparkle">✧</span>
                  <span className="moral-text">{scene.moral}</span>
                </div>
                <div className="word-count-tag">
                  {scene.wordCount} words
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
