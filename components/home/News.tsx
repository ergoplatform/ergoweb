import { FormattedDate, FormattedMessage } from 'react-intl';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/react'; // Alias Swiper component
import { Pagination } from 'swiper';
import Button from '../Button';
import { useRef, useEffect } from 'react';
import Swiper from 'swiper'; // Import Swiper as a value and type

type Props = {
  news: any;
};

export default function News({ news }: Props) {
  const swiperRef = useRef<Swiper | null>(null); // Use Swiper as the type

  useEffect(() => {
    if (swiperRef.current && news) {
      // Ensure swiperRef.current is a Swiper instance and has the update method
      if (typeof swiperRef.current.update === 'function') {
        swiperRef.current.update();
      }
    }
  }, [news]); // Re-run when news data changes

  return (
    <div id="News" className="max-w-7xl mx-auto px-2 md:px-4 relative" style={{ zIndex: 12 }}>
      <div className="mt-36 mb-14 max-w-7xl p-4 md:p-0 flex flex-col lg:flex-row">
        <div className="item lg:w-1/2 mb-8 text-right lg:order-last">
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-none">
            <b>
              <FormattedMessage defaultMessage="News" id="components.news.title" />
            </b>
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-none">
            <b>
              &<FormattedMessage defaultMessage="Blog" id="components.news.blog" />
            </b>
          </h1>
        </div>
        <div className="item lg:w-1/2 card-bg rounded-xl p-8 text-right">
          <p className="font-roboto text-[20px] text-black dark:text-white uppercase text-right">
            <FormattedMessage defaultMessage="latest news" id="components.news.latest" />
          </p>
          <div className="text-left mt-4 overflow-hidden w-full">
            <SwiperComponent // Use the aliased component
              className="SwiperNews"
              pagination={{ dynamicBullets: true }}
              modules={[Pagination]}
              autoHeight={true}
              slidesPerView={1}
              spaceBetween={0}
              onSwiper={(swiper: Swiper) => {
                // Use Swiper as the type
                swiperRef.current = swiper;
              }}
            >
              {news
                ? news.map((post: any, i: number) => (
                    <SwiperSlide key={i} className="p-3">
                      <p>
                        <b>
                          <FormattedDate
                            value={post.attributes.date}
                            day="numeric"
                            month="long"
                            year="numeric"
                          />
                        </b>
                      </p>
                      <p
                        className="font-subtitle-3-bold text-black dark:text-white my-2 w-full"
                        style={{ whiteSpace: 'normal' }}
                      >
                        {post.attributes.title}
                      </p>
                      <p
                        className="text-black dark:text-white mb-2 w-full"
                        style={{ whiteSpace: 'normal' }}
                      >
                        {post.attributes.subtitle}
                      </p>
                      <div style={{ marginLeft: '-1rem' }} className="mb-6">
                        <Button
                          text="READ"
                          url={post.attributes.url}
                          newTab={true}
                          underline={true}
                          textColor="black"
                          background={false}
                          customClass="dark:text-brand-orange"
                        />
                      </div>
                    </SwiperSlide>
                  ))
                : null}
            </SwiperComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
