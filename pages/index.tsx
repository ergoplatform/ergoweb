import { useIntl } from 'react-intl';
import dynamic from 'next/dynamic';
import HomeHero from '../components/home/HomeHero';
import Layout from '../components/Layout';
import HomeFrames from '../components/home/HomeFrames';
import generateRssFeed from '../utils/generateRssFeed';
import LazyInView from '../utils/LazyInView';
import { toStrapiLocale } from '../utils/locales';
import { postListPath, strapiFetchJson } from '../utils/strapiClient';
import HomeInfo from '../components/home/HomeInfo';

const Highlights = dynamic(() => import('../components/home/Highlights'), {
  ssr: false,
});
const UniqueErgo = dynamic(() => import('../components/home/UniqueErgo'), {
  ssr: false,
});
const UsingErg = dynamic(() => import('../components/home/UsingErg'), {
  ssr: false,
});
const Autolykos = dynamic(() => import('../components/home/Autolykos'), {
  ssr: false,
});
const News = dynamic(() => import('../components/home/News'), { ssr: false });
const Feed = dynamic(() => import('../components/shared/Feed'), { ssr: false });
const Partners = dynamic(() => import('../components/home/Partners'), {
  ssr: false,
});
const ContributeForm = dynamic(() => import('../components/shared/ContributeForm'), { ssr: false });

type Partner = {
  id: number;
  attributes: {
    name: string;
    url: string;
    image?: {
      data: { attributes: { url: string; width: number; height: number } };
    } | null;
    image_dark?: {
      data: { attributes: { url: string; width: number; height: number } };
    } | null;
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
        {props.blockReward && props.info ? (
          <HomeInfo
            circulatingSupply={props.info.supply}
            hashRate={props.info.hashRate}
            blockReward={props.blockReward}
            transactionPerDay={props.info.transactionAverage}
          />
        ) : null}
        <LazyInView rootMargin="300px 0px" ssrReveal={false}>
          {() => <Highlights />}
        </LazyInView>
        <LazyInView rootMargin="300px 0px" ssrReveal={false}>
          {() => <UniqueErgo />}
        </LazyInView>
        <LazyInView rootMargin="300px 0px" ssrReveal={false}>
          {() => <UsingErg />}
        </LazyInView>
        <LazyInView rootMargin="300px 0px" ssrReveal={false}>
          {() => <Autolykos />}
        </LazyInView>
        {props.news ? (
          <LazyInView rootMargin="300px 0px" ssrReveal={false}>
            {() => <News news={props.news} />}
          </LazyInView>
        ) : null}
        {props.posts ? (
          <LazyInView rootMargin="300px 0px" ssrReveal={false}>
            {() => <Feed posts={props.posts} />}
          </LazyInView>
        ) : null}
        <LazyInView rootMargin="300px 0px" ssrReveal={false}>
          {() => <Partners partners={props.partners || []} />}
        </LazyInView>
        {/* Pass partners prop, default to empty array */}
        <LazyInView rootMargin="300px 0px" ssrReveal={false}>
          {() => <ContributeForm />}
        </LazyInView>
      </Layout>
    </div>
  );
}

export const getStaticProps = async (context: any) => {
  // Fetch raw data (localized, with EN fallback)
  const loc = (context?.locale as string) || 'en';
  const strapiLoc = toStrapiLocale(loc);

  // Fetch localized and English posts, then merge by permalink
  const localPostsJson = await strapiFetchJson<{ data?: any[] }>(
    postListPath({
      sort: 'date:desc',
      pageSize: 20,
      populate: '*',
      type: 'blog',
      locale: strapiLoc,
    }),
  );

  const enPostsJson = await strapiFetchJson<{ data?: any[] }>(
    postListPath({
      sort: 'date:desc',
      pageSize: 20,
      populate: '*',
      type: 'blog',
      locale: 'en',
    }),
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
                ? {
                    data: {
                      attributes: { formats: { medium: { url: mediumUrl } } },
                    },
                  }
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
  const localNewsJson = await strapiFetchJson<{ data?: any[] }>(
    postListPath({
      sort: 'date:desc',
      pageSize: 12,
      populate: '*',
      type: 'news',
      locale: strapiLoc,
    }),
  );

  const enNewsJson = await strapiFetchJson<{ data?: any[] }>(
    postListPath({
      sort: 'date:desc',
      pageSize: 12,
      populate: '*',
      type: 'news',
      locale: 'en',
    }),
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
  const partnersJson = await strapiFetchJson<{ data?: Partner[] }>(
    '/api/partners?fields[0]=name&fields[1]=url' +
      '&populate[image][fields][0]=url&populate[image][fields][1]=width&populate[image][fields][2]=height' +
      '&populate[image_dark][fields][0]=url&populate[image_dark][fields][1]=width&populate[image_dark][fields][2]=height',
  );

  const partners = partnersJson?.data ?? [];

  generateRssFeed();

  return {
    props: { posts, news, info, blockReward, partners }, // Pass partners to props
    revalidate: 10,
  };
};
