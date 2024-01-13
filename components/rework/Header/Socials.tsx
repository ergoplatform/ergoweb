import React from 'react';
import Twitter from 'assets/icons/socials/twitter.svg';
import Discord from 'assets/icons/socials/discord.svg';
import Telegram from 'assets/icons/socials/telegram.svg';
import Link from 'next/link';

const socialItemClass = `
  size-10 flex items-center justify-center rounded-full bg-background md-max:size-6
  transition-colors hover:bg-background-card
  `;
const svgSizeClass = 'w-[22px] h-auto md-max:w-3.5';

function Socials() {
  return (
    <div className="flex items-center gap-x-3 md-max:gap-x-2.5">
      <Link href="/" className={socialItemClass}>
        <Twitter className={svgSizeClass} />
      </Link>
      <Link href="/" className={socialItemClass}>
        <Discord className={svgSizeClass} />
      </Link>
      <Link href="/" className={socialItemClass}>
        <Telegram className={svgSizeClass} />
      </Link>
    </div>
  );
}

export default Socials;
