# HERizon

A responsive IGDTUW campus companion built with React, TypeScript, Vite, and Leaflet.

## Run locally

```sh
npm ci
npm run dev
```

## Build and publish

```sh
npm run build
```

The site uses relative asset paths and can be hosted on GitHub Pages. The `docs/` directory contains the published build. To update it, rebuild and copy `dist/` into `docs/`, preserving `docs/.nojekyll`, then commit and push. GitHub Pages serves `main` / `docs`.

## Features

- Responsive lavender, cream, and sage interface with desktop sidebar and mobile navigation.
- Guest or college-email demo onboarding, profile, and sign-out.
- Interactive Delhi station map with selected origin/destination, station tooltips, zoom, and Google Maps transit directions.
- Route-match preview with clearly identified example profiles.
- Peer-circle joining and personal notes.
- Keyword-based support triage, unique case IDs, department task simulation, timeline, and reopening resolved cases.
- Browser-tab session persistence across refreshes. Sign-out clears profile, support case, circle notes, and membership.

## Scope

This is a functional interactive **demo**, not a production multiuser service. Email entry does not authenticate or verify anyone. Travel buddies are example profiles. Circle messages are local notes, not live chat. Staff actions are simulations and do not contact university departments. The map displays station coordinates and illustrative straight connections, not a navigable metro path or live people locations. Google sign-in was intentionally omitted.

Real shared accounts, verified student matching, messaging, location sharing, and staff authorization require a backend, access controls, consent handling, and deployment configuration. No secrets or real student datasets are included.

Map tiles: OpenStreetMap contributors, with attribution displayed on the map.
