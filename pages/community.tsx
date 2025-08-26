import { useIntl } from 'react-intl';
import CommunityCardsFeed from '../components/community/CommunityCardsFeed';
import CommunityHero from '../components/community/CommunityHero';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import LazyInView from '../utils/LazyInView';

const Sigmanauts = dynamic(() => import('../components/community/Sigmanauts'), {
  ssr: false,
});
const ContributeForm = dynamic(() => import('../components/shared/ContributeForm'), {
  ssr: false,
});
const Spotlight = dynamic(() => import('../components/community/Spotlight'), {
  ssr: false,
});
const Feed = dynamic(() => import('../components/shared/Feed'), {
  ssr: false,
});
const ErgoFoundation = dynamic(() => import('../components/community/ErgoFoundation'), {
  ssr: false,
});
const OurMission = dynamic(() => import('../components/community/OurMission'), {
  ssr: false,
});

const DynamicHallOfFame = dynamic(() => import('../components/community/HallOfFame'), {
  ssr: false,
});

type Props = {
  posts?: any;
  teamMembers?: any;
};

export default function Community(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: 'pages.community.title',
    defaultMessage: 'Community',
  });

  return (
    <div className="relative overflow-hidden">
      <div className="community-blur-2"></div>
      <div className="community-frame-3"></div>
      <div className="community-frame-1"></div>
      <div className="community-frame-2"></div>
      <div className="community-frame-4"></div>
      <div className="community-frame-5"></div>
      <div className="community-frame-6"></div>
      <div className="community-frame-7"></div>
      <div className="community-frame-8"></div>
      <div className="community-frame-9"></div>
      <div className="community-frame-10"></div>
      <div className="community-blur-1"></div>
      <Layout title={title}>
        <CommunityHero />
        <CommunityCardsFeed />

        <LazyInView rootMargin="200px 0px" className="min-h-[480px]">
          {() => <Sigmanauts />}
        </LazyInView>

        <LazyInView rootMargin="200px 0px" className="min-h-[440px]">
          {() => <ContributeForm />}
        </LazyInView>

        <LazyInView rootMargin="200px 0px" className="min-h-[440px]">
          {() =>
            props.posts?.data?.length !== 0 ? (
              <>
                <Spotlight />
                <Feed posts={props.posts} />
              </>
            ) : null
          }
        </LazyInView>

        {props.teamMembers ? (
          <LazyInView rootMargin="200px 0px" className="min-h-[720px]">
            {() => <DynamicHallOfFame teamMembers={props.teamMembers} />}
          </LazyInView>
        ) : null}

        <LazyInView rootMargin="200px 0px" className="min-h-[560px]">
          {() => <ErgoFoundation />}
        </LazyInView>
        <LazyInView rootMargin="200px 0px" className="min-h-[520px]">
          {() => <OurMission />}
        </LazyInView>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  // Map app locale -> Strapi locale (cn -> zh)
  const toStrapiLocale = (l: string) => (l === 'cn' ? 'zh' : l);

  const appLocale = context.locale as string;
  const mapped = toStrapiLocale(appLocale);
  const variants = new Set<string>([mapped, appLocale]);
  if (appLocale === 'cn') {
    variants.add('zh');
    variants.add('zh-CN');
  }

  // Helper to fetch ALL spotlight posts across pages for one or more locales and de-duplicate by permalink
  const fetchAllSpotlightForLocales = async (locales: string[]) => {
    const pageSize = 200;
    const bySlug: Record<string, any> = {};
    for (const loc of locales) {
      let page = 1;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const res = await fetch(
          process.env.NEXT_PUBLIC_STRAPI_API +
            `/api/posts?sort=date:desc&pagination[withCount]=true&pagination[page]=${page}&pagination[pageSize]=${pageSize}` +
            `&populate=*&filters[type][$eq]=blog&filters[spotlight][$eq]=true&locale=${encodeURIComponent(
              loc,
            )}`,
        )
          .then((r) => r.json())
          .catch(() => null);
        if (!res) break;
        const data = res?.data ?? [];
        const meta = res?.meta?.pagination;
        for (const p of data) {
          const slug = p?.attributes?.permalink;
          if (typeof slug === 'string' && !bySlug[slug]) {
            bySlug[slug] = p;
          }
        }
        if (!meta || page >= (meta.pageCount ?? 1)) break;
        page += 1;
      }
    }
    return Object.values(bySlug);
  };

  // Fetch localized spotlight posts and English spotlight posts
  const localPosts = await fetchAllSpotlightForLocales(Array.from(variants));
  const enPosts = await fetchAllSpotlightForLocales(['en']);

  // Map English posts by slug for media/title/subtitle fallback
  const enBySlug: Record<string, any> = {};
  enPosts.forEach((p: any) => {
    const slug = p?.attributes?.permalink;
    if (typeof slug === 'string') enBySlug[slug] = p;
  });

  // Build set of localized slugs
  const localizedSlugs = new Set(
    localPosts.map((p: any) => p?.attributes?.permalink).filter((s: any) => typeof s === 'string'),
  );

  // Merge: prefer localized; inherit media from EN if missing; then append EN-only with needsTranslation flag
  const merged = localPosts
    .map((lp: any) => {
      const slug = lp?.attributes?.permalink as string | undefined;
      if (!slug) return lp;
      const a = lp.attributes || {};
      const en = enBySlug[slug]?.attributes || {};
      const hasImage = Boolean(a?.image?.data);
      const hasBlogPhoto = typeof a?.blogPhoto === 'string' && a.blogPhoto.length > 0;
      const mergedAttrs = {
        ...a,
        image: hasImage ? a.image : en?.image ?? a?.image,
        blogPhoto: hasBlogPhoto ? a.blogPhoto : en?.blogPhoto ?? a?.blogPhoto,
      };
      return { ...lp, attributes: mergedAttrs };
    })
    .concat(
      enPosts
        .filter((p: any) => {
          const slug = p?.attributes?.permalink;
          return typeof slug === 'string' && !localizedSlugs.has(slug);
        })
        .map((p: any) => ({
          ...p,
          attributes: { ...p.attributes, needsTranslation: true },
        })),
    );

  // Sort by date desc to ensure stable ordering after merge
  merged.sort((a: any, b: any) => {
    const da = new Date(a?.attributes?.date || 0).getTime();
    const db = new Date(b?.attributes?.date || 0).getTime();
    return db - da;
  });

  // Keep the shape expected by <Feed/> (posts.data)
  const posts = { data: merged };

  // Team members localized to current locale
  const teamMembers = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/team-members?pagination[pageSize]=100&populate=*&locale=' +
      encodeURIComponent(mapped),
  )
    .then((response) => response.json())
    .then((response) => response.data)
    .catch(() => null);

  return {
    props: { posts, teamMembers },
  };
};
