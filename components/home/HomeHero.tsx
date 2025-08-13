import { FormattedMessage, useIntl } from 'react-intl';
import Button from '../Button';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Image component

export default function HomeHero() {
  const intl = useIntl();
  const { resolvedTheme, theme } = useTheme(); // Get theme
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // New state for mobile detection

  useEffect(() => {
    setMounted(true);
    // Add event listener for window resize to detect mobile
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Assuming md breakpoint is 768px
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const button = intl.formatMessage({
    id: 'components.homeHero.button',
    defaultMessage: 'DIVE IN',
  });
  const secondButton = intl.formatMessage({
    id: 'components.homeHero.pitchDeckButton',
    defaultMessage: 'PITCH DECK',
  });

  // Determine which video to show based on resolvedTheme
  const currentTheme = resolvedTheme || theme;
  const isDarkTheme = currentTheme === 'dark';
  const videoSrc = isDarkTheme ? '../assets/ergo-dark.mp4' : '../assets/ergo-light.mp4';
  const posterSrc = isDarkTheme ? '/assets/home/frame-1.png' : '/assets/home/frame-1-light.png';

  // Only render the video if mounted and theme is resolved
  const renderVideo = mounted && currentTheme;

  return (
    <div id="HomeHero" className="mt-0 md:mt-24 max-w-[1300px] mx-auto p-4 relative z-1">
      {' '}
      {/* Set z-index to 1 */}
      <div className="relative">
        {renderVideo && (
          <>
            {isMobile ? ( // Conditionally render mobile video
              <div className="relative block -mx-4 -mt-40 h-[520px] sm:h-[600px] w-[calc(100%+2rem)] overflow-hidden pointer-events-none z-0">
                <video
                  key={currentTheme} // Keep key for theme switch
                  className="w-full h-full object-cover pointer-events-none"
                  autoPlay
                  playsInline
                  loop
                  muted
                  preload="metadata"
                  disablePictureInPicture
                  controlsList="nodownload"
                >
                  <source src={videoSrc} type="video/mp4" />
                  <track
                    kind="captions"
                    src="/assets/hero-en.vtt"
                    srcLang="en"
                    label="English"
                    default
                  />
                </video>
              </div>
            ) : (
              // Conditionally render desktop video
              <div className="absolute -top-20 lg:-top-28 left-0 right-0 h-[400px] w-full object-cover md:h-auto md:object-contain md:w-full md:max-w-none md:scale-100 bg-transparent dark:bg-transparent pointer-events-none z-0 outline-none focus:outline-none focus-visible:outline-none overflow-hidden">
                <video
                  key={currentTheme} /* Add key to force re-mount on theme change */
                  className="w-full h-full md:object-contain object-cover pointer-events-none"
                  autoPlay
                  playsInline
                  loop
                  muted
                  preload="metadata"
                  disablePictureInPicture
                  controlsList="nodownload"
                >
                  <source src={videoSrc} type="video/mp4" />
                  <track
                    kind="captions"
                    src="/assets/hero-en.vtt"
                    srcLang="en"
                    label="English"
                    default
                  />
                  <track
                    kind="captions"
                    src="/assets/hero-en.vtt"
                    srcLang="en"
                    label="English"
                    default
                  />
                </video>
              </div>
            )}
          </>
        )}
        <div className="max-w-lg leading-none md:max-w-3xl lg:max-w-4xl relative z-10">
          <h1 className="text-[clamp(3.25rem,10.5vw,4.5rem)] md:text-[clamp(3.25rem,5vw,5rem)] leading-tight">
            <b>
              <FormattedMessage
                defaultMessage="Powering the Future of Finance"
                id="components.homeHero.title"
              />
            </b>
          </h1>
        </div>
        <div className="mt-1 md:mt-8 max-w-lg md:max-w-xl relative z-10">
          <p className="font-subtitle-3-regular">
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
            textColor="brand-orange"
            iconColor="orange"
            icon="ArrowRight"
          />
        </div>
      </div>
    </div>
  );
}
