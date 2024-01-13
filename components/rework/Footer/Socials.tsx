import React from 'react';
import Github from 'assets/icons/socials/github.svg';
import Twitter from 'assets/icons/socials/twitter.svg';
import Youtube from 'assets/icons/socials/youtube.svg';
import Discord from 'assets/icons/socials/discord.svg';
import Telegram from 'assets/icons/socials/telegram.svg';
import Reddit from 'assets/icons/socials/reddit.svg';
import Link from 'next/link';

const socialItemClass = `
  size-14 flex items-center justify-center border 
  border-b-0 border-r-0 border-main-border last:border-r
  md-max:size-7.5
`;
const svgSizeClass = 'w-[22px] h-auto md-max:w-3.5';

function Socials() {
  return (
    <div className="flex items-center">
      <Link href="/" className={socialItemClass}>
        <Github className={svgSizeClass} />
      </Link>
      <Link href="/" className={socialItemClass}>
        <Twitter className={svgSizeClass} />
      </Link>
      <Link href="/" className={socialItemClass}>
        <Youtube className={svgSizeClass} />
      </Link>
      <Link href="/" className={socialItemClass}>
        <Telegram className={svgSizeClass} />
      </Link>
      <Link href="/" className={socialItemClass}>
        <Discord className={svgSizeClass} />
      </Link>
      <Link href="/" className={socialItemClass}>
        <Reddit className={svgSizeClass} />
      </Link>
    </div>
  );
}

export default Socials;
