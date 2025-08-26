/**
 * Strapi localization helpers (v4)
 *
 * Persists AI translations as real Strapi localizations so they are durable
 * and editable by humans later.
 */

const STRAPI_API = process.env.NEXT_PUBLIC_STRAPI_API as string;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN as string | undefined;

type StrapiResponse<T = any> = {
  data: T;
  meta?: any;
  error?: any;
};

function hasStrapiToken(): boolean {
  return Boolean(STRAPI_API_TOKEN);
}

async function strapiFetch(path: string, init?: RequestInit, timeoutMs = 15000): Promise<Response> {
  if (!STRAPI_API) {
    throw new Error('Missing NEXT_PUBLIC_STRAPI_API');
  }
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(`${STRAPI_API}${path}`, {
      ...init,
      headers: {
        ...headers,
        ...(init?.headers || {}),
      },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

export async function getPostByPermalink(
  permalink: string,
  locale: string,
): Promise<StrapiResponse> {
  // Map app locale to Strapi locale (cn -> zh)
  const toStrapiLocale = (l: string) => (l === 'cn' ? 'zh' : l);
  const params = new URLSearchParams();
  params.set('filters[permalink][$eq]', permalink);
  params.set('populate', '*');
  params.set('locale', toStrapiLocale(locale));
  const res = await strapiFetch(`/api/posts?${params.toString()}`);
  const json = await res.json();
  return json;
}

// Fetch available Strapi locales (e.g., ["en", "de", "it", "zh-CN", "ru", ...])
async function getStrapiLocales(): Promise<string[]> {
  try {
    const res = await strapiFetch(`/i18n/locales`);
    if (!res.ok) return [];
    const arr = await res.json();
    if (Array.isArray(arr)) {
      // Strapi returns array of objects or strings depending on version/config
      return arr.map((x: any) => (typeof x === 'string' ? x : x?.code || x?.name)).filter(Boolean);
    }
    return [];
  } catch {
    return [];
  }
}

/**
 * Attempt to create a new localization for a canonical post.
 * It tries the official create-localization endpoint first:
 *   POST /api/posts/:id/localizations
 * If that fails (provider/config variations), it falls back to:
 *   POST /api/posts with data.localizations = [canonicalId]
 *
 * Returns true if a localization was created (or already exists), false otherwise.
 */
export async function ensureLocalizationFromCanonical(
  canonical: any,
  targetLocale: string,
  translatedFields: { title: string; subtitle: string; content: string },
): Promise<boolean> {
  if (!hasStrapiToken()) return false;

  // Resolve the best-matching Strapi locale for the app's targetLocale.
  // For "cn", prefer an existing Strapi locale in this priority: "cn", "zh-CN", "zh". Fallback to "zh".
  const resolveTargetStrapiLocale = async (l: string): Promise<string> => {
    if (l !== 'cn') return l;
    const locales = await getStrapiLocales();
    const prefs = ['cn', 'zh-CN', 'zh'];
    const found = prefs.find((code) => locales.includes(code));
    return found || 'zh';
  };
  const targetStrapiLocale = await resolveTargetStrapiLocale(targetLocale);

  // Sanity
  const id = canonical?.id;
  const attrs = canonical?.attributes || {};
  if (!id || !attrs) return false;

  // Avoid duplicates: if a localization already exists for this permalink+locale, do nothing
  const permalink = (attrs as any)?.permalink as string | undefined;
  if (permalink) {
    try {
      const existsRes = await strapiFetch(
        `/api/posts?filters[permalink][$eq]=${encodeURIComponent(
          permalink,
        )}&locale=${encodeURIComponent(targetStrapiLocale)}&pagination[pageSize]=1`,
        { method: 'GET' },
        10000,
      );
      const existsJson = (await existsRes.json()) as StrapiResponse;
      if (Array.isArray(existsJson?.data) && existsJson.data.length > 0) {
        return true;
      }
    } catch {
      // ignore and continue
    }
  }

  // Build new attributes, copying non-system properties and overriding text fields
  // Exclude system fields that Strapi manages.
  const {
    createdAt,
    updatedAt,
    publishedAt,
    localizations,
    // Keep image and other relations as-is if present; Strapi should accept relation IDs
    ...rest
  } = attrs;

  // Build a conservative payload: copy selected scalar fields and set relations explicitly
  const imageId =
    (attrs as any)?.image?.data?.id && Number((attrs as any).image.data.id)
      ? Number((attrs as any).image.data.id)
      : undefined;

  const baseData: any = {
    // translated fields
    title: translatedFields.title,
    subtitle: translatedFields.subtitle,
    content: translatedFields.content,

    // keep important scalars from canonical
    author: attrs.author,
    tag: attrs.tag,
    date: attrs.date,
    type: attrs.type,
    url: attrs.url,
    permalink: attrs.permalink,
    blogPhoto: attrs.blogPhoto,
    locale: targetStrapiLocale,

    // publish now if canonical is published (or fallback to now)
    publishedAt: attrs.publishedAt || new Date().toISOString(),
  };

  // Explicitly set media relation (image) by ID if available
  if (imageId) {
    baseData.image = imageId;
  }

  // Try official localization endpoint first
  try {
    const res = await strapiFetch(`/api/posts/${id}/localizations`, {
      method: 'POST',
      body: JSON.stringify({ data: baseData }),
    });
    if (res.ok) {
      return true;
    }
    // Fall through to fallback if not ok
  } catch {
    // ignore and try fallback
  }

  // Re-check existence in case it was created despite non-2xx from the official endpoint
  if (permalink) {
    try {
      const checkRes = await strapiFetch(
        `/api/posts?filters[permalink][$eq]=${encodeURIComponent(
          permalink,
        )}&locale=${encodeURIComponent(targetStrapiLocale)}&pagination[pageSize]=1`,
        { method: 'GET' },
        10000,
      );
      const checkJson = (await checkRes.json()) as StrapiResponse;
      if (Array.isArray(checkJson?.data) && checkJson.data.length > 0) {
        return true;
      }
    } catch {
      // ignore and continue to fallback
    }
  }

  // Fallback: create as a new entry and link localization
  try {
    const payload = {
      data: {
        ...baseData,
        // Link to canonical entry to form the localization group
        localizations: [id],
      },
    };
    const res = await strapiFetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return true;
    }
  } catch {
    // ignore
  }

  return false;
}
