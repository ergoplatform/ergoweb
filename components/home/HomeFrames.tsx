import Image from 'next/image';
const BLUR = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

export default function HomeFrames() {
  return (
    <>
      {/* Right side frames */}
      <div className="home-frame-1 hidden md:block dark:hidden">
        <Image
          src="/assets/home/frame-1-light.png"
          alt=""
          width={167}
          height={1099}
          sizes="(max-width: 768px) 167px, 167px"
          priority={false}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>
      <div className="home-frame-1 hidden dark:md:block">
        <Image
          src="/assets/home/frame-1.png"
          alt=""
          width={171}
          height={1107}
          sizes="(max-width: 768px) 171px, 171px"
          priority={false}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>

      <div className="home-frame-2 hidden md:block dark:hidden">
        <Image
          src="/assets/home/frame-2-light.png"
          alt=""
          width={167}
          height={1265}
          sizes="(max-width: 768px) 167px, 167px"
          priority={false}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>
      <div className="home-frame-2 hidden dark:md:block">
        <Image
          src="/assets/home/frame-2.png"
          alt=""
          width={167}
          height={1265}
          sizes="(max-width: 768px) 167px, 167px"
          priority={false}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>

      {/* Larger frame near hero - CSS background handles image to avoid layout gaps */}
      <div className="home-frame-3 hidden md:block dark:hidden" />
      <div className="home-frame-3 hidden dark:md:block" />

      {/* Left frames lower on page */}
      <div className="home-frame-4 hidden md:block dark:hidden" />
      <div className="home-frame-4 hidden dark:md:block" />

      <div className="home-frame-5 hidden md:block dark:hidden" />
      <div className="home-frame-5 hidden dark:md:block" />

      {/* Blurs */}
      <div className="home-blur-1 hidden md:block"></div>

      <div className="home-blur-2 hidden md:block"></div>

      <div className="home-blur-3 hidden md:block"></div>

      <div className="home-blur-4 hidden md:block"></div>
    </>
  );
}
