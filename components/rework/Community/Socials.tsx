import React from 'react';
import Typography from 'components/rework/Typography';
import Link from 'next/link';
import Github from 'assets/icons/socials/github.svg';
import Twitter from 'assets/icons/socials/twitter.svg';
import Youtube from 'assets/icons/socials/youtube.svg';
import Discord from 'assets/icons/socials/discord.svg';
import Telegram from 'assets/icons/socials/telegram.svg';
import ArrowIcon from 'assets/icons/arrow-rt.svg';

const socialItemClass =
  'relative grow bg-card-transparent-2 p-10 md-max:p-5 sm-max:block sm-max:mb-[2px] sm-max:last:mb-0 backdrop-blur-2xl group';
const socialItemIconClass =
  'w-16 h-auto mb-6 lg-max:w-14 md-max:w-11 md-max:mb-5';

const socialsList = [
  {
    Icon: <Twitter className={socialItemIconClass} />,
    name: 'Twitter',
  },
  {
    Icon: <Discord className={socialItemIconClass} />,
    name: 'Discord',
  },
  {
    Icon: <Telegram className={socialItemIconClass} />,
    name: 'Telegram',
  },
  {
    Icon: <Youtube className={socialItemIconClass} />,
    name: 'Youtube',
  },
  {
    Icon: <Github className={socialItemIconClass} />,
    name: 'GitHub',
  },
];

function Socials() {
  const Arrow = (
    <div
      className={`
        absolute right-10 top-10 flex items-center justify-center size-16 rounded-full border border-transparent-20 md-max:size-11
        md-max:right-5 md-max:top-5 transition-colors group-hover:border-brand-orange
    `}
    >
      <ArrowIcon />
    </div>
  );
  return (
    <div className="container-rework section pt-[2px]">
      <div
        className={`
        grid grid-cols-3 grid-rows-[248px] gap-[2px] lg-max:grid-rows-[228px] md-max:grid-rows-[164px]
        sm-max:block
      `}
      >
        <div className="flex items-center sm-max:mb-6">
          <Typography
            className="max-w-[188px] p-10 max-max:p-5 sm-max:p-0"
            as="h2"
            type="heading-3"
          >
            Key sources
          </Typography>
        </div>
        {socialsList.map((item, idx) => {
          return (
            <Link href="/" className={socialItemClass}>
              {item.Icon}
              <Typography as={'p'} type="title-2" className="mb-3 md-max:mb-1">
                <span className="font-inter">133.6</span>K
              </Typography>
              <Typography as={'span'}>{item.name}</Typography>
              {Arrow}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Socials;
