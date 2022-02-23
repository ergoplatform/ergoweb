import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import Button from "../Button";

type Props = {
  news: any;
};

export default function News({
  news
}: Props) {

  const intl = useIntl();
  const button = intl.formatMessage({ id: 'components.homeHero.button', defaultMessage: 'DIVE IN' });

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-8">
      <div className="mt-36 mb-14 max-w-7xl p-4 md:p-0 flex flex-col lg:flex-row">
        <div className="item lg:w-1/2 mb-8 text-right lg:order-last">
          <h1 className="-mb-8 md:-mb-20"><b>News</b></h1>
          <h1><b>&Blog</b></h1>
        </div>
        <div className="item lg:w-1/2 card-bg rounded-xl py-8 text-right">
          <p className="font-roboto text-[20px] text-[#585858] dark:text-[#585858] uppercase mx-20">latest news</p>
          <div className="text-left mt-4 mx-8 md:mx-20">
            <Swiper className="SwiperNews" pagination={{ dynamicBullets: true, }} modules={[Pagination]}>
              {news.data.map((post: any, i: number) => (
                <SwiperSlide key={i} className='p-1'>
                  <p><b><FormattedDate value={post.attributes.date} day="numeric" month="long" year="numeric" /></b></p>
                  <p className="font-subtitle-3-bold text-brand-orange dark:text-brand-orange my-2">{post.attributes.title}</p>
                  <p className="text-[#989898] dark:text-[#989898] mb-2">{post.attributes.subtitle}</p>
                  <div className="-ml-4 mb-6">
                    <Button text="READ" url={post.attributes.url} newTab={true} underline={true} textColor="brand-orange" background={false} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
