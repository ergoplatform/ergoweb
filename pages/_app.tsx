import '../styles/globals.scss';
import NextNProgress from 'nextjs-progressbar';
import type { AppProps } from 'next/app';
import English from '../content/compiled-locales/en.json';
import Spanish from '../content/compiled-locales/es.json';
import German from '../content/compiled-locales/de.json';
import Italian from '../content/compiled-locales/it.json';
import Turkish from '../content/compiled-locales/tr.json';
import Portuguese from '../content/compiled-locales/pt.json';
import Hungarian from '../content/compiled-locales/hu.json';
import Chinese from '../content/compiled-locales/cn.json';
import Russia from '../content/compiled-locales/ru.json';
import Indonesian from '../content/compiled-locales/id.json';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { IntlProvider } from 'react-intl';
import dynamic from 'next/dynamic';
const ThemeProvider = dynamic(() => import('next-themes').then((mod) => mod.ThemeProvider), {
  ssr: false,
});
import Script from 'next/script';
import ClientOnly from '../components/ClientOnly';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Env-based switch to skip third-party during local and preview builds
  const isDev = process.env.NODE_ENV === 'development';
  const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';
  const skipThirdParty = isDev || isPreview;
  // Allow forcing Chatbase in dev/preview by setting NEXT_PUBLIC_ENABLE_CHATBASE=1
  const chatbaseOverride = process.env.NEXT_PUBLIC_ENABLE_CHATBASE === '1';
  // GTM (lazy and gated behind enableThirdParty)
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID as string | undefined;
  const hasValidGTM = typeof gtmId === 'string' && /^GTM-[A-Z0-9]+$/.test(gtmId);

  // Gate loading of third-party scripts until user interaction on mobile or load idle on desktop
  const [enableThirdParty, setEnableThirdParty] = useState(false);
  const [nonce, setNonce] = useState<string | undefined>(undefined);
  const [enableChat, setEnableChat] = useState(false);
  useEffect(() => {
    try {
      const meta =
        typeof document !== 'undefined'
          ? (document.querySelector('meta[name="csp-nonce"]') as HTMLMetaElement | null)
          : null;
      setNonce(meta?.content || undefined);
    } catch (e) {
      /* ignore CSP nonce lookup errors */
    }
  }, []);

  // Gate Chatbase strictly behind first user interaction to avoid CLS
  useEffect(() => {
    if (skipThirdParty) return;
    const onChatInteract = () => {
      setEnableChat(true);
      window.removeEventListener('pointerdown', onChatInteract);
      window.removeEventListener('touchstart', onChatInteract);
      window.removeEventListener('click', onChatInteract);
    };
    window.addEventListener('pointerdown', onChatInteract, { once: true, passive: true } as any);
    window.addEventListener('touchstart', onChatInteract, { once: true, passive: true } as any);
    window.addEventListener('click', onChatInteract, { once: true, passive: true } as any);
    return () => {
      window.removeEventListener('pointerdown', onChatInteract);
      window.removeEventListener('touchstart', onChatInteract);
      window.removeEventListener('click', onChatInteract);
    };
  }, [skipThirdParty]);

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
      case 'es':
        return Spanish;
      case 'de':
        return German;
      case 'it':
        return Italian;
      case 'tr':
        return Turkish;
      case 'pt':
        return Portuguese;
      case 'hu':
        return Hungarian;
      case 'cn':
        return Chinese;
      case 'ru':
        return Russia;
      case 'id':
        return Indonesian;
      default:
        return English;
    }
  }, [shortLocale]);

  return (
    <>
      <ClientOnly>
        {enableThirdParty && !skipThirdParty && (
          <>
            <Script
              id="gtag-src"
              src="https://www.googletagmanager.com/gtag/js?id=G-YFEV1NQGXE"
              strategy="lazyOnload"
              nonce={nonce}
            />
            <Script
              id="gtag-init"
              strategy="lazyOnload"
              nonce={nonce}
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
        {enableThirdParty && !skipThirdParty && hasValidGTM && (
          <Script
            id="gtm-init"
            strategy="lazyOnload"
            nonce={nonce}
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}
        {(chatbaseOverride || (enableChat && !skipThirdParty)) && (
          <>
            <Script
              id="chatbase-config"
              strategy="lazyOnload"
              nonce={nonce}
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
              nonce={nonce}
            />
          </>
        )}
      </ClientOnly>
      <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
        <IntlProvider locale={shortLocale} messages={messages} onError={() => null}>
          <NextNProgress color="#e74c3c" />
          <Component {...pageProps} />
        </IntlProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
