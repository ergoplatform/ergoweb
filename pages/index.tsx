import { useIntl } from 'react-intl';
import Autolykos from '../components/home/Autolykos';
import HomeHero from '../components/home/HomeHero';
import HomeInfo from '../components/home/HomeInfo';
import News from '../components/home/News';
import UsingErg from '../components/home/UsingErg';
import Layout from '../components/Layout';
import ContributeForm from '../components/shared/ContributeForm';
import Feed from '../components/shared/Feed';
import dynamic from 'next/dynamic';
import UniqueErgo from '../components/home/UniqueErgo';
import HomeFrames from '../components/home/HomeFrames';
const Highlights = dynamic(() => import('../components/home/Highlights'), { ssr: false });
import generateRssFeed from '../utils/generateRssFeed';
import Partners from '../components/home/Partners'; // Import Partners directly

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
      <HomeFrames />
      <Layout title={title}>
        <HomeHero />
        <Highlights /> {/* Highlights is now dynamically imported */}
        {props.blockReward && props.info ? (
          <HomeInfo
            circulatingSupply={props.info.supply}
            hashRate={props.info.hashRate}
            blockReward={props.blockReward}
            transactionPerDay={props.info.transactionAverage}
          />
        ) : null}
        <UniqueErgo />
        <UsingErg />
        <Autolykos />
        {props.news ? <News news={props.news} /> : null}
        {props.posts ? <Feed posts={props.posts} /> : null}
        <Partners partners={props.partners || []} />
        {/* Pass partners prop, default to empty array */}
        <ContributeForm />
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
      '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=3&populate=*&filters[type][$eq]=news',
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
          subtitle: post.attributes?.subtitle,
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
