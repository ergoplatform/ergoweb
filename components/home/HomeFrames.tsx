import Image from 'next/image';
const BLUR = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

export default function HomeFrames() {
  return (
    <>
      {/* Right side frames */}
      <div className="home-frame-1 dark:hidden">
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
      <div className="home-frame-1 hidden dark:block">
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

      <div className="home-frame-2 dark:hidden">
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
      <div className="home-frame-2 hidden dark:block">
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

      {/* Larger frame near hero - mark as priority */}
      <div className="home-frame-3 dark:hidden">
        <Image
          src="/assets/home/frame-3-light.png"
          alt=""
          width={304}
          height={1114}
          sizes="(max-width: 768px) 152px, 304px"
          priority={true}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>
      <div className="home-frame-3 hidden dark:block">
        <Image
          src="/assets/home/frame-3.png"
          alt=""
          width={351}
          height={1240}
          sizes="(max-width: 768px) 176px, 351px"
          priority={true}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>

      {/* Left frames lower on page */}
      <div className="home-frame-4 dark:hidden">
        <Image
          src="/assets/home/frame-4-light.png"
          alt=""
          width={667}
          height={1031}
          sizes="(max-width: 768px) 333px, 667px"
          priority={false}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>
      <div className="home-frame-4 hidden dark:block">
        <Image
          src="/assets/home/frame-4.png"
          alt=""
          width={667}
          height={1031}
          sizes="(max-width: 768px) 333px, 667px"
          priority={false}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>

      <div className="home-frame-5 dark:hidden">
        <Image
          src="/assets/home/frame-5-light.png"
          alt=""
          width={382}
          height={1491}
          sizes="(max-width: 768px) 191px, 382px"
          priority={false}
          placeholder="blur"
          blurDataURL={BLUR}
        />
      </div>
      <div className="home-frame-5 hidden dark:block">
        <Image
          src="/assets/home/frame-5.png"
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
      <div className="home-blur-1"></div>

      <div className="home-blur-2"></div>

      <div className="home-blur-3"></div>

      <div className="home-blur-4"></div>
    </>
  );
}
