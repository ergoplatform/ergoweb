import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Props = {
  news: any;
};

export default function News({ news }: Props) {
  const now = new Date();
  const { locale } = useRouter();
  const intl = useIntl();
  const [items, setItems] = useState<any[]>(Array.isArray(news) ? news : []);

  useEffect(() => {
    let cancelled = false;

    async function refreshNews() {
      const STRAPI = process.env.NEXT_PUBLIC_STRAPI_API as string | undefined;
      if (!STRAPI) return;

      const toStrapiLocale = (l: string) => (l === 'cn' ? 'zh' : l);
      const mapped = toStrapiLocale(locale || 'en');
      const variants = new Set<string>([mapped, locale || 'en']);
      if ((locale || 'en') === 'cn') {
        variants.add('zh');
        variants.add('zh-CN');
      }

      async function fetchForLocale(loc: string) {
        try {
          const res = await fetch(
            STRAPI +
              '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=24&populate=*&filters[type][$eq]=news&locale=' +
              encodeURIComponent(loc),
            { cache: 'no-store' } as any,
          );
          const json = await res.json();
          return Array.isArray(json?.data) ? json.data : [];
        } catch {
          return [];
        }
      }

      const localizedArrays = await Promise.all(Array.from(variants).map((v) => fetchForLocale(v)));
      const enArray = await fetchForLocale('en');

      const bySlug: Record<string, any> = {};
      for (const arr of localizedArrays) {
        for (const p of arr) {
          const slug = p?.attributes?.permalink;
          if (typeof slug === 'string' && !bySlug[slug]) {
            bySlug[slug] = p;
          }
        }
      }
      const localized = Object.values(bySlug);

      const localizedSlugs = new Set(
        localized
          .map((p: any) => p?.attributes?.permalink)
          .filter((s: any) => typeof s === 'string'),
      );

      const merged = localized
        .concat(
          enArray.filter((p: any) => {
            const slug = p?.attributes?.permalink;
            return typeof slug === 'string' && !localizedSlugs.has(slug);
          }),
        )
        .sort((a: any, b: any) => {
          const da = new Date(a?.attributes?.date || 0).getTime();
          const db = new Date(b?.attributes?.date || 0).getTime();
          return db - da;
        })
        .slice(0, 8)
        .map((post: any) => ({
          id: post.id,
          attributes: {
            title: post.attributes?.title,
            date: post.attributes?.date,
            permalink: post.attributes?.permalink,
            url: post.attributes?.url,
          },
        }));

      if (!cancelled) {
        setItems(merged);
      }
    }

    refreshNews();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <div id="News" className="max-w-7xl mx-auto px-2 md:px-4 relative" style={{ zIndex: 12 }}>
      <div className="mt-36 mb-14 max-w-7xl p-4 md:p-0 flex flex-col lg:flex-row">
        <div className="item lg:w-1/2 mb-8 text-right lg:order-last">
          <h1 className="text-[112px] md:text-[12rem] lg:text-[6rem] leading-none">
            <b>
              <FormattedMessage defaultMessage="News" id="components.news.title" />
            </b>
          </h1>
          <h1 className="text-[112px] md:text-[12rem] lg:text-[6rem] leading-none">
            <b>
              &<FormattedMessage defaultMessage="Blog" id="components.news.blog" />
            </b>
          </h1>
        </div>
        <div className="item lg:w-1/2 card-bg rounded-xl p-8 text-right">
          <p className="font-roboto text-[20px] text-black dark:text-white uppercase text-right">
            <FormattedMessage defaultMessage="latest news" id="components.news.latest" />
          </p>

          <div
            className="group relative text-left mt-4 max-h-[12rem] w-full overflow-hidden"
            role="region"
            aria-label={intl.formatMessage({
              id: 'components.news.latestAria',
              defaultMessage: 'Latest news',
            })}
            tabIndex={0}
          >
            <ul role="list" className="list-disc pl-5 space-y-2">
              {items && items.length > 0 ? (
                items.map((post: any, i: number) => {
                  const postDate = new Date(post.attributes.date);
                  const daysSince = (now.getTime() - postDate.getTime()) / (1000 * 3600 * 24);
                  const isNew = daysSince <= 7;
                  const showYear = postDate.getFullYear() !== now.getFullYear();

                  return (
                    <li
                      key={i}
                      role="listitem"
                      className="text-black dark:text-white flex items-baseline gap-2 min-w-0"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        <FormattedDate
                          value={post.attributes.date}
                          day="2-digit"
                          month="short"
                          year={showYear ? 'numeric' : undefined}
                        />
                      </span>
                      {post.attributes.permalink ? (
                        <Link
                          href={`/blog/${post.attributes.permalink}`}
                          title={post.attributes.title}
                          className="underline hover:no-underline dark:text-brand-orange flex-1 min-w-0 truncate"
                        >
                          {post.attributes.title}
                        </Link>
                      ) : (
                        <a
                          href={post.attributes.url}
                          title={post.attributes.title}
                          className="underline hover:no-underline dark:text-brand-orange flex-1 min-w-0 truncate"
                        >
                          {post.attributes.title}
                        </a>
                      )}
                      {isNew ? (
                        <span className="ml-2 shrink-0 inline-block rounded bg-red-500 px-1 text-xs font-semibold text-white">
                          <FormattedMessage id="components.news.newBadge" defaultMessage="New" />
                        </span>
                      ) : null}
                    </li>
                  );
                })
              ) : (
                <li className="text-black dark:text-white">
                  <FormattedMessage id="components.news.none" defaultMessage="No news available." />
                </li>
              )}
            </ul>
          </div>
          <Link
            href="/blog?type=news"
            className="mt-2 inline-block text-sm font-semibold text-brand-orange underline hover:no-underline"
          >
            <FormattedMessage id="components.news.viewAll" defaultMessage="View all news" />
          </Link>
        </div>
      </div>
    </div>
  );
}
