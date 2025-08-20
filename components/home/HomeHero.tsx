import { FormattedMessage, useIntl } from 'react-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
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

  // Gate video loading until interaction or idle
  const [allowVideo, setAllowVideo] = useState(false);
  useEffect(() => {
    const enable = () => setAllowVideo(true);

    const onInteract = () => {
      enable();
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('touchstart', onInteract);
      window.removeEventListener('click', onInteract);
    };

    if (typeof window !== 'undefined') {
      // Always allow after first user interaction (mobile and desktop)
      window.addEventListener('pointerdown', onInteract, { once: true, passive: true } as any);
      window.addEventListener('touchstart', onInteract, { once: true, passive: true } as any);
      window.addEventListener('click', onInteract, { once: true, passive: true } as any);

      // Desktop convenience: also allow after idle; mobile stays interaction-only
      const isMobileLike =
        typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches;

      if (!isMobileLike) {
        const onLoad = () => {
          if ('requestIdleCallback' in window) {
            (window as any).requestIdleCallback(() => {
              // keep true if already enabled by interaction
              setAllowVideo((v) => (v ? v : true));
            });
          } else {
            setTimeout(() => setAllowVideo((v) => (v ? v : true)), 0);
          }
          window.removeEventListener('load', onLoad);
        };
        window.addEventListener('load', onLoad);
      }
    }

    return () => {
      window.removeEventListener('pointerdown', onInteract);
      window.removeEventListener('touchstart', onInteract);
      window.removeEventListener('click', onInteract);
    };
  }, []);

  const posterSrc =
    resolvedTheme === 'dark'
      ? '/assets/home/hero-poster-dark.webp'
      : '/assets/home/hero-poster-light.webp';

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
        {mounted ? (
          <>
            {/* Mobile media (poster-first; swap to video after interaction to satisfy "after interaction" requirement) */}
            <div className="relative block md:hidden -mx-4 -mt-6 h-[38vh] sm:h-[45vh] w-[calc(100%+2rem)] overflow-hidden pointer-events-none z-0">
              <LazyInView
                className="relative w-full h-full"
                placeholder={
                  <Image
                    src={posterSrc}
                    alt=""
                    priority
                    fill
                    sizes="100vw"
                    className="absolute inset-0 object-cover pointer-events-none"
                  />
                }
              >
                {() =>
                  allowVideo ? (
                    <video
                      key={resolvedTheme}
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none"
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
                    >
                      <source
                        src={
                          resolvedTheme === 'dark'
                            ? '/assets/ergo-dark-mobile.mp4'
                            : '/assets/ergo-light-mobile.mp4'
                        }
                        type="video/mp4"
                      />
                      <track
                        kind="captions"
                        src="/assets/hero-en.vtt"
                        srcLang="en"
                        label="English"
                        default
                      />
                    </video>
                  ) : (
                    <Image
                      src={posterSrc}
                      alt=""
                      priority
                      fill
                      sizes="100vw"
                      className="absolute inset-0 object-cover pointer-events-none"
                    />
                  )
                }
              </LazyInView>
            </div>

            {/* Desktop media: poster-first, swap to video after interaction/idle and when in view */}
            <div className="absolute hidden md:block -top-20 lg:-top-28 left-0 right-0 h-[400px] md:h-[560px] lg:h-[640px] w-full object-cover md:object-contain md:w-full md:max-w-none md:scale-100 bg-transparent dark:bg-transparent pointer-events-none z-0 outline-none focus:outline-none focus-visible:outline-none overflow-hidden">
              <LazyInView
                className="relative w-full h-full"
                placeholder={
                  <Image
                    src={posterSrc}
                    alt=""
                    priority
                    fill
                    sizes="100vw"
                    className="absolute inset-0 w-full h-full md:object-contain object-cover pointer-events-none"
                  />
                }
              >
                {() =>
                  allowVideo ? (
                    <video
                      key={resolvedTheme}
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
                    >
                      <source
                        src={
                          resolvedTheme === 'dark'
                            ? '/assets/ergo-dark.mp4'
                            : '/assets/ergo-light.mp4'
                        }
                        type="video/mp4"
                      />
                      <track
                        kind="captions"
                        src="/assets/hero-en.vtt"
                        srcLang="en"
                        label="English"
                        default
                      />
                    </video>
                  ) : (
                    <Image
                      src={posterSrc}
                      alt=""
                      priority
                      fill
                      sizes="100vw"
                      className="absolute inset-0 w-full h-full md:object-contain object-cover pointer-events-none"
                    />
                  )
                }
              </LazyInView>
            </div>
          </>
        ) : (
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
