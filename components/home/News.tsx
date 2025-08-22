import { FormattedDate, FormattedMessage } from 'react-intl';
import Link from 'next/link';

type Props = {
  news: any;
};

export default function News({ news }: Props) {
  const now = new Date();

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
            className="group relative text-left mt-4 max-h-[12rem] w-full overflow-hidden hover:overflow-auto focus-within:overflow-auto"
            role="region"
            aria-label="Latest news"
            tabIndex={0}
          >
            <ul role="list" className="list-disc pl-5 space-y-2">
              {news && news.length > 0 ? (
                news.map((post: any, i: number) => {
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
                      <a
                        href={post.attributes.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={post.attributes.title}
                        className="underline hover:no-underline dark:text-brand-orange flex-1 min-w-0 truncate"
                      >
                        {post.attributes.title}
                      </a>
                      {isNew ? (
                        <span className="ml-2 shrink-0 inline-block rounded bg-red-500 px-1 text-xs font-semibold text-white">
                          New
                        </span>
                      ) : null}
                    </li>
                  );
                })
              ) : (
                <li className="text-black dark:text-white">No news available.</li>
              )}
            </ul>
          </div>
          <Link href="/news" passHref>
            <a className="mt-2 inline-block text-sm font-semibold text-brand-orange underline hover:no-underline">
              View all news
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
