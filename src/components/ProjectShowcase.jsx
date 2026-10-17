import React from 'react';

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
      badge: 'Celestial Map',
      description:
        'A constellation map connecting sleepy homes with custom dreams. Charting safe airway corridors above chimney smoke and tree hollows, ensuring quiet nocturnal drops right onto the pillows of tired woodland creatures.',
      isConstellationMap: true,
      specs: [
        { label: 'Active Waypoints', value: '18 Sleepy Burrows' },
        { label: 'Wind Corridor', value: 'Zephyr Path Alpha' },
        { label: 'Delivery Vehicle', value: 'Cloud-Drift Skiff' },
      ],
      features: ['Star-guided vector navigation', 'Silent cloud-skiff tracks', 'Automated lullaby drops'],
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
                {project.isConstellationMap ? (
                  <div className="constellation-canvas-container" aria-label="Celestial constellation map graphic">
                    <svg
                      viewBox="0 0 400 280"
                      className="constellation-svg"
                      role="img"
                      aria-labelledby={`svg-${project.id}`}
                    >
                      <title id={`svg-${project.id}`}>Constellation map of dream routes</title>
                      <defs>
                        <radialGradient id="skyGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#2e3454" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#1b1d30" stopOpacity="1" />
                        </radialGradient>
                        <linearGradient id="routeLine" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f3c96b" stopOpacity="0.8" />
                          <stop offset="50%" stopColor="#f4d6d7" stopOpacity="0.9" />
                          <stop offset="100%" stopColor="#f3c96b" stopOpacity="0.8" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Deep sky background */}
                      <rect width="400" height="280" rx="16" fill="url(#skyGlow)" />

                      {/* Background twinkling stars */}
                      <circle cx="35" cy="45" r="1.5" fill="#f3c96b" opacity="0.6" />
                      <circle cx="90" cy="180" r="1.2" fill="#fff8f1" opacity="0.5" />
                      <circle cx="340" cy="40" r="1.5" fill="#fff8f1" opacity="0.7" />
                      <circle cx="360" cy="220" r="1" fill="#f4d6d7" opacity="0.6" />
                      <circle cx="150" cy="30" r="1.8" fill="#f3c96b" opacity="0.8" />

                      {/* Flight routes connecting constellation nodes */}
                      <path
                        d="M 60 70 Q 130 110 200 80 T 330 130"
                        fill="none"
                        stroke="url(#routeLine)"
                        strokeWidth="2.5"
                        strokeDasharray="5,4"
                      />
                      <path
                        d="M 200 80 Q 220 180 140 210 T 80 230"
                        fill="none"
                        stroke="url(#routeLine)"
                        strokeWidth="2"
                        strokeDasharray="4,4"
                      />
                      <path
                        d="M 200 80 L 290 200"
                        fill="none"
                        stroke="rgba(243, 201, 107, 0.4)"
                        strokeWidth="1.5"
                      />

                      {/* Constellation Nodes */}
                      <g filter="url(#glow)">
                        <circle cx="60" cy="70" r="5" fill="#f3c96b" />
                        <circle cx="200" cy="80" r="7" fill="#fff8f1" stroke="#f3c96b" strokeWidth="2.5" />
                        <circle cx="330" cy="130" r="5.5" fill="#f4d6d7" />
                        <circle cx="140" cy="210" r="5" fill="#f3c96b" />
                        <circle cx="290" cy="200" r="4.5" fill="#fff8f1" />
                        <circle cx="80" cy="230" r="4" fill="#f4d6d7" />
                      </g>

                      {/* Node Labels */}
                      <text x="65" y="60" fill="#f3c96b" fontSize="10" fontFamily="sans-serif">Observatory Peak</text>
                      <text x="205" y="75" fill="#fff8f1" fontSize="11" fontWeight="bold" fontFamily="sans-serif">North Moonbeam</text>
                      <text x="270" y="145" fill="#f4d6d7" fontSize="10" fontFamily="sans-serif">Badger Hollow</text>
                      <text x="145" y="225" fill="#f3c96b" fontSize="10" fontFamily="sans-serif">Owl Perch 4</text>
                    </svg>
                    <div className="map-badge-overlay">
                      <span>Live Skyway Grid</span>
                    </div>
                  </div>
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
