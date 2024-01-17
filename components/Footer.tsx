import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { getIconComponentByName } from '../utils/icons-map';
import { BpsaaLogo, LogoWithText } from './icons';

export default function Footer() {
  const [postsData, setPostsData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const { locale } = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetch(
        process.env.NEXT_PUBLIC_STRAPI_API +
          '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=5&populate=*&filters[type][$eq]=blog&locale=' +
          locale,
      )
        .then((response) => response.json())
        .then((response) => response.data)
        .catch((err) => null);

      const news = await fetch(
        process.env.NEXT_PUBLIC_STRAPI_API +
          '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=5&populate=*&filters[type][$eq]=news&locale=' +
          locale,
      )
        .then((response) => response.json())
        .then((response) => response.data)
        .catch((err) => null);
      setPostsData(posts);
      setNewsData(news);
    };
    fetchData();
  }, [locale]);

  return (
    <footer id="Footer" className="relative z-10">
      <div className="max-w-[1300px] mx-auto py-12 px-4 footer-image">
        <div className="md:flex justify-between">
          <div className="my-6 md:my-auto flex justify-start md:justify-center">
            <Link href="/" passHref>
              <button>
                <LogoWithText viewBox="0 0 213 82" className="w-40 md:w-52" />
              </button>
            </Link>
          </div>
          <div className="grid absolute right-10 top-20 space-y-4 md:right-auto md:top-auto md:relative overflow-hidden grid-cols-1 gap-2 text-red md:grid-cols-3 lg:grid-cols-10">
            <div className="box mx-auto my-auto">
              <a href="https://sigmaverse.io" target="_blank" rel="noreferrer">
                {getIconComponentByName('Sigmaverse')}
              </a>
            </div>
            <div className="box mx-auto my-auto">
              <Link href="/ecosystem/#Wiki" passHref legacyBehavior>
                <a>{getIconComponentByName('ErgoWiki')}</a>
              </Link>
            </div>
            <div className="box mx-auto my-auto">
              <a href="https://github.com/ergoplatform" target="_blank" rel="noreferrer">
                {getIconComponentByName('Github')}
              </a>
            </div>
            <div className="box mx-auto my-auto">
              <a href="https://twitter.com/Ergo_Platform" target="_blank" rel="noreferrer">
                {getIconComponentByName('Twitter')}
              </a>
            </div>
            <div className="box mx-auto my-auto">
              <a href="https://www.youtube.com/c/ErgoPlatform" target="_blank" rel="noreferrer">
                {getIconComponentByName('Youtube')}
              </a>
            </div>
            <div className="box mx-auto my-auto">
              <a href="https://t.me/Ergo_Chats" target="_blank" rel="noreferrer">
                {getIconComponentByName('Telegram')}
              </a>
            </div>
            <div className="box mx-auto my-auto">
              <a
                href="https://discord.gg/ergo-platform-668903786361651200"
                target="_blank"
                rel="noreferrer"
              >
                {getIconComponentByName('Discord')}
              </a>
            </div>
            <div className="box mx-auto my-auto">
              <a href="https://reddit.com/r/ergonauts" target="_blank" rel="noreferrer">
                {getIconComponentByName('Reddit')}
              </a>
            </div>
            <div className="box mx-auto my-auto">
              <a href="https://www.ergoforum.org/" target="_blank" rel="noreferrer">
                {getIconComponentByName('Discourse')}
              </a>
            </div>
            <div className="box mx-auto my-auto">
              <a href="https://www.coingecko.com/en/coins/ergo" target="_blank" rel="noreferrer">
                {getIconComponentByName('Coingecko')}
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
        <div className="my-6 grid md:grid-cols-2 lg:grid-cols-6">
          <div className="mx-1">
            <Link href="/community" passHref>
              <h3 className="font-button text-[#585858] dark:text-[#807e7e] my-4 cursor-pointer">
                <FormattedMessage defaultMessage="COMMUNITY" id="footer.community.title" />
              </h3>
            </Link>
            <ul className="hidden md:block">
              <li className="mb-4">
                <Link href="/community/#JoinUs" passHref legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Join our channels" id="footer.community.1" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/community/#Sigmanauts" passHref legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Sigmanauts" id="footer.community.2" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/community/#Contribute" passHref legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Contribute to Ergo" id="footer.community.3" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/community/#HallOfFame" passHref legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Hall of Fame" id="footer.community.4" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/community/#Foundation" passHref legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Ergo Foundation" id="footer.community.5" />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mx-1">
            <Link href="/get-erg" passHref>
              <h3 className="font-button text-[#585858] dark:text-[#807e7e] my-4 cursor-pointer">
                <FormattedMessage defaultMessage="GET ERG" id="footer.getErg.title" />
              </h3>
            </Link>
            <ul className="hidden md:block">
              <li className="mb-4">
                <Link href="/get-erg/#Mining" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Mining" id="footer.getErg.1" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/get-erg/#MiningCalculator" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Mining Calculator" id="footer.getErg.2" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/get-erg/#Wallets" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Wallets" id="footer.getErg.3" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/get-erg/#Exchanges" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Exchanges" id="footer.getErg.4" />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mx-1">
            <Link href="/discover" passHref>
              <h3 className="font-button text-[#585858] dark:text-[#807e7e] my-4 cursor-pointer">
                <FormattedMessage defaultMessage="DISCOVER" id="footer.discover.title" />
              </h3>
            </Link>
            <ul className="hidden md:block">
              <li className="mb-4">
                <Link href="/discover/#DiscoverERG" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Software Releases" id="footer.discover.1" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/discover/#GrantsAndBounties" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Grants & Bounties" id="footer.discover.2" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/discover/#FAQ" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="FAQ" id="footer.discover.3" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/discover/#Explore" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Explore" id="footer.discover.4" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/discover/#Documents" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Documents" id="footer.discover.5" />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mx-1">
            <Link href="/ecosystem" passHref>
              <h3 className="font-button text-[#585858] dark:text-[#807e7e] my-4 cursor-pointer">
                <FormattedMessage defaultMessage="ECOSYSTEM" id="footer.ecosystem.title" />
              </h3>
            </Link>
            <ul className="hidden md:block">
              <li className="mb-4">
                <Link href="/ecosystem/#DApps" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="DApps" id="footer.ecosystem.1" />
                  </a>
                </Link>
              </li>

              <li className="mb-4">
                <Link href="/ecosystem/#Roadmap" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Roadmap" id="footer.ecosystem.2" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/ecosystem/#Wiki" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Wiki" id="footer.ecosystem.3" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/ecosystem/#Favorites" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="OUR FAVORITES" id="footer.ecosystem.4" />
                  </a>
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/ecosystem#Videocasts" legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Real Life Ergo" id="footer.ecosystem.5" />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          {postsData.length !== 0 ? (
            <div className="mx-1">
              <Link href="/blog" passHref>
                <h3 className="font-button text-[#585858] dark:text-[#807e7e] my-4 cursor-pointer">
                  <FormattedMessage defaultMessage="BLOG" id="footer.blog.title" />
                </h3>
              </Link>
              <ul className="hidden md:block">
                {postsData.map(({ attributes, id }: { attributes: any; id: string }) => (
                  <li key={id} className="mb-4">
                    <Link href={attributes.url} legacyBehavior>
                      <a>{attributes.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {newsData.length !== 0 ? (
            <div className="mx-1">
              <Link href="/news" passHref>
                <h3 className="font-button text-[#585858] dark:text-[#807e7e] my-4 cursor-pointer">
                  <FormattedMessage defaultMessage="NEWS" id="footer.news.title" />
                </h3>
              </Link>
              <ul className="hidden md:block">
                {newsData.map(({ attributes, id }: { attributes: any; id: string }) => (
                  <li key={id} className="mb-4">
                    <Link href={attributes.url} legacyBehavior>
                      <a>{attributes.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="md:flex">
          <div className="my-6 order-2">
            {<BpsaaLogo viewBox="0 0 227 102" width="158" height="88" />}
          </div>
          <div className="flex-grow md:flex-grow my-auto">
            <ul className="inline-flex">
              <li className="mr-6">Ergo Platform &copy; {new Date().getFullYear()}</li>
              <li className="mr-6">
                <Link href={'/privacy-policy'} legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Privacy Policy" id="footer.privacyPolicy" />
                  </a>
                </Link>
              </li>
              <li className="mr-6">
                <Link href={'/legal'} legacyBehavior>
                  <a>
                    <FormattedMessage defaultMessage="Legal" id="footer.legal" />
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-5 md:mt-0 text-gray-400">
          1 Irving Place, #08/11 The Commerze@irving Singapore (369546)
        </div>
      </div>
    </footer>
  );
}
