# HERizon — Together, not alone.

Your campus. Your people. Your space to connect.

An IGDTUW women-student campus connection and wellbeing **prototype**, built with React, TypeScript, Vite, Framer Motion and Leaflet. The user requested prototype-only behaviour with no backend.

Live: https://aqsa-laraib.github.io/HERizon/

## Run, test and deploy

Requires Node.js 24+ (tests use native TypeScript stripping).

```sh
npm ci
npm run dev
npm test
npm run build:pages
```

GitHub Pages serves the compiled `docs/` directory from `main`. `build:pages` replaces it with the current build. Commit source and docs together and push to `main`.

## User flow

1. Enter an `@igdtuw.ac.in` email and confirm IGDTUW woman-student membership. Domain validation is mocked, not verified authentication; there is no guest signup.
2. Complete a minimal private profile and choose Travel & Connect or HERizon peer support.
3. Travel: enter an approximate area, destination, date, time and transport. Shared **directed corridor segments**, date, time and transport produce compatible sample profiles. Say Hi creates a pending request. Use the explicitly labelled recipient simulator to accept, decline, ignore, block or report. Only acceptance opens local messaging.
4. Wellbeing: write a reflection, record/upload audio, or use browser dictation when supported. Local keyword suggestions are adjustable and labelled **not LLM analysis**. Match against sample anonymous peers without exposing source text.
5. Communities: simulate independent opt-ins; ten distinct opt-ins and the current student's consent are required. Only the current student is added. Post, react, report, remove own posts, or leave.
6. Additional support: explicitly choose a summary and institutional email, approve those fields and create a local counsellor request. Private reflections/audio/messages are excluded. Withdraw consent in Privacy to remove the associated local request.

## Implemented and deliberately unavailable

- Functional local onboarding, profile, routes, filters, saved plans/resources, pending/accepted connections, messages, notifications, anonymous circles, report/block, consent and support requests.
- In-memory state only: refresh/sign-out clears all activity. No sensitive content is persisted in localStorage or sessionStorage. Old HERizon sessionStorage values are removed on startup.
- Local audio recording (60 seconds maximum), upload/preview/delete (10 MB maximum), and optional browser speech recognition. Browser dictation can transmit audio to the browser provider; explicit opt-in precedes activation. Uploaded-file transcription is unavailable without a server and reports that clearly.
- No actual LLM, AI moderation, live peers, official identity verification, server database, SSO, role-protected moderator console or real counsellor delivery. No keys or env variables are required. **Never put an LLM secret in a VITE variable.**
- Shared student demand, event attendance and upcoming events are never invented. Sample peers and simulated opt-in counts are labelled throughout.

## Architecture

- `src/screens/`: UI screens and voice capture lifecycle.
- `src/context/HerizonContext.tsx`: in-memory session, consent-based conversation transitions, reporting and notifications.
- `src/domain/models.ts`: typed profile, plan, connection, message, circle, consent, report and support models.
- `src/domain/logic.ts`: pure commute matching, transparent theme suggestions, basic moderation and community threshold rules.
- `src/services/api.ts`: asynchronous prototype service boundary. Replace with an authenticated backend adapter for real AI; it currently makes no external AI calls.
- `src/data/knowledge.json`: curated official university source excerpts and verification dates.
- `src/components/CommuteMap.tsx`: approximate station map, OpenStreetMap tile attribution and no geolocation tracking.

## Knowledge retrieval / future RAG

Discover retrieves matching entries from the curated JSON by query terms and shows source links directly; it does not pretend to generate an LLM answer. Year/branch filters return no results when verified eligibility is absent. Workshops, fests and popularity remain empty until verified current entries exist. A future server can feed retrieved, trusted documents to an LLM with strict citations, treating questions and source text as untrusted data. Never allow generated dates or services that are absent from sources.

## Moderation, consent and privacy

Basic deterministic rules hold some contact details, addresses, links and harmful content before posting. This is not comprehensive moderation. Reports are private local drafts; no human team receives them. No automatic diagnosis, counsellor referral, ban or irreversible AI action occurs. Production needs server validation, rate limits, real institutional SSO, participant-level access checks, protected reviewer roles, audited consent, encrypted storage/backups and operational human escalation. All claims in the UI reflect the current prototype rather than these future capabilities.

Public peer identity is an automatically generated nickname. Identity fields stay in the private profile/support views. Only abstract selected themes appear in match cards; recordings and original reflections are never copied into requests or messages automatically.

## External connections

GitHub Pages delivers the app over HTTPS. Leaflet loads OpenStreetMap tiles. Transit directions and official-source links open third-party pages. Browser dictation is opt-in and provider-dependent. No analytics, tracking pixels, API keys or real student data are included.
