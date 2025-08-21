import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import LogoWithText from './icons/LogoWithText';
import Sigmaverse from './icons/Sigmaverse';
import ErgoWiki from './icons/ErgoWiki';
import Github from './icons/Github';
import X from './icons/X';
import Youtube from './icons/Youtube';
import Telegram from './icons/Telegram';
import Discord from './icons/Discord';
import Reddit from './icons/Reddit';
import Discourse from './icons/Discourse';
import Coingecko from './icons/Coingecko';

export default function Footer() {
  const [postsData, setPostsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const { locale } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRes = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API}/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=5&populate=*&filters[type][$eq]=blog&locale=${locale}`,
        );
        const posts = await postsRes.json();
        setPostsData(posts.data || []);

        const newsRes = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API}/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=5&populate=*&filters[type][$eq]=news&locale=${locale}`,
        );
        const news = await newsRes.json();
        setNewsData(news.data || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setPostsData([]);
        setNewsData([]);
      }
    };
    fetchData();
  }, [locale]);

  const PlaceholderList = ({ count = 5 }: { count?: number }) => (
    <ul className="hidden md:block h-[360px] lg:h-[380px]" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className="mb-4">
          <div className="h-5 w-56 bg-gray-200 dark:bg-gray-700 rounded" />
        </li>
      ))}
    </ul>
  );

  return (
    <footer
      id="Footer"
      className="relative z-10 overflow-hidden lg:min-h-[700px] md:min-h-[700px] footer-image bg-bottom bg-cover bg-no-repeat"
    >
      <div className="max-w-[1300px] mx-auto py-12 px-4 relative z-20">
        <div className="md:flex justify-between md:min-h-[120px] items-center">
          <div className="my-6 md:my-auto flex justify-start md:justify-center">
            <Link href="/" aria-label="Ergo Platform Home">
              <LogoWithText viewBox="0 0 213 82" className="w-40 md:w-52" />
            </Link>
          </div>
          <div className="my-auto flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-4 md:gap-2 lg:gap-4">
            <div className="box">
              <a
                href="https://sigmaverse.io"
                target="_blank"
                rel="noreferrer"
                aria-label="Sigmaverse website"
              >
                <Sigmaverse />
              </a>
            </div>
            <div className="box">
              <Link href="/ecosystem/#Wiki" aria-label="Ergo Wiki" prefetch={false}>
                <ErgoWiki />
              </Link>
            </div>
            <div className="box">
              <a
                href="https://github.com/ergoplatform"
                target="_blank"
                rel="noreferrer"
                aria-label="Ergo Platform GitHub"
              >
                <Github />
              </a>
            </div>
            <div className="box">
              <a
                href="https://x.com/Ergo_Platform"
                target="_blank"
                rel="noreferrer"
                aria-label="Ergo Platform X (formerly Twitter)"
              >
                <X />
              </a>
            </div>
            <div className="box">
              <a
                href="https://www.youtube.com/c/ErgoPlatform"
                target="_blank"
                rel="noreferrer"
                aria-label="Ergo Platform YouTube"
              >
                <Youtube />
              </a>
            </div>
            <div className="box">
              <a
                href="https://t.me/Ergo_Chats"
                target="_blank"
                rel="noreferrer"
                aria-label="Ergo Platform Telegram"
              >
                <Telegram />
              </a>
            </div>
            <div className="box">
              <a
                href="https://discord.gg/ergo-platform-668903786361651200"
                target="_blank"
                rel="noreferrer"
                aria-label="Ergo Platform Discord"
              >
                <Discord />
              </a>
            </div>
            <div className="box">
              <a
                href="https://reddit.com/r/ergonauts"
                target="_blank"
                rel="noreferrer"
                aria-label="Ergo Platform Reddit"
              >
                <Reddit />
              </a>
            </div>
            <div className="box">
              <a
                href="https://www.ergoforum.org/"
                target="_blank"
                rel="noreferrer"
                aria-label="Ergo Forum"
              >
                <Discourse />
              </a>
            </div>
            <div className="box">
              <a
                href="https://www.coingecko.com/en/coins/ergo"
                target="_blank"
                rel="noreferrer"
                aria-label="Ergo on CoinGecko"
              >
                <Coingecko />
              </a>
            </div>
          </div>
          <div className="my-6 md:my-auto flex justify-start md:justify-center">
            <a
              className="text-brand-orange dark:text-brand-orange"
              href="mailto:team@ergoplatform.org"
            >
              team@ergoplatform.org
            </a>
          </div>
        </div>
        <div className="my-6 grid md:grid-cols-2 lg:grid-cols-6 gap-x-6 gap-y-10 min-h-[560px]">
          <div>
            <Link href="/community">
              <h3 className="font-button text-black dark:text-white my-4 cursor-pointer">
                <FormattedMessage defaultMessage="COMMUNITY" id="footer.community.title" />
              </h3>
            </Link>
            <ul className="hidden md:block">
              <li className="mb-4">
                <Link href="/community/#JoinUs">
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Join our channels" id="footer.community.1" />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/community/#Sigmanauts">
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Sigmanauts" id="footer.community.2" />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/community/#Contribute"
                  className="text-black dark:text-gray-300 cursor-pointer"
                >
                  <FormattedMessage defaultMessage="Contribute to Ergo" id="footer.community.3" />
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/community/#HallOfFame"
                  className="text-black dark:text-gray-300 cursor-pointer"
                >
                  <FormattedMessage defaultMessage="Hall of Fame" id="footer.community.4" />
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  href="/community/#Foundation"
                  className="text-black dark:text-gray-300 cursor-pointer"
                >
                  <FormattedMessage defaultMessage="Ergo Foundation" id="footer.community.5" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link href="/get-erg" prefetch={false}>
              <h3 className="font-button text-black dark:text-white my-4 cursor-pointer">
                <FormattedMessage defaultMessage="GET ERG" id="footer.getErg.title" />
              </h3>
            </Link>
            <ul className="hidden md:block">
              <li className="mb-4">
                <Link href="/get-erg/#Mining" prefetch={false}>
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Mining" id="footer.getErg.1" />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/get-erg/#MiningCalculator" prefetch={false}>
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Mining Calculator" id="footer.getErg.2" />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/get-erg/#Wallets" prefetch={false}>
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Wallets" id="footer.getErg.3" />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/get-erg/#Exchanges" prefetch={false}>
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Exchanges" id="footer.getErg.4" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link href="/discover" prefetch={false}>
              <h3 className="font-button text-black dark:text-white my-4 cursor-pointer">
                <FormattedMessage defaultMessage="DISCOVER" id="footer.discover.title" />
              </h3>
            </Link>
            <ul className="hidden md:block">
              <li className="mb-4">
                <Link href="/discover/#DiscoverERG" prefetch={false}>
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage
                      defaultMessage="Discover ERG"
                      id="footer.discover.discoverErg"
                    />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/discover/#GrantsAndBounties" prefetch={false}>
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Grants & Bounties" id="footer.discover.2" />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/discover/#FAQ" prefetch={false}>
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="FAQ" id="footer.discover.3" />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/discover/#Explore" prefetch={false}>
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Explore" id="footer.discover.4" />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/discover/#Documents" prefetch={false}>
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Documents" id="footer.discover.5" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link href="/ecosystem" prefetch={false}>
              <h3 className="font-button text-black dark:text-white my-4 cursor-pointer">
                <FormattedMessage defaultMessage="ECOSYSTEM" id="footer.ecosystem.title" />
              </h3>
            </Link>
            <ul className="hidden md:block">
              <li className="mb-4">
                <Link href="/ecosystem/#DApps">
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="DApps" id="footer.ecosystem.1" />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/ecosystem/#Roadmap">
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Roadmap" id="footer.ecosystem.2" />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/ecosystem/#Wiki">
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Wiki" id="footer.ecosystem.3" />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/ecosystem/#Favorites">
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="OUR FAVORITES" id="footer.favorites.title" />
                  </span>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/ecosystem#Videocasts">
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage
                      defaultMessage="Real Life Ergo"
                      id="footer.realLifeErgo.title"
                    />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link href="/blog" prefetch={false}>
              <h3 className="font-button text-black dark:text-white my-4 cursor-pointer">
                <FormattedMessage defaultMessage="BLOG" id="footer.blog.title" />
              </h3>
            </Link>
            {postsData && postsData.length > 0 ? (
              <ul className="hidden md:block h-[360px] lg:h-[380px] overflow-hidden">
                {postsData.map(({ attributes, id }: { attributes: any; id: string }) => (
                  <li key={id} className="mb-4">
                    <Link
                      href={attributes.url}
                      className="text-black dark:text-gray-300 cursor-pointer block w-full truncate leading-5"
                    >
                      {attributes.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <PlaceholderList />
            )}
          </div>
          <div>
            <Link href="/news" prefetch={false}>
              <h3 className="font-button text-black dark:text-white my-4 cursor-pointer">
                <FormattedMessage defaultMessage="NEWS" id="footer.news.title" />
              </h3>
            </Link>
            {newsData && newsData.length > 0 ? (
              <ul className="hidden md:block h-[360px] lg:h-[380px] overflow-hidden">
                {newsData.map(({ attributes, id }: { attributes: any; id: string }) => (
                  <li key={id} className="mb-4">
                    <Link
                      href={attributes.url}
                      className="text-black dark:text-gray-300 cursor-pointer block w-full truncate leading-5"
                    >
                      {attributes.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <PlaceholderList />
            )}
          </div>
        </div>
        <div className="md:flex mt-8">
          <div className="flex-grow md:flex-grow my-auto">
            <ul className="inline-flex items-center">
              <li className="mr-6 text-black dark:text-white">
                Ergo Platform &copy; {new Date().getFullYear()}
              </li>
              <li className="mr-6">
                <Link href={'/privacy-policy'}>
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Privacy Policy" id="footer.privacyPolicy" />
                  </span>
                </Link>
              </li>
              <li className="mr-6">
                <Link href={'/legal'}>
                  <span className="text-black dark:text-gray-300 cursor-pointer">
                    <FormattedMessage defaultMessage="Legal" id="footer.legal" />
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-5 md:mt-0 text-black dark:text-white">
          1 Irving Place, #08/11 The Commerze@irving Singapore (369546)
        </div>
      </div>
    </footer>
  );
}
