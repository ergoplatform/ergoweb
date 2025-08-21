import { Popover } from '@headlessui/react';
import SecondaryMenu from './SecondaryMenu';
import LogoWithTextWhite from './icons/LogoWithTextWhite';
import MenuClose from './icons/MenuClose';
import Sigmaverse from './icons/Sigmaverse';
import ErgoWiki from './icons/ErgoWiki';
import Github from './icons/Github';
import X from './icons/X';
import Youtube from './icons/Youtube';
import Telegram from './icons/Telegram';
import Discord from './icons/Discord';
import Reddit from './icons/Reddit';
import Discourse from './icons/Discourse';
import Button from './Button';
import LanguageSwitcher from './LanguageSwitcher';
import { FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const DarkModeSwitch = dynamic(() => import('./darkModeSwitcher/DarkModeSwitcher'), { ssr: false });
const Search = dynamic(() => import('./Search'), { ssr: false });

export default function NavigationMobileMenu() {
  const { pathname } = useRouter();
  const intl = useIntl();

  return (
    <Popover.Panel className="fixed overflow-auto inset-0 bg-brand-orange dark:bg-brand-black z-50">
      <div className="max-w-[1300px] mx-auto p-4">
        <div className="flex mx-0 mt-2 mb-10 lg:my-10 md:mx-5">
          <div className="my-auto flex-grow">
            <Link
              href="/"
              className="flex justify-center align-center"
              aria-label="Ergo Platform Home"
            >
              <LogoWithTextWhite viewBox="0 0 213 82" className="w-24 lg:w-32" />
            </Link>
          </div>
          <div className="inline-flex">
            <div className="my-auto text-white hidden xs:block">
              <LanguageSwitcher color="white" />{' '}
            </div>
            <div className="my-auto ml-5 lg:ml-10">
              <DarkModeSwitch />
            </div>
            <div className="my-auto ml-5 lg:ml-10">
              <Popover.Button aria-label="Close menu">
                <MenuClose />
              </Popover.Button>
            </div>
          </div>
        </div>
        <Search />
        <div className="mx-0 md:mx-4 mt-16 grid grid-cols-1 md:grid-cols-4 text-white">
          <div>
            <Link href="/community">
              <h3 className="font-button mt-4 mb-10">
                <FormattedMessage defaultMessage="COMMUNITY" id="footer.community.title" />
              </h3>
            </Link>

            <ul className="hidden md:block">
              <li className="mb-2">
                <Link href="/community/#JoinUs">
                  <FormattedMessage defaultMessage="Join our channels" id="footer.community.1" />
                </Link>
              </li>

              <li className="mb-2">
                <Link href="/community/#Sigmanauts">
                  <FormattedMessage defaultMessage="Sigmanauts" id="footer.community.2" />
                </Link>
              </li>

              <li className="mb-2">
                <Link href="/community/#Contribute">
                  <FormattedMessage defaultMessage="Contribute to Ergo" id="footer.community.3" />
                </Link>
              </li>

              <li className="mb-2">
                <Link href="/community/#HallOfFame">
                  <FormattedMessage defaultMessage="Hall of Fame" id="footer.community.4" />
                </Link>
              </li>

              <li className="mb-2">
                <Link href="/community/#Foundation">
                  <FormattedMessage defaultMessage="Ergo Foundation" id="footer.community.5" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link href="/get-erg">
              <h3 className="font-button mt-4 mb-10">
                <FormattedMessage defaultMessage="GET ERG" id="footer.getErg.title" />
              </h3>
            </Link>

            <ul className="hidden md:block">
              <li className="mb-2">
                <Link href="/get-erg/#Mining">
                  <FormattedMessage defaultMessage="Mining" id="footer.getErg.1" />
                </Link>
              </li>

              <li className="mb-2">
                <Link href="/get-erg#MiningCalculator">
                  <FormattedMessage defaultMessage="Mining Calculator" id="footer.getErg.2" />
                </Link>
              </li>

              <li className="mb-2">
                <Link href="/get-erg/#Wallets">
                  <FormattedMessage defaultMessage="Wallets" id="footer.getErg.3" />
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/get-erg/#Exchanges">
                  <FormattedMessage defaultMessage="Exchanges" id="footer.getErg.4" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link href="/discover">
              <h3 className="font-button mt-4 mb-10">
                <FormattedMessage defaultMessage="DISCOVER" id="footer.discover.title" />
              </h3>
            </Link>
            <ul className="hidden md:block">
              <li className="mb-2">
                <Link href="/discover/#DiscoverERG">
                  <FormattedMessage
                    defaultMessage="Software Releases"
                    id="footer.discover.softwareReleases"
                  />
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/discover/#GrantsAndBounties">
                  <FormattedMessage defaultMessage="Grants & Bounties" id="footer.discover.2" />
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/discover/#FAQ">
                  <FormattedMessage defaultMessage="FAQ" id="footer.discover.3" />
                </Link>
              </li>

              <li className="mb-2">
                <Link href="/discover/#Explore">
                  <FormattedMessage defaultMessage="Explore" id="footer.discover.4" />
                </Link>
              </li>

              <li className="mb-2">
                <Link href="/discover/#Documents">
                  <FormattedMessage defaultMessage="Documents" id="footer.discover.5" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link href="/ecosystem">
              <a>
                <h3 className="font-button mt-4 mb-8 md:mb-10">
                  <FormattedMessage defaultMessage="ECOSYSTEM" id="footer.ecosystem.title" />
                </h3>
              </a>
            </Link>
            <ul className="hidden md:block">
              <li className="mb-2">
                <Link href="/ecosystem/#dApps">
                  <a>
                    <FormattedMessage defaultMessage="DApps" id="footer.ecosystem.1" />
                  </a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/ecosystem/#Roadmap">
                  <a>
                    <FormattedMessage defaultMessage="Roadmap" id="footer.ecosystem.2" />
                  </a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/ecosystem/#Wiki">
                  <a>
                    <FormattedMessage defaultMessage="Wiki" id="footer.ecosystem.3" />
                  </a>
                </Link>
              </li>

              <li className="mb-2">
                <Link href="/ecosystem/#Favorites">
                  <a>
                    <FormattedMessage defaultMessage="Ergo Raffle" id="footer.ecosystem.4" />
                  </a>
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/ecosystem/#Videocasts">
                  <a>
                    <FormattedMessage defaultMessage="Videocasts" id="footer.ecosystem.5" />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-10 w-80 hidden md:block">
            <p className="font-subtitle-2">
              <FormattedMessage defaultMessage="More content?" id="navigation.moreContent" />
            </p>
            <p className="font-subtitle-2">
              <FormattedMessage defaultMessage="We got it!" id="footer.weGotIt" />
            </p>
          </div>
        </div>
        <div className="mx-0 md:mx-4 text-white md:flex">
          <div className="my-6 flex-grow md:flex-grow">
            <ul className="md:inline-flex">
              <li>
                <Link href="/blog">
                  <h3 className="font-button mt-4 mb-14 mr-20">
                    <FormattedMessage defaultMessage="BLOG" id="footer.blog.title" />
                  </h3>
                </Link>
              </li>
              <li>
                <Link href="/news">
                  <h3 className="font-button mt-4 mb-14 mr-20">
                    <FormattedMessage defaultMessage="NEWS" id="footer.news.title" />
                  </h3>
                </Link>
              </li>
            </ul>
          </div>
          <div className="my-6 dark">
            <div className="grid overflow-hidden grid-cols-3 gap-6 text-red md:grid-cols-9">
              <div className="box mx-auto my-auto">
                <a href="https://sigmaverse.io" target="_blank" rel="noreferrer">
                  <Sigmaverse />
                </a>
              </div>
              <div className="box mx-auto my-auto">
                <Link href="/ecosystem/#Wiki">
                  <ErgoWiki />
                </Link>
              </div>
              <div className="box mx-auto my-auto">
                <a href="https://github.com/ergoplatform" target="_blank" rel="noreferrer">
                  <Github />
                </a>
              </div>
              <div className="box mx-auto my-auto">
                <a href="https://x.com/Ergo_Platform" target="_blank" rel="noreferrer">
                  <X />
                </a>
              </div>
              <div className="box mx-auto my-auto">
                <a href="https://www.youtube.com/c/ErgoPlatform" target="_blank" rel="noreferrer">
                  <Youtube />
                </a>
              </div>
              <div className="box mx-auto my-auto">
                <a href="https://t.me/Ergo_Chats" target="_blank" rel="noreferrer">
                  <Telegram />
                </a>
              </div>
              <div className="box mx-auto my-auto">
                <a
                  href="https://discord.gg/ergo-platform-668903786361651200"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Discord />
                </a>
              </div>
              <div className="box mx-auto my-auto">
                <a href="https://reddit.com/r/ergonauts" target="_blank" rel="noreferrer">
                  <Reddit />
                </a>
              </div>
              <div className="box mx-auto my-auto">
                <a href="https://www.ergoforum.org/" target="_blank" rel="noreferrer">
                  <Discourse />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Popover.Panel>
  );
}
