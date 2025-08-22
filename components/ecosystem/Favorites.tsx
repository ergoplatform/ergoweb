import { FormattedMessage, useIntl } from 'react-intl';
import { getIconComponentByName } from '../../utils/icons-map';
import { ErgoRaffle, Heart } from '../icons';
import { useEffect, useState } from 'react';
import Button from '../Button';
import Image from 'next/image';

type Props = {
  favorites?: any;
};

export default function Favorites(props: Props) {
  const [mods, setMods] = useState<{ Swiper: any; SwiperSlide: any; Pagination: any } | null>(null);
  useEffect(() => {
    let mounted = true;
    Promise.all([
      import('swiper/react').then((m) => ({ Swiper: m.Swiper, SwiperSlide: m.SwiperSlide })),
      import('swiper').then((m) => ({ Pagination: m.Pagination })),
    ]).then(([a, b]) => {
      if (mounted) setMods({ ...a, ...b });
    });
    return () => {
      mounted = false;
    };
  }, []);
  const intl = useIntl();
  const button1Text = intl.formatMessage({
    id: 'components.favorites.button1',
    defaultMessage: 'EXPLORE ERGO RAFFLE',
  });

  return (
    <div id="Favorites" className="max-w-[1300px] mx-auto p-4 relative z-10">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        <div className="lg:w-1/3">
          <Heart viewBox="0 0 20 18" className="h-3 mb-4 pl-8" />
          <p className="text-[#585858] dark:text-white font-bold mb-3 text-[24px] lg:text-[32px] pl-8">
            <FormattedMessage defaultMessage="OUR FAVORITES" id="components.ourFavorites.heading" />
          </p>
          <ErgoRaffle viewBox="0 0 211 63" className="h-28 w-80 mb-8 pl-8" />
          <p className="text-[16px] lg:text-[18px] text-[#807e7e] dark:text-[#807e7e] mb-8 pl-8">
            <FormattedMessage
              defaultMessage='ErgoRaffle is a crowdfunding service built on Ergo Platform that enables anyone to raise money for a project. This project can range from a direct donation to a charity, an academic or business plan, or anything you can convince people to part with their hard-earned ERG for! As an added bonus, after finishing the Raffle, a lottery takes place, and one lucky participant wins a set percent of the Raffle as a "raffle reward".'
              id="components.ergoRaffle.description"
            />
          </p>

          <a
            href="https://ergoraffle.com/"
            target="_blank"
            rel="noreferrer"
            className="py-1 px-4 inline-flex items-center whitespace-nowrap btn rounded-full text-white font-vinila-extended text-[14px] md:text-[16px] bg-brand-orange border border-brand-orange-dark ml-8 transition-transform duration-200 hover:scale-105 shadow-sm"
          >
            <span className="leading-none">
              <b>{button1Text}</b>
            </span>
            <span className="w-5 h-5 ml-2 flex items-center">
              {getIconComponentByName('ArrowRightWhite')}
            </span>
          </a>
          {
            <Button
              text={
                <FormattedMessage
                  defaultMessage="TRY OUT MEWFUND"
                  id="components.favorites.mewFund"
                />
              }
              url="http://fund.mewfinance.com"
              newTab={true}
              background={true}
              textColor="white"
              customClass="mt-4 ml-8 transition-transform duration-200 hover:scale-105"
              icon="ArrowRightWhite"
            />
          }
          <Button
            text={
              <FormattedMessage
                defaultMessage="READ ABOUT RAFFLE V2"
                id="components.favorites.raffleV2"
              />
            }
            url="https://docs.ergoplatform.com/eco/ergoraffle/#v2"
            newTab={true}
            background={true}
            textColor="white"
            customClass="mt-4 ml-8 transition-transform duration-200 hover:scale-105"
            icon="ArrowRightWhite"
          />
        </div>
        <div className="lg:w-2/3">
          {mods ? (
            <mods.Swiper
              className="SwiperFavorites"
              pagination={{ dynamicBullets: true }}
              modules={[mods.Pagination]}
            >
              {props.favorites.map((post: any, i: number) => (
                <mods.SwiperSlide key={i} className="mb-8">
                  <div className="favorite-card bg-white/60 dark:bg-zinc-900/40 rounded-2xl p-6 my-4 min-h-[335px] mx-1 ring-1 ring-black/5 dark:ring-white/10 transition hover:shadow-lg hover:-translate-y-0.5 dark:border dark:border-white/10">
                    <div className="relative flex justify-center lg:justify-end mb-8">
                      {post.attributes.image.data != null ? (
                        <Image
                          width={post.attributes.image.data?.attributes.width}
                          height={post.attributes.image.data?.attributes.height}
                          src={post.attributes.image.data?.attributes.url}
                          className=""
                          alt=""
                        />
                      ) : (
                        <div></div>
                      )}
                      <span className="absolute top-4 right-4 inline-flex w-fit items-center px-3.5 py-1.5 rounded-full uppercase tracking-widest text-xs md:text-sm font-semibold text-white bg-brand-orange border border-brand-orange-dark">
                        {post.attributes.subtitle}
                      </span>
                    </div>
                    <p className="font-vinila-extended-bold text-[clamp(28px,7vw,48px)] mb-2 heading-balance">
                      {post.attributes.title}
                    </p>
                    <p className="text-[14px] text-[#807e7e] dark:text-[#807e7e] mb-4">
                      {post.attributes.description}
                    </p>
                    <div>
                      {post.attributes.url != null ? (
                        <Button
                          text={post.attributes.button_text}
                          url={post.attributes.url}
                          newTab={true}
                          underline={true}
                          textColor="brand-orange"
                          background={false}
                          customClass="border border-brand-orange-dark"
                        />
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </mods.SwiperSlide>
              ))}
            </mods.Swiper>
          ) : null}
        </div>
      </div>
    </div>
  );
}
