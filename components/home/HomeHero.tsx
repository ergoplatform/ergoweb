import { FormattedMessage, useIntl } from 'react-intl';
import Button from '../Button';
import { useState, useEffect } from 'react';

export default function HomeHero() {
  const intl = useIntl();
  const button = intl.formatMessage({
    id: 'components.homeHero.button',
    defaultMessage: 'DIVE IN',
  });

  const [title, setTitle] = useState('Powering the Future of Finance');
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const titles = [
      'Powering the Future of Finance',
      'Research-led and real-world focused',
      'Powerful and safe',
      'Intelligent and Straightforward',
      'Secure and accessible',
    ];
    let currentTitleIndex = 0;
    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        setTitle(titles[currentTitleIndex]);
        setIsChanging(false);
      }, 500); // Wait for 0.5 seconds to start changing the title
    }, 3500); // Change title every 3.5 seconds
    return () => clearInterval(interval);
  }, []);

  const titleStyle = isChanging
    ? { transition: 'opacity 1s ease-in-out', opacity: 0 }
    : { transition: 'opacity 1s ease-in-out', opacity: 1 };

  // Use the titleStyle in your title rendering
  // <h1 style={titleStyle}>{title}</h1>
  return (
    <div id="HomeHero" className="mt-36 max-w-[1300px] mx-auto p-4 relative">
      <div className="relative">
        <div className="max-w-lg leading-none md:max-w-4xl relative z-20">
          <h1 className="md:hidden">
            <b>{title}</b>
          </h1>
          <h3 className="hidden md:block">
            <b>{title}</b>
          </h3>
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
        <div className="mt-8 md:mt-6 relative z-20">
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
        </div>
      </div>
      <div className="hidden dark:block">
        <video
          autoPlay={true}
          playsInline={true}
          loop={true}
          muted={true}
          className="absolute -top-[13rem] h-[400px] w-[96%] object-cover md:h-auto md:object-contain md:max-w-[96%] md:scale-100"
          disablePictureInPicture={true}
          controlsList="nodownload"
        >
          <source src="../assets/ergo-dark.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="dark:hidden">
        <video
          autoPlay={true}
          playsInline={true}
          loop={true}
          muted={true}
          className="absolute -top-[13rem] h-[400px] w-[96%] object-cover md:h-auto md:object-contain md:max-w-[96%] md:scale-100"
          disablePictureInPicture={true}
          controlsList="nodownload"
        >
          <source src="../assets/ergo-light.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
