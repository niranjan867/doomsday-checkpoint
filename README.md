# DOOMSDAY CHECKPOINT

A cinematic MCU watch-order guide and personal progress tracker designed to prepare viewers for **Avengers: Doomsday**.

---

## 🎬 Overview

DOOMSDAY CHECKPOINT is a content-first Marvel viewing companion built with Next.js and TypeScript. It offers two lenses over a single canonical library of 72 watch milestones, complete with verified India streaming availability via JioHotstar, spoiler-safe guidance, and localized progress tracking.

---

## ✨ Features

- **The Complete Watch Order (Release Order)**: The recommended path for first-time viewers, structured into 5 cohesive phases:
  - **Part I**: *The Infinity Saga* (24 movies)
  - **Part II**: *The Street-Level Track* (6 Netflix-era seasons)
  - **Part III**: *The Multiverse Saga* (Phases 4–5)
  - **Part IV**: *The X-Men Homework* (Fox universe continuity)
  - **Part V**: *The Final Run into Phase 6*
- **The MCU in Timeline Order (Chronological Rewatch)**: In-universe story chronology across 5 narrative eras with nuanced annotations for alternate timelines (*Earth-10005*, *Earth-828*) and entities outside normal time (*Loki*, *What If...?*).
- **Shared Watch Progress**: Progress state synchronizes seamlessly between Release Order and Timeline Order views and persists locally in your browser (`localStorage`).
- **India Streaming Availability**: Direct, verified **`[ WATCH ON JIOHOTSTAR ↗ ]`** deep links for all available titles.
- **Spoiler-Safe by Default**: Viewing notes protect against future casting announcements and story revelations until explicitly unlocked via **`[ Reveal Spoilers ]`**.
- **Contextual Viewing Rules**: Spoiler-safe stop guidance appears contextually when reaching key milestones (e.g. post-credits sequencing).
- **Instant Search & Multi-Criteria Filtering**: Filter by format (Movies, TV, Specials), importance (Essential, Recommended, Optional), status (Unwatched, In Progress, Watched), or Doomsday connection.
- **Side Stories & Expansions**: Separate guides for optional viewing paths (*Agents of S.H.I.E.L.D.*, *The Defenders Saga*, *Raimi & Webb Spider-Man Legacy*).
- **Responsive & Accessible**: Optimized for mobile, tablet, and desktop viewports with keyboard navigation, ARIA semantics, and reduced-motion support.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (or Node.js 20+)
- npm 9+

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

### Forensic Audit & Quality Gate
```bash
npm run audit:phase8
```

---

## ☁️ Deployment

DOOMSDAY CHECKPOINT is optimized for deployment on **[Vercel](https://vercel.com/)** as a standard Next.js application:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Output Directory**: Automatically managed by Next.js
- **Environment Variables**: None required.

---

## 🛡️ License

This is an independent, non-commercial fan-made project created for Marvel Cinematic Universe preparation. Marvel characters, titles, and logos are trademarks and copyright of Marvel Studios LLC and their respective owners.
