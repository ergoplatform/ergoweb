import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BlogPosts from '../components/blog/BlogPosts';
import Layout from '../components/Layout';
import CategoryPicker from '../components/shared/CategoryPicker';
import { toStrapiLocale } from '../utils/locales';
import { strapiFetchJson } from '../utils/strapiClient';

type Props = {
  posts?: any;
  categories?: any;
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  } | null;
  categoryCounts?: Record<string, number> | null;
  totals?: { all: number; news: number } | null;
};

export default function Blog(props: Props) {
  const intl = useIntl();
  const router = useRouter();
  const { locale, query } = router;
  const type = typeof query.type === 'string' ? (query.type as string) : 'all';
  const blogCount = Math.max(0, (props.totals?.all ?? 0) - (props.totals?.news ?? 0));
  const title = intl.formatMessage({
    id: 'pages.blog.title',
    defaultMessage: 'Blog',
  });
  const heading = type === 'news' ? 'News' : type === 'blog' ? 'Blog' : 'Posts';
  return (
    <div>
      <div className="blog-frame-1"></div>
      <div className="blog-frame-2"></div>
      <div className="blog-frame-3"></div>
      <div className="blog-blur-1"></div>
      <div className="blog-blur-2"></div>
      <Layout title={title}>
        <div id="Blog" className="max-w-[1300px] mx-auto p-4 relative z-10">
          <div className="mb-10 mx-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-3 md:flex-wrap">
                <CategoryPicker
                  categories={props.categories ?? []}
                  categoryCounts={props.categoryCounts ?? {}}
                  className="mx-0"
                />
                <div>
                  <label className="sr-only" htmlFor="post-type-filter">
                    Filter posts
                  </label>
                  <select
                    id="post-type-filter"
                    aria-label="Filter posts"
                    value={type}
                    onChange={(event) => {
                      const value = event.target.value;
                      router.push(value === 'all' ? '/blog' : `/blog?type=${value}`);
                    }}
                    className="
                      min-w-[220px] rounded-full border px-4 py-2 text-sm font-semibold
                      bg-white/85 text-gray-950 border-black/10 shadow-md backdrop-blur-md
                      dark:bg-black/70 dark:text-white dark:border-white/20
                      focus:outline-none focus:ring-2 focus:ring-brand-orange
                    "
                  >
                    <option value="all">{`All (${props.totals?.all ?? 0})`}</option>
                    <option value="news">{`News (${props.totals?.news ?? 0})`}</option>
                    <option value="blog">{`Blogs (${blogCount})`}</option>
                  </select>
                </div>
              </div>
              <h1 className="self-start md:self-end heading-balance heading-contrast inline-block px-2.5 py-1 rounded-md bg-white/70 dark:bg-black/40 backdrop-blur-sm shadow-sm md:bg-transparent md:backdrop-blur-0 md:shadow-none">
                {heading}
              </h1>
            </div>
          </div>
          <BlogPosts data={props.posts} locale={locale} />
          {(props.posts?.length ?? 0) === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-300 my-10">
              No posts found.
            </div>
          ) : null}
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const type = typeof context.query.type === 'string' ? (context.query.type as string) : 'all';
  const latestLimit = 18;

  const baseTypesParam = `&filters[$or][0][type][$eq]=blog&filters[$or][1][type][$eq]=news`;
  const typeParam =
    type === 'news' || type === 'blog' ? `&filters[type][$eq]=${type}` : baseTypesParam;

  // Helper to fetch ALL posts across pages for one or more locales and de-duplicate by permalink
  const fetchAllPostsForLocales = async (locales: string[]) => {
    const bySlug: Record<string, any> = {};
    for (const loc of locales) {
      const res = await strapiFetchJson<{ data?: any[] }>(
        `/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=${latestLimit}&populate=*&locale=${loc}${typeParam}`,
      );
      const data = res?.data ?? [];
      for (const p of data) {
        const slug = p?.attributes?.permalink;
        if (typeof slug === 'string' && !bySlug[slug]) {
          bySlug[slug] = p;
        }
      }
    }
    return Object.values(bySlug);
  };

  // Build a robust locale list (handle cn/zh-variants) and fetch recent localized + English posts for the selected type
  const appLoc = context.locale as string;
  const mapped = toStrapiLocale(appLoc);
  const variants = new Set<string>([mapped, appLoc]);
  if (appLoc === 'cn') {
    variants.add('zh');
    variants.add('zh-CN');
  }
  const localPosts = await fetchAllPostsForLocales(Array.from(variants));
  const enPosts = await fetchAllPostsForLocales(['en']);

  // Fetch ALL categories across pages to avoid missing tags
  const fetchAllCategories = async (locale: string) => {
    const pageSize = 100;
    let page = 1;
    let all: any[] = [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const res = await strapiFetchJson<{ data?: any[]; meta?: any }>(
        `/api/categories?pagination[withCount]=true&pagination[page]=${page}&pagination[pageSize]=${pageSize}&locale=${locale}`,
      );
      if (!res) break;
      const data = res?.data ?? [];
      const meta = res?.meta?.pagination;
      all = all.concat(data);
      if (!meta || page >= (meta.pageCount ?? 1)) break;
      page += 1;
    }
    return all;
  };
  // Use English categories to mirror English site exactly
  const categories = (await fetchAllCategories('en')) || [];

  // localPosts and enPosts already computed above

  // Merge by permalink: prefer localized entries, include EN-only entries marked as needsTranslation
  const seen = new Set(
    localPosts.map((p: any) => p?.attributes?.permalink).filter((s: any) => typeof s === 'string'),
  );
  // Create a map of English posts for fallback fields (e.g., image/blogPhoto)
  const enBySlug: Record<string, any> = {};
  enPosts.forEach((p: any) => {
    const slug = p?.attributes?.permalink;
    if (typeof slug === 'string') enBySlug[slug] = p;
  });

  // Merge lists and ensure localized entries inherit image/blogPhoto if missing
  const posts = localPosts
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
          return typeof slug === 'string' && !seen.has(slug);
        })
        .map((p: any) => ({
          ...p,
          attributes: { ...p.attributes, needsTranslation: true },
        })),
    )
    .sort((a: any, b: any) => {
      const da = new Date(a?.attributes?.date || 0).getTime();
      const db = new Date(b?.attributes?.date || 0).getTime();
      return db - da;
    })
    .slice(0, latestLimit);
  const pagination = null;

  // Totals identical to English site across the entire corpus (not restricted by year)
  const totalsAllRes = await strapiFetchJson<{ meta?: any }>(
    `/api/posts?pagination[withCount]=true&pagination[page]=1&pagination[pageSize]=1&locale=en`,
  );
  const totalsAll = totalsAllRes?.meta?.pagination?.total ?? 0;

  const totalsNewsRes = await strapiFetchJson<{ meta?: any }>(
    `/api/posts?pagination[withCount]=true&pagination[page]=1&pagination[pageSize]=1&locale=en` +
      `&filters[type][$eq]=news`,
  );
  const totalsNews = totalsNewsRes?.meta?.pagination?.total ?? 0;

  // Per-category counts identical to English site across entire corpus (not restricted by year)
  const categoryCounts: Record<string, number> = {};
  if (Array.isArray(categories)) {
    const names = categories.map((c: any) => c?.attributes?.name).filter(Boolean);
    const countPromises = names.map((name: string) =>
      strapiFetchJson<{ meta?: any }>(
        `/api/posts?pagination[withCount]=true&pagination[page]=1&pagination[pageSize]=1&locale=en` +
          `&filters[tag][$contains]=${encodeURIComponent(name)}`,
      )
        .then((json) => ({ name, total: json?.meta?.pagination?.total ?? 0 }))
        .catch(() => ({ name, total: 0 })),
    );
    const results = await Promise.all(countPromises);
    results.forEach(({ name, total }) => {
      categoryCounts[name] = total;
    });
  }

  // Do not redirect when a locale has no localized posts; we show EN entries instead (merged above).

  return {
    props: {
      posts,
      categories,
      pagination,
      categoryCounts,
      totals: { all: totalsAll, news: totalsNews },
    },
  };
};
