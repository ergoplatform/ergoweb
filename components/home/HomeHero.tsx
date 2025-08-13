import { FormattedMessage, useIntl } from 'react-intl';
import Button from '../Button';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function HomeHero() {
  const intl = useIntl();
  const { theme } = useTheme(); // Get the current theme
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const button = intl.formatMessage({
    id: 'components.homeHero.button',
    defaultMessage: 'DIVE IN',
  });
  const secondButton = intl.formatMessage({
    id: 'components.homeHero.pitchDeckButton',
    defaultMessage: 'PITCH DECK',
  });

  return (
    <div id="HomeHero" className="mt-36 max-w-[1300px] mx-auto p-4 relative">
      <div className="relative">
        <div className="max-w-lg leading-none md:max-w-3xl lg:max-w-4xl relative z-20">
          <h1 className="text-[clamp(2rem,6vw,4rem)] md:text-[clamp(2.5rem,5vw,4.5rem)]">
            <b>
              <FormattedMessage
                defaultMessage="Powering the Future of Finance"
                id="components.homeHero.title"
              />
            </b>
          </h1>
        </div>
        <div className="mt-6 md:mt-10 max-w-lg md:max-w-xl relative z-20">
          <p className="font-subtitle-3-regular">
            <FormattedMessage
              defaultMessage="Ergo is a next-generation smart contract platform that ensures the economic freedom of ordinary people through secure, accessible, and decentralized financial tools."
              id="components.homeHero.text"
              values={{ br: <br /> }}
            />
          </p>
        </div>
        <div className="mt-8 md:mt-6 relative z-20 flex gap-4">
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
      {/* Dark Theme Video */}
      {mounted && (
        <div className="dark:block">
          <video
            autoPlay={true}
            playsInline={true}
            loop={true}
            muted={true}
            className="absolute -top-[13rem] h-[400px] w-[96%] object-cover md:h-auto md:object-contain md:w-full md:max-w-none md:scale-100 block bg-white dark:bg-transparent outline-none focus:outline-none focus-visible:outline-none overflow-hidden"
            disablePictureInPicture={true}
            controlsList="nodownload"
            poster="/assets/home/frame-1.png"
          >
            <source src="../assets/ergo-dark.mp4" type="video/mp4" />
            <track kind="captions" src="/assets/hero-en.vtt" srcLang="en" label="English" default />
          </video>
        </div>
      )}
      {/* Light Theme Video */}
      {mounted && (
        <div className="dark:hidden">
          <video
            autoPlay={true}
            playsInline={true}
            loop={true}
            muted={true}
            className="absolute -top-[13rem] h-[400px] w-[96%] object-cover md:h-auto md:object-contain md:w-full md:max-w-none md:scale-100 block bg-white dark:bg-transparent outline-none focus:outline-none focus-visible:outline-none overflow-hidden"
            disablePictureInPicture={true}
            controlsList="nodownload"
            poster="/assets/home/frame-1-light.png"
          >
            <source src="../assets/ergo-light.mp4" type="video/mp4" />
            <track kind="captions" src="/assets/hero-en.vtt" srcLang="en" label="English" default />
          </video>
        </div>
      )}
    </div>
  );
}
