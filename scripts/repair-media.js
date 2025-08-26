// Standalone repair script to copy image/blogPhoto from EN canonical to localized posts
// Usage: npm run repair-media -- --types blog,news --locales de,it,hu,ru,cn,id,tr
// Or:   node scripts/repair-media.js --types blog,news --locales de,it,hu,ru,cn,id,tr

const fs = require('fs');
const path = require('path');

// Minimal .env loader (only if variables not already set)
function loadDotEnv() {
  try {
    const envPath = path.join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split(/\r?\n/).forEach((line) => {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
        if (!m) return;
        const key = m[1];
        let val = m[2];
        // Strip quotes if present
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!(key in process.env)) {
          process.env[key] = val;
        }
      });
    }
  } catch (e) {
    // ignore
  }
}

loadDotEnv();

const STRAPI_API = process.env.NEXT_PUBLIC_STRAPI_API;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API) {
  console.error('Error: NEXT_PUBLIC_STRAPI_API is not set (check .env)');
  process.exit(1);
}
if (!STRAPI_API_TOKEN) {
  console.error('Error: STRAPI_API_TOKEN is not set (check .env)');
  process.exit(1);
}

const args = process.argv.slice(2);
function getArg(name, def) {
  const idx = args.findIndex((a) => a === `--${name}`);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  const pref = `--${name}=`;
  const found = args.find((a) => a.startsWith(pref));
  if (found) return found.slice(pref.length);
  return def;
}

const typesArg = getArg('types', 'blog,news');
const localesArg = getArg('locales', 'de,it,hu,ru,cn,id,tr');

const TYPES = typesArg
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const RAW_LOCALES = localesArg
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

// Build liberal locales list for CN variants
const localesSet = new Set();
for (const l of RAW_LOCALES) {
  if (l === 'cn') {
    localesSet.add('cn');
    localesSet.add('zh');
    localesSet.add('zh-CN');
  } else {
    localesSet.add(l);
  }
}
const LOCALES = Array.from(localesSet);

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};

// Node 18+ has global fetch; if not present, fail early
if (typeof fetch !== 'function') {
  console.error('Error: global fetch is not available in this Node runtime.');
  process.exit(1);
}

async function strapiFetch(rel, init = {}) {
  const url = `${STRAPI_API}${rel}`;
  const res = await fetch(url, {
    ...init,
    headers: { ...headers, ...(init.headers || {}) },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text.slice(0, 300)}`);
  }
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

async function run() {
  const pageSize = 200;
  let page = 1;
  let scanned = 0;
  let updated = 0;
  let skipped = 0;
  let enItemsTotal = 0;
  let enPagesScanned = 0;

  console.log(
    `Repair start: types=[${TYPES.join(',')}], locales=[${LOCALES.join(',')}]`,
  );

  // Paginate English posts with localizations populated
  // Use both blog and news filters
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const filterTypes = TYPES.map(
      (t, i) => `filters[$or][${i}][type][$eq]=${encodeURIComponent(t)}`,
    ).join('&');

    const url =
      `/api/posts?sort=date:desc&pagination[withCount]=true&pagination[page]=${page}` +
      `&pagination[pageSize]=${pageSize}&locale=en` +
      `&fields[0]=blogPhoto&fields[1]=permalink&fields[2]=type` +
      `&populate[image][fields][0]=id` +
      `&populate[localizations][fields][0]=locale` +
      `&populate[localizations][fields][1]=blogPhoto` +
      `&populate[localizations][populate][image][fields][0]=id` +
      `&${filterTypes}`;

    let listJson;
    try {
      listJson = await strapiFetch(url);
    } catch (e) {
      console.error('Fetch list failed:', e.message);
      break;
    }

    const items = Array.isArray(listJson?.data) ? listJson.data : [];
    const meta = listJson?.meta?.pagination;
    enPagesScanned++;
    enItemsTotal += items.length;

    for (const enPost of items) {
      const enA = enPost?.attributes || {};
      const enImageId =
        enA?.image?.data?.id && Number(enA.image.data.id) ? Number(enA.image.data.id) : undefined;
      const enBlogPhoto = enA?.blogPhoto ?? null;

      const locs = Array.isArray(enA?.localizations?.data) ? enA.localizations.data : [];
      for (const loc of locs) {
        const locId = loc?.id;
        const locA = loc?.attributes || {};
        const locLocale = locA?.locale;
        if (!locId || !locLocale) continue;
        if (!LOCALES.includes(locLocale)) continue;

        scanned++;

        const hasImage = Boolean(locA?.image?.data?.id);
        const hasBlogPhoto =
          typeof locA?.blogPhoto === 'string' && locA.blogPhoto.length > 0;

        if (hasImage && hasBlogPhoto) {
          skipped++;
          continue;
        }

        const data = {};
        if (!hasImage && enImageId) data.image = enImageId;
        if (!hasBlogPhoto && enBlogPhoto) data.blogPhoto = enBlogPhoto;

        if (Object.keys(data).length === 0) {
          skipped++;
          continue;
        }

        try {
          await strapiFetch(`/api/posts/${locId}`, {
            method: 'PUT',
            body: JSON.stringify({ data }),
          });
          updated++;
          console.log(`Updated media for id=${locId} locale=${locLocale}`);
        } catch (e) {
          console.error(
            `Update failed for id=${locId} locale=${locLocale}:`,
            e.message,
          );
        }
      }
    }

    if (!meta || page >= (meta.pageCount || 1)) break;
    page++;
  }

  const result = {
    ok: true,
    scanned,
    updated,
    skipped,
    enPagesScanned,
    enItemsScanned: enItemsTotal,
  };
  console.log(JSON.stringify(result, null, 2));
}

run().catch((e) => {
  console.error('Fatal error:', e);
  process.exit(1);
});
