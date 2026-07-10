# Akash Kanagala — Portfolio

Animated robotics portfolio with a red/white race-control theme. Next.js 16 (App Router), Tailwind 4, Framer Motion, React Three Fiber, Lenis smooth scroll.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Deploying to Vercel

Push this folder to a GitHub repo and import it in Vercel — no config needed (defaults work).

## Where the content lives

- `src/data/content.ts` — identity, projects/case studies, skills, timeline, services
- `src/data/notes.ts` — pit notes (blog posts)
- `src/app/globals.css` — the red/white palette (`--c-primary`, `--c-bg`, …)

## Easter eggs

- Press `` ` `` for the pit-wall terminal — try `help`, `max`, `dhoni`, `ducati`, `veyron`, `uav`
- Konami code (↑↑↓↓←→←→BA) triggers a 360 overtake
