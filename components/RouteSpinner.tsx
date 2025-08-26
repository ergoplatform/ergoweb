import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FormattedMessage, useIntl } from 'react-intl';

export default function RouteSpinner() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  useEffect(() => {
    const handleStart = (url: string) => {
      try {
        const w = (window as any) || {};
        // Detect explicit flag set by LanguageSwitcher when a translation is needed
        const flag = Boolean(w.__showTranslateSpinner);
        // Or URL param translate=1 (fallback)
        const q = url.includes('?') ? url.split('?')[1] : '';
        const hasParam = new URLSearchParams(q).get('translate') === '1';

        if (flag || hasParam) {
          setLoading(true);
        }
        // Reset the flag so future navigations don't show the spinner
        if (w) w.__showTranslateSpinner = false;
      } catch {
        /* noop */
      }
    };
    const handleDone = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart as any);
    router.events.on('routeChangeComplete', handleDone);
    router.events.on('routeChangeError', handleDone);
    return () => {
      router.events.off('routeChangeStart', handleStart as any);
      router.events.off('routeChangeComplete', handleDone);
      router.events.off('routeChangeError', handleDone);
    };
  }, [router.events]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-white/60 dark:bg-black/40 flex items-center justify-center">
      <div
        className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-red-500 animate-spin"
        aria-label={intl.formatMessage({
          id: 'routeSpinner.translating',
          defaultMessage: 'Translating',
        })}
      />
      <span className="ml-3 text-sm text-black dark:text-white">
        <FormattedMessage id="routeSpinner.translatingEllipsis" defaultMessage="Translating…" />
      </span>
    </div>
  );
}
