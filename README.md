# 🌙 Pip's Midnight Observatory
### haX.baby · Baby's First Website Hackathon (Track 1: Pip the Skull Baby)

> **"A whimsical midnight observatory above the clouds where dreams are mapped like constellations."**

Welcome to **Pip's Midnight Observatory**, an interactive, art-directed storybook web experience built for the haX.baby *Baby's First Website* Hackathon.

Starring **Pip**, the official sleepy, gentle Skull Baby and Junior Dream Engineer at Midnight Nursery, the website invites visitors into a cozy sanctuary 40,000 feet above Cloud 9 where bedtime lullabies are calibrated, nightlight lanterns are filled with crescent moonlight, and dream delivery routes are charted across the stars.

---

## 🌟 Interactive Experience & Features

### 1. 🔭 Interactive Constellation Telescope
- **Feature**: Directly integrated into the *Dream Delivery Routes* project card.
- **How it works**: Connect 5 celestial waypoints in sequence (**1. Observatory Peak → 2. North Moonbeam → 3. Badger Hollow → 4. Owl Perch → 5. Cradle of Dreams**) to chart Pip's nocturnal flight corridor.
- **Guidance & Feedback**: Helpful real-time tips for out-of-order or duplicate selections.
- **Reward**: Completing the constellation draws a glowing celestial loop and reveals a heartwarming thank-you note from Pip. Includes an instant **Reset Skyway** button.
- **Accessibility**: Scalable inline SVG, generous 44×44px touch targets, visible focus rings, and full keyboard navigation (`Tab` + `Enter`/`Space`).

### 2. 🗺️ Interactive Dream Delivery Flight Map
- **Feature**: Pip’s nocturnal flight navigation across five fictional bedtime destinations: **1. Midnight Observatory**, **2. Moonbeam Rooftops**, **3. Badger Hollow**, **4. Owl Perch**, and **5. Cradle of Dreams**.
- **Vector Skyway**: Smooth curved SVG flight corridor with glowing shimmer effects and an animated starlight skiff.
- **Storytelling & Dispatch**: Direct destination selection in any order, accessible destination detail panel, "Deliver Dream" starlight dispatch action, and corridor replay/reset.
- **Accessibility & Motion**: Seamless keyboard navigation, touch targets ≥ 44×44px, and full `prefers-reduced-motion` compliance.

### 3. 🎵 Lullaby Lab — Original Web Audio Music Box
- **Feature**: A playable music box inside the *Lullaby Lab* card.
- **Synthesis Engine**: Uses the browser's native **Web Audio API** (zero MP3/WAV dependencies) to synthesize an original, copyright-free 11-note bedtime melody in soothing pentatonic/C-Major.
- **Timbre**: Blends fundamental bell sine waves with octave shimmer overtones and authentic physical chime decay envelopes.
- **Inclusive Design**: Features a synchronized chime-pin progression bar displaying active notes (C5, E5, G5, etc.), allowing hearing-impaired or muted visitors to enjoy the melody visually.
- **Safety**: User-gesture enforced, overlap-free playback, and instant smooth-gain release on Stop or unmount to eliminate speaker clicks.

### 4. 💌 Ephemeral Dream Drop Form
- **Feature**: An interactive dispatch station where visitors whisper bedtime wishes for sleeping woodland creatures.
- **Form Controls**: Dream Title (max 60 chars) and Dream Vision (max 240 chars) with live character counters, recipient selector, and inline validation.
- **Cloud Basket**: Dispatched dreams are nestled into a live local feed.
- **Privacy & Transparency**: Explicitly notes that dreams are held purely in temporary session memory and gently evaporate on page refresh (no backend, no trackers, no PII).

### 5. 🗝️ The Secret Stargazing Loft (Easter Egg)
- **Feature**: Clicking the brass telescope button in the footer unlocks Pip's hidden sanctuary above Cloud 9 (`SecretObservatoryModal.jsx`).
- **Interactive Surprise**: An interactive 4-star mini constellation chart of **"The Dream Moon Rabbit"**. Lighting up all 4 stars reveals Pip's secret recipe for *Starlight Moonflower Tea*.
- **Accessibility**: Full accessible dialog semantics (`role="dialog"`, `aria-modal="true"`), focus trap, Escape key handling, and automatic focus restoration to the trigger button upon dismissal.

### 6. 🎛️ Customizable Ambiance Settings
- Located in the footer **Observatory Ambiance Settings** bar:
  - **✨ Sparkle Clicks (ON / OFF)**: Spawns gentle radiating starlight sparkles on click/tap without replacing the system cursor. Automatically suppressed on touch devices and under `prefers-reduced-motion`. Persisted in `localStorage`.
  - **🔔 Chimes (ON / MUTED)**: Plays gentle synthesized chimes upon key milestones (discovering the secret loft, completing the constellation, or submitting a dream). Defaults to MUTED.
  - **🌙 Enter Dream Mode**: Top-bar toggle that bathes the observatory in velvety midnight-blue tones.

### 7. 📖 Origin Story Chronicles
- Three short storybook chapters strictly under 150 words each:
  - *Scene 01: The First Star* (76 words)
  - *Scene 02: The Midnight Workshop* (82 words)
  - *Scene 03: The First Dream Delivery* (78 words)
- Interactive tab switcher with moral takeaway quotes.

---

## 🎨 Creative Direction & Design Tokens

Designed as an art-directed storybook experience with early-web warmth rather than a corporate SaaS dashboard:

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Warm Cream** | `#fff8f1` | Primary background, parchment paper warmth |
| **Berry** | `#a34063` | Editorial accents, badges, primary CTA buttons |
| **Cocoa** | `#5c4033` | Rich legible body typography (AAA contrast) |
| **Blush** | `#f4d6d7` | Soft pill backgrounds, tag borders |
| **Dream Gold** | `#f3c96b` | Glowing stars, constellation lines, brass hardware |
| **Midnight Blue** | `#22263f` | Night sky backdrop, headers, Dream Mode surface |

### Typography
- **Headlines**: *Fraunces* (Editorial serif with vintage soft curves)
- **Body & Controls**: *Nunito* (Rounded, friendly, approachable sans-serif)

---

## 🛠️ Tech Stack & Architecture

- **Framework**: React 19 + Vite 8 (JavaScript)
- **Audio**: Native Web Audio API
- **Styling**: Modular CSS custom properties, responsive media queries (320px to 1440px), fluid layouts
- **Linter**: Oxlint (0 errors, 0 warnings)
- **Assets**: 100% official Pip assets (`public/images/`) with relative base paths for universal static hosting

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
git clone https://github.com/shivenmhatre23-cell/midnight-observatory.git
cd midnight-observatory
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build & Preview
```bash
npm run build
npm run preview
```

### Linting
```bash
npm run lint
```

---

## ♿ Accessibility & Quality Standards

- **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- **Contrast**: Body text (#5c4033 on #fff8f1) achieves > 8.6:1 AAA contrast ratio.
- **Keyboard Navigation**: All interactive elements (constellation stars, music box, dialogs, sliders) are fully operable via `Tab`, `Enter`, `Space`, and `Escape`.
- **Screen Reader Support**: `aria-live` and `role="status"` announcements on milestone achievements, descriptive `aria-label` tags on all buttons and SVG nodes.
- **Reduced Motion**: All continuous floats, particle sparkles, and rotating rings are gracefully disabled or simplified when `prefers-reduced-motion: reduce` is enabled.
- **Responsive**: Fully tested across 320px, 375px, 768px, and 1200px+ viewports with zero horizontal overflow.

---

## 📋 Hackathon Submission Checklist

- [x] Uses existing React + Vite project with JavaScript.
- [x] Uses official Pip assets (`pip_avatar_cloud.png`, `pip_portrait.png`, `pip_lullaby_box.png`, `pip_dream_lantern.png`).
- [x] Warm cream, berry, cocoa, blush, dream gold, and midnight palette implemented.
- [x] Top navigation with wordmark, section anchors, and working Dream Mode.
- [x] Hero section with official cloud artwork and Junior Dream Engineer badge.
- [x] Character profile covering Pip's appearance, personality, habits, and dream job.
- [x] 3-card project showcase (*Lullaby Lab*, *Nightlight Collection*, *Dream Delivery Routes*).
- [x] Origin story with 3 scenes each strictly under 150 words.
- [x] Playable Web Audio music box with Play/Stop and note visualizer.
- [x] Interactive constellation telescope with sequential star linking and reset.
- [x] Ephemeral session Dream Drop form with live character limits and validation.
- [x] Interactive Dream Delivery Flight Map with curved SVG route, 5 destinations, and dream parcel dispatch.
- [x] Hidden observatory Easter egg modal with Moon Rabbit star puzzle and tea recipe.
- [x] Optional Starlight Sparkles and Interaction Chimes with persistent settings.
- [x] Responsive layout verified at 320px, 375px, 768px, and desktop widths.
- [x] Production build passes cleanly with 0 linter warnings.
- [x] Feature-based Git commit history preserved on `main`.

---

*Handcrafted with starlight, lavender pillows, & chamomile tea for the haX.baby Baby's First Website Hackathon.*

