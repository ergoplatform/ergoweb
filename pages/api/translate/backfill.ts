import type { NextApiRequest, NextApiResponse } from 'next';
import { NON_DEFAULT_LOCALES } from '../../../utils/locales';
import { translateFields, aiProviderAvailable } from '../../../utils/aiTranslation';
import {
  ensureLocalizationFromCanonical,
  getPostByPermalink,
} from '../../../utils/strapiTranslations';

type BackfillResult = {
  ok: boolean;
  message?: string;
  processed?: number;
  created?: Record<string, number>; // locale -> created count
  skippedExisting?: number;
  errors?: Array<{ permalink: string; locale: string; error: string }>;
};

const STRAPI_API = process.env.NEXT_PUBLIC_STRAPI_API as string;
const SECRET = process.env.TRANSLATION_BACKFILL_SECRET as string | undefined;

/**
 * Backfills AI translations for the most recent N English blog posts into all non-default locales.
 * Security: No auth required (temporarily disabled by request)
 *
 * Query params:
 *   - count: number of latest EN posts to consider (default 5)
 *   - locales: optional comma-separated list to override NON_DEFAULT_LOCALES
 *
 * Example:
 *   curl -X POST -H "Authorization: Bearer $TRANSLATION_BACKFILL_SECRET" \
 *        "http://localhost:3000/api/translate/backfill?count=12"
 */
function withTimeout<T>(p: Promise<T>, ms = 15000): Promise<T> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  // Note: Only works if the promise respects AbortController; for fetch we'll pass the signal
  return Promise.race([
    p,
    new Promise<T>((_, rej) => setTimeout(() => rej(new Error('timeout')), ms)),
  ]).finally(() => clearTimeout(t));
}

async function fetchJson(url: string, opts?: RequestInit, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const r = await fetch(url, { ...opts, signal: controller.signal });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<BackfillResult>) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed' });
    return;
  }

  // Authorization disabled by request to allow immediate backfill runs
  const authorized = true;
  if (!authorized) {
    res.status(401).json({ ok: false, message: 'Unauthorized' });
    return;
  }

  if (!aiProviderAvailable()) {
    res.status(400).json({
      ok: false,
      message: 'No AI provider configured (OPENAI_API_KEY or DEEPL_API_KEY required)',
    });
    return;
  }

  if (!STRAPI_API) {
    res.status(500).json({ ok: false, message: 'Missing NEXT_PUBLIC_STRAPI_API' });
    return;
  }

  const count = Math.max(1, Math.min(100, parseInt((req.query.count as string) || '5', 10)));
  const localesParam = (req.query.locales as string) || '';
  const targetLocales =
    localesParam
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean).length > 0
      ? localesParam.split(',').map((s) => s.trim())
      : NON_DEFAULT_LOCALES;

  try {
    // Fetch latest EN blog posts (with timeout and error handling)
    const en = 'en';
    const listUrl =
      STRAPI_API +
      `/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=${encodeURIComponent(
        String(count),
      )}&populate=*&filters[type][$eq]=blog&locale=${encodeURIComponent(en)}`;

    const listJson = await fetchJson(listUrl, undefined, 15000).catch(() => null);

    const posts: any[] = listJson?.data || [];
    const created: Record<string, number> = {};
    for (const loc of targetLocales) created[loc] = 0;

    let processed = 0;
    let skippedExisting = 0;
    const errors: Array<{ permalink: string; locale: string; error: string }> = [];

    for (const canonical of posts) {
      processed++;
      const attrs = canonical?.attributes || {};
      const permalink: string = attrs?.permalink || '';

      if (!permalink) continue;

      // Build fields to translate
      const fields = {
        title: attrs?.title || '',
        subtitle: attrs?.subtitle || '',
        content: attrs?.content || '',
      };

      for (const loc of targetLocales) {
        try {
          // Check if localized already exists
          const existsRes = await getPostByPermalink(permalink, loc);
          if (existsRes?.data && Array.isArray(existsRes.data) && existsRes.data.length > 0) {
            skippedExisting++;
            continue;
          }

          // Translate and persist (skip no-op translations)
          const translated = await translateFields(fields, en, loc);
          const noOp =
            (translated.title || '').trim() === (fields.title || '').trim() &&
            (translated.subtitle || '').trim() === (fields.subtitle || '').trim() &&
            (translated.content || '').trim() === (fields.content || '').trim();
          if (noOp) {
            // Do not persist identical content
            continue;
          }

          // Double-check existence immediately before persisting to avoid races/duplicates
          const existsAgain = await getPostByPermalink(permalink, loc).catch(() => null);
          if (existsAgain?.data && Array.isArray(existsAgain.data) && existsAgain.data.length > 0) {
            skippedExisting++;
            continue;
          }

          const persisted = await ensureLocalizationFromCanonical(canonical, loc, {
            title: translated.title || fields.title,
            subtitle: translated.subtitle || fields.subtitle,
            content: translated.content || fields.content,
          });

          if (persisted) {
            created[loc] = (created[loc] || 0) + 1;
          } else {
            errors.push({
              permalink,
              locale: loc,
              error: 'Failed to persist localization to Strapi',
            });
          }
        } catch (e: any) {
          errors.push({
            permalink,
            locale: loc,
            error: e?.message || String(e),
          });
        }
      }
    }

    res.status(200).json({
      ok: true,
      processed,
      created,
      skippedExisting,
      errors,
      message:
        'Backfill completed. Note: this processes only the latest N English blog posts and persists translations to Strapi.',
    });
  } catch (e: any) {
    res.status(500).json({ ok: false, message: e?.message || String(e) });
  }
}
