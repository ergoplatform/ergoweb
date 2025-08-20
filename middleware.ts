import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_LOCALE = 'en';

export function middleware(req: NextRequest) {
  const shouldHandleLocale =
    !PUBLIC_FILE.test(req.nextUrl.pathname) &&
    !req.nextUrl.pathname.includes('/api/') &&
    !req.nextUrl.pathname.includes('rss') &&
    !req.nextUrl.pathname.includes('/image/') &&
    req.nextUrl.locale === 'default';

  if (shouldHandleLocale) {
    const url = req.nextUrl.clone();
    url.locale = DEFAULT_LOCALE;
    return NextResponse.redirect(url);
  }

  // No CSP here; CSP is applied dynamically in _document.tsx (server-side) with a per-request nonce
  return NextResponse.next();
}
