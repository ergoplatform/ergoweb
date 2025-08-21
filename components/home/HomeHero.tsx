import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from '../Button';
import LazyInView from '../../utils/LazyInView';

export default function HomeHero() {
  const intl = useIntl();
  const { resolvedTheme } = useTheme();

  // Ensure the poster image is the true LCP by rendering it on SSR.
  // Video is mounted only after first paint to avoid being picked as LCP.
  const [enableVideo, setEnableVideo] = useState(false);

  // Theme handling similar to previous behavior
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false; // default light on SSR/first paint
  });

  useEffect(() => {
    try {
      const domDark =
        typeof document !== 'undefined' &&
        document.documentElement.classList.contains('dark');
      if (resolvedTheme === 'dark') setIsDark(true);
      else if (resolvedTheme === 'light') setIsDark(false);
      else setIsDark(!!domDark);
    } catch {
      // ignore
    }
  }, [resolvedTheme]);

  // Defer video mount until after first paint to keep poster as LCP
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // rAF ensures we mount video after first paint
      requestAnimationFrame(() => setEnableVideo(true));
    }
  }, []);

  const videoRefMobile = useRef<HTMLVideoElement | null>(null);
  const videoRefDesktop = useRef<HTMLVideoElement | null>(null);

  // Ensure autoplay resumes (Safari/iOS quirks)
  useEffect(() => {
    const tryPlay = (el?: HTMLVideoElement | null) => {
      if (el && el.paused) {
        const p = el.play();
        if (p && typeof (p as any).then === 'function') {
          (p as Promise<void>).catch(() => {});
        }
      }
    };
    if (enableVideo) {
      tryPlay(videoRefMobile.current);
      tryPlay(videoRefDesktop.current);
    }
  }, [enableVideo, isDark]);

  const posterSrc = isDark
    ? '/assets/home/hero-poster-dark.webp'
    : '/assets/home/hero-poster-light.webp';

  const videoSrc = isDark ? '/assets/ergo-dark.mp4' : '/assets/ergo-light.mp4';

  const button = intl.formatMessage({
    id: 'components.homeHero.button',
    defaultMessage: 'DIVE IN',
  });
  const secondButton = intl.formatMessage({
    id: 'components.homeHero.pitchDeckButton',
    defaultMessage: 'PITCH DECK',
  });

  return (
    <div id="HomeHero" className="mt-0 md:mt-24 max-w-[1300px] mx-auto p-4 relative z-1">
      {/* Set z-index to 1 */}
      <div className="relative">
        {/* Mobile media */}
        <div className="relative block md:hidden -mx-4 -mt-[36px] h-[520px] sm:h-[600px] w-[calc(100%+2rem)] overflow-hidden pointer-events-none z-0">
          <LazyInView className="relative w-full h-full">
            <div className="absolute inset-0 w-full h-full">
              {/* Base poster image: true LCP (SSR-rendered, priority) */}
              <Image
                src={posterSrc}
                alt=""
                priority
                fill
                sizes="100vw"
                className="absolute inset-0 w-full h-full object-cover md:object-contain pointer-events-none"
              />
              {/* Deferred video: mounts after first paint, won't be considered LCP */}
              {enableVideo && (
                <video
                  ref={videoRefMobile}
                  key={`${isDark ? 'dark' : 'light'}-m`}
                  className="absolute inset-0 w-full h-full object-cover md:object-contain pointer-events-none"
                  width="1920"
                  height="1080"
                  autoPlay
                  playsInline
                  loop
                  muted
                  preload="none"
                  poster={posterSrc}
                  disablePictureInPicture
                  controlsList="nodownload"
                  onCanPlay={(e) => {
                    const el = e.currentTarget as HTMLVideoElement;
                    const p = el.play();
                    if (p && typeof (p as any).catch === 'function') (p as Promise<void>).catch(() => {});
                  }}
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              )}
            </div>
          </LazyInView>
        </div>

        {/* Desktop media */}
        <div className="absolute hidden md:block -top-20 lg:-top-28 left-0 right-0 h-[400px] md:h-[560px] lg:h-[640px] w-full object-cover md:object-contain md:w-full md:max-w-none md:scale-100 bg-transparent dark:bg-transparent pointer-events-none z-0 outline-none focus:outline-none focus-visible:outline-none overflow-hidden">
          <LazyInView className="relative w-full h-full">
            <div className="absolute inset-0 w-full h-full">
              {/* Base poster image: true LCP (SSR-rendered, priority) */}
              <Image
                src={posterSrc}
                alt=""
                fill
                sizes="100vw"
                className="absolute inset-0 w-full h-full md:object-contain object-cover pointer-events-none"
              />
              {/* Deferred video: mounts after first paint, won't be considered LCP */}
              {enableVideo && (
                <video
                  ref={videoRefDesktop}
                  key={`${isDark ? 'dark' : 'light'}-d`}
                  className="absolute inset-0 w-full h-full md:object-contain object-cover pointer-events-none"
                  width="1920"
                  height="1080"
                  autoPlay
                  playsInline
                  loop
                  muted
                  preload="none"
                  poster={posterSrc}
                  disablePictureInPicture
                  controlsList="nodownload"
                  onCanPlay={(e) => {
                    const el = e.currentTarget as HTMLVideoElement;
                    const p = el.play();
                    if (p && typeof (p as any).catch === 'function') (p as Promise<void>).catch(() => {});
                  }}
                >
                  <source src={videoSrc} type="video/mp4" />
                </video>
              )}
            </div>
          </LazyInView>
        </div>

        <div className="max-w-lg leading-none md:max-w-3xl lg:max-w-3xl relative z-10">
          <h1 className="text-[clamp(3.25rem,10.5vw,4.5rem)] md:text-[clamp(3.25rem,5vw,5rem)] leading-tight text-black dark:text-white">
            <b>
              <FormattedMessage
                defaultMessage="Powering the Future of Finance"
                id="components.homeHero.title"
              />
            </b>
          </h1>
        </div>
        <div className="mt-1 md:mt-8 max-w-lg md:max-w-xl relative z-10">
          <p className="font-subtitle-3-regular text-black dark:text-white">
            <FormattedMessage
              defaultMessage="Ergo is a next-generation smart contract platform that ensures the economic freedom of ordinary people through secure, accessible, and decentralized financial tools."
              id="components.homeHero.text"
              values={{ br: <br /> }}
            />
          </p>
        </div>
        <div className="mt-1 md:mt-6 relative z-10 flex gap-4">
          <Button
            text={button}
            textColor="black"
            url="/discover"
            newTab={false}
            underline={false}
            background={true}
            iconColor="black"
            icon="ArrowRight"
          />
          <Button
            text={secondButton}
            url="https://docs.google.com/presentation/d/e/2PACX-1vRKsXBoOE7llTGjsh5c_FfU3cLw3DRtsPs4d4iS6OeoAJIbjTGS6uXpofPirRYvK58aKde5j1yqAiFV/pub?start=false&loop=false&delayms=3000"
            newTab={true}
            background={false}
            animation={true}
            textColor="black"
            iconColor="orange"
            icon="ArrowRight"
            customClass="dark:text-white underline dark:decoration-brand-orange"
          />
        </div>
      </div>
    </div>
  );
}
