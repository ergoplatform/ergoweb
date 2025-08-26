/* eslint-env node */
/**
 * Simple in-memory translation cache.
 * NOTE:
 * - Works for persistent Node runtimes (e.g., long-lived server/container).
 * - In serverless environments, memory can be cold-started, so consider wiring to a durable KV/DB.
 *
 * API:
 *   getCachedTranslation(permalink, locale) -> Fields | null
 *   setCachedTranslation(permalink, locale, fields) -> void
 */

type Fields = {
  title: string;
  subtitle: string;
  content: string; // markdown
};

type CacheValue = {
  fields: Fields;
  expiresAt: number;
};

const DEFAULT_TTL_SECONDS = parseInt(process.env.TRANSLATION_CACHE_TTL_SECONDS || '2592000', 10); // 30 days

// Ensure singleton across hot-reloads in dev and across Next.js dev HMR
let store: Map<string, CacheValue>;
const globalAny: any = typeof global !== 'undefined' ? (global as any) : ({} as any);
if (!globalAny.__translationCache) {
  globalAny.__translationCache = new Map<string, CacheValue>();
}
store = globalAny.__translationCache as Map<string, CacheValue>;
function key(permalink: string, locale: string) {
  return `${permalink}::${locale}`;
}

export async function getCachedTranslation(
  permalink: string,
  locale: string,
): Promise<Fields | null> {
  const k = key(permalink, locale);
  const hit = store.get(k);
  if (!hit) return null;
  if (Date.now() > hit.expiresAt) {
    store.delete(k);
    return null;
  }
  return hit.fields;
}

export async function setCachedTranslation(
  permalink: string,
  locale: string,
  fields: Fields,
  ttlSeconds: number = DEFAULT_TTL_SECONDS,
): Promise<void> {
  const k = key(permalink, locale);
  store.set(k, { fields, expiresAt: Date.now() + ttlSeconds * 1000 });
}
