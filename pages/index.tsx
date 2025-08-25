import { useIntl } from 'react-intl';
import HomeHero from '../components/home/HomeHero';
import Layout from '../components/Layout';
import HomeFrames from '../components/home/HomeFrames';
import generateRssFeed from '../utils/generateRssFeed';
import LazyInView from '../utils/LazyInView';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Highlights = dynamic(() => import('../components/home/Highlights'));
import HomeInfo from '../components/home/HomeInfo';
const UniqueErgo = dynamic(() => import('../components/home/UniqueErgo'));
const UsingErg = dynamic(() => import('../components/home/UsingErg'));
const Autolykos = dynamic(() => import('../components/home/Autolykos'));
const News = dynamic(() => import('../components/home/News'));
const Feed = dynamic(() => import('../components/shared/Feed'));
const Partners = dynamic(() => import('../components/home/Partners'));
const ContributeForm = dynamic(() => import('../components/shared/ContributeForm'));

type Partner = {
  id: number;
  attributes: {
    name: string;
    url: string;
    image?: { data: { attributes: { url: string; width: number; height: number } } } | null;
    image_dark?: { data: { attributes: { url: string; width: number; height: number } } } | null;
  };
};

type Props = {
  posts?: any;
  news?: any;
  info?: any;
  blockReward: number;
  partners?: Partner[]; // Add partners to props
};

export default function Home(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: 'pages.home.title',
    defaultMessage: 'Home',
  });
  return (
    <div>
      <Head>
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/assets/home/hero-poster-light.webp"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/assets/home/hero-poster-dark.webp"
          media="(prefers-color-scheme: dark)"
        />
      </Head>
      <HomeFrames />
      <Layout title={title}>
        <HomeHero />
        {props.blockReward && props.info ? (
          <HomeInfo
            circulatingSupply={props.info.supply}
            hashRate={props.info.hashRate}
            blockReward={props.blockReward}
            transactionPerDay={props.info.transactionAverage}
          />
        ) : null}
        <LazyInView rootMargin="200px 0px">{() => <Highlights />}</LazyInView>
        <LazyInView rootMargin="200px 0px">{() => <UniqueErgo />}</LazyInView>
        <LazyInView rootMargin="200px 0px">{() => <UsingErg />}</LazyInView>
        <LazyInView rootMargin="200px 0px">{() => <Autolykos />}</LazyInView>
        {props.news ? (
          <LazyInView rootMargin="200px 0px">{() => <News news={props.news} />}</LazyInView>
        ) : null}
        {props.posts ? (
          <LazyInView rootMargin="200px 0px">{() => <Feed posts={props.posts} />}</LazyInView>
        ) : null}
        <LazyInView rootMargin="200px 0px">
          {() => <Partners partners={props.partners || []} />}
        </LazyInView>
        {/* Pass partners prop, default to empty array */}
        <LazyInView rootMargin="200px 0px">{() => <ContributeForm />}</LazyInView>
      </Layout>
    </div>
  );
}

export const getStaticProps = async (context: any) => {
  // Fetch raw data
  const postsJson = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=6&populate=*&filters[type][$eq]=blog',
  )
    .then((response) => response.json())
    .catch((err) => null);

  // Trim posts to reduce page size (keep only fields used on the homepage)
  const posts = postsJson?.data
    ? {
        data: postsJson.data.slice(0, 6).map((post: any) => {
          const a = post.attributes || {};
          const mediumUrl = a.image?.data?.attributes?.formats?.medium?.url ?? null;
          return {
            id: post.id,
            attributes: {
              title: a.title,
              author: a.author,
              subtitle: a.subtitle,
              tag: a.tag,
              date: a.date,
              url: a.url,
              permalink: a.permalink,
              type: a.type,
              // Only send a short excerpt instead of full content
              content: typeof a.content === 'string' ? a.content.slice(0, 180) : null,
              // Preserve the shape expected by <Post/> but only keep the medium URL
              image: mediumUrl
                ? { data: { attributes: { formats: { medium: { url: mediumUrl } } } } }
                : null,
              blogPhoto: a.blogPhoto ?? null,
              authorPhoto: a.authorPhoto ?? null,
            },
          };
        }),
      }
    : null;

  const newsJson = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=8&populate=*&filters[type][$eq]=news',
  )
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((err) => null);

  // Trim news to only fields used by the News component
  const news = newsJson
    ? newsJson.map((post: any) => ({
        id: post.id,
        attributes: {
          title: post.attributes?.title,
          date: post.attributes?.date,
          url: post.attributes?.url,
        },
      }))
    : null;

  const blockReward = await fetch('https://api.ergoplatform.com/blocks')
    .then((response) => response.json().then((data) => data.items[0].minerReward / 1000000000))
    .catch((err) => null);

  const infoRaw = await fetch('https://api.ergoplatform.com/info/')
    .then((response) => response.json())
    .catch((err) => null);

  const info = infoRaw
    ? {
        supply: infoRaw.supply,
        hashRate: infoRaw.hashRate,
        transactionAverage: infoRaw.transactionAverage,
      }
    : null;

  // Fetch partners data
  const partnersJson = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/partners?fields[0]=name&fields[1]=url' +
      '&populate[image][fields][0]=url&populate[image][fields][1]=width&populate[image][fields][2]=height' +
      '&populate[image_dark][fields][0]=url&populate[image_dark][fields][1]=width&populate[image_dark][fields][2]=height',
  )
    .then((response) => response.json())
    .catch((err) => null);

  const partners = partnersJson?.data ?? [];

  generateRssFeed();

  return {
    props: { posts, news, info, blockReward, partners }, // Pass partners to props
    revalidate: 60,
  };
};
