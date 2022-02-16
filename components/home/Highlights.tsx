import { FormattedMessage } from "react-intl";
import { Highlights1, Highlights2, Highlights3 } from "../icons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
// import "swiper/css";
// import "swiper/css/navigation";
import { getIconComponentByName } from "../../utils/icons-map";
import Image from 'next/image'

const slides = [
  {
    titleMessage: <FormattedMessageFixed defaultMessage="A Fair Start {breakingLine}For Everyone" id="components.highlights.slide.1.title" values={{ breakingLine: <br /> }} />,
    quoteMessage: <FormattedMessageFixed defaultMessage="95.57% {breakingLine}Public Allocation" id="components.highlights.slide.1.quote" values={{ breakingLine: <br /> }} />,
    textMessage: <FormattedMessageFixed defaultMessage="Just like Bitcoin, Ergo has digital scarcity. There is a limited supply, mined into existence through Proof of Work. In this respect, Ergo is a conservative blockchain. However, additional features are designed to ensure that miners are adequately compensated after block rewards end." id="components.highlights.slide.1.text" values={{ breakingLine: <br /> }} />,
    svg: 'Highlights1',
    viewBox: '0 0 562 562',
    height: 562 * 0.5,
    width: 562 * 0.5,
  },
  {
    titleMessage: <FormattedMessageFixed defaultMessage="20+ Scientific Contributions" id="components.highlights.slide.2.title" values={{ breakingLine: <br /> }} />,
    quoteMessage: <FormattedMessageFixed defaultMessage="Another quote" id="components.highlights.slide.2.quote" values={{ breakingLine: <br /> }} />,
    textMessage: <FormattedMessageFixed defaultMessage="Just like Bitcoin, Ergo has digital scarcity. There is a limited supply, mined into existence through Proof of Work. In this respect, Ergo is a conservative blockchain. However, additional features are designed." id="components.highlights.slide.2.text" values={{ breakingLine: <br /> }} />,
    svg: 'Highlights2',
    viewBox: '0 0 416 402',
    height: 416 * 0.5,
    width: 402 * 0.5
  },
  {
    titleMessage: <FormattedMessageFixed defaultMessage="100% Open Source" id="components.highlights.slide.2.title" values={{ breakingLine: <br /> }} />,
    quoteMessage: <FormattedMessageFixed defaultMessage="Another quote" id="components.highlights.slide.3.quote" values={{ breakingLine: <br /> }} />,
    textMessage: <FormattedMessageFixed defaultMessage="Just like Bitcoin, Ergo has digital scarcity. There is a limited supply, mined into existence through Proof of Work. In this respect, Ergo is a conservative blockchain. However, additional features are designed." id="components.highlights.slide.3.text" values={{ breakingLine: <br /> }} />,
    svg: 'Highlights3',
    viewBox: '0 0 528 257',
    height: 528 * 0.5,
    width: 257 * 0.5
  }
]


function FormattedMessageFixed(props: any) {
  return <FormattedMessage {...props} />;
}

function Highlights() {
  return (
    <div className="mt-40 max-w-7xl mx-auto p-4">
      <div className="text-center">
        <p className="font-roboto font-bold text-[14px] lg:text-[20px] text-[#585858]"><FormattedMessage defaultMessage="HIGHLIGHTS" id="components.highlights.title" /></p>
      </div>

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {
          slides.map((item, i) => (
            <SwiperSlide key={i}>
              <div>
                <div className="lg:hidden">
                  <div className="text-center">
                    <p className="font-vinila-extended-light text-[40px]">{item.titleMessage}</p>
                  </div>
                  <div className="flex">
                    <div className="mx-auto">
                      {getIconComponentByName(item.svg, { viewBox: item.viewBox, className: 'highlightsShadow my-auto h-96', height: item.height, width: item.height })}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mx-16 flex-grow">
                      <p className="font-vinila-extended leading-none text-[24px]">{item.quoteMessage}</p>
                      <p className="font-body-2-regular text-[#585858] mt-4">{item.textMessage}</p>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="flex mx-20">
                    <div className="item w-1/3">
                      {getIconComponentByName(item.svg + 'big', { viewBox: item.viewBox, className: 'highlightsShadow my-auto h-96', height: item.height, width: item.height })}
                    </div>
                    <div className="item w-2/3">
                      <h3>{item.titleMessage}</h3>
                      <p className="max-w-lg text-[#585858] mt-6">{item.textMessage}</p>
                      <p className="font-vinila-extended leading-none text-[56px] mt-12">{item.quoteMessage}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>

    </div>

  )
}

export default Highlights;