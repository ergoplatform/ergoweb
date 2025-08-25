import Link from 'next/link';
import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BlogPosts from '../components/blog/BlogPosts';
import Layout from '../components/Layout';
import YearPagination from '../components/shared/YearPagination';
import CategoryPicker from '../components/shared/CategoryPicker';

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
  years?: number[] | null;
};

export default function Blog(props: Props) {
  const intl = useIntl();
  const { locale, query } = useRouter();
  const currentYear = Number(
    (query.year as string) || (props.years?.[0] ?? new Date().getFullYear()),
  );
  const type = typeof query.type === 'string' ? (query.type as string) : 'all';
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
          <div className="mx-4 mb-4 md:hidden">
            <CategoryPicker categories={props.categories ?? []} categoryCounts={props.categoryCounts ?? {}} />
          </div>
          <div className="flex flex-row justify-between mb-10 mx-4">
            <div className="hidden md:flex flex-row flex-wrap gap-x-2 gap-y-3">
              {props.categories
                ? [...props.categories]
                    .sort((a: any, b: any) => {
                      const an = a.attributes.name as string;
                      const bn = b.attributes.name as string;
                      const ac = props.categoryCounts?.[an] ?? 0;
                      const bc = props.categoryCounts?.[bn] ?? 0;
                      if (bc !== ac) return bc - ac;
                      return an.localeCompare(bn);
                    })
                    .map((category: any) => {
                      const name = category.attributes.name as string;
                      const count = props.categoryCounts?.[name] ?? 0;
                      return (
                        <Link
                          href={`/category/${name}`}
                          key={category.id}
                          className="my-2 sm:my-auto cursor-pointer"
                        >
                          <b
                            key={name}
                            className="items-center px-3 py-2 rounded-full text-sm font-[12px] mr-4 bg-brand-orange text-white uppercase z-10 tag"
                          >
                            {`${name} (${count})`}
                          </b>
                        </Link>
                      );
                    })
                : null}
            </div>
            <div className="self-end flex flex-col items-end gap-3">
              <nav
                aria-label="Filter posts"
                className="
                  inline-flex items-center gap-0.5 rounded-full
                  px-2 py-1.5
                  backdrop-blur-md
                  border shadow-md
                  bg-white/70 border-white/40
                  dark:bg-white/5 dark:border-white/15
                "
              >
                <Link href={`/blog?year=${currentYear}`} className="no-underline">
                  <span
                    className={`
                      text-sm font-[12px] px-2.5 py-1 rounded-full transition
                      ${
                        type === 'all'
                          ? 'bg-brand-orange text-white shadow-sm'
                          : 'text-gray-900 dark:text-white/85 hover:bg-white/60 dark:hover:bg-white/10 hover:text-brand-orange'
                      }
                    `}
                  >
                    {`All (${props.totals?.all ?? 0})`}
                  </span>
                </Link>
                <span className="mx-1 h-4 w-px bg-black/10 dark:bg-white/20" aria-hidden="true" />
                <Link href={`/blog?year=${currentYear}&type=news`} className="no-underline">
                  <span
                    className={`
                      text-sm font-[12px] px-2.5 py-1 rounded-full transition
                      ${
                        type === 'news'
                          ? 'bg-brand-orange text-white shadow-sm'
                          : 'text-gray-900 dark:text-white/85 hover:bg-white/60 dark:hover:bg-white/10 hover:text-brand-orange'
                      }
                    `}
                  >
                    {`News (${props.totals?.news ?? 0})`}
                  </span>
                </Link>
                <span className="mx-1 h-4 w-px bg-black/10 dark:bg-white/20" aria-hidden="true" />
                <Link href={`/blog?year=${currentYear}&type=blog`} className="no-underline">
                  <span
                    className={`
                      text-sm font-[12px] px-2.5 py-1 rounded-full transition
                      ${
                        type === 'blog'
                          ? 'bg-brand-orange text-white shadow-sm'
                          : 'text-gray-900 dark:text-white/85 hover:bg-white/60 dark:hover:bg-white/10 hover:text-brand-orange'
                      }
                    `}
                  >
                    {`Blogs (${Math.max(0, (props.totals?.all ?? 0) - (props.totals?.news ?? 0))})`}
                  </span>
                </Link>
              </nav>
              <h1 className="heading-balance heading-contrast inline-block px-2.5 py-1 rounded-md bg-white/70 dark:bg-black/40 backdrop-blur-sm shadow-sm md:bg-transparent md:backdrop-blur-0 md:shadow-none">
                {heading}
              </h1>
            </div>
          </div>
          <BlogPosts data={props.posts} locale={locale} />
          {(props.posts?.length ?? 0) === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-300 my-10">
              No posts found for {currentYear}.
            </div>
          ) : null}
          <YearPagination
            currentYear={currentYear}
            years={props.years ?? []}
            basePath="/blog"
            query={{ type: type !== 'all' ? type : undefined }}
          />
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const nowYear = new Date().getFullYear();
  const requestedYear = Number(context.query.year || nowYear);
  const year = isNaN(requestedYear) ? nowYear : requestedYear;
  const type = typeof context.query.type === 'string' ? (context.query.type as string) : 'all';
  const start = `${year}-01-01`;
  const end = `${year + 1}-01-01`;

  const baseTypesParam = `&filters[$or][0][type][$eq]=blog&filters[$or][1][type][$eq]=news`;
  const typeParam =
    type === 'news' || type === 'blog' ? `&filters[type][$eq]=${type}` : baseTypesParam;
  const dateParam = `&filters[date][$gte]=${start}&filters[date][$lt]=${end}`;

  const postsRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      `/api/posts?sort=date:desc&pagination[withCount]=true&pagination[page]=1&pagination[pageSize]=200&populate=*&locale=${context.locale}${typeParam}${dateParam}`,
  )
    .then((response) => response.json())
    .catch(() => null);

  // Fetch ALL categories across pages to avoid missing tags
  const fetchAllCategories = async (locale: string) => {
    const pageSize = 100;
    let page = 1;
    let all: any[] = [];
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const res = await fetch(
        process.env.NEXT_PUBLIC_STRAPI_API +
          `/api/categories?pagination[withCount]=true&pagination[page]=${page}&pagination[pageSize]=${pageSize}&locale=${locale}`,
      )
        .then((r) => r.json())
        .catch(() => null);
      if (!res) break;
      const data = res?.data ?? [];
      const meta = res?.meta?.pagination;
      all = all.concat(data);
      if (!meta || page >= (meta.pageCount ?? 1)) break;
      page += 1;
    }
    return all;
  };
  const categories = (await fetchAllCategories(context.locale)) || [];

  const posts = Array.isArray(postsRes?.data) ? postsRes.data : [];
  const pagination = postsRes?.meta?.pagination ?? null;

  // Determine available years (min and max across blog + news)
  const oldestRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      `/api/posts?sort=date:asc&pagination[page]=1&pagination[pageSize]=1&locale=${context.locale}${baseTypesParam}`,
  )
    .then((r) => r.json())
    .catch(() => null);
  const newestRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      `/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=1&locale=${context.locale}${baseTypesParam}`,
  )
    .then((r) => r.json())
    .catch(() => null);
  const oldestDateStr = oldestRes?.data?.[0]?.attributes?.date as string | undefined;
  const newestDateStr = newestRes?.data?.[0]?.attributes?.date as string | undefined;
  const oldestYear = oldestDateStr ? new Date(oldestDateStr).getFullYear() : year;
  const newestYear = newestDateStr ? new Date(newestDateStr).getFullYear() : year;
  const years: number[] = [];
  for (let y = newestYear; y >= oldestYear; y--) years.push(y);

  // Compute counts (restricted to selected year)
  const allCountRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      `/api/posts?pagination[withCount]=true&pagination[page]=1&pagination[pageSize]=1&locale=${context.locale}` +
      `${baseTypesParam}`,
  )
    .then((r) => r.json())
    .catch(() => null);
  const totalsAll = allCountRes?.meta?.pagination?.total ?? 0;

  const newsCountRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      `/api/posts?pagination[withCount]=true&pagination[page]=1&pagination[pageSize]=1&locale=${context.locale}` +
      `&filters[type][$eq]=news`,
  )
    .then((r) => r.json())
    .catch(() => null);
  const totalsNews = newsCountRes?.meta?.pagination?.total ?? 0;

  // Per-category counts for selected year across blog + news
  const categoryCounts: Record<string, number> = {};
  if (Array.isArray(categories)) {
    const names = categories.map((c: any) => c?.attributes?.name).filter(Boolean);
    const countPromises = names.map((name: string) =>
      fetch(
        process.env.NEXT_PUBLIC_STRAPI_API +
          `/api/posts?pagination[withCount]=true&pagination[page]=1&pagination[pageSize]=1&locale=${context.locale}` +
          `&filters[tag][$contains]=${encodeURIComponent(name)}${baseTypesParam}`,
      )
        .then((r) => r.json())
        .then((json) => ({ name, total: json?.meta?.pagination?.total ?? 0 }))
        .catch(() => ({ name, total: 0 })),
    );
    const results = await Promise.all(countPromises);
    results.forEach(({ name, total }) => {
      categoryCounts[name] = total;
    });
  }

  // If the requested year has no posts, redirect to the latest year that has content.
  if (Array.isArray(posts) && posts.length === 0 && Array.isArray(years) && years.length > 0) {
    const latest = years[0];
    const dest = `/blog?year=${latest}${type === 'news' ? '&type=news' : ''}`;
    return {
      redirect: {
        destination: dest,
        permanent: false,
      },
    };
  }

  return {
    props: {
      posts,
      categories,
      pagination,
      categoryCounts,
      totals: { all: totalsAll, news: totalsNews },
      years,
    },
  };
};
