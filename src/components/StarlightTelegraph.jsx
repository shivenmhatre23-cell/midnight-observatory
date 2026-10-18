import React, { useState, useEffect, useRef, useCallback } from 'react';

const DIALOGUE_NODES = {
  root: {
    speaker: 'Pip',
    avatar: 'pip_avatar_cloud',
    status: 'Transmission open · 432 Hz',
    text: '*tap... tap-tap... chime!* Hello there! You have reached the Starlight Telegraph atop Cloud 9. I am Pip, Junior Dream Engineer. My brass receiver crystals are tuned and the kettle is warm. What would you like to explore in my logbook tonight?',
    choices: [
      { id: 'c1', label: '🎵 How do you spin starlight into lullabies?', next: 'lullabies' },
      { id: 'c2', label: '💀 Why do you have a gentle skull face?', next: 'skull' },
      { id: 'c3', label: '🗺️ What is your favorite delivery route?', next: 'routes' },
      { id: 'c4', label: '🌙 Can you prescribe a bedtime dream for me?', next: 'prescribe' },
      { id: 'c5', label: '⭐ How is tonight’s falling star watch going?', next: 'stargazing' },
    ],
  },
  lullabies: {
    speaker: 'Pip',
    avatar: 'pip_lullaby_box',
    status: 'Lullaby Lab frequency',
    text: 'We catch raw starlight in fine brass filigree coils, then comb it through carded sheep wool so the frequencies soften into a warm hum. If a star is particularly fizzy, we steep it in dried lavender before winding the music box spring!',
    choices: [
      { id: 'l1', label: '🎼 What happens if a note is too sharp?', next: 'sharp_note' },
      { id: 'l2', label: '✨ Where does the starlight come from?', next: 'starlight_source' },
      { id: 'l3', label: '↩️ Let’s talk about something else in your logbook.', next: 'root' },
    ],
  },
  sharp_note: {
    speaker: 'Pip',
    avatar: 'pip_lullaby_box',
    status: 'Acoustic tuning notes',
    text: 'If a note is too sharp, it wakes up the sleepy meadow crickets! So I cushion the cylinder teeth with soft felt soaked in chamomile oil. That way, every chime feels like a gentle forehead kiss.',
    choices: [
      { id: 'sn1', label: '🌙 Can you prescribe a bedtime dream for me?', next: 'prescribe' },
      { id: 'sn2', label: '↩️ Return to logbook topics.', next: 'root' },
    ],
  },
  starlight_source: {
    speaker: 'Pip',
    avatar: 'pip_avatar_cloud',
    status: 'Celestial harvest logs',
    text: 'We gather it from the constellation fringes when the moon is a thin sliver! The older stars hum in deep amber tones, while young newborn stars sound like tiny silver windchimes.',
    choices: [
      { id: 'ss1', label: '🎵 How do you tune the music box?', next: 'lullabies' },
      { id: 'ss2', label: '↩️ Return to logbook topics.', next: 'root' },
    ],
  },
  skull: {
    speaker: 'Pip',
    avatar: 'pip_portrait',
    status: 'Midnight Nursery origins',
    text: 'In the Midnight Nursery, skull faces are the gentlest disguise. We wear them so frightened children and woodland babies never fear the dark shadows. When nightmares see a cheerful little skull smiling back, they realize there is nothing to haunt, and they tumble away like harmless dust bunnies!',
    choices: [
      { id: 'sk1', label: '👻 Do the nightmares ever try to argue?', next: 'nightmares' },
      { id: 'sk2', label: '💛 That is wonderfully comforting, Pip.', next: 'comfort' },
      { id: 'sk3', label: '↩️ Return to logbook topics.', next: 'root' },
    ],
  },
  nightmares: {
    speaker: 'Pip',
    avatar: 'pip_portrait',
    status: 'Dream defense manual',
    text: 'Sometimes a nightmare growls like a prickly thimble! But I just blow a soft bubble of lavender nightlight over them, and within three seconds they turn into a sleeping cloud puppy.',
    choices: [
      { id: 'nm1', label: '🗺️ Tell me about your flight deliveries.', next: 'routes' },
      { id: 'nm2', label: '↩️ Return to logbook topics.', next: 'root' },
    ],
  },
  comfort: {
    speaker: 'Pip',
    avatar: 'pip_avatar_cloud',
    status: 'Warm reassurance',
    text: 'Thank you! Nighttime should always feel like an old velvet coat with deep pockets full of starlight. You are always safe under Pip’s watch.',
    choices: [
      { id: 'cf1', label: '🌙 Prescribe me a cozy dream!', next: 'prescribe' },
      { id: 'cf2', label: '↩️ Return to logbook topics.', next: 'root' },
    ],
  },
  routes: {
    speaker: 'Pip',
    avatar: 'pip_dream_lantern',
    status: 'Flight dispatch route 4',
    text: 'Badger Hollow is my coziest stop! Old Barnaby the badger gets anxious about autumn frost, so I slide a warm ember-lantern right down his chimney. But Owl Perch has the best midnight thermals for gliding the skiff!',
    choices: [
      { id: 'r1', label: '⛵ Who helps you navigate the cloud skiff?', next: 'skiff' },
      { id: 'r2', label: '☁️ What about Moonbeam Rooftops?', next: 'rooftops' },
      { id: 'r3', label: '↩️ Return to logbook topics.', next: 'root' },
    ],
  },
  skiff: {
    speaker: 'Pip',
    avatar: 'pip_dream_lantern',
    status: 'Navigational compass logs',
    text: 'A friendly flock of luminous dream moths guides the rudder! They only steer toward places where someone is tossing and turning, so we always arrive right on time.',
    choices: [
      { id: 'sf1', label: '🌙 Can you prescribe a dream for me?', next: 'prescribe' },
      { id: 'sf2', label: '↩️ Return to logbook topics.', next: 'root' },
    ],
  },
  rooftops: {
    speaker: 'Pip',
    avatar: 'pip_dream_lantern',
    status: 'Urban cloud sector',
    text: 'Moonbeam Rooftops is home to the restless Cloud Kitten who chases falling chimney sparks! I bring him dreams of yarn balls made from spun stardust so he curls up on warm slate tiles.',
    choices: [
      { id: 'rt1', label: '🎵 How do you craft the lullabies for him?', next: 'lullabies' },
      { id: 'rt2', label: '↩️ Return to logbook topics.', next: 'root' },
    ],
  },
  prescribe: {
    speaker: 'Pip',
    avatar: 'pip_portrait',
    status: 'Official Dream Prescription',
    isPrescription: true,
    text: 'Let me consult my Apothecary of Slumber! Hold your telegraph dial steady while I weigh out tonight’s gentle bedtime ingredients...',
    choices: [
      { id: 'pr1', label: '✨ Dispense a new dream prescription', next: 'dispense' },
      { id: 'pr2', label: '↩️ Return to logbook topics.', next: 'root' },
    ],
  },
  stargazing: {
    speaker: 'Pip',
    avatar: 'pip_avatar_cloud',
    status: 'Observatory star logs',
    text: 'dynamic_stargazing',
    choices: [
      { id: 'sg1', label: '🧺 Tell me how to catch falling dreams!', next: 'catch_tips' },
      { id: 'sg2', label: '🌙 Prescribe me a bedtime dream.', next: 'prescribe' },
      { id: 'sg3', label: '↩️ Return to logbook topics.', next: 'root' },
    ],
  },
  catch_tips: {
    speaker: 'Pip',
    avatar: 'pip_avatar_cloud',
    status: 'Starlight catching manual',
    text: 'Keep your eyes on the Lucid Flares (the glittering +20 sparkle stars)! They drift a bit faster, but if you slide your basket smoothly with A/D or Arrow keys, they land with the softest chime.',
    choices: [
      { id: 'ct1', label: '🌙 Can you prescribe a bedtime dream for me?', next: 'prescribe' },
      { id: 'ct2', label: '↩️ Return to logbook topics.', next: 'root' },
    ],
  },
};

const DREAM_PRESCRIPTIONS = [
  {
    code: 'Rx #104',
    title: 'Warm Rain on Cedar Shingles',
    essence: 'Gentle, steady rainfall drumming on a pitched wooden roof while you are buried beneath two heavy wool quilts with zero morning alarms.',
    dose: 'Inhale twice, picture cedar smoke, exhale slowly.',
  },
  {
    code: 'Rx #212',
    title: 'The Floating Tea Lantern',
    essence: 'Drifting down a calm mirror river in a cedar canoe. Sleepy paper lanterns shaped like fireflies bob gently along the water beside you.',
    dose: 'One cup of chamomile imagination before closing your eyelids.',
  },
  {
    code: 'Rx #309',
    title: 'Mossy Burrow Slumber',
    essence: 'Curled in a cozy underground nook lined with dry ferns and fragrant pine needles, nestled alongside a baby hedgehog snoring in rhythmic puffs.',
    dose: 'Rest your cheek on your coolest pillow corner.',
  },
  {
    code: 'Rx #441',
    title: 'Cloud 9 Starlight Hammock',
    essence: 'Suspended between two benevolent constellation stars atop a soft violet cloud, gently swaying in sync with 432 Hz midnight lullabies.',
    dose: 'Listen to the nightlight hum and let your shoulders drop.',
  },
  {
    code: 'Rx #515',
    title: 'Midnight Library of Whispers',
    essence: 'An endless cozy library where books read themselves aloud in gentle maternal whispers while an amber candle that never burns down glows beside you.',
    dose: 'Turn over one quiet mental page and drift away.',
  },
];

export default function StarlightTelegraph({
  dreamModeActive = false,
  soundEnabled = false,
  onPlayChime = null,
  highScore = 0,
}) {
  const [currentNodeKey, setCurrentNodeKey] = useState('root');
  const [prescriptionIndex, setPrescriptionIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [historyCount, setHistoryCount] = useState(0);

  const typingTimeoutRef = useRef(null);
  const currentNode = DIALOGUE_NODES[currentNodeKey] || DIALOGUE_NODES.root;

  // Check reduced motion preference
  const isReducedMotion = useRef(false);
  useEffect(() => {
    try {
      isReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      isReducedMotion.current = false;
    }
  }, []);

  // Compute text to display (handles dynamic stargazing text)
  const getFullText = useCallback((nodeKey) => {
    const node = DIALOGUE_NODES[nodeKey] || DIALOGUE_NODES.root;
    if (node.text === 'dynamic_stargazing') {
      if (highScore > 0) {
        return `Tonight the velvet sky is filled with falling slumber! My official logbook records your personal best of ${highScore} points in Catch the Falling Dreams! The sweet slumber wisps truly seem to flock to your cloud basket.`;
      }
      return 'Tonight the dream stars are drifting gently from Cloud 9 before sunrise! You can slide down to the catching area below and gather a basket full of peaceful slumber for tonight’s flight.';
    }
    return node.text;
  }, [highScore]);

  // Typewriter effect
  useEffect(() => {
    const fullText = getFullText(currentNodeKey);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (isReducedMotion.current) {
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    setDisplayedText('');
    setIsTyping(true);

    let charIndex = 0;
    const typeNextChar = () => {
      if (charIndex < fullText.length) {
        charIndex += 1;
        setDisplayedText(fullText.slice(0, charIndex));
        typingTimeoutRef.current = setTimeout(typeNextChar, 14);
      } else {
        setIsTyping(false);
      }
    };

    typingTimeoutRef.current = setTimeout(typeNextChar, 30);

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [currentNodeKey, getFullText]);

  // Handle choice selection
  const handleSelectChoice = (nextKey) => {
    if (nextKey === 'dispense') {
      setPrescriptionIndex((prev) => (prev + 1) % DREAM_PRESCRIPTIONS.length);
      setCurrentNodeKey('prescribe');
    } else {
      setCurrentNodeKey(nextKey);
    }
    setHistoryCount((prev) => prev + 1);

    if (soundEnabled && onPlayChime) {
      onPlayChime();
    }
  };

  // Instant skip button for accessibility
  const handleSkipTyping = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setDisplayedText(getFullText(currentNodeKey));
    setIsTyping(false);
  };

  // Avatar image based on node & theme
  const avatarImageSrc = `${import.meta.env.BASE_URL}images/${currentNode.avatar}${dreamModeActive ? '_dream_mode' : ''}.png`;
  const currentPrescription = DREAM_PRESCRIPTIONS[prescriptionIndex];

  return (
    <section className="starlight-telegraph-section" id="starlight-telegraph" aria-labelledby="telegraph-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="section-eyebrow">Acoustic Starlight Communicator · 432 Hz</span>
          <h2 id="telegraph-heading" className="section-title">
            The Starlight Telegraph
          </h2>
          <p className="section-subtitle">
            Send an acoustic starlight query to Pip’s logbook console atop Cloud 9. Ask about dream
            engineering, origin lore, or request an official bedtime dream prescription.
          </p>
        </div>

        {/* Telegraph Console Container */}
        <div className="telegraph-console-card">
          {/* Top Brass Header Bar */}
          <div className="telegraph-header-bar">
            <div className="telegraph-frequency-indicator">
              <span className="telegraph-signal-pulse" aria-hidden="true" />
              <span className="telegraph-status-text">{currentNode.status}</span>
            </div>
            <div className="telegraph-controls-meta">
              <span className="telegraph-transmissions-count">
                Transmissions Logged: <strong>{historyCount}</strong>
              </span>
              {isTyping && (
                <button
                  type="button"
                  className="btn-skip-typing"
                  onClick={handleSkipTyping}
                  aria-label="Skip typewriter animation and display full message immediately"
                >
                  ⏩ Fast-Forward
                </button>
              )}
            </div>
          </div>

          {/* Dialogue Stage */}
          <div className="telegraph-stage">
            {/* Pip Avatar Vignette */}
            <div className="telegraph-speaker-column">
              <div className="telegraph-speaker-frame">
                <img
                  src={avatarImageSrc}
                  alt="Pip, Junior Dream Engineer"
                  className="telegraph-speaker-img"
                  width="130"
                  height="130"
                />
                <div className="telegraph-callsign-pill">
                  <span className="callsign-sparkle" aria-hidden="true">✦</span>
                  <span className="callsign-name">Pip</span>
                </div>
              </div>
            </div>

            {/* Transmission Readout */}
            <div className="telegraph-message-column">
              <div
                className="telegraph-message-bubble"
                role="region"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="telegraph-tape-edge" aria-hidden="true">
                  <span>✦ ✦ ✦ OBSERVATORY LOGBOOK ✦ ✦ ✦</span>
                </div>
                <p className="telegraph-message-text">
                  {displayedText}
                  {isTyping && <span className="telegraph-cursor" aria-hidden="true">▌</span>}
                </p>

                {/* Prescription Card Display if active */}
                {currentNode.isPrescription && (
                  <div className="prescription-card" role="article" aria-label="Bedtime Dream Prescription">
                    <div className="prescription-header">
                      <span className="prescription-badge">{currentPrescription.code}</span>
                      <strong className="prescription-title">{currentPrescription.title}</strong>
                    </div>
                    <p className="prescription-essence">&ldquo;{currentPrescription.essence}&rdquo;</p>
                    <div className="prescription-dosage">
                      <span className="dosage-icon" aria-hidden="true">🍵</span>
                      <span className="dosage-text"><strong>Pip’s Bedtime Dose:</strong> {currentPrescription.dose}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Inquiry Prompt Buttons */}
              <div className="telegraph-choices-area" aria-label="Available dialogue inquiries">
                <span className="choices-eyebrow">
                  {isTyping ? 'Pip is formulating response...' : 'Choose a logbook inquiry:'}
                </span>
                <div className="telegraph-choices-grid" role="group">
                  {currentNode.choices.map((choice) => (
                    <button
                      key={choice.id}
                      type="button"
                      className="btn-telegraph-choice"
                      onClick={() => handleSelectChoice(choice.next)}
                    >
                      <span className="choice-label">{choice.label}</span>
                      <span className="choice-arrow" aria-hidden="true">→</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Brass Footer Plate */}
          <div className="telegraph-footer-plate">
            <span className="telegraph-disclaimer">
              ✦ Rule-based observatory telegraph logbook · Stored securely in Cloud 9 memory · Zero external bots
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
