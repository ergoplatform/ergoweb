import React from 'react';
import Typography from 'components/rework/Typography';
import Link from 'next/link';
import Discord from 'assets/icons/socials/discord.svg';
import Telegram from 'assets/icons/socials/telegram.svg';

const spacesList = [
  {
    title: 'Trading',
    tgLink: '#',
    discordLink: '#',
  },
  {
    title: 'Farming',
    tgLink: '#',
    discordLink: '#',
  },
  {
    title: 'Mining',
    tgLink: '#',
    discordLink: '#',
  },
  {
    title: 'Development',
    tgLink: '#',
    discordLink: '#',
  },
];

const socialLinkStyles = `
    inline-flex items-center mb-1.5 last:mb-0 gap-1 px-4 py-2.5 rounded-full 
    border-main-border border lg-max:px-3 lg-max:py-1.5 lg-max:mb-1 md-max:shrink-0 md-max:mb-0
`;

const iconStyles = 'sm-max:w-5 sm-max:h-auto';

function Spaces() {
  return (
    <div className="container-rework section">
      <Typography
        as="h2"
        type="heading-3"
        className="mb-12 lg-max:mb-10 md-max:mb-6"
      >
        Crypto exchange you can trust
      </Typography>
      <div className="flex gap-[2px] md-max:block">
        {spacesList.map((item, idx) => {
          return (
            <div
              className={`
                grow bg-background p-10 lg-max:p-8 md-max:flex md-max:items-center 
                md-max:mb-[2px] md-max:last:mb-0 md-max:gap-x-1.5 md-max:p-8 sm-max:flex-wrap
                sm-max:p-5
            `}
            >
              <Typography
                type="title-3"
                className="mb-8 lg-max:mb-6 md-max:mb-0 md-max:w-full sm-max:mb-5 sm-max:pl-2.5"
              >
                {item.title}
              </Typography>
              <Link href={item.tgLink} className={socialLinkStyles}>
                <Telegram className={iconStyles} />
                Telegram chat
              </Link>
              <Link href={item.discordLink} className={socialLinkStyles}>
                <Discord className={iconStyles} />
                Discord
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Spaces;
