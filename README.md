# Hani Ayach — Portfolio

Personal site of **Hani Ayach, Full Stack Software Engineer** (.NET · Angular · React · Vue).

Highlights:
- **`hani.sh`**, an interactive terminal in the hero (`help`, `experience`, `work`, `open <slug>`, `automate`, `sudo hire-hani`…)
- Experience timeline with years computed from real dates
- Five anonymized case studies with architecture diagrams
- An Architecture & design patterns page with C# examples
- A "How I work with AI" page, with proof generated at build time (tests passing, build version)

## Stack
React 19 · Vite · Vitest + Testing Library · Bootstrap 5 · react-three-fiber · Mermaid

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit + component tests
npm run build    # writes public/proof.json, then builds to dist/
```

## Where things live
- `src/content/profile.js` + `src/content/architecture.js`: all site content (experience, skills, case studies). Edit this to update the site.
- `src/terminal/`: terminal command logic (`commands.js`, pure and tested) and UI.
- `scripts/gen-proof.mjs`: build-time proof numbers.
- `docs/how-this-site-was-built.md`: how the site was planned, tested and reviewed.
- `design/og.svg`: source of `public/og.png` (social preview).

## Deploy
Static site. Vercel (`vercel.json`) or Netlify (`public/_redirects`) handle SPA routes.
Update the site URL in `index.html`, `public/robots.txt` and `public/sitemap.xml` if the domain differs from `hani-ayach.vercel.app`.
