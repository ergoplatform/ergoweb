import { useRouter } from 'next/router';
import { useIntl } from 'react-intl';
import BlogPosts from '../../components/blog/BlogPosts';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import Pagination from '../../components/shared/Pagination';

type Props = {
  posts?: any;
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  } | null;
};

export default function Category(props: Props) {
  const intl = useIntl();
  const { locale, query } = useRouter();
  const currentPage = Number((query.page as string) || 1);
  const title = intl.formatMessage({
    id: 'pages.blog.title',
    defaultMessage: 'Blog',
  });
  return (
    <div>
      <div className="blog-frame-1"></div>
      <div className="blog-frame-2"></div>
      <div className="blog-frame-3"></div>
      <div className="blog-blur-1"></div>
      <Layout title={title}>
        <div id="Blog" className="max-w-[1300px] mx-auto p-4 relative z-10 min-h-[1800px]">
          <div className="flex flex-row justify-between my-10 mx-4 md:mx-32">
            <div>
              <div className="-ml-4">
                <Button
                  text="BACK TO ALL POSTS"
                  url="/blog"
                  newTab={false}
                  underline={true}
                  textColor="brand-orange"
                  background={false}
                />
              </div>
              <p className="font-vinila-extended text-[40px] md:text-[48px] bg-black/50 text-white px-3 py-2 rounded-md inline-block">
                Search by tag “{query.id}”
              </p>
            </div>
          </div>
          <BlogPosts data={props.posts} locale={locale} />
          <Pagination
            currentPage={currentPage}
            total={props.pagination?.total ?? 0}
            pageSize={props.pagination?.pageSize ?? 12}
            basePath={`/category/${query.id}`}
          />
        </div>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const page = Number(context.query.page || 1);
  const pageSize = 12;
  const tag = String(context.query.id || '');
  const appLocale = context.locale as string;

  // Map app locale -> Strapi locale (cn -> zh)
  const toStrapiLocale = (l: string) => (l === 'cn' ? 'zh' : l);

  // Build robust variants for Chinese
  const mapped = toStrapiLocale(appLocale);
  const variants = new Set<string>([mapped, appLocale]);
  if (appLocale === 'cn') {
    variants.add('zh');
    variants.add('zh-CN');
  }

  // Helper to fetch ALL posts across pages for one or more locales and de-duplicate by permalink
  const fetchAllPostsForLocales = async (locales: string[]) => {
    const pageSizeFetch = 200;
    const bySlug: Record<string, any> = {};
    for (const loc of locales) {
      let p = 1;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const res = await fetch(
          process.env.NEXT_PUBLIC_STRAPI_API +
            `/api/posts?sort=date:desc&pagination[withCount]=true&pagination[page]=${p}&pagination[pageSize]=${pageSizeFetch}&populate=*&locale=${encodeURIComponent(
              loc,
            )}` +
            `&filters[$or][0][type][$eq]=blog&filters[$or][1][type][$eq]=news` +
            `&filters[tag][$contains]=${encodeURIComponent(tag)}`,
        )
          .then((r) => r.json())
          .catch(() => null);
        if (!res) break;
        const data = res?.data ?? [];
        const meta = res?.meta?.pagination;
        for (const post of data) {
          const slug = post?.attributes?.permalink;
          if (typeof slug === 'string' && !bySlug[slug]) {
            bySlug[slug] = post;
          }
        }
        if (!meta || p >= (meta.pageCount ?? 1)) break;
        p += 1;
      }
    }
    return Object.values(bySlug);
  };

  // Fetch localized posts for variants and English posts
  const localPosts = await fetchAllPostsForLocales(Array.from(variants));
  const enPosts = await fetchAllPostsForLocales(['en']);

  // Map English posts by slug for merging (image/blogPhoto fallback)
  const enBySlug: Record<string, any> = {};
  enPosts.forEach((p: any) => {
    const slug = p?.attributes?.permalink;
    if (typeof slug === 'string') enBySlug[slug] = p;
  });

  const localizedSlugs = new Set(
    localPosts.map((p: any) => p?.attributes?.permalink).filter((s: any) => typeof s === 'string'),
  );

  // Merge: prefer localized, inherit media from EN if missing; then append EN-only with needsTranslation
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

  // Manual pagination over merged list
  const total = merged.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), pageCount);
  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = merged.slice(start, end);

  const pagination = {
    page: safePage,
    pageSize,
    pageCount,
    total,
  };

  return {
    props: { posts: pageItems, pagination },
  };
};
