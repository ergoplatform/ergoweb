import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const BLUR = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

export default function HomeFrames() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Right side frames */}
      <div className="home-frame-1 hidden md:block">
        <Image
          src={theme === 'dark' ? '/assets/home/frame-1.png' : '/assets/home/frame-1-light.png'}
          alt=""
          width={theme === 'dark' ? 171 : 167}
          height={theme === 'dark' ? 1107 : 1099}
          sizes="(max-width: 768px) 167px, 167px"
          priority={false}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>

      <div className="home-frame-2 hidden md:block">
        <Image
          src={theme === 'dark' ? '/assets/home/frame-2.png' : '/assets/home/frame-2-light.png'}
          alt=""
          width={167}
          height={1265}
          sizes="(max-width: 768px) 167px, 167px"
          priority={false}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>

      {/* Larger frame near hero - mark as priority */}
      <div className="home-frame-3 hidden md:block">
        <Image
          src={theme === 'dark' ? '/assets/home/frame-3.png' : '/assets/home/frame-3-light.png'}
          alt=""
          width={theme === 'dark' ? 351 : 304}
          height={theme === 'dark' ? 1240 : 1114}
          sizes="(max-width: 768px) 152px, 304px"
          priority={true}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>

      {/* Left frames lower on page */}
      <div className="home-frame-4 hidden md:block">
        <Image
          src={theme === 'dark' ? '/assets/home/frame-4.png' : '/assets/home/frame-4-light.png'}
          alt=""
          width={667}
          height={1031}
          sizes="(max-width: 768px) 333px, 667px"
          priority={false}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>

      <div className="home-frame-5 hidden md:block">
        <Image
          src={theme === 'dark' ? '/assets/home/frame-5.png' : '/assets/home/frame-5-light.png'}
          alt=""
          width={382}
          height={1491}
          sizes="(max-width: 768px) 191px, 382px"
          priority={false}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>

      {/* Blurs */}
      {theme === 'dark' && <div className="home-blur-1 hidden md:block"></div>}

      <div className="home-blur-2 hidden md:block"></div>

      <div className="home-blur-3 hidden md:block"></div>

      <div className="home-blur-4 hidden md:block"></div>
    </>
  );
}
