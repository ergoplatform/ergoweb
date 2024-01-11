import React from 'react';
import Link from 'next/link';
import Typography from 'components/rework/Typography';
import Discord from 'assets/icons/socials/discord.svg';
import Reddit from 'assets/icons/socials/reddit.svg';

const spaceClass = `
    flex items-center justify-center flex-col w-1/2 h-[244px] 
    border border-main-border rounded-full transition-colors
    hover:border-brand-orange active:border-brand-orange-active
    lg-max:h-[200px] md-max:h-[181px] sm-max:w-full sm-max:h-[125px]
`;

function Spaces() {
  return (
    <div className="container-rework section flex gap-x-[132px] lg-max:gap-x-10 md-max:block">
      <div className="w-[384px] shrink-0 lg-max:w-[360px] md-max:w-full md-max:mb-6">
        <Typography as={'h2'} type="heading-3" className="mb-8 md-max:mb-2">
          Join Mining discussion spaces
        </Typography>
        <Typography as={'p'}>
          Discover insights, share expertise, and connect with fellow
          enthusiasts in vibrant mining discussion spaces. Join to delve deeper
          into industry trends, technologies, and experiences
        </Typography>
      </div>
      <div className="flex w-full items-center justify-between sm-max:block">
        <Link href={'/'} className={spaceClass}>
          <Discord className="mb-6 w-8 h-auto md-max:w-6 sm-max:mb-2" />
          <Typography type="title-3" className="mb-2 md-max:mb-1">
            Discord
          </Typography>
          <Typography className="text-secondary">ERGO mining</Typography>
        </Link>
        <Link href={'/'} className={spaceClass}>
          <Reddit className="mb-6 w-8 h-auto md-max:w-6 sm-max:mb-2" />
          <Typography type="title-3" className="mb-2 md-max:mb-1">
            Reddit
          </Typography>
          <Typography className="text-secondary">r/erg_miners</Typography>
        </Link>
      </div>
    </div>
  );
}

export default Spaces;
