import '../styles/globals.scss';
import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import English from '../content/compiled-locales/en.json';
import Spanish from '../content/compiled-locales/es.json';
import German from '../content/compiled-locales/de.json';
// import French from "../content/compiled-locales/fr.json";
// import Hindi from "../content/compiled-locales/hi.json";
import Italian from '../content/compiled-locales/it.json';
import Turkish from '../content/compiled-locales/tr.json';
import Portuguese from '../content/compiled-locales/pt.json';
import Hungarian from '../content/compiled-locales/hu.json';
import Chinese from '../content/compiled-locales/cn.json';
import Russia from '../content/compiled-locales/ru.json';
import Indonesian from '../content/compiled-locales/id.json';
// import Romanian from "../content/compiled-locales/ro.json";
// import Slovak from "../content/compiled-locales/sk.json";
// import Chinese from "../content/compiled-locales/zh.json";
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Env-based switch to skip third-party during local and preview builds
  const isDev = process.env.NODE_ENV === 'development';
  const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';
  const skipThirdParty = isDev || isPreview;
  // Allow forcing Chatbase in dev/preview by setting NEXT_PUBLIC_ENABLE_CHATBASE=1
  const chatbaseOverride = process.env.NEXT_PUBLIC_ENABLE_CHATBASE === '1';

  // Gate loading of third-party scripts until user interaction on mobile or load idle on desktop
  const [enableThirdParty, setEnableThirdParty] = useState(false);

  useEffect(() => {
    if (skipThirdParty) return;

    const isMobileLike =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(pointer: coarse)').matches;

    const enable = () => setEnableThirdParty(true);

    if (isMobileLike) {
      const onFirstInteract = () => {
        enable();
        window.removeEventListener('pointerdown', onFirstInteract);
        window.removeEventListener('touchstart', onFirstInteract);
        window.removeEventListener('click', onFirstInteract);
      };
      window.addEventListener('pointerdown', onFirstInteract, { once: true, passive: true });
      window.addEventListener('touchstart', onFirstInteract, { once: true, passive: true });
      window.addEventListener('click', onFirstInteract, { once: true, passive: true });
    } else {
      const onLoad = () => {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => setEnableThirdParty(true));
        } else {
          setTimeout(() => setEnableThirdParty(true), 0);
        }
        window.removeEventListener('load', onLoad);
      };
      window.addEventListener('load', onLoad);
    }
  }, [skipThirdParty]);

  const handleRouteChange = (url: string) => {
    if (typeof window === 'undefined') return;
    const w = window as any;
    if (typeof w.gtag === 'function') {
      w.gtag('config', 'G-1XC1836VXN', { page_path: url });
    } else {
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push(['config', 'G-1XC1836VXN', { page_path: url }]);
    }
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const [shortLocale] = router.locale ? router.locale.split('-') : ['en'];

  const messages = useMemo(() => {
    switch (shortLocale) {
      case 'en':
        return English;
      // case 'es':
      //  return Spanish;
      case 'de':
        return German;
      // case "fr":
      //   return French
      // case "hi":
      //   return Hindi
      case 'it':
        return Italian;
      case 'tr':
        return Turkish;
      // case 'pt':
      //  return Portuguese;
      case 'hu':
        return Hungarian;
      case 'cn':
        return Chinese;
      case 'ru':
        return Russia;
      case 'id':
        return Indonesian;
      // case "zh":
      //   return Chinese;
      default:
        return English;
    }
  }, [shortLocale]);

  return (
    <>
      {enableThirdParty && !skipThirdParty && (
        <>
          <Script
            id="gtag-src"
            src="https://www.googletagmanager.com/gtag/js?id=G-YFEV1NQGXE"
            strategy="lazyOnload"
          />
          <Script
            id="gtag-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-YFEV1NQGXE', { page_path: window.location.pathname });
              `,
            }}
          />
        </>
      )}
      {enableThirdParty && (!skipThirdParty || chatbaseOverride) && (
        <>
          <Script
            id="chatbase-config"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                window.chatbaseConfig = {
                  chatbotId: "zxB2uzZfYoHIpA98eTzgM",
                };
              `,
            }}
          />
          <Script
            id="zxB2uzZfYoHIpA98eTzgM"
            src="https://www.chatbase.co/embed.min.js"
            strategy="lazyOnload"
          />
        </>
      )}
      <ThemeProvider attribute="class">
        <IntlProvider locale={shortLocale} messages={messages} onError={() => null}>
          <NextNProgress color="#e74c3c" />
          <Component {...pageProps} />
        </IntlProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
