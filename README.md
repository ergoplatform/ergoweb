<p align="center">
  <img src="public/icon.png" alt="Ergo" width="84" />
</p>

<h1 align="center">Ergo Platform Website</h1>

<p align="center">
  <a href="https://nextjs.org"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-pages%20router-000?logo=next.js&logoColor=white"></a>
  <a href="#"><img alt="React 18" src="https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=061a2b"></a>
  <a href="https://strapi.io"><img alt="Strapi" src="https://img.shields.io/badge/CMS-Strapi-2F2E8B?logo=strapi&logoColor=white"></a>
  <a href="#"><img alt="i18n" src="https://img.shields.io/badge/i18n-react--intl-0a7ea4"></a>
  <a href="https://storybook.js.org/"><img alt="Storybook" src="https://img.shields.io/badge/Storybook-9.x-ff4785?logo=storybook&logoColor=white"></a>
  <a href="#"><img alt="Node" src="https://img.shields.io/badge/Node-%E2%89%A5%2018.18%20(20%2B%20rec.)-3c873a?logo=node.js&logoColor=white"></a>
  <a href="#"><img alt="Docker" src="https://img.shields.io/badge/Docker-ready-2496ed?logo=docker&logoColor=white"></a>
</p>

<p align="center">
  Frontend for the official Ergo website. SSR/SSG with Next.js, dynamic content from Strapi, internationalization with react‑intl, and a polished component library via Storybook.
</p>

---

## 🗺️ Table of contents

- [🗺️ Table of contents](#️-table-of-contents)
- [🚀 How it works](#-how-it-works)
- [✅ Requirements](#-requirements)
- [🔐 Environment variables](#-environment-variables)
- [⚡ Quick start](#-quick-start)
- [🧰 Scripts](#-scripts)
- [🐳 Docker](#-docker)
- [🗂️ Project structure](#️-project-structure)
- [🌐 Data fetching (CMS)](#-data-fetching-cms)
- [🌍 Internationalization (react‑intl + FormatJS)](#-internationalization-reactintl--formatjs)
- [🚢 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [Troubleshooting](#troubleshooting)

---

## 🚀 How it works

- Framework and routing
  - Next.js “pages” router (not the app router)
  - Hybrid rendering: SSR for CMS‑backed pages (blog/news/etc.), SSG for static pages
- Styling
  - SCSS stylesheets plus Tailwind utilities where appropriate
- Content
  - Dynamic data (blog, news, ecosystem, categories…) comes from Strapi
  - CMS base URL is provided via the `NEXT_PUBLIC_STRAPI_API` env var
- i18n
  - react‑intl with FormatJS extraction and compilation
  - Extracted messages in `content/locales/`, compiled runtime artifacts in `content/compiled-locales/`
- Config and SEO
  - `next-sitemap.config.js` for sitemap generation (sitemaps also available under `public/`)
  - `public/robots.txt` and `public/sitemap*.xml`
- Tooling
  - Storybook for components
  - ESLint/Prettier for consistency
  - Lighthouse report included for perf reference (see `lighthouse-report.json`)
- Containers & CI/CD
  - Multi‑stage Dockerfile builds a small production image
  - `entrypoint.sh` injects the CMS URL into the built assets on container start
  - `cloudbuild.yaml` for Google Cloud Build pipelines

---

## ✅ Requirements

- Node.js 18.18+ (Node 20+ recommended)
- npm 9+
- Docker (optional, for containerized builds)
- The repo includes the necessary FormatJS CLI for i18n workflow

---

## 🔐 Environment variables

Create a `.env` file in the project root (a sample is present in the repo):

```env
# Required: Strapi CMS base URL
NEXT_PUBLIC_STRAPI_API=https://ergo-platform-cms-nvbpfiue6q-ez.a.run.app

# Required only for protected translation maintenance endpoints
TRANSLATION_BACKFILL_SECRET=replace-with-a-long-random-secret

# Local Strapi example
# NEXT_PUBLIC_STRAPI_API=http://localhost:1337
```

Notes

- This value is used both server‑side (SSR) and client‑side where needed.
- SSR pages will fail to load dynamic content if this is not set.
- Ensure Strapi CORS/public permissions are configured for the frontend origin(s).
- Production calls to `/api/translate/backfill` and `/api/translate/repair-media` must include
  `Authorization: Bearer $TRANSLATION_BACKFILL_SECRET`.

---

## ⚡ Quick start

```bash
# 1) Install
npm install

# 2) Run dev server (http://localhost:3000)
npm run dev
```

Build and run the production bundle:

```bash
npm run build   # runs i18n extraction + compilation, then next build
npm run start   # serve the optimized production build
```

> Tip: Editing react‑intl copy? Re-run `npm run i18n` (or a full `npm run build`) so compiled messages reflect your changes.

---

## 🧰 Scripts

- `npm run dev` — start Next.js in dev mode
- `npm run build` — extract/compile i18n, then Next.js build
- `npm run start` — start the optimized production server
- `npm run lint` — run ESLint
- `npm run storybook` — run Storybook at http://localhost:6006
- `npm run build-storybook` — build static Storybook
- `npm run extract:i18n` — extract messages to `content/locales/en.json`
- `npm run compile:i18n` — compile all locales to `content/compiled-locales/`

---

## 🐳 Docker

Build:

```bash
docker build -t ergo-web .
```

Run (inject Strapi URL):

```bash
docker run -e NEXT_PUBLIC_STRAPI_API="https://ergo-platform-cms-nvbpfiue6q-ez.a.run.app" -p 3000:3000 ergo-web
```

Open http://localhost:3000

Notes

- `entrypoint.sh` replaces a placeholder in built assets with `NEXT_PUBLIC_STRAPI_API` at container startup, so always pass it to `docker run`.

---

## 🗂️ Project structure

```text
.
├─ pages/                 # Next.js routes (SSR/SSG)
├─ components/            # Reusable UI + layout
├─ styles/                # SCSS & Tailwind setup
├─ content/
│  ├─ locales/            # FormatJS extracted messages
│  └─ compiled-locales/   # Compiled runtime artifacts
├─ public/                # Static assets, robots.txt, sitemaps
├─ utils/                 # Utilities (RSS, hooks, helpers)
├─ scripts/               # Project scripts (e.g., media)
├─ Dockerfile             # Multi-stage production build
├─ entrypoint.sh          # Injects Strapi URL at startup
├─ cloudbuild.yaml        # Google Cloud Build
├─ next-sitemap.config.js # Sitemap config
└─ tailwind.config.js     # Tailwind config
```

---

## 🌐 Data fetching (CMS)

Server‑side fetches read from `process.env.NEXT_PUBLIC_STRAPI_API`. Common SSR pages include:

- Blog/news lists and details:
  - `pages/blog.tsx`, `pages/news.tsx`, `pages/blog/[id].tsx`, `pages/news/[id].tsx`
- Ecosystem & features:
  - `pages/ecosystem.tsx`, plus related components
- Categories/spotlights and more

Ensure the Strapi instance exposes the expected collections and that CORS/public permissions permit reads from this frontend.

---

## 🌍 Internationalization (react‑intl + FormatJS)

- Write messages with `react-intl` in pages/components.
- Extract messages:

```bash
npm run extract:i18n
# -> content/locales/en.json (and other locales if present)
```

- Compile messages:

```bash
npm run compile:i18n
# -> content/compiled-locales/
```

`npm run build` runs both steps automatically before the Next.js build.

---

## 🚢 Deployment

- Build a production Docker image in CI.
- Provide `NEXT_PUBLIC_STRAPI_API` for each environment.
- Run the container on your platform of choice (Cloud Run, Kubernetes, VM, …).

Sitemaps/SEO

- Sitemaps are configured via `next-sitemap.config.js` and also checked in under `public/`.
- `public/robots.txt` is included.

---

## 🤝 Contributing

- PRs and issues welcome
- Run `npm run lint` before submitting
- If you change user‑facing copy, update i18n:
  - `npm run extract:i18n` then `npm run compile:i18n`
- Consider updating/adding a Storybook story for component changes

## Troubleshooting

logs from the latest revision of your service.

```bash
gcloud run services logs read ergo-platform-frontend --region europe-west4 --limit=50
```
