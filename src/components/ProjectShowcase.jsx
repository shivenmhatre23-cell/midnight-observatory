import React from 'react';
import LullabyMusicBox from './LullabyMusicBox';
import ConstellationTelescope from './ConstellationTelescope';

export default function ProjectShowcase() {
  const projects = [
    {
      id: 'lullaby-lab',
      title: 'Lullaby Lab',
      tagline: 'Acoustic Slumber Calibration',
      badge: 'Harmonic Engine',
      description:
        'A soothing music box that designs gentle bedtime melodies. Powered by a hand-carved golden winding key, tiny brass cylinders chime custom frequencies calculated to slow fluttering heartbeats and lull busy minds to sleep.',
      image: '/images/pip_lullaby_box.png',
      alt: 'The golden Lullaby Lab music box with star chimes and delicate key',
      specs: [
        { label: 'Frequency', value: '432 Hz Gentle Chime' },
        { label: 'Melody Key', value: 'C-Major Stardust' },
        { label: 'Power Source', value: 'Dream Windup Spring' },
      ],
      features: ['Faux-wind acoustic cylinders', 'Star-dust damper pedals', 'Subtle slumber tempo'],
    },
    {
      id: 'nightlight-collection',
      title: 'Nightlight Collection',
      tagline: 'Warm Luminescence Against the Dark',
      badge: 'Comfort Craft',
      description:
        'Cozy lamps and lanterns that turn darkness into comfort. Each lantern captures a fragment of crescent moonlight enclosed in warm blown glass, casting gentle honey-amber auras that soften shadows without disturbing deep sleep.',
      image: '/images/pip_dream_lantern.png',
      alt: 'A glowing crescent moon dream lantern casting cozy warm light',
      specs: [
        { label: 'Color Temp', value: '2200K Honey Amber' },
        { label: 'Range', value: 'Cozy Bedside Radius' },
        { label: 'Aura', value: 'Shadow-dispelling Charm' },
      ],
      features: ['Crescent glass core', 'Burnished brass frame', 'Flicker-free calming glow'],
    },
    {
      id: 'delivery-routes',
      title: 'Dream Delivery Routes',
      tagline: 'Constellation Skyways for Slumber',
      badge: 'Interactive Telescope',
      description:
        'An interactive constellation map connecting sleepy homes with custom dreams. Chart safe airway corridors above chimney smoke and tree hollows to guide Pip’s nocturnal slumber skiff.',
      isInteractiveTelescope: true,
      specs: [
        { label: 'Active Waypoints', value: '5 Key Route Stars' },
        { label: 'Wind Corridor', value: 'Zephyr Path Alpha' },
        { label: 'Delivery Vehicle', value: 'Cloud-Drift Skiff' },
      ],
      features: ['Star-guided vector navigation', 'Live interactive sky telescope', 'Sequential star charting'],
    },
  ];

  return (
    <section className="showcase-section" id="showcase">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-eyebrow">Pip&apos;s Workshop Inventions</span>
          <h2 className="section-title">Instruments of Peaceful Slumber</h2>
          <p className="section-subtitle">
            Three signature creations engineered in the observatory to keep bedtime soft, warm, and
            full of sweet dreams.
          </p>
        </div>

        <div className="showcase-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="card-visual-wrapper">
                {project.isInteractiveTelescope ? (
                  <ConstellationTelescope />
                ) : (
                  <div className="card-image-box">
                    <img
                      src={project.image}
                      alt={project.alt}
                      className="card-artwork"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="card-top-tag">{project.badge}</div>
              </div>

              <div className="card-body">
                <span className="card-tagline">{project.tagline}</span>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-description">{project.description}</p>

                {/* Embed Playable Web Audio Music Box in Lullaby Lab */}
                {project.id === 'lullaby-lab' && <LullabyMusicBox />}

                <div className="card-specs">
                  {project.specs.map((spec) => (
                    <div key={spec.label} className="spec-item">
                      <span className="spec-label">{spec.label}</span>
                      <span className="spec-val">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <ul className="card-features-list">
                  {project.features.map((item, idx) => (
                    <li key={idx} className="feature-item">
                      <span className="feature-bullet" aria-hidden="true">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
