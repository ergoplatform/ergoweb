import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import LanguageSelector from './icons/LanguageSelector';
import LanguageSelectorWhite from './icons/LanguageSelectorWhite';
import { Flag } from './icons/flags';
import { LOCALE_META } from '../utils/locales';
import { useRouter } from 'next/router';
import Link from 'next/link';
import type React from 'react';

export default function LanguageSwitcher({ color = 'default' }) {
  const data = useRouter();
  const { locale, locales, asPath } = data;
  const currentLocale =
    ((locale && locale !== 'default' ? locale : 'en') as keyof typeof LOCALE_META) || 'en';
  const currentMeta = LOCALE_META[currentLocale] ?? LOCALE_META['en'];
  const displayLocales = (locales || [])
    .filter((l) => l !== 'default')
    .sort((a, b) => (a === currentLocale ? -1 : b === currentLocale ? 1 : 0));

  // Navigate to target locale with a preflight check:
  // If we're on a blog post and the target locale is missing, set a spinner flag and add translate=1
  async function handleLocaleSwitch(e: React.MouseEvent, targetLocale: string) {
    try {
      e.preventDefault();

      let showSpinner = false;
      const basePath = asPath.split('?')[0] || '/';
      const STRAPI = process.env.NEXT_PUBLIC_STRAPI_API as string | undefined;

      // Map site locale to Strapi locale (e.g., cn -> zh)
      const mapToStrapi = (l: string) => (l === 'cn' ? 'zh' : l);

      if (STRAPI && basePath.startsWith('/blog/')) {
        const slug = decodeURIComponent(basePath.slice('/blog/'.length));
        if (slug) {
          const url =
            STRAPI +
            `/api/posts?pagination[page]=1&pagination[pageSize]=1&filters[permalink][$eq]=${encodeURIComponent(
              slug,
            )}&locale=${encodeURIComponent(mapToStrapi(targetLocale))}`;
          try {
            const res = await fetch(url, { credentials: 'omit', cache: 'no-store' } as any);
            const json = await res.json();
            const exists = Array.isArray(json?.data) && json.data.length > 0;
            showSpinner = !exists;
          } catch {
            // Network/preflight failure: be conservative and don't show spinner
            showSpinner = false;
          }
        }
      }

      if (showSpinner && typeof window !== 'undefined') {
        (window as any).__showTranslateSpinner = true;
      }

      const addParam = showSpinner ? (asPath.includes('?') ? '&' : '?') + 'translate=1' : '';
      const nextUrl = asPath + addParam;

      // Push with the target locale; Next.js will handle the locale switch
      await data.push(nextUrl, nextUrl, { locale: targetLocale });
    } catch {
      // Fallback: best effort navigation without preflight
      try {
        await data.push(asPath, asPath, { locale: targetLocale });
      } catch {
        /* noop */
      }
    }
  }

  return (
    <Listbox>
      <div className="relative">
        <Listbox.Button
          className="relative py-2 pl-3 pr-12 text-left cursor-pointer sm:text-sm rounded-md border border-gray-200 dark:border-zinc-700 bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-400 transition-colors"
          aria-label={`Select language, current ${currentMeta.nativeName}`}
          title={`${currentMeta.nativeName} — ${currentMeta.englishName}`}
        >
          <span className="flex items-center gap-2">
            <span className="inline-flex overflow-hidden rounded-[2px] ring-1 ring-black/10 dark:ring-white/10">
              <Flag code={currentMeta.flag} width={18} height={12} />
            </span>
            <span className="sr-only">{currentMeta.nativeName}</span>
          </span>
          <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            {color == 'default' ? <LanguageSelector /> : <LanguageSelectorWhite />}
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-0"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-0"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="
              absolute z-50 overflow-auto max-h-96
              bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm
              border border-gray-200 dark:border-zinc-700 ring-1 ring-black/5 dark:ring-white/10
              rounded-md shadow-xl
              mt-1 p-1
              w-56 sm:w-64
            "
          >
            {displayLocales.map((loc, key) => (
              <Listbox.Option
                key={key}
                className={`
                  cursor-pointer select-none relative
                    px-2.5 py-1.5 rounded
                  hover:bg-gray-50 dark:hover:bg-white/10
                  focus:bg-gray-50 dark:focus:bg-white/10
                `}
                value={loc}
              >
                <Link
                  href={asPath}
                  locale={loc}
                  className="py-1 pl-2.5 pr-8"
                  aria-label={`Switch to ${
                    (LOCALE_META as any)[loc]?.nativeName ?? loc.toUpperCase()
                  }`}
                  aria-current={loc === currentLocale ? 'true' : undefined}
                  title={`${(LOCALE_META as any)[loc]?.nativeName ?? loc.toUpperCase()} — ${
                    (LOCALE_META as any)[loc]?.englishName ?? ''
                  }`}
                  onClick={(e) => handleLocaleSwitch(e, loc)}
                >
                  <span className="flex items-center gap-2">
                    <span className="inline-flex overflow-hidden rounded-[2px] ring-1 ring-black/10 dark:ring-white/10">
                      <Flag code={(LOCALE_META as any)[loc]?.flag ?? 'gb'} width={20} height={14} />
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span className="font-button-bold text-[13px] leading-tight">
                        {(LOCALE_META as any)[loc]?.nativeName ?? loc.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                        {(LOCALE_META as any)[loc]?.englishName ?? ''}
                      </span>
                    </span>
                    {loc === currentLocale ? (
                      <span
                        className="ml-auto text-green-600 dark:text-green-400"
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                    ) : (
                      <span className="ml-auto text-[10px] uppercase px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                        {loc}
                      </span>
                    )}
                  </span>
                </Link>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
