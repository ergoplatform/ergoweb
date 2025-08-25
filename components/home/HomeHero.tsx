import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import Button from '../Button';
import Image from 'next/image';
import LazyInView from '../../utils/LazyInView';

export default function HomeHero() {
  const intl = useIntl();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  // Gate video loading: start as soon as possible after mount (keeps poster as LCP, then swap)
  const [enableVideo, setEnableVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);

  // Theme handling that mirrors existing behavior
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false; // default light on SSR/first paint
  });

  useEffect(() => {
    try {
      const domDark =
        typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
      if (resolvedTheme === 'dark') setIsDark(true);
      else if (resolvedTheme === 'light') setIsDark(false);
      else setIsDark(!!domDark);
    } catch {
      // ignore
    }
  }, [resolvedTheme]);

  // Viewport detection to ensure only the correct video is ever rendered/fetched
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update);
      return () => mq.removeEventListener('change', update);
    } else {
      // Safari < 14
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);

  const videoRef = useRef<HTMLVideoElement | null>(null);

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
      tryPlay(videoRef.current);
    }
  }, [enableVideo, resolvedTheme, isMobile]);

  // When theme or viewport toggles, force <video> to reload the new source and keep playing
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    try {
      el.load(); // reload new <source> (via key below); defensively keep
      if (enableVideo) {
        const p = el.play();
        if (p && typeof (p as any).catch === 'function') (p as Promise<void>).catch(() => {});
      }
    } catch {
      // ignore
    }
  }, [isDark, isMobile, enableVideo]);

  useEffect(() => {
    setEnableVideo(true);
  }, []);

  useEffect(() => {
    if (posterLoaded) {
      // Only mount video after poster is loaded and a long delay (simulate after LCP)
      const timer = setTimeout(() => {
        setShowVideo(true);
      }, 6500); // 6.5s delay to ensure LCP is measured on poster
      return () => clearTimeout(timer);
    }
  }, [posterLoaded]);

  const posterSrc = isDark
    ? '/assets/home/hero-poster-dark.webp'
    : '/assets/home/hero-poster-light.webp';

  const posterSrcMobile = isDark
    ? '/assets/home/hero-poster-dark-mobile.webp'
    : '/assets/home/hero-poster-light-mobile.webp';

  const videoSrc = isMobile
    ? isDark
      ? '/assets/ergo-dark-mobile.mp4'
      : '/assets/ergo-light-mobile.mp4'
    : isDark
    ? '/assets/ergo-dark.mp4'
    : '/assets/ergo-light.mp4';

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
      <div className="relative md:min-h-[560px] lg:min-h-[640px]">
        {/* Mobile media (render only on mobile) */}
        {isMobile && (
          <div className="home-hero-mobile-media block md:hidden -mx-4 -mt-6 w-[calc(100%+2rem)] pointer-events-none z-0">
            <Image
              src={posterSrcMobile}
              alt=""
              width={640}
              height={360}
              className="pointer-events-none"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              onLoad={() => setPosterLoaded(true)}
              loading="eager"
              priority={true}
            />
            {showVideo && (
              <video
                ref={videoRef}
                key={`${isDark ? 'dark' : 'light'}-m`}
                onCanPlay={(e) => {
                  const el = e.currentTarget as HTMLVideoElement;
                  const p = el.play();
                  if (p && typeof (p as any).catch === 'function')
                    (p as Promise<void>).catch(() => {});
                  setVideoReady(true);
                }}
                className="absolute inset-0 w-full h-full object-cover md:object-contain pointer-events-none"
                width="1920"
                height="1080"
                autoPlay
                playsInline
                loop
                muted
                preload="none"
                poster={posterSrcMobile}
                disablePictureInPicture
                controlsList="nodownload"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
          </div>
        )}
        {/* No mobile image on desktop */}

        {/* Desktop media (render only on desktop) */}
        {!isMobile && mounted && (
          <div className="absolute hidden md:block -top-20 lg:-top-28 left-0 right-0 h-[400px] md:h-[560px] lg:h-[640px] w-full object-cover md:object-contain md:w-full md:max-w-none md:scale-100 bg-transparent dark:bg-transparent pointer-events-none z-0 outline-none focus:outline-none focus-visible:outline-none overflow-hidden">
            <LazyInView
              className="relative w-full h-full"
              placeholder={
                <Image
                  src={posterSrc}
                  alt=""
                  fill
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full md:object-contain object-cover pointer-events-none"
                />
              }
            >
              {() => (
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={posterSrc}
                    alt=""
                    fill
                    sizes="100vw"
                    className="absolute inset-0 w-full h-full md:object-contain object-cover pointer-events-none"
                    priority={true}
                  />
                  {enableVideo &&
                    (isDark ? (
                      <video
                        ref={videoRef}
                        key="dark-d"
                        onCanPlay={(e) => {
                          const el = e.currentTarget as HTMLVideoElement;
                          const p = el.play();
                          if (p && typeof (p as any).catch === 'function')
                            (p as Promise<void>).catch(() => {});
                          setVideoReady(true);
                        }}
                        className="absolute inset-0 w-full h-full md:object-contain object-cover pointer-events-none"
                        width="1920"
                        height="1080"
                        autoPlay
                        playsInline
                        loop
                        muted
                        preload="metadata"
                        poster="/assets/home/hero-poster-dark.webp"
                        disablePictureInPicture
                        controlsList="nodownload"
                      >
                        <source src="/assets/ergo-dark.mp4" type="video/mp4" />
                      </video>
                    ) : (
                      <video
                        ref={videoRef}
                        key="light-d"
                        onCanPlay={(e) => {
                          const el = e.currentTarget as HTMLVideoElement;
                          const p = el.play();
                          if (p && typeof (p as any).catch === 'function')
                            (p as Promise<void>).catch(() => {});
                          setVideoReady(true);
                        }}
                        className="absolute inset-0 w-full h-full md:object-contain object-cover pointer-events-none"
                        width="1920"
                        height="1080"
                        autoPlay
                        playsInline
                        loop
                        muted
                        preload="metadata"
                        poster="/assets/home/hero-poster-light.webp"
                        disablePictureInPicture
                        controlsList="nodownload"
                      >
                        <source src="/assets/ergo-light.mp4" type="video/mp4" />
                      </video>
                    ))}
                </div>
              )}
            </LazyInView>
          </div>
        )}
        {/* SSR fallback containers to preserve layout before hydration */}
        {!isMobile && !mounted && (
          <>
            <div className="relative block md:hidden -mx-4 -mt-6 h-[38vh] sm:h-[45vh] w-[calc(100%+2rem)] overflow-hidden pointer-events-none z-0" />
            <div className="absolute hidden md:block -top-20 lg:-top-28 left-0 right-0 h-[400px] md:h-[560px] lg:h-[640px] w-full object-cover md:object-contain md:w-full md:max-w-none md:scale-100 bg-transparent dark:bg-transparent pointer-events-none z-0 outline-none focus:outline-none focus-visible:outline-none overflow-hidden" />
          </>
        )}

        <div className="max-w-lg leading-none md:max-w-3xl lg:max-w-4xl relative z-10">
          <h1 className="text-[clamp(3.25rem,10.5vw,4.5rem)] md:text-[clamp(3.25rem,5vw,5rem)] leading-tight text-black dark:text-white">
            <b>
              <FormattedMessage
                defaultMessage="Powering the Future of Finance"
                id="components.homeHero.title"
              />
            </b>
          </h1>
        </div>
        <div className="mt-2 md:mt-8 max-w-lg md:max-w-xl relative z-10">
          <p className="font-subtitle-3-regular text-black dark:text-white">
            <FormattedMessage
              defaultMessage="Ergo is a next-generation smart contract platform that ensures the economic freedom of ordinary people through secure, accessible, and decentralized financial tools."
              id="components.homeHero.text"
              values={{ br: <br /> }}
            />
          </p>
        </div>
        <div className="mt-4 md:mt-6 relative z-10 flex gap-4">
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
