import { FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import Highlights1 from '../icons/Highlights1';
import Highlights1big from '../icons/Highlights1big';
import Highlights2 from '../icons/Highlights2';
import Highlights2big from '../icons/Highlights2big';
import Highlights3 from '../icons/Highlights3';
import Highlights3big from '../icons/Highlights3big';
import ArrowRightOrange from '../icons/ArrowRightOrange';

const slides = [
  {
    titleMessage: (
      <FormattedMessageFixed
        defaultMessage="A Fair Start"
        id="components.highlights.slide.1.title"
        values={{ breakingLine: <br /> }}
      />
    ),
    quoteMessage: (
      <FormattedMessageFixed
        defaultMessage="95.57% {breakingLine}Public Allocation"
        id="components.highlights.slide.1.quote"
        values={{ breakingLine: <br /> }}
      />
    ),
    textMessage: (
      <FormattedMessageFixed
        defaultMessage="Ergo is a community-driven project that went live in 2019 with a distribution unparalleled by any other smart-contract platform, with 4.43% of funds allocated to Ergo Foundation Treasury, underscoring our commitment to fostering a robust and decentralised ecosystem. {breakingLine}{readMoreLink}"
        id="components.highlights.slide.1.text"
        values={{
          breakingLine: <br />,
          readMoreLink: (
            <a
              href="https://docs.ergoplatform.com/mining/emission/"
              className="text-black dark:text-white font-bold"
              aria-label="Read More about A Fair Start"
            >
              Read More: A Fair Start
            </a>
          ),
        }}
      />
    ),
    Icon: Highlights1,
    IconBig: Highlights1big,
    viewBox: '0 0 562 562',
    height: 562 * 0.5,
    width: 562 * 0.5,
  },
  {
    titleMessage: (
      <FormattedMessageFixed
        defaultMessage="Alternative Economics"
        id="components.highlights.slide.2.title"
        values={{ breakingLine: <br /> }}
      />
    ),
    quoteMessage: (
      <FormattedMessageFixed
        defaultMessage="TRUE P2P"
        id="components.highlights.slide.2.quote"
        values={{ breakingLine: <br /> }}
      />
    ),
    textMessage: (
      <FormattedMessageFixed
        defaultMessage="Enabling more innovative, targeted implementations that conventional banking can't match. Ergo offers powerful tools with smart contract-powered microcredit facilities and Local Exchange Trading Systems (LETS). {breakingLine}{readMoreLink}"
        id="components.highlights.slide.2.text"
        values={{
          breakingLine: <br />,
          readMoreLink: (
            <a
              href="https://docs.ergoplatform.com/uses/lets/"
              className="text-black dark:text-white font-bold"
              aria-label="Read More about Alternative Economics"
            >
              Read More: Alternative Economics
            </a>
          ),
        }}
      />
    ),
    Icon: Highlights2,
    IconBig: Highlights2big,
    viewBox: '0 0 416 402',
    height: 416 * 0.5,
    width: 402 * 0.5,
  },
  {
    titleMessage: (
      <FormattedMessageFixed
        defaultMessage="Optional Privacy"
        id="components.highlights.slide.3.title"
        values={{ breakingLine: <br /> }}
      />
    ),
    quoteMessage: (
      <FormattedMessageFixed
        defaultMessage="Σ-protocols"
        id="components.highlights.slide.3.quote"
        values={{ breakingLine: <br /> }}
      />
    ),
    textMessage: (
      <FormattedMessageFixed
        defaultMessage="Privacy must remain an option to protect autonomy. Privacy is the ability to create barriers and erect boundaries to create a space for the individual. It is up to each what borders and boundaries they choose to make. This enables new models of financial interaction, underpinned by a safe and rich scripting language, ErgoScript and flexible and powerful Zero-Knowledge proofs {breakingLine}{readMoreLink}"
        id="components.highlights.slide.3.text"
        values={{
          breakingLine: <br />,
          readMoreLink: (
            <a
              href="https://docs.ergoplatform.com/dev/protocol/zkp/"
              className="text-black dark:text-white font-bold"
              aria-label="Read More about Optional Privacy"
            >
              Read More: Optional Privacy
            </a>
          ),
        }}
      />
    ),
    Icon: Highlights3,
    IconBig: Highlights3big,
    viewBox: '0 0 528 257',
    height: 528 * 0.5,
    width: 257 * 0.5,
  },
];

function FormattedMessageFixed(props: any) {
  return <FormattedMessage {...props} />;
}

function Highlights() {
  const [mods, setMods] = useState<{ Swiper: any; SwiperSlide: any; Navigation: any } | null>(null);
  useEffect(() => {
    let mounted = true;
    Promise.all([
      import('swiper/react').then((m) => ({ Swiper: m.Swiper, SwiperSlide: m.SwiperSlide })),
      import('swiper').then((m) => ({ Navigation: m.Navigation })),
    ]).then(([a, b]) => {
      if (mounted) setMods({ ...a, ...b });
    });
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div
      id="Highlights"
      className="mt-8 md:mt-40 max-w-[1300px] mx-auto p-4 relative isolate min-h-0 lg:min-h-[300px]"
      style={{ zIndex: 12 }}
    >
      <div className="text-center">
        <p className="font-roboto font-bold text-[14px] lg:text-[20px] text-[#585858]">
          <FormattedMessage defaultMessage="HIGHLIGHTS" id="components.highlights.title" />
        </p>
      </div>

      {mods ? (
        <>
          <mods.Swiper
            navigation={{
              prevEl: '.swiper-prev-mobile',
              nextEl: '.swiper-next-mobile',
            }}
            modules={[mods.Navigation]}
            className="SwiperHighlights overflow-hidden"
            slidesPerView={1}
            spaceBetween={0}
            centeredSlides={false}
          >
            {slides.map((item, i) => (
              <mods.SwiperSlide key={i}>
                <div className="min-h-[300px] lg:min-h-[300px] flex flex-col justify-between overflow-hidden">
                  {/* Added min-h for mobile layout stability */}
                  <div className="lg:hidden">
                    <div className="text-center">
                      <p className="font-vinila-extended-light text-[40px]">{item.titleMessage}</p>
                    </div>
                    <div className="flex justify-center items-center w-full h-72">
                      {' '}
                      {/* Changed max-h-96 to h-72 for fixed height */}
                      <div className="mx-auto w-full h-full flex justify-center items-center">
                        <item.Icon
                          viewBox={item.viewBox}
                          className="highlightsShadow my-auto max-h-full w-full object-contain"
                          width="100%"
                          height="100%"
                        />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mx-16 flex-grow" style={{ minHeight: '120px' }}>
                        {/* Added minHeight for mobile layout stability */}
                        <p className="font-vinila-extended leading-none text-[28px]">
                          {item.quoteMessage}
                        </p>
                        <p className="font-body-2-regular text-black dark:text-white mt-3 text-[16px]">
                          {item.textMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="flex mx-20">
                      <div className="item w-1/3">
                        <item.IconBig
                          viewBox={item.viewBox}
                          className="highlightsShadow my-auto h-96"
                          height={item.height}
                          width={item.height}
                        />
                      </div>
                      <div className="item w-2/3">
                        <h2 className="leading-tight text-[96px]">{item.titleMessage}</h2>
                        <p className="max-w-lg text-black dark:text-white mt-6">
                          {item.textMessage}
                        </p>
                        <p className="font-vinila-extended leading-none text-[56px] mt-12">
                          {item.quoteMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </mods.SwiperSlide>
            ))}
          </mods.Swiper>
          <div className="absolute inset-0 pointer-events-none hidden lg:block">
            <button className="swiper-prev-mobile pointer-events-auto absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 flex items-center justify-center">
              <span className="sr-only">Previous</span>
              <ArrowRightOrange className="w-6 h-6 rotate-180" />
            </button>
            <button className="swiper-next-mobile pointer-events-auto absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 flex items-center justify-center">
              <span className="sr-only">Next</span>
              <ArrowRightOrange className="w-6 h-6" />
            </button>
          </div>
        </>
      ) : (
        <div className="SwiperHighlights">
          <div className="min-h-[300px] lg:min-h-[300px]" />
        </div>
      )}
    </div>
  );
}

export default Highlights;
