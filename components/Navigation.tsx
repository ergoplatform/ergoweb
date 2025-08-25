import { Popover, Transition, Portal } from '@headlessui/react';
import SecondaryMenu from './SecondaryMenu';
import LogoWithText from './icons/LogoWithText';
import LogoWithTextWhite from './icons/LogoWithTextWhite';
import MenuOpen from './icons/MenuOpen';
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
import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
const DarkModeSwitch = dynamic(() => import('./darkModeSwitcher/DarkModeSwitcher'), { ssr: false });
const Search = dynamic(() => import('./Search'), { ssr: false });

function Navigation({ enableLanguages = true }) {
  const { pathname } = useRouter();
  const intl = useIntl();
  const ergoCommunity = intl.formatMessage({
    id: 'navigation.ergoCommunity',
    defaultMessage: 'COMMUNITY',
  });
  const getErg = intl.formatMessage({
    id: 'navigation.getErg',
    defaultMessage: 'GET ERG',
  });
  const discover = intl.formatMessage({
    id: 'navigation.discover',
    defaultMessage: 'DISCOVER',
  });
  const ecosystem = intl.formatMessage({
    id: 'navigation.ecosystem',
    defaultMessage: 'ECOSYSTEM',
  });
  return (
    <>
      <SecondaryMenu />
      <Popover className="max-w-[1300px] mx-auto px-4 relative z-20">
        {/* Increased z-index */}
        <div className="flex mx-0 mt-2 mb-10 lg:my-5 md:mx-0 min-h-[48px] items-center">
          <div className="my-auto flex-grow z-10">
            <Link
              href="/"
              className="flex justify-center align-center"
              aria-label="Ergo Platform Home"
            >
              <LogoWithText viewBox="0 0 213 82" className="w-24 lg:w-32" />
            </Link>
          </div>
          <div
            className="hidden lg:flex my-auto flex-grow min-h-[40px] items-center gap-4 whitespace-nowrap"
            style={{ zIndex: 12 }}
          >
            <Button
              text={ergoCommunity}
              url="/community"
              textColor="black"
              background={false}
              underline={pathname == '/community'}
              customClass=" decoration-brand-orange dark:decoration-brand-orange underline-offset-2 hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
              ariaLabel={ergoCommunity}
            />
            <Button
              text={getErg}
              url="/get-erg"
              textColor="white"
              background={true}
              underline={pathname == '/get-erg'}
              customClass=" decoration-white dark:decoration-white underline-offset-2 hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
              ariaLabel={getErg}
            />
            <Button
              text={discover}
              url="/discover"
              textColor="black"
              background={false}
              underline={pathname == '/discover'}
              customClass=" decoration-brand-orange dark:decoration-brand-orange underline-offset-2 hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
              ariaLabel={discover}
            />
            <Button
              text={ecosystem}
              url="/ecosystem"
              textColor="black"
              background={false}
              underline={pathname == '/ecosystem'}
              customClass=" decoration-brand-orange dark:decoration-brand-orange underline-offset-2 hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
              ariaLabel={ecosystem}
            />
          </div>
          <div className="inline-flex" style={{ zIndex: 12 }}>
            <div className="my-auto hidden xs:block">
              {enableLanguages ? <LanguageSwitcher /> : null}
            </div>
            <div className="my-auto ml-5 lg:ml-10">
              <DarkModeSwitch />
            </div>
            <div className="my-auto ml-5 lg:ml-10 z-40">
              <Popover.Button aria-label="Open menu">
                <MenuOpen />
              </Popover.Button>
            </div>
          </div>
        </div>
        <Portal>
          <Transition
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Popover.Panel className="fixed inset-0 min-h-screen overflow-y-auto isolate bg-brand-orange dark:bg-brand-black z-[2147483647]">
              <div className="max-w-[1300px] mx-auto p-4 relative z-[100000]">
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
                      {enableLanguages ? <LanguageSwitcher color="white" /> : null}{' '}
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
                    <Link href="/community" aria-label={ergoCommunity}>
                      <h3 className="font-button text-[18px] md:text-[20px] leading-tight mt-4 mb-10">
                        <FormattedMessage defaultMessage="COMMUNITY" id="footer.community.title" />
                      </h3>
                    </Link>

                    <ul className="hidden md:block">
                      <li className="mb-2">
                        <Link
                          href="/get-erg#MiningCalculator"
                          aria-label={intl.formatMessage({
                            id: 'footer.getErg.2',
                            defaultMessage: 'Mining Calculator',
                          })}
                        >
                          <FormattedMessage
                            defaultMessage="Mining Calculator"
                            id="footer.getErg.2"
                          />
                        </Link>
                      </li>

                      <li className="mb-2">
                        <Link
                          href="/community/#Sigmanauts"
                          aria-label={intl.formatMessage({
                            id: 'footer.community.2',
                            defaultMessage: 'Sigmanauts',
                          })}
                        >
                          <FormattedMessage defaultMessage="Sigmanauts" id="footer.community.2" />
                        </Link>
                      </li>

                      <li className="mb-2">
                        <Link
                          href="/community/#Contribute"
                          aria-label={intl.formatMessage({
                            id: 'footer.community.3',
                            defaultMessage: 'Contribute to Ergo',
                          })}
                        >
                          <FormattedMessage
                            defaultMessage="Contribute to Ergo"
                            id="footer.community.3"
                          />
                        </Link>
                      </li>

                      <li className="mb-2">
                        <Link
                          href="/community/#HallOfFame"
                          aria-label={intl.formatMessage({
                            id: 'footer.community.4',
                            defaultMessage: 'Hall of Fame',
                          })}
                        >
                          <FormattedMessage defaultMessage="Hall of Fame" id="footer.community.4" />
                        </Link>
                      </li>

                      <li className="mb-2">
                        <Link
                          href="/community/#Foundation"
                          aria-label={intl.formatMessage({
                            id: 'footer.community.5',
                            defaultMessage: 'Ergo Foundation',
                          })}
                        >
                          <FormattedMessage
                            defaultMessage="Ergo Foundation"
                            id="footer.community.5"
                          />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Link href="/get-erg" aria-label={getErg}>
                      <h3 className="font-button text-[18px] md:text-[20px] leading-tight mt-4 mb-10">
                        <FormattedMessage defaultMessage="GET ERG" id="footer.getErg.title" />
                      </h3>
                    </Link>

                    <ul className="hidden md:block">
                      <li className="mb-2">
                        <Link
                          href="/get-erg/#Mining"
                          aria-label={intl.formatMessage({
                            id: 'footer.getErg.1',
                            defaultMessage: 'Mining',
                          })}
                        >
                          <FormattedMessage defaultMessage="Mining" id="footer.getErg.1" />
                        </Link>
                      </li>

                      <li className="mb-2">
                        <Link
                          href="/get-erg#MiningCalculator"
                          aria-label={intl.formatMessage({
                            id: 'footer.getErg.2',
                            defaultMessage: 'Mining Calculator',
                          })}
                        >
                          <FormattedMessage
                            defaultMessage="Mining Calculator"
                            id="footer.getErg.2"
                          />
                        </Link>
                      </li>

                      <li className="mb-2">
                        <Link
                          href="/get-erg/#Wallets"
                          aria-label={intl.formatMessage({
                            id: 'footer.getErg.3',
                            defaultMessage: 'Wallets',
                          })}
                        >
                          <FormattedMessage defaultMessage="Wallets" id="footer.getErg.3" />
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          href="/get-erg/#Exchanges"
                          aria-label={intl.formatMessage({
                            id: 'footer.getErg.4',
                            defaultMessage: 'Exchanges',
                          })}
                        >
                          <FormattedMessage defaultMessage="Exchanges" id="footer.getErg.4" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Link href="/discover" aria-label={discover}>
                      <h3 className="font-button text-[18px] md:text-[20px] leading-tight mt-4 mb-10">
                        <FormattedMessage defaultMessage="DISCOVER" id="footer.discover.title" />
                      </h3>
                    </Link>
                    <ul className="hidden md:block">
                      <li className="mb-2">
                        <Link
                          href="/discover/#DiscoverERG"
                          aria-label={intl.formatMessage({
                            id: 'footer.discover.1',
                            defaultMessage: 'Software Releases',
                          })}
                        >
                          <FormattedMessage
                            defaultMessage="Software Releases"
                            id="footer.discover.softwareReleases"
                          />
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          href="/discover/#GrantsAndBounties"
                          aria-label={intl.formatMessage({
                            id: 'footer.discover.2',
                            defaultMessage: 'Grants & Bounties',
                          })}
                        >
                          <FormattedMessage
                            defaultMessage="Grants & Bounties"
                            id="footer.discover.2"
                          />
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          href="/discover/#FAQ"
                          aria-label={intl.formatMessage({
                            id: 'footer.discover.3',
                            defaultMessage: 'FAQ',
                          })}
                        >
                          <FormattedMessage defaultMessage="FAQ" id="footer.discover.3" />
                        </Link>
                      </li>

                      <li className="mb-2">
                        <Link
                          href="/discover/#Explore"
                          aria-label={intl.formatMessage({
                            id: 'footer.discover.4',
                            defaultMessage: 'Explore',
                          })}
                        >
                          <FormattedMessage defaultMessage="Explore" id="footer.discover.4" />
                        </Link>
                      </li>

                      <li className="mb-2">
                        <Link
                          href="/discover/#Documents"
                          aria-label={intl.formatMessage({
                            id: 'footer.discover.5',
                            defaultMessage: 'Documents',
                          })}
                        >
                          <FormattedMessage defaultMessage="Documents" id="footer.discover.5" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Link href="/ecosystem" aria-label={ecosystem}>
                      <h3 className="font-button text-[18px] md:text-[20px] leading-tight mt-4 mb-8 md:mb-10">
                        <FormattedMessage defaultMessage="ECOSYSTEM" id="footer.ecosystem.title" />
                      </h3>
                    </Link>
                    <ul className="hidden md:block">
                      <li className="mb-2">
                        <Link
                          href="/ecosystem/#dApps"
                          aria-label={intl.formatMessage({
                            id: 'footer.ecosystem.1',
                            defaultMessage: 'DApps',
                          })}
                        >
                          <FormattedMessage defaultMessage="DApps" id="footer.ecosystem.1" />
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          href="/ecosystem/#Roadmap"
                          aria-label={intl.formatMessage({
                            id: 'footer.ecosystem.2',
                            defaultMessage: 'Roadmap',
                          })}
                        >
                          <FormattedMessage defaultMessage="Roadmap" id="footer.ecosystem.2" />
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          href="/ecosystem/#Wiki"
                          aria-label={intl.formatMessage({
                            id: 'footer.ecosystem.3',
                            defaultMessage: 'Wiki',
                          })}
                        >
                          <FormattedMessage defaultMessage="Wiki" id="footer.ecosystem.3" />
                        </Link>
                      </li>

                      <li className="mb-2">
                        <Link
                          href="/ecosystem/#Favorites"
                          aria-label={intl.formatMessage({
                            id: 'footer.ecosystem.4',
                            defaultMessage: 'Ergo Raffle',
                          })}
                        >
                          <FormattedMessage defaultMessage="Ergo Raffle" id="footer.ecosystem.4" />
                        </Link>
                      </li>
                      <li className="mb-2">
                        <Link
                          href="/ecosystem/#Videocasts"
                          aria-label={intl.formatMessage({
                            id: 'footer.ecosystem.5',
                            defaultMessage: 'Videocasts',
                          })}
                        >
                          <FormattedMessage defaultMessage="Videocasts" id="footer.ecosystem.5" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-10 w-80 hidden md:block">
                    <p className="font-subtitle-2">
                      <FormattedMessage
                        defaultMessage="More content?"
                        id="navigation.moreContent"
                      />
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
                        <Link
                          href="/blog"
                          aria-label={intl.formatMessage({
                            id: 'footer.blog.title',
                            defaultMessage: 'BLOG',
                          })}
                        >
                          <h3 className="font-button text-[18px] md:text-[20px] leading-tight mt-4 mb-14 mr-20">
                            <FormattedMessage defaultMessage="BLOG" id="footer.blog.title" />
                          </h3>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/blog?type=news"
                          aria-label={intl.formatMessage({
                            id: 'footer.news.title',
                            defaultMessage: 'NEWS',
                          })}
                        >
                          <h3 className="font-button text-[18px] md:text-[20px] leading-tight mt-4 mb-14 mr-20">
                            <FormattedMessage defaultMessage="NEWS" id="footer.news.title" />
                          </h3>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="my-6 dark">
                    <div className="grid overflow-hidden grid-cols-3 gap-6 text-red md:grid-cols-9">
                      <div className="box mx-auto my-auto">
                        <a
                          href="https://sigmaverse.io"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Sigmaverse"
                        >
                          <Sigmaverse />
                        </a>
                      </div>
                      <div className="box mx-auto my-auto">
                        <Link
                          href="/ecosystem/#Wiki"
                          aria-label={intl.formatMessage({
                            id: 'footer.ecosystem.3',
                            defaultMessage: 'Wiki',
                          })}
                        >
                          <ErgoWiki />
                        </Link>
                      </div>
                      <div className="box mx-auto my-auto">
                        <a
                          href="https://github.com/ergoplatform"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="GitHub"
                        >
                          <Github />
                        </a>
                      </div>
                      <div className="box mx-auto my-auto">
                        <a
                          href="https://x.com/Ergo_Platform"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="X (formerly Twitter)"
                        >
                          <X />
                        </a>
                      </div>
                      <div className="box mx-auto my-auto">
                        <a
                          href="https://www.youtube.com/c/ErgoPlatform"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="YouTube"
                        >
                          <Youtube />
                        </a>
                      </div>
                      <div className="box mx-auto my-auto">
                        <a
                          href="https://t.me/Ergo_Chats"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Telegram"
                        >
                          <Telegram />
                        </a>
                      </div>
                      <div className="box mx-auto my-auto">
                        <a
                          href="https://discord.gg/ergo-platform-668903786361651200"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Discord"
                        >
                          <Discord />
                        </a>
                      </div>
                      <div className="box mx-auto my-auto">
                        <a
                          href="https://reddit.com/r/ergonauts"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Reddit"
                        >
                          <Reddit />
                        </a>
                      </div>
                      <div className="box mx-auto my-auto">
                        <a
                          href="https://www.ergoforum.org/"
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Ergo Forum"
                        >
                          <Discourse />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Portal>
      </Popover>
    </>
  );
}

export default Navigation;
