import { toStrapiLocale } from './locales';

export type StrapiResponse<T = unknown> = {
  data: T;
  meta?: unknown;
  error?: unknown;
};

export function getStrapiApiBase(): string {
  const base = process.env.NEXT_PUBLIC_STRAPI_API;
  if (!base) throw new Error('Missing NEXT_PUBLIC_STRAPI_API');
  return base.replace(/\/$/, '');
}

export function buildStrapiUrl(path: string, params?: URLSearchParams): string {
  if (/^[a-z][a-z\d+.-]*:/i.test(path) || path.startsWith('//')) {
    throw new Error('Strapi path must be relative');
  }
  if (!path.startsWith('/api/')) {
    throw new Error('Strapi path must start with /api/');
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const query = params?.toString();
  return `${getStrapiApiBase()}${cleanPath}${query ? `?${query}` : ''}`;
}

export async function strapiFetch(path: string, init?: RequestInit, timeoutMs = 15000) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (process.env.STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(buildStrapiUrl(path), {
      ...init,
      headers: { ...headers, ...(init?.headers || {}) },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

export async function strapiFetchJson<T = unknown>(
  path: string,
  init?: RequestInit,
  timeoutMs = 15000,
): Promise<T | null> {
  try {
    const response = await strapiFetch(path, init, timeoutMs);
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function postListPath(params: {
  locale?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  type?: string;
  populate?: string;
}) {
  const qs = new URLSearchParams();
  if (params.sort) qs.set('sort', params.sort);
  qs.set('pagination[page]', String(params.page ?? 1));
  qs.set('pagination[pageSize]', String(params.pageSize ?? 20));
  if (params.populate) qs.set('populate', params.populate);
  if (params.type) qs.set('filters[type][$eq]', params.type);
  if (params.locale) qs.set('locale', toStrapiLocale(params.locale));
  return `/api/posts?${qs.toString()}`;
}
