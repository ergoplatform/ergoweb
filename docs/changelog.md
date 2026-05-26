# Changelog

Continuously updated after each Codex run.

## 2026-05-26 - Fix blog dropdown visibility and placement

Files:

- `components/shared/CategoryPicker.tsx`
- `pages/blog.tsx`
- `docs/changelog.md`

What changed:

- Widened category dropdown menu so category names have room beside counts.
- Strengthened category item contrast in light and dark mode.
- Moved category and post-type dropdowns into the top-left control area above articles on desktop.
- Kept heading aligned separately so filters use empty upper-left space.

Why:

- Category names were clipped/invisible; only count badges showed.
- Desktop controls were not using the empty space above article grid.

Review risk:

- Category menu is wider than button and can overlay nearby content while open.

Verification:

```bash
npm run check
npm run build
```

Result:

- `npm run check`: pass.
- `npm run build`: pass, no warnings.

## 2026-05-26 - Convert blog category tags to dropdown

Files:

- `pages/blog.tsx`
- `docs/changelog.md`

What changed:

- Replaced desktop category tag cloud with same dropdown category picker used on mobile.
- Blog filter area now stacks on mobile and aligns horizontally on desktop.

Why:

- User asked category tags to be dropdown too.

Review risk:

- Category links are now hidden behind one dropdown instead of visible as many tags.

Verification:

```bash
npm run check
npm run build
```

Result:

- `npm run check`: pass.
- `npm run build`: pass, no warnings.

## 2026-05-26 - Update blog filters and hide videocasts

Files:

- `pages/blog.tsx`
- `pages/ecosystem.tsx`
- `docs/changelog.md`

What changed:

- Replaced blog type filter buttons with one dropdown selector.
- Removed year filtering and year pagination from blog page.
- Blog page now loads recent posts across all years, capped to 18 posts.
- Fixed dark-mode visibility issue by using dark-safe select text/background.
- Hid ecosystem Videocasts section and stopped fetching changing-the-world data.

Why:

- Blog default year filter showed only sparse 2026 content.
- Weekly AMAs are not currently running.

Review risk:

- Blog page no longer exposes year navigation.
- Blog page shows first 18 recent posts for current type instead of all posts in one year.
- Videocast CMS entries remain unused by ecosystem page.

Verification:

```bash
npm run check
npm run build
```

Result:

- `npm run check`: pass.
- `npm run build`: pass, no warnings.

## 2026-05-26 - Move changelog out of root

Files:

- `docs/changelog.md`

What changed:

- Moved changelog from root `changelog.md` to `docs/changelog.md`.

Why:

- User asked to move everything possible out of main directory.
- Filename remains `changelog.md`; location now under docs.

Review risk:

- Any external workflow expecting root `changelog.md` must use `docs/changelog.md`.

Verification:

```bash
rg "changelog\.md|Changelog" -n . -g '!node_modules' -g '!package-lock.json'
```

Result:

- Changelog now lives at `docs/changelog.md`.
- Root directory no longer contains `changelog.md`.

## 2026-05-26 - Tidy root project files

Files:

- `Dockerfile`
- `README.md`
- `tsconfig.json`
- `scripts/entrypoint.sh`
- `scripts/local/test_app.sh`
- `scripts/local/test_and_verify.sh`
- `reports/lighthouse-report.json`
- `reports/debug-storybook.log`
- `public/assets/misc/x_logo.svg`
- `changelog.md`

What changed:

- Moved container startup script from root to `scripts/entrypoint.sh`.
- Moved local test helpers from root to `scripts/local/`.
- Moved generated Lighthouse report and Storybook log into `reports/`.
- Moved loose `x_logo.svg` into `public/assets/misc/`.
- Updated Dockerfile and README paths.
- Configured TypeScript incremental cache under `.next/cache/` and removed root `tsconfig.tsbuildinfo`.

Why:

- Reduce root-directory clutter without moving files that common tooling expects at root.

Review risk:

- External docs/scripts that call `./entrypoint.sh`, `./test_app.sh`, or `./test_and_verify.sh` need new paths.
- Root config/deploy files intentionally remain at root for Next, npm, Docker, and Cloud Build defaults.

Verification:

```bash
npm run check
npm run build
```

Result:

- `npm run check`: pass.
- `npm run build`: pass, no warnings.
- Simulated Docker runner filesystem with moved `scripts/entrypoint.sh`: `/en/` returned `HTTP 200`.

## 2026-05-26 - Harden Cloud Run deployment path

Files:

- `Dockerfile`
- `changelog.md`

What changed:

- Added runtime `NEXT_PUBLIC_STRAPI_API` default in runner image so `entrypoint.sh` does not fail on a fresh Cloud Run service.
- Copied `utils/localeConfig.js` into runner image because `next.config.js` requires it at `next start`.
- Replaced post-build `npm install --production` with `npm prune --omit=dev --ignore-scripts` for deterministic production dependencies.
- Removed redundant `npx next telemetry disable`; `NEXT_TELEMETRY_DISABLED=1` already covers it and avoids build-time permission/network risk.

Why:

- Cloud Build uses Dockerfile directly; recent `next.config.js` shared locale import would not exist in runner image.
- Cloud Build deploy command only sets `OPENAI_API_KEY`; public Strapi env needed a safe container default.

Review risk:

- Runtime image now includes one small JS config file under `utils/`.
- Cloud Run can still override `NEXT_PUBLIC_STRAPI_API` if needed.

Verification:

```bash
npm run check
npm run build
docker build -t ergoweb-deploy-check .
```

Result:

- `npm run check`: pass.
- `npm run build`: pass, no warnings.
- `docker build`: not run locally; Docker daemon unavailable (`Cannot connect to the Docker daemon`).
- Simulated Docker runner filesystem started with `next start` on port `3010` and served `/en/` with `HTTP 200`.

## 2026-05-26 - Remove naive URL trust paths

Files:

- `utils/safeUrl.ts`
- `components/Button.tsx`
- `components/ecosystem/DApps.tsx`
- `components/ecosystem/Videocasts.tsx`
- `components/home/News.tsx`
- `pages/_app.tsx`
- `changelog.md`

What changed:

- Added shared `safeHref()` helper for safe external URLs and same-origin internal paths.
- Made shared `Button` reject unsafe/malformed URLs instead of passing raw CMS strings into `next/link`.
- Added `rel="noopener noreferrer"` for new-tab buttons.
- Removed dead `href="#"` fallback in DApps; invalid CMS URLs now render text/image without a fake link.
- Avoided repeated URL sanitizer calls in homepage news and videocasts.
- Replaced `next-themes as any` with a typed `PropsWithChildren<ThemeProviderProps>` wrapper.

Why:

- Scan found remaining naive raw URL and fake-link paths introduced around CMS link hardening.

Review risk:

- CMS items with malformed URLs become non-clickable instead of linking to `#`.
- Shared `Button` now ignores non-HTTP(S), protocol-relative, and non-root-relative URLs.

Verification:

```bash
npm run check
npm run build
npm audit --json
npx lighthouse http://127.0.0.1:3000/en/ --quiet --chrome-flags="--headless --no-sandbox" --output=json --output-path=/private/tmp/ergoweb-lh-2.json --only-categories=performance,accessibility,best-practices,seo
```

Result:

- `npm run check`: pass.
- `npm run build`: pass, no warnings.
- `npm audit --json`: 0 vulnerabilities.
- Local production server: running on `http://127.0.0.1:3000/en/`.
- Lighthouse browser smoke after final restart: no runtime error, 0 console errors; scores `91/100/100/100`.

## 2026-05-26 - Restart local dev server cleanly

Files:

- `changelog.md`

What changed:

- Killed stale Next dev servers on ports `3000` and `3001`.
- Force-killed leftover PID `90454` after normal kill did not stop it.
- Started one fresh Next dev server on `127.0.0.1:3000`.

Why:

- User reported blank page and sluggish computer.
- Multiple stale dev servers were running.

Review risk:

- Runtime-only change; no app code changed in this run.

Verification:

```bash
lsof -nP -iTCP -sTCP:LISTEN | rg "node|next|:3000|:3001|:3002"
curl -I http://127.0.0.1:3000/en/
```

Result:

- One Next listener remains: PID `4919` on `127.0.0.1:3000`.
- Homepage returns `HTTP/1.1 200 OK`.

## 2026-05-26 - Reduce remaining hero dark right-edge seam

Files:

- `styles/home.scss`
- `changelog.md`

What changed:

- Tightened dark hero media mask so right edge fades sooner.
- Added dark-only overlay on hero media to damp right-side color shift.
- Slightly reduced dark hero video/poster brightness and contrast.

Why:

- User reported remaining visible boundary/color shift on right side after first blend fix.

Review risk:

- Dark hero media may look softer/dimmer at edges.
- Light mode unchanged.

Verification:

```bash
npm run check
```

Result:

- `npm run check`: pass.

## 2026-05-26 - Remove homepage dynamic chunk failures

Files:

- `pages/index.tsx`
- `changelog.md`

What changed:

- Removed `next/dynamic` imports for homepage sections.
- Converted homepage sections to static imports: `Highlights`, `UniqueErgo`, `UsingErg`, `Autolykos`, `News`, `Feed`, `Partners`, `ContributeForm`.
- Restarted local dev server on port `3000`.

Why:

- Browser showed `Loading chunk _pages-dir-browser_components_home_Highlights_tsx failed`.
- That came from a split dynamic chunk failing to load after local dev rebuild/stale chunk state.
- Static imports remove the separate homepage section chunk URL, so this specific chunk cannot fail.

Review risk:

- Homepage initial JS bundle may increase because sections are no longer split into separate dynamic chunks.
- Existing `LazyInView` still delays rendering work until sections approach viewport.

Verification:

```bash
npm run check
curl -s http://127.0.0.1:3000/en/ | rg "Loading chunk|_pages-dir-browser_components_home_Highlights|Runtime Error"
```

Result:

- `npm run check`: pass.
- Error text absent from homepage HTML.
- Local dev server running on `http://localhost:3000`, PID `99939`.

## 2026-05-26 - Move ergoblockchain link to top bar

Files:

- `components/Navigation.tsx`
- `components/NavigationMobileMenu.tsx`
- `components/SecondaryMenu.tsx`
- `changelog.md`

What changed:

- Removed `ergoblockchain.org` from main desktop nav.
- Removed `ergoblockchain.org` from overlay/mobile social grid.
- Added `ERGOBLOCKCHAIN` to top bar next to `SIGMAVERSE`.

Why:

- User clarified link belongs in top bar, not main nav.

Review risk:

- Top bar has one more text item; check spacing on medium desktop widths.

Verification:

```bash
npm run check
rg "ergoblockchain" -n components
```

Result:

- `npm run check`: pass.
- Only app reference now in `components/SecondaryMenu.tsx`.

## 2026-05-26 - Home hero dark video blending

Files:

- `components/home/HomeHero.tsx`
- `styles/home.scss`
- `changelog.md`

What changed:

- Added `home-hero-desktop-media` wrapper class to desktop hero media.
- Added `home-hero-video-dark` class to dark desktop hero video.
- Added dark-mode-only CSS mask on desktop hero media to fade video edges.
- Added dark-mode-only `mix-blend-mode: screen` for poster/video so black video pixels blend into page background instead of drawing a hard rectangle.

Why:

- Dark hero MP4 has a black/darker background that showed as a rectangular block against page background.

Review risk:

- Dark hero video brightness may be slightly higher because `screen` blend removes black backdrop.
- Mask only applies at `md+`; mobile media unchanged.

Verification:

```bash
npm run check
```

Result:

- `npm run check`: pass.
- Headless screenshot command ran, but app stayed in light theme, so dark visual needs manual browser check by toggling dark mode.

## 2026-05-26 - Header/footer link cleanup

Files:

- `components/Footer.tsx`
- `components/Navigation.tsx`
- `components/NavigationMobileMenu.tsx`
- `components/discover/ErgoExplorer.tsx`
- `changelog.md`

What changed:

- Removed Singapore address line from footer.
- Removed `ergo.watch` text/link/button from Discover explorer section.
- Added `https://ergoblockchain.org/` to desktop header navigation.
- Added `https://ergoblockchain.org/` to header overlay/mobile menu link grid.

Why:

- User requested address removal, broken `ergo.watch` removal, and `ergoblockchain.org` header link.

Review risk:

- Header has one more desktop nav item; check spacing at desktop widths.
- Discover explorer metrics column removed because only link there was `ergo.watch`.

Verification:

```bash
npm run check
rg "1 Irving Place|ergo\\.watch|ERGO\\s*WATCH|ergoblockchain" -n components pages changelog.md
```

Result:

- `npm run check`: pass.
- Address and `ergo.watch` refs absent from app code.
- `ergoblockchain.org` present in `Navigation.tsx` and `NavigationMobileMenu.tsx`.

## 2026-05-26 - Fix get-erg Link runtime error

Files:

- `components/getErg/Wallets.tsx`
- `components/NavigationMobileMenu.tsx`
- `changelog.md`

What changed:

- Removed `<a>` child inside `Link` for Ergo Wallet row on get-erg wallet table.
- Removed `<a>` children inside ecosystem links in mobile navigation.
- Left `components/discover/DiscoverHero.tsx` unchanged because it already uses `legacyBehavior`.

Why:

- Next.js 15 rejects `Link` with direct `<a>` child unless `legacyBehavior` is set.
- Mobile navigation is rendered by layout, so invalid links can break pages even when hidden.

Review risk:

- Link markup changed only, same hrefs and visible text.

Verification:

```bash
npm run check
curl -I http://127.0.0.1:3001/es/get-erg/
curl -s http://127.0.0.1:3001/es/get-erg/ | rg "Invalid <Link>|invalid-new-link|Runtime Error"
```

Result:

- `npm run check`: pass.
- Route returns `HTTP/1.1 200 OK`.
- Error overlay text absent.

## 2026-05-26 - Changelog location standardization

Files:

- `changelog.md`
- `docs/CHANGELOG-2026-05-26-repo-improvements.md`

What changed:

- Created single root changelog file: `changelog.md`.
- Moved prior dated changelog content into this file.
- Removed old dated changelog file.

Why:

- User wants one stable file to review after each run.

Review risk:

- Documentation-only change.

Verification:

- No code verification needed.

## 2026-05-26 - Repo improvements

### Summary

Implemented five requested repo improvements:

- restored build lint enforcement
- restored production auth on translation backfill API
- centralized locale config
- added shared Strapi client helpers
- added lightweight test/check scripts

### 1. Build Lint Gate

Files:

- `next.config.js`
- `package.json`

What changed:

- Removed `eslint.ignoreDuringBuilds`.
- Added `check` script: `npm run lint && npm run typecheck && npm run test`.

Why:

- Production build now fails on lint errors instead of shipping them.

Review risk:

- Existing lint debt can block future builds. Current repo passes after cleanup.

### 2. Translation Backfill Auth

File:

- `pages/api/translate/backfill.ts`

What changed:

- Removed `authorized = true`.
- Production now requires `Authorization: Bearer TRANSLATION_BACKFILL_SECRET`.
- Development still allows local POST without secret.

Why:

- Prevent public calls from spending AI quota or creating Strapi writes.

Review risk:

- Production backfill callers must send correct bearer token.

### 3. Central Locale Config

Files:

- `utils/localeConfig.js`
- `utils/locales.ts`
- `next.config.js`
- `middleware.ts`
- `tests/localeConfig.test.mjs`

What changed:

- Added shared locale source.
- `next.config.js` now uses `NEXT_I18N_LOCALES`.
- `middleware.ts` now uses `DEFAULT_LOCALE` and `toSiteLocale`.
- Added tests for locale list and Chinese alias mapping.

Why:

- Avoid drift between Next i18n config, middleware redirects, and app locale helpers.

Review risk:

- Chinese routing now normalizes to `zh` instead of older `cn` alias. Existing `/cn/:path*` redirect already points to `/zh/:path*`.

### 4. Shared Strapi Client

Files:

- `utils/strapiClient.ts`
- `utils/strapiTranslations.ts`
- `pages/api/translate/backfill.ts`
- `pages/index.tsx`
- `pages/blog.tsx`
- `utils/generateRssFeed.ts`

What changed:

- Added `getStrapiApiBase`, `buildStrapiUrl`, `strapiFetch`, `strapiFetchJson`, `postListPath`.
- Replaced duplicated fetch/timeout code in core paths.
- Made RSS generation null-safe when CMS fetch fails.

Why:

- Fewer string-built URLs, consistent timeout/auth headers, fewer null crashes.

Review risk:

- Not all Strapi calls converted yet. Remaining direct calls are visible via `rg "NEXT_PUBLIC_STRAPI_API +"`.

### 5. Tests And Formatting Cleanup

Files:

- `package.json`
- `tests/localeConfig.test.mjs`
- `components/home/HomeInfo.tsx`
- `components/home/UsingErg.tsx`
- `pages/ergo-wallet-app.tsx`

What changed:

- Added Node test script.
- Added TypeScript typecheck script.
- Fixed lint/Prettier fallout from enabling build lint.
- Replaced one wallet `<img>` with `next/image`.
- Fixed `React.ReactNode` lint issue via `ReactNode` type import.

Why:

- `npm run check` now gives one command for local/CI verification.

Review risk:

- `pages/ergo-wallet-app.tsx` image now uses fixed intrinsic dimensions with responsive CSS.

### Verification

Commands run:

```bash
npm run check
npm run build
```

Result:

- `npm run check`: pass, no ESLint warnings/errors.
- `npm run build`: pass.

Build warnings still present:

- Browserslist data is 9 months old.
- Sass `@import` deprecation warnings from local styles and Swiper.
- Babel config disables SWC compiler optimizations.

Dependency note:

- `npm install` reported 27 vulnerabilities. No audit fix run because that can change dependency graph and behavior.

## 2026-05-26 - Risk Audit And Build Warning Cleanup

Files:

- `.babelrc`
- `README.md`
- `components/Footer.tsx`
- `components/LanguageSwitcher.tsx`
- `components/Search.tsx`
- `components/SecondaryMenu.tsx`
- `components/blog/BlogNews.tsx`
- `components/home/News.tsx`
- `components/shared/ContributeForm.tsx`
- `next.config.js`
- `package-lock.json`
- `pages/blog/[id].tsx`
- `pages/category/[id].tsx`
- `pages/community.tsx`
- `pages/discover.tsx`
- `pages/ecosystem.tsx`
- `pages/get-erg.tsx`
- `pages/manifesto.tsx`
- `pages/news.tsx`
- `pages/news/[id].tsx`
- `styles/fonts.scss`
- `styles/globals.scss`

What changed:

- Removed custom Babel config so Next can use SWC again.
- Updated Browserslist/caniuse-lite metadata.
- Replaced local Sass `@import` usage in app styles and silenced dependency Sass warnings with `quietDeps`.
- Converted remaining public Strapi URL construction in pages/components to shared Strapi helpers.
- Added production auth docs for translation backfill and repair-media endpoints.
- Widened the top-bar link area so Sigmaverse plus `ergoblockchain.org` has more room.
- Added explicit footer state typing found by `tsc`.

Risk review result:

- Runtime-only review risk: closed by `npm run check` and `npm run build`.
- Homepage static import risk: accepted; homepage First Load JS is 210 kB after build.
- Backfill auth risk: production auth restored, docs added for required header/secret.
- Locale drift risk: covered by shared locale helper plus locale tests.
- Strapi direct-call risk: remaining `NEXT_PUBLIC_STRAPI_API` refs are limited to shared helper and API route env checks.
- Wallet image risk: build passes with `next/image`.
- Top-bar spacing risk: top-bar max width increased from 700px to 900px.
- Build warning risk: closed; Babel, Browserslist, and Sass warnings no longer appear in build output.

Verification:

- `npm run check`: pass, no ESLint warnings/errors, typecheck pass, 3 tests pass.
- `npm run build`: pass, no build warnings shown.
- Local server check: one Node listener on `127.0.0.1:3000`.

## 2026-05-26 - Homepage Speed And Blank Page Verification

Files:

- `pages/index.tsx`
- `utils/LazyInView.tsx`

What changed:

- Restored dynamic imports for below-fold homepage sections.
- Changed `LazyInView` so render-function children are not called until visible.
- Set below-fold homepage sections to `ssrReveal={false}` so heavy sections do not hydrate on first paint.
- Restarted stale Next dev server before browser verification.

Why:

- Static homepage imports made dev compile and first-load JS heavier.
- Previous lazy wrapper still evaluated render functions immediately, so lazy sections were not truly deferred.

Result:

- Homepage build size dropped from `19.2 kB / 210 kB First Load JS` to `9.03 kB / 168 kB First Load JS`.
- Fresh local server running on `127.0.0.1:3000`.

Verification:

- `npm run check`: pass, no ESLint warnings/errors, typecheck pass, 3 tests pass.
- `npm run build`: pass, no build warnings shown.
- Headless Chrome `http://127.0.0.1:3000/en/`: hero renders, `document.body` display is `block`, lazy `HIGHLIGHTS` section appears after scroll, no page errors.

## 2026-05-26 - Console Warning Cleanup

Files:

- `components/community/HallOfFame.tsx`
- `components/ecosystem/Videocasts.tsx`
- `components/shared/ContributeForm.tsx`
- `components/shared/Post.tsx`
- `package.json`
- `package-lock.json`
- `pages/_document.tsx`
- `pages/index.tsx`
- `styles/globals.scss`

What changed:

- Removed global homepage/font preload tags that fired unused/non-matching preload warnings on other pages.
- Removed duplicate manual homepage poster preloads; `next/image priority` now owns hero image preload.
- Replaced legacy `next/image` `layout` props with current `fill` or responsive width/height styling.
- Replaced `react-toastify` form toast with inline `aria-live` status text.
- Removed unused `react-toastify` dependency and CSS import.
- Removed custom `theme-init.js` script injection that triggered Next dev script warnings.

Verification:

- `rg "layout=" -n components pages`: no matches.
- `npm run check`: pass, no ESLint warnings/errors, typecheck pass, 3 tests pass.
- `npm run build`: pass, no build warnings shown.
- Headless Chrome `http://127.0.0.1:3000/en/` and `/en/community`: render true, 0 page errors, no preload warnings, no legacy image warnings, no `defaultProps` warning.

Remaining note:

- Next dev server still emits one internal warning about scripts in `next/head` even after app script tags were removed. Production build is clean.

## 2026-05-26 - Theme Poster And Lighthouse Cleanup

Files:

- `components/Button.tsx`
- `components/Footer.tsx`
- `components/darkModeSwitcher/DarkModeSwitcher.tsx`
- `components/home/HomeHero.tsx`
- `components/home/HomeInfo.tsx`
- `components/shared/Post.tsx`
- `pages/_app.tsx`
- `pages/_document.tsx`
- `styles/globals.scss`
- `styles/home.scss`

What changed:

- Restored pre-paint theme detection from `localStorage` or browser `prefers-color-scheme`.
- Set `next-themes` back to system-aware default, so the hero poster follows user/browser theme instead of always forcing one image.
- Added an early selected-poster preload for the actual theme/viewport.
- Kept both light and dark hero poster elements in markup, with CSS deciding visibility from `html.dark`; this prevents the wrong dark/light poster flash.
- Delayed hero video mount until after initial paint so poster remains the LCP target and video does not block load.
- Removed local third-party analytics/chat scripts on localhost so Lighthouse does not report console/network failures.
- Fixed remaining Lighthouse accessibility contrast issues on orange buttons, home stats labels, and post category pills.
- Changed footer column titles from heading tags to text links to avoid heading-order issues.
- Restored desktop hero poster object-fit to avoid image aspect-ratio best-practice failures.

Verification:

- `npm run check`: pass, no ESLint warnings/errors, typecheck pass, 3 tests pass.
- `npm run build`: pass, no build warnings shown.
- `curl http://127.0.0.1:3000/en/`: `200 text/html; charset=utf-8`.
- Lighthouse desktop production build: Performance 100, Accessibility 100, Best Practices 100, SEO 100.
- Lighthouse mobile production build: Performance 96, Accessibility 100, Best Practices 100, SEO 100.

Remaining note:

- Mobile performance is no longer failing from console warnings, contrast, CLS, or TBT. Remaining loss is LCP/TTI variance on local Lighthouse mobile throttling; last repeated mobile runs were 96.

## 2026-05-26 - Localhost Console Error Cleanup

Files:

- `pages/index.tsx`

What changed:

- Removed manual homepage preload for `/fonts/Vinila-Bd-Ex.woff2`; CSS font loading now owns it.
- Restarted production server bound to `0.0.0.0` so `localhost:3000` and `127.0.0.1:3000` hit same fresh build.

Why:

- Console showed unused font preload warning on `http://localhost:3000/en/`.
- Current build chunk, `_buildManifest.js`, and `_ssgManifest.js` all return `200`; earlier `400` errors matched stale browser requests after server/build restarts.

Verification:

- `npm run check`: pass, no ESLint warnings/errors, typecheck pass, 3 tests pass.
- `npm run build`: pass, no build warnings shown.
- `curl http://localhost:3000/en/`: `200 text/html; charset=utf-8`.
- Current chunk `/pages/index-71b2dbba32d9eafd.js`: `200`.
- Current `_buildManifest.js`: `200`.
- Current `_ssgManifest.js`: `200`.
- Lighthouse console audit on `http://localhost:3000/en/`: `errors-in-console` score 1, no items.
- Lighthouse desktop production build: Performance 100, Accessibility 100, Best Practices 100, SEO 100.

## 2026-05-26 - Security And Vulnerability Hardening

Files:

- `components/discover/Documents.tsx`
- `components/ecosystem/DApps.tsx`
- `components/ecosystem/Favorites.tsx`
- `components/ecosystem/FeatureCard.tsx`
- `components/ecosystem/Videocasts.tsx`
- `components/getErg/Exchanges.tsx`
- `components/home/Highlights.tsx`
- `components/home/News.tsx`
- `components/home/Partners.tsx`
- `components/shared/Post.tsx`
- `package.json`
- `package-lock.json`
- `pages/_app.tsx`
- `pages/api/translate/backfill.ts`
- `pages/api/translate/repair-media.ts`
- `postcss.config.js`
- `styles/globals.scss`
- `utils/apiAuth.ts`
- `utils/generateRssFeed.ts`
- `utils/localeConfig.js`
- `utils/safeUrl.ts`
- `utils/strapiClient.ts`

What changed:

- Upgraded vulnerable production packages, including Next.js `15.5.18`, Swiper `12.1.4`, lodash `4.18.1`, postcss `8.5.15`, and next-themes `0.4.6`.
- Added npm `overrides` so nested `postcss` resolves to patched `8.5.15`.
- Removed vulnerable `showdown`; RSS content now strips markdown through `remove-markdown`.
- Updated Swiper v12 module imports and moved Swiper CSS imports into `_app`.
- Added `tailwindcss/nesting` before Tailwind to handle Swiper nested CSS without build warnings.
- Replaced deprecated `next lint` script with ESLint CLI.
- Added constant-time bearer secret comparison for translation maintenance APIs.
- Reused shared Strapi fetch helper in repair-media endpoint.
- Hardened Strapi URL builder against absolute/protocol-relative paths and non-`/api/` paths.
- Added safe URL helpers and applied them to CMS-driven external links to reject `javascript:` and other unsafe protocols while preserving internal document paths.

Verification:

- `npm audit --json`: 0 vulnerabilities across prod and dev dependencies.
- `npm audit --omit=dev --json`: 0 vulnerabilities.
- `npm run check`: pass, no ESLint warnings/errors, typecheck pass, 3 tests pass.
- `npm run build`: pass, no build warnings shown.
- Local production server `http://localhost:3000/en/`: `200 text/html; charset=utf-8`.
- Lighthouse desktop production build: Performance 99, Accessibility 100, Best Practices 100, SEO 100.
- Lighthouse `errors-in-console`: score 1, 0 console errors.

Remaining note:

- Full dependency audit is clean. Future watch item: `next lint` was replaced before Next.js 16 removes it.
