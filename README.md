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

## Sprint 3 manual testing

1. Start with `npm run dev`, open the displayed URL, and reset progress if an older save is present.
2. Complete Missions 1–3 through briefing, investigation, decision, feedback, debrief, and completion.
3. On a phone or browser device emulator, test both portrait (390×844) and landscape (844×390).
4. Confirm the four direction buttons move the analyst, Interact opens nearby missions, and no keyboard is required.
5. On desktop, confirm WASD movement and the E interaction key still work.
6. During a mission, refresh the page and choose Continue Shift; the saved mission stage should resume.
7. Use a hint and an incorrect choice to confirm they do not award competency credit. Complete Missions 2 and 3 correctly on their first attempts to confirm Least Functionality becomes competent in the Matrix.
8. Confirm encountered concepts appear in CyberDex, completed missions remain completed after refresh, and Reset Progress asks for confirmation.

Before delivery, run both `npm test` and `npm run build`.

## Sprint 4 certificate mission testing

1. Continue from a Sprint 3 save and confirm it migrates without losing XP, settings, completed missions, or active mission progress.
2. Complete Missions 4–6 in sequence and inspect every certificate evidence field before making a decision.
3. Confirm Mission 4 awards guided recognition only and does not increase a competency streak.
4. Complete Missions 5 and 6 correctly on the first attempt without hints; Certificate Trust should become competent across the two distinct contexts.
5. Retry with a hint or an incorrect first answer and confirm that encounter does not earn competency credit.
6. Refresh during certificate inspection and after a decision; collected evidence and decisions should be restored.
7. Confirm each debrief lists evidence, decisions, mastery evidence, and newly discovered CyberDex entries.
8. Repeat Missions 4–6 at 390×844 and 844×390 and confirm all evidence and action controls remain readable and usable by touch.

## Sprint 5 security and credential testing

1. Continue from a Sprint 4 save and confirm the version 5 migration preserves the active mission, evidence, decisions, XP, and mastery state.
2. Complete all four decisions in Mission 7 and verify the mission is not rewarded until the final correct decision.
3. Make an incorrect choice or use a hint on one Mission 7 decision and confirm only that activity loses first-attempt competency credit.
4. Confirm the Mission 7 debrief distinguishes AES, ECDHE, HMAC, hashing, and certificate identity.
5. In Mission 8, inspect the sender, urgency, destination domain, and cloned form before reporting the phishing incident.
6. In Mission 9, confirm the response addresses stolen passwords, MFA, active sessions, monitoring, and lockout availability tradeoffs.
7. Refresh between Mission 7 decisions and confirm the current activity and per-activity attempt state resume correctly.
8. Confirm Sprint 5 CyberDex discoveries and competency tiles remain visible instead of being hidden behind earlier concept limits.
9. Repeat Missions 7–9 with touch controls in phone portrait and landscape, then confirm WASD and E remain functional on desktop.

## Sprint 6 detection and application-security testing

1. Complete Mission 10 and confirm the correct response uses device, network, timing, and user context rather than treating location alone as proof.
2. Use a hint or incorrect response in Mission 10 and confirm impossible-travel evidence does not receive competency credit.
3. Complete Mission 11 and verify parameterized queries are presented as the root fix while validation, logging, scoping, and WAF tuning remain supporting controls.
4. Complete all four Mission 12 classifications: true positive, false positive, true negative, and false negative.
5. Confirm each Mission 12 activity tracks its own first attempt and hint state.
6. Complete the first two alert classifications correctly without hints and confirm Alert Quality becomes competent across distinct contexts.
7. Refresh between Mission 12 classifications and confirm the current activity, attempts, evidence, and decisions resume.
8. Confirm Missions 10–12 unlock sequentially, grant rewards once, and populate their CyberDex and Competency Matrix entries.
9. Repeat Missions 10–12 at phone portrait and landscape sizes and verify all four-option activities remain readable and touchable.

## Sprint 7 world and interface testing

1. Confirm the campus hub displays recognizable CWSS and BrightPath buildings, landscaped paths, visible entrances, and the analyst sprite.
2. Verify the CWSS and BrightPath entrance markers still launch the correct sequential missions.
3. Confirm Mission, CyberDex, Progress, and Settings open as dedicated screens and close with the close button or Escape.
4. Verify the current destination notification identifies CWSS for Mission 1 and BrightPath for later missions.
5. On phone portrait, confirm the world remains primary, the HUD sits below the canvas, and menu screens occupy the full viewport.
6. On phone landscape and desktop, confirm the compact navigation does not cover essential world interactions.
7. Verify the CyberDex and Progress screens can scroll through every discovered concept without the earlier entry caps.
8. Confirm touch movement, Interact, WASD, E, text sizing, reduced motion, save/resume, and reset confirmation remain functional.
9. Regression-test Missions 1–12, then run `npm test` and `npm run build`.

## What is implemented

- Phaser 3 player movement and hub interaction
- Data-driven mission loading for missions 1–3
- Save system using browser localStorage
- Mastery engine with first-attempt, distinct-context competency streak rules
- CyberDex and Competency Matrix UI panels
- Basic PWA support with `manifest.json` and `sw.js`
- Persisted mission attempts, prerequisite enforcement, and one-time rewards
- Touch controls plus large-text and reduced-motion preferences
- Illustrated campus hub with dedicated Mission, CyberDex, Progress, and Settings screens

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
