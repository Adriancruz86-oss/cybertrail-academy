# CyberTrail Academy

A browser-based cybersecurity learning game MVP for Security+ first-response training.

## Setup

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open the local URL shown by Vite.

## Build

```bash
npm run build
```

## Test

```bash
npm run test
```

## What is implemented

- Phaser 3 player movement and hub interaction
- Data-driven mission loading for missions 1–3
- Save system using browser localStorage
- Mastery engine with first-attempt, distinct-context competency streak rules
- CyberDex and Competency Matrix UI panels
- Basic PWA support with `manifest.json` and `sw.js`
- Persisted mission attempts, prerequisite enforcement, and one-time rewards
- Touch controls plus large-text and reduced-motion preferences

## Architecture

- `src/game/scenes`: Phaser scene flow
- `src/data`: data-driven concepts and missions
- `src/services`: content lookup, save migration, progression, and mastery rules
- `src/ui`: accessible HTML status and learning panels
- `tests`: mastery, save, progression, and content-integrity checks

TypeScript is the only maintained source. Builds type-check without emitting compiled files into `src`.

## Deployment

The production base path is `/cybertrail-academy/` for GitHub Pages. The service worker uses runtime caching for same-origin built assets and removes stale cache versions during activation.

## Notes

- Mission 4 is intentionally excluded for now.
- This is a vertical slice only; more missions and polish remain.
