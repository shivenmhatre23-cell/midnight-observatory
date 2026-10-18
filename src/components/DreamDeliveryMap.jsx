import React, { useState, useEffect } from 'react';

const DESTINATIONS = [
  {
    id: 'observatory',
    name: 'Midnight Observatory',
    shortName: 'Observatory',
    subtitle: "Pip's Home Base",
    tagline: '40,000 Feet Above Cloud 9',
    icon: '🔭',
    recipient: 'Pip & Midnight Nursery Elder Owls',
    x: 100,
    y: 360,
    description:
      'Perched high atop cumulus mist, the observatory hums with ticking backward-clocks and brass gears. Here, Pip blends dream vials with starlight nectar and outfits the cloud-skiff for tonight’s flight.',
    dreamTitle: 'Observatory Hearth Dream',
    dreamVision:
      'Warm chamomile steam, lavender-stuffed quilts, and the comforting rhythm of celestial wind vanes.',
    flavorFact: 'Pip always packs a thermos of moonflower tea and two spare knitted nightcaps before takeoff.',
  },
  {
    id: 'rooftops',
    name: 'Moonbeam Rooftops',
    shortName: 'Rooftops',
    subtitle: 'Slumbering Eaves & Chimneys',
    tagline: 'Silver Shingle Skyways',
    icon: '🐈',
    recipient: 'Restless Cloud Creatures & Slumbering Eaves Kittens',
    x: 250,
    y: 160,
    description:
      'Silver slate rooftops catching pale lunar beams. Sleepy cloud kittens curl around warm chimneys while nocturnal breeze rustles through sleeping ivy vines.',
    dreamTitle: 'Velvet Cloud Nap',
    dreamVision:
      'Weightless floating through warm summer air, endless soft pillows, and a gentle purr echoing through the eaves.',
    flavorFact: 'Delivered directly through copper weather-vanes so the dream settles softly over the attic rafters.',
  },
  {
    id: 'badger-hollow',
    name: 'Badger Hollow',
    shortName: 'Badger Hollow',
    subtitle: 'Underground Cedar Sanctuary',
    tagline: 'Ancient Cedar Roots',
    icon: '🦡',
    recipient: 'The Bramble Burrow Badger Clan',
    x: 420,
    y: 370,
    description:
      'A cozy subterranean maze sheltered beneath the roots of a thousand-year-old cedar. Young badgers toss and turn when distant thunder grumbles through the soil.',
    dreamTitle: 'Gentle Courage Dream',
    dreamVision:
      'Glowing amber acorn lanterns, sweet blackberry pie, and an unbreakable earthen fortress of comfort and quiet.',
    flavorFact: 'Pip tips stardust sparks down rabbit-burrow chimneys so badger kits wake up feeling brave.',
  },
  {
    id: 'owl-perch',
    name: 'Owl Perch',
    shortName: 'Owl Perch',
    subtitle: 'Great Whispering Pine',
    tagline: 'High Canopy Bough',
    icon: '🦉',
    recipient: 'Night Owlet Fledglings & Star Watchers',
    x: 590,
    y: 150,
    description:
      'The topmost branch of the Ancient Whispering Pine overlooking the tranquil valley. Young owlets with heavy eyelids practice nocturnal listening as stars drift overhead.',
    dreamTitle: 'Harmonic Bedtime Lullaby',
    dreamVision:
      'A soothing 432Hz pine-needle symphony, gentle swaying boughs, and warm down feathers shielding against midnight frost.',
    flavorFact: 'The Elder Owls return the favor by gifting Pip polished acorn buttons and pine-cone compasses.',
  },
  {
    id: 'cradle-of-dreams',
    name: 'Cradle of Dreams',
    shortName: 'Cradle of Dreams',
    subtitle: 'Final Slumber Sanctuary',
    tagline: 'Starlight Nebula Cove',
    icon: '✨',
    recipient: 'Every Sleeper Across the Land',
    x: 720,
    y: 330,
    description:
      'The tranquil nexus of the upper sky where all nocturnal delivery routes gently converge. Here, dispatched bedtime wishes ripple out as a golden blanket over the sleeping world.',
    dreamTitle: 'Golden Starlight Serenade',
    dreamVision:
      'Deep, unbroken sleep filled with wondrous visions of dancing constellations and morning sunrises wrapped in peace.',
    flavorFact: 'Completing tonight’s delivery route guarantees sweet dreams for every sleeping heart until sunrise.',
  },
];

// Flight route SVG path connecting the 5 waypoints with gentle curves
const ROUTE_PATH_DATA =
  'M 100 360 C 160 250, 180 170, 250 160 C 320 150, 360 350, 420 370 C 480 390, 520 180, 590 150 C 650 120, 680 270, 720 330';

export default function DreamDeliveryMap({
  soundEnabled = false,
  onPlayDeliverySound,
  onDreamDelivered = null,
}) {
  const [activeId, setActiveId] = useState('observatory');
  const [deliveredIds, setDeliveredIds] = useState(['observatory']); // Home base starts visited
  const [isDelivering, setIsDelivering] = useState(false);
  const [notification, setNotification] = useState(null);

  const activeDest = DESTINATIONS.find((d) => d.id === activeId) || DESTINATIONS[0];
  const isDelivered = deliveredIds.includes(activeId);
  const totalDelivered = deliveredIds.length;
  const isAllDelivered = deliveredIds.length === DESTINATIONS.length;

  // Clear transient notification after delay
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 3500);
    return () => clearTimeout(timer);
  }, [notification]);

  const handleSelectDestination = (destId) => {
    setActiveId(destId);
  };

  const handleDeliverDream = () => {
    if (isDelivered) return;

    setIsDelivering(true);
    if (soundEnabled && onPlayDeliverySound) {
      onPlayDeliverySound();
    }

    setTimeout(() => {
      setDeliveredIds((prev) => (prev.includes(activeId) ? prev : [...prev, activeId]));
      setIsDelivering(false);
      setNotification(`✦ Dream dispatched to ${activeDest.name}! Peaceful slumber has settled.`);
      if (onDreamDelivered) {
        onDreamDelivered(activeDest);
      }
    }, 450);
  };

  const handleResetCorridor = () => {
    setDeliveredIds(['observatory']);
    setActiveId('observatory');
    setNotification('Flight corridor reset. Pip’s skiff has returned to Midnight Observatory.');
  };

  return (
    <section className="flight-map-section" id="flight-map" aria-labelledby="flight-map-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-eyebrow">Interactive Slumber Navigation</span>
          <h2 id="flight-map-heading" className="section-title">
            Pip’s Dream Delivery Flight Map
          </h2>
          <p className="section-subtitle">
            Chart nocturnal airways across five cozy destinations. Steer Pip’s Cloud-Drift Skiff
            along curved skyway corridors to dispatch warm dreams before dawn.
          </p>
        </div>

        {/* Flight Status Banner & Counter */}
        <div className="flight-status-bar" role="status" aria-live="polite">
          <div className="status-progress-info">
            <span className="skiff-icon" aria-hidden="true">⛵</span>
            <span className="progress-label">
              Tonight’s Delivery Progress: <strong>{totalDelivered} of {DESTINATIONS.length} Waypoints Reached</strong>
            </span>
          </div>

          <div className="status-actions">
            {isAllDelivered && (
              <span className="all-delivered-badge" role="status">
                🌟 All Nightly Deliveries Completed!
              </span>
            )}
            <button
              type="button"
              className="btn-reset-flight"
              onClick={handleResetCorridor}
              aria-label="Reset delivery flight corridor to Midnight Observatory"
            >
              <span>↺ Reset Corridor</span>
            </button>
          </div>
        </div>

        {notification && (
          <div className="flight-announcement-banner" role="status" aria-live="polite">
            <span>{notification}</span>
          </div>
        )}

        {/* Quick Waypoint Selector for Mobile / Accessible Jumping */}
        <div className="waypoint-tabs-bar" role="tablist" aria-label="Flight destinations quick jump">
          {DESTINATIONS.map((dest, idx) => {
            const isSelected = dest.id === activeId;
            const hasDelivered = deliveredIds.includes(dest.id);
            return (
              <button
                key={dest.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`waypoint-tab-btn ${isSelected ? 'active' : ''} ${hasDelivered ? 'delivered' : ''}`}
                onClick={() => handleSelectDestination(dest.id)}
              >
                <span className="waypoint-tab-num">{idx + 1}</span>
                <span className="waypoint-tab-icon" aria-hidden="true">{dest.icon}</span>
                <span className="waypoint-tab-name">{dest.shortName}</span>
                {hasDelivered && <span className="waypoint-check-badge" aria-label="Delivered">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Main Map Visual & Details Grid */}
        <div className="flight-map-layout">
          {/* SVG Map Canvas */}
          <div className="map-canvas-card">
            <div className="map-card-header">
              <div className="map-badge">
                <span className="badge-dot" aria-hidden="true" />
                <span>Nocturnal Skyway Alpha · Live Vector Corridor</span>
              </div>
              <span className="map-altitude">Alt: 40,000 ft · Zephyr Wind Calm</span>
            </div>

            <div className="svg-map-wrapper">
              <svg
                viewBox="0 0 800 480"
                className="delivery-flight-svg"
                role="img"
                aria-label="Illustrated SVG night sky map displaying Pip's five flight destinations and curved delivery corridor"
              >
                <defs>
                  {/* Sky Background Gradient */}
                  <linearGradient id="flightSkyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a1e36" />
                    <stop offset="50%" stopColor="#252b4d" />
                    <stop offset="100%" stopColor="#161829" />
                  </linearGradient>

                  {/* Route Glow Filter */}
                  <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Parcel Glow Filter */}
                  <filter id="parcelGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Night Sky Backdrop */}
                <rect width="800" height="480" rx="16" fill="url(#flightSkyGrad)" />

                {/* Decorative Clouds & Horizon Contours */}
                <g className="map-decorative-clouds" opacity="0.35">
                  <path
                    d="M 40 430 Q 110 390 180 430 Q 250 460 320 420 Q 400 390 480 430 Q 560 460 640 420 Q 720 390 780 430 L 800 480 L 0 480 Z"
                    fill="#313861"
                  />
                  <path
                    d="M 0 450 Q 80 420 160 450 Q 240 470 320 440 Q 420 410 520 450 Q 620 480 720 440 Q 770 430 800 450 L 800 480 L 0 480 Z"
                    fill="#434c7a"
                  />
                </g>

                {/* Ambient Night Sky Constellation Background Stars */}
                <g className="map-ambient-stars" fill="#fff8f1" opacity="0.45">
                  <circle cx="60" cy="80" r="1.5" />
                  <circle cx="160" cy="60" r="2" />
                  <circle cx="210" cy="110" r="1" />
                  <circle cx="340" cy="70" r="2" />
                  <circle cx="390" cy="40" r="1.5" />
                  <circle cx="480" cy="90" r="2" />
                  <circle cx="530" cy="50" r="1" />
                  <circle cx="650" cy="75" r="2.5" />
                  <circle cx="730" cy="90" r="1.5" />
                  <circle cx="180" cy="270" r="1" />
                  <circle cx="330" cy="240" r="1.5" />
                  <circle cx="500" cy="280" r="1.5" />
                  <circle cx="660" cy="230" r="2" />
                </g>

                {/* Curved Delivery Skyway Route */}
                <path
                  d={ROUTE_PATH_DATA}
                  fill="none"
                  stroke="rgba(243, 201, 107, 0.25)"
                  strokeWidth="4"
                  strokeDasharray="6 6"
                  className="route-underlay-path"
                />

                <path
                  d={ROUTE_PATH_DATA}
                  fill="none"
                  stroke="#f3c96b"
                  strokeWidth="2.5"
                  strokeDasharray="8 6"
                  filter="url(#routeGlow)"
                  className="route-glowing-path"
                />

                {/* Interactive Destinations Pins */}
                {DESTINATIONS.map((dest, idx) => {
                  const isSelected = dest.id === activeId;
                  const hasDelivered = deliveredIds.includes(dest.id);

                  return (
                    <g
                      key={dest.id}
                      className={`map-waypoint-group ${isSelected ? 'selected' : ''} ${hasDelivered ? 'delivered' : ''}`}
                      transform={`translate(${dest.x}, ${dest.y})`}
                      role="button"
                      tabIndex={0}
                      aria-label={`${dest.name} (Waypoint ${idx + 1}): ${hasDelivered ? 'Delivered' : 'Pending delivery'}. Click to view details.`}
                      onClick={() => handleSelectDestination(dest.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectDestination(dest.id);
                        }
                      }}
                    >
                      {/* Pulse rings for active or pending destination */}
                      {isSelected && (
                        <circle
                          r="26"
                          fill="none"
                          stroke="#f3c96b"
                          strokeWidth="2"
                          opacity="0.6"
                          className="waypoint-pulse-ring"
                        />
                      )}

                      {/* Main Node Circle */}
                      <circle
                        r="18"
                        fill={hasDelivered ? '#a34063' : '#22263f'}
                        stroke={isSelected ? '#f3c96b' : hasDelivered ? '#f4d6d7' : '#f3c96b'}
                        strokeWidth={isSelected ? '3.5' : '2'}
                        className="waypoint-circle"
                      />

                      {/* Waypoint Icon / Glyphs */}
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize="13"
                        className="waypoint-symbol"
                        pointerEvents="none"
                      >
                        {dest.icon}
                      </text>

                      {/* Label Text Pill Below Pin */}
                      <g transform="translate(0, 30)" pointerEvents="none">
                        <rect
                          x="-65"
                          y="-10"
                          width="130"
                          height="20"
                          rx="10"
                          fill="rgba(22, 24, 41, 0.85)"
                          stroke={isSelected ? '#f3c96b' : 'rgba(243, 201, 107, 0.3)'}
                          strokeWidth={isSelected ? '1.5' : '1'}
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill="#fff8f1"
                          fontSize="10"
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          className="waypoint-text-label"
                        >
                          {dest.shortName}
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* Animated Glowing Dream Skiff / Parcel */}
                <g
                  className="flight-parcel"
                  transform={`translate(${activeDest.x}, ${activeDest.y})`}
                  filter="url(#parcelGlow)"
                  pointerEvents="none"
                >
                  <circle r="9" fill="#f3c96b" opacity="0.9" />
                  <circle r="4" fill="#fff8f1" />
                  <text
                    x="12"
                    y="-12"
                    fontSize="11"
                    fill="#f3c96b"
                    fontWeight="bold"
                    className="parcel-skiff-marker"
                  >
                    ✦ Skiff
                  </text>
                </g>
              </svg>
            </div>

            <div className="map-card-footer">
              <span className="map-hint">
                💡 <em>Visitor Tip:</em> Click any waypoint on the map or the numbered tabs above to guide Pip’s skiff directly there.
              </span>
            </div>
          </div>

          {/* Accessible Destination Details Panel */}
          <div className="destination-details-card" role="region" aria-label="Destination details">
            <div className="dest-card-header">
              <div className="dest-header-left">
                <span className="dest-big-icon" aria-hidden="true">{activeDest.icon}</span>
                <div>
                  <span className="dest-tagline">{activeDest.tagline}</span>
                  <h3 className="dest-title">{activeDest.name}</h3>
                </div>
              </div>

              <div className="dest-status-badge">
                {isDelivered ? (
                  <span className="badge-delivered">
                    <span className="status-dot green" aria-hidden="true" />
                    Delivered ✦
                  </span>
                ) : (
                  <span className="badge-pending">
                    <span className="status-dot yellow" aria-hidden="true" />
                    Pending Delivery
                  </span>
                )}
              </div>
            </div>

            <div className="dest-body">
              {/* Recipient */}
              <div className="dest-info-row">
                <span className="info-label">Intended Recipient:</span>
                <span className="info-value recipient">{activeDest.recipient}</span>
              </div>

              {/* Atmosphere description */}
              <p className="dest-description">{activeDest.description}</p>

              {/* Dream Payload Details */}
              <div className="dream-payload-box">
                <div className="payload-header">
                  <span className="payload-ico" aria-hidden="true">✉️</span>
                  <span className="payload-title">Tonight’s Dream Vial:</span>
                  <strong className="payload-name">{activeDest.dreamTitle}</strong>
                </div>
                <p className="payload-vision">{activeDest.dreamVision}</p>
              </div>

              {/* Character Lore Note */}
              <div className="dest-fact-note">
                <span className="fact-star" aria-hidden="true">✦</span>
                <p className="fact-text">{activeDest.flavorFact}</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="dest-actions-bar">
              {isDelivered ? (
                <div className="delivered-confirmation-row">
                  <span className="confirmation-icon" aria-hidden="true">✓</span>
                  <span className="confirmation-text">
                    Dream safely nestled into the slumber corridor!
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  className={`btn-deliver-dream ${isDelivering ? 'delivering' : ''}`}
                  onClick={handleDeliverDream}
                  disabled={isDelivering}
                  aria-label={`Deliver dream vial to ${activeDest.name}`}
                >
                  <span className="btn-icon" aria-hidden="true">
                    {isDelivering ? '✨' : '🚀'}
                  </span>
                  <span>{isDelivering ? 'Dispatching Starlight...' : 'Deliver Dream Now'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
