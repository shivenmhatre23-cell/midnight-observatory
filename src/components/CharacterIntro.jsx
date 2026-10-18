import React from 'react';

export default function CharacterIntro({ dreamModeActive = false }) {
  const portraitSrc = dreamModeActive
    ? `${import.meta.env.BASE_URL}images/pip_portrait_dream_mode.png`
    : `${import.meta.env.BASE_URL}images/pip_portrait.png`;

  const traits = [
    {
      title: 'Gentle Skull Baby',
      category: 'Appearance',
      icon: '🦴',
      description:
        'With delicate ivory bones, an oversized knitted nightcap, and round, sleepy eyes that reflect nebula light, Pip radiates warm sweetness instead of spooky chills.',
    },
    {
      title: 'Whisper-Quiet Heart',
      category: 'Personality',
      icon: '🌸',
      description:
        'Timid yet endlessly caring. Pip speaks in soft lullaby cadence and can hear when a newborn bunny or tired starling is tossing and turning miles below.',
    },
    {
      title: 'Chronic Micro-Napper',
      category: 'Sleepy Habits',
      icon: '☁️',
      description:
        'Known for nodding off mid-astronomy calculation. Pip requires a fresh mug of moonflower tea every two hours and keeps spare cotton-puff pillows tucked under every desk.',
    },
    {
      title: 'Dream Architecture',
      category: 'Junior Dream Engineer',
      icon: '🛠️',
      description:
        'Appointed by the Midnight Nursery Elder Owls to design bedtime wonders. Pip harmonizes celestial wind-chimes and tests lavender-scented nightlight glows.',
    },
  ];

  return (
    <section className="character-section" id="about">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">Meet The Resident Custodian</span>
          <h2 className="section-title">A Gentle Soul in a Sleeping Sky</h2>
          <p className="section-subtitle">
            Everything you need to know about our favorite sleepy dream architect.
          </p>
        </div>

        <div className="character-layout">
          {/* Portrait Column */}
          <div className="portrait-column">
            <div className="portrait-card">
              <div className="portrait-inner">
                <img
                  key={dreamModeActive ? 'portrait-dream' : 'portrait-light'}
                  src={portraitSrc}
                  alt="Official studio portrait of Pip the Skull Baby wearing a dreamy nightcap"
                  className="portrait-img theme-fade-img"
                  width="440"
                  height="440"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="portrait-meta">
                <h3 className="portrait-name">Pip</h3>
                <p className="portrait-role">Junior Dream Engineer · Badge #007</p>
                <div className="portrait-quote">
                  &ldquo;A good dream is like a warm wool sweater for your weary thoughts.&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* Traits Grid Column */}
          <div className="traits-column">
            <div className="traits-grid">
              {traits.map((trait) => (
                <article key={trait.title} className="trait-card">
                  <div className="trait-header">
                    <span className="trait-icon" aria-hidden="true">
                      {trait.icon}
                    </span>
                    <span className="trait-category">{trait.category}</span>
                  </div>
                  <h4 className="trait-title">{trait.title}</h4>
                  <p className="trait-description">{trait.description}</p>
                </article>
              ))}
            </div>

            <div className="character-note-box">
              <span className="note-star" aria-hidden="true">✦</span>
              <p className="note-text">
                <strong>Observatory Fact:</strong> Pip never travels without a copper pocket watch that ticks backward, counting down until the neighborhood's sweet dreaming hour.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
