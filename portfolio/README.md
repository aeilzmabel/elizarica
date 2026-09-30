# Eliza Rica De La Rosa: Portfolio

Personal site and CV. Next.js (App Router), Tailwind CSS v4, Framer Motion.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Where things live

| Path | What |
| --- | --- |
| `lib/data.ts` | All copy: profile, experience, projects, skills, recognition |
| `lib/motion.ts` | The house spring (`stiffness: 400, damping: 30`) and shared variants |
| `app/globals.css` | Color tokens (light + `.dark`), fonts, easing curves |
| `components/` | Sections (`hero`, `experience`, `projects`, `toolkit`, `contact`) and primitives (`tilt-card`, `magnetic`, `reveal`) |
| `public/cv/` | The downloadable CV. Replace the PDF, keep the filename (or update `profile.cv`) |
| `public/projects/` | Project screenshots |

## Deploy

Push to GitHub and import the repo on Vercel (framework preset: Next.js, no env vars needed),
or run `npx vercel` from this folder. `metadataBase` picks up `VERCEL_PROJECT_PRODUCTION_URL` automatically.
