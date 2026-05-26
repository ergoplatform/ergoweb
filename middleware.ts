import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_LOCALE, toSiteLocale } from './utils/locales';

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(req: NextRequest) {
  const isPublicFile = PUBLIC_FILE.test(req.nextUrl.pathname);
  const isApi = req.nextUrl.pathname.includes('/api/');
  const isRss = req.nextUrl.pathname.includes('rss');
  const isImage = req.nextUrl.pathname.includes('/image/');
  const isDefaultLocale = req.nextUrl.locale === 'default';

  if (!isPublicFile && !isApi && !isRss && !isImage && isDefaultLocale) {
    const accept = req.headers.get('accept-language') || '';

    const best = (() => {
      // Parse Accept-Language: "de-CH,de;q=0.9,en;q=0.8"
      const candidates = accept
        .split(',')
        .map((part) => {
          const [lang, qstr] = part.trim().split(';');
          const q = qstr?.split('=')[1] ? parseFloat(qstr.split('=')[1]) : 1;
          return { lang: (lang || '').toLowerCase(), q: isNaN(q) ? 1 : q };
        })
        .filter((c) => c.lang.length > 0)
        .sort((a, b) => b.q - a.q)
        .map((c) => c.lang);

      const mapToSite = (lang: string): string | null => {
        const lower = lang.toLowerCase();
        const base = lower.split('-')[0];

        return toSiteLocale(lower) || toSiteLocale(base);
      };

      for (const cand of candidates) {
        const mapped = mapToSite(cand);
        if (mapped) return mapped;
      }
      return DEFAULT_LOCALE;
    })();

    let target = best || DEFAULT_LOCALE;
    // Country-based fallback: if Accept-Language didn't match a supported locale,
    // try to infer from IP country when available (via platform headers).
    try {
      const countryToLocale: Record<string, string> = {
        DE: 'de',
        AT: 'de',
        CH: 'de',
        IT: 'it',
        HU: 'hu',
        RU: 'ru',
        CN: 'zh',
        TW: 'zh',
        HK: 'zh',
        ID: 'id',
        TR: 'tr',
        ES: 'es',
        PL: 'pl',
        PT: 'pt',
        SK: 'sk',
      };
      const headerCountry = (
        req.headers.get('x-vercel-ip-country') ||
        req.headers.get('cf-ipcountry') ||
        ''
      ).toUpperCase();
      const byCountry = countryToLocale[headerCountry];
      if (target === DEFAULT_LOCALE && byCountry) {
        target = byCountry;
      }
    } catch {
      // ignore geo failures
    }

    const url = req.nextUrl.clone();
    url.locale = target;
    return NextResponse.redirect(url);
  }

  // No CSP here; CSP is applied dynamically in _document.tsx (server-side) with a per-request nonce
  return NextResponse.next();
}
