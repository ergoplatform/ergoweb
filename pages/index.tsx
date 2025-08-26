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
  // Fetch raw data (localized, with EN fallback)
  const loc = (context?.locale as string) || 'en';
  const strapiLoc = loc === 'cn' ? 'zh' : loc;

  async function fetchJson(url: string) {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch {
      return null;
    }
  }

  // Fetch localized and English posts, then merge by permalink
  const localPostsJson = await fetchJson(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=20&populate=*&filters[type][$eq]=blog&locale=' +
      encodeURIComponent(strapiLoc),
  );

  const enPostsJson = await fetchJson(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=20&populate=*&filters[type][$eq]=blog&locale=en',
  );

  const localArr: any[] = Array.isArray(localPostsJson?.data) ? localPostsJson.data : [];
  const enArr: any[] = Array.isArray(enPostsJson?.data) ? enPostsJson.data : [];

  // Map English posts by permalink for fallback of media fields when localized entry lacks them
  const enBySlug: Record<string, any> = {};
  enArr.forEach((p: any) => {
    const slug = p?.attributes?.permalink;
    if (typeof slug === 'string') enBySlug[slug] = p;
  });

  const seen = new Set(
    localArr.map((p: any) => p?.attributes?.permalink).filter((s: any) => typeof s === 'string'),
  );

  const merged: any[] = localArr.concat(
    enArr
      .filter((p: any) => {
        const slug = p?.attributes?.permalink;
        return typeof slug === 'string' && !seen.has(slug);
      })
      .map((p: any) => ({
        ...p,
        attributes: { ...p.attributes, needsTranslation: true },
      })),
  );

  // Ensure localized entries inherit image/blogPhoto from English if missing
  const mergedFinal: any[] = merged.map((p: any) => {
    const a = p?.attributes || {};
    const slug = a?.permalink as string | undefined;
    if (!slug) return p;
    const en = enBySlug[slug]?.attributes || {};
    const hasImage = Boolean(a?.image?.data);
    const hasBlogPhoto = typeof a?.blogPhoto === 'string' && a.blogPhoto.length > 0;
    return {
      ...p,
      attributes: {
        ...a,
        image: hasImage ? a.image : en?.image ?? a?.image,
        blogPhoto: hasBlogPhoto ? a.blogPhoto : en?.blogPhoto ?? a?.blogPhoto,
      },
    };
  });

  // Pick top items by date across localized and English fallback, then trim fields for homepage
  const mergedSorted: any[] = mergedFinal.slice().sort((a: any, b: any) => {
    const da = new Date(a?.attributes?.date || 0).getTime();
    const db = new Date(b?.attributes?.date || 0).getTime();
    return db - da;
  });

  const posts = mergedSorted.length
    ? {
        data: mergedSorted.slice(0, 6).map((post: any) => {
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
              needsTranslation: Boolean(a.needsTranslation),
            },
          };
        }),
      }
    : null;

  // Fetch localized and English news, then merge by permalink to prefer localized titles with EN fallback
  const localNewsJson = await fetchJson(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=12&populate=*&filters[type][$eq]=news&locale=' +
      encodeURIComponent(strapiLoc),
  );

  const enNewsJson = await fetchJson(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=12&populate=*&filters[type][$eq]=news&locale=en',
  );

  const localNewsArr: any[] = Array.isArray(localNewsJson?.data) ? localNewsJson.data : [];
  const enNewsArr: any[] = Array.isArray(enNewsJson?.data) ? enNewsJson.data : [];

  const enNewsBySlug: Record<string, any> = {};
  enNewsArr.forEach((p: any) => {
    const slug = p?.attributes?.permalink;
    if (typeof slug === 'string') enNewsBySlug[slug] = p;
  });

  const localizedNewsSlugs = new Set(
    localNewsArr
      .map((p: any) => p?.attributes?.permalink)
      .filter((s: any) => typeof s === 'string'),
  );

  const mergedNews = localNewsArr
    .concat(
      enNewsArr.filter((p: any) => {
        const slug = p?.attributes?.permalink;
        return typeof slug === 'string' && !localizedNewsSlugs.has(slug);
      }),
    )
    // Ensure stable ordering and trim to a fixed size
    .sort((a: any, b: any) => {
      const da = new Date(a?.attributes?.date || 0).getTime();
      const db = new Date(b?.attributes?.date || 0).getTime();
      return db - da;
    })
    .slice(0, 8);

  // Trim news to only fields used by the News component
  const news = mergedNews.length
    ? mergedNews.map((post: any) => ({
        id: post.id,
        attributes: {
          title: post.attributes?.title,
          date: post.attributes?.date,
          permalink: post.attributes?.permalink,
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
    revalidate: 10,
  };
};
