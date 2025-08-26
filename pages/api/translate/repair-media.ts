import type { NextApiRequest, NextApiResponse } from 'next';

type RepairResult = {
  ok: boolean;
  message?: string;
  scanned?: number;
  updated?: number;
  skipped?: number;
  errors?: Array<{ id: number; locale: string; error: string }>;
  enPagesScanned?: number;
  enItemsScanned?: number;
};

const STRAPI_API = process.env.NEXT_PUBLIC_STRAPI_API as string;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN as string | undefined;
const SECRET = process.env.TRANSLATION_BACKFILL_SECRET as string | undefined;

async function strapiFetch(path: string, init?: RequestInit) {
  if (!STRAPI_API) throw new Error('Missing NEXT_PUBLIC_STRAPI_API');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (STRAPI_API_TOKEN) headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  return fetch(`${STRAPI_API}${path}`, {
    ...init,
    headers: { ...headers, ...(init?.headers || {}) },
  });
}

/**
 * Repairs missing media (image/blogPhoto) on existing localized Strapi entries by copying from English canonical.
 *
 * Security:
 * - In production, require Authorization: Bearer TRANSLATION_BACKFILL_SECRET
 * - In development, allow without secret
 *
 * Query:
 * - types: comma-separated types to scan (default "blog,news")
 * - locales: comma-separated locales to repair (default non-EN site locales)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<RepairResult>) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed' });
    return;
  }

  // Authorization
  const isDev = process.env.NODE_ENV !== 'production';
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length) : '';
  const authorized = isDev ? true : Boolean(SECRET && token === SECRET);
  if (!authorized) {
    res.status(401).json({ ok: false, message: 'Unauthorized' });
    return;
  }

  if (!STRAPI_API_TOKEN) {
    res.status(400).json({ ok: false, message: 'Missing STRAPI_API_TOKEN for write access' });
    return;
  }

  try {
    const typesParam = ((req.query.types as string) || 'blog,news')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    // Build a liberal locales list:
    // - If "cn" is requested, include cn, zh, and zh-CN to match whatever Strapi uses.
    // - Otherwise include the exact codes provided (except 'en').
    const rawLocales = ((req.query.locales as string) || 'de,it,hu,ru,cn,id,tr')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((l) => l !== 'en');

    const localesSet = new Set<string>();
    for (const l of rawLocales) {
      if (l === 'cn') {
        localesSet.add('cn');
        localesSet.add('zh');
        localesSet.add('zh-CN');
      } else {
        localesSet.add(l);
      }
    }
    const localesParam = Array.from(localesSet);

    // Fetch all EN posts across pages with localizations populated
    const pageSize = 200;
    let page = 1;
    let scanned = 0;
    let updated = 0;
    let skipped = 0;
    const errors: Array<{ id: number; locale: string; error: string }> = [];

    let enItemsTotal = 0;
    let enPagesScanned = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const url =
        `/api/posts?sort=date:desc&pagination[withCount]=true&pagination[page]=${page}` +
        `&pagination[pageSize]=${pageSize}&locale=en` +
        `&populate=*` +
        `&populate[localizations][populate]=*` +
        `&filters[$or][0][type][$eq]=blog&filters[$or][1][type][$eq]=news`;

      const listRes = await strapiFetch(url);
      const listJson = await listRes.json();
      const items: any[] = listJson?.data || [];
      const meta = listJson?.meta?.pagination;
      enPagesScanned += 1;
      enItemsTotal += items.length;

      for (const enPost of items) {
        const enA = enPost?.attributes || {};
        const enImageId =
          enA?.image?.data?.id && Number(enA.image.data.id) ? Number(enA.image.data.id) : undefined;
        const enBlogPhoto = enA?.blogPhoto ?? null;

        const locs: any[] = enA?.localizations?.data || [];
        for (const loc of locs) {
          const locId = loc?.id;
          const locA = loc?.attributes || {};
          const locLocale = locA?.locale as string;
          if (!locId || !locLocale) continue;
          if (!localesParam.includes(locLocale)) continue;

          scanned++;

          const hasImage = Boolean(locA?.image?.data?.id);
          const hasBlogPhoto = typeof locA?.blogPhoto === 'string' && locA.blogPhoto.length > 0;

          if (hasImage && hasBlogPhoto) {
            skipped++;
            continue;
          }

          const data: any = {};
          if (!hasImage && enImageId) data.image = enImageId;
          if (!hasBlogPhoto && enBlogPhoto) data.blogPhoto = enBlogPhoto;

          if (Object.keys(data).length === 0) {
            skipped++;
            continue;
          }

          try {
            const up = await strapiFetch(`/api/posts/${locId}`, {
              method: 'PUT',
              body: JSON.stringify({ data }),
            });
            if (!up.ok) {
              const text = await up.text();
              errors.push({ id: locId, locale: locLocale, error: text.slice(0, 300) });
            } else {
              updated++;
            }
          } catch (e: any) {
            errors.push({ id: locId, locale: locLocale, error: e?.message || String(e) });
          }
        }
      }

      if (!meta || page >= (meta.pageCount ?? 1)) break;
      page += 1;
    }

    res.status(200).json({
      ok: true,
      scanned,
      updated,
      skipped,
      errors,
      message:
        'Repair completed. Localized posts with missing image/blogPhoto were updated from English canonical.',
      enPagesScanned,
      enItemsScanned: enItemsTotal,
    });
  } catch (e: any) {
    res.status(500).json({ ok: false, message: e?.message || String(e) });
  }
}
