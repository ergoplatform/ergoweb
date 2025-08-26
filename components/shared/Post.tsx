import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormattedDate, FormattedMessage } from 'react-intl';
import LogoBlack from '../icons/LogoBlack';
const removeMd = require('remove-markdown');

type Props = {
  id: number;
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  image?: string;
  tags?: string;
  url: string;
  type?: string;
  content?: string;
  permalink: string;
  blogPhoto: string;
  authorPhoto: string;
  needsTranslation?: boolean;
};

export default function Post({
  id,
  title,
  subtitle,
  author,
  date,
  image,
  tags,
  url,
  type,
  content,
  permalink,
  blogPhoto,
  authorPhoto,
  needsTranslation,
}: Props) {
  const { locale } = useRouter();
  let hasImage = false;
  let imageUrl = '';

  if (blogPhoto) {
    hasImage = true;
    imageUrl = 'https://storage.googleapis.com/ergo-cms-media' + blogPhoto;
  }

  if (image) {
    hasImage = true;
    imageUrl = image;
  }

  const href =
    type === 'news'
      ? url && typeof url === 'string' && url.trim().length > 0
        ? url
        : permalink
        ? '/blog/' + permalink
        : '#'
      : permalink
      ? '/blog/' + permalink
      : '#';

  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  return (
    <div
      className={`blog-post group cursor-pointer transition-transform duration-200 ease-out hover:-translate-y-1 hover:shadow-2xl flex-shrink-0 shadow-xl rounded-2xl relative z-10 overflow-hidden bg-white dark:bg-zinc-900 w-full border flex flex-col h-[520px] ${
        type === 'news' ? 'border-brand-orange/50' : 'border-transparent'
      }`}
    >
      {locale !== 'en' && needsTranslation ? (
        <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-3 py-1 rounded-full bg-brand-orange text-white text-sm font-semibold shadow">
            <FormattedMessage id="components.post.translate" defaultMessage="Translate" />
          </span>
        </div>
      ) : null}
      {isExternal ? (
        <a
          href={href}
          className="absolute inset-0 z-10"
          aria-label={title}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="sr-only">{title}</span>
        </a>
      ) : (
        <Link href={href} prefetch={false} className="absolute inset-0 z-10" aria-label={title}>
          <span className="sr-only">{title}</span>
        </Link>
      )}
      <div className="flex-shrink-0 relative">
        <div className="block leading-none">
          {hasImage == false ? (
            <div className="post-image-wrap relative h-[192px] rounded-t-2xl overflow-hidden leading-none">
              <div className="absolute inset-0 bg-gray-200 dark:bg-zinc-700 w-full h-full"></div>
            </div>
          ) : (
            <div className="post-image-wrap relative h-[192px] rounded-t-2xl overflow-hidden leading-none">
              <Image
                className="object-cover"
                src={imageUrl}
                alt=""
                layout="fill"
                sizes="(max-width: 1280px) 100vw, 384px"
                priority={false}
                quality={75}
                placeholder="empty"
              />
            </div>
          )}
          <div className="absolute top-4 right-4 z-20">
            {tags
              ?.split(',')
              .slice(0, 1)
              .filter((word: string) => word.length > 0)
              .map((item) => (
                <Link href={`/category/${item.trim()}`} key={item.trim()}>
                  <span
                    key={item.trim()}
                    className="inline-flex w-fit items-center px-3.5 py-1.5 rounded-full uppercase tracking-widest text-xs md:text-sm font-semibold text-white bg-brand-orange border border-brand-orange-dark"
                  >
                    {item.trim()}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 md:p-6 flex flex-col justify-start rounded-b-2xl overflow-hidden">
        <div className="flex-1 text-clip">
          <div className="block" role="group" aria-label={title}>
            <p
              className="font-roboto text-[20px] text-black dark:text-white mb-2"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical' as any,
                overflow: 'hidden',
              }}
            >
              {title}
            </p>
            <p
              className="font-roboto text-[16px] text-[#585858] dark:text-gray-400 mb-2 leading-snug"
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical' as any,
                overflow: 'hidden',
              }}
            >
              {type == 'news'
                ? subtitle
                : (() => {
                    const raw = typeof content === 'string' ? content : '';
                    const text = removeMd(raw) || '';
                    if (text.length <= 130) return text.endsWith('.') ? text : text + '.';
                    const truncated = text.slice(0, 130);
                    const lastPeriod = truncated.lastIndexOf('.');
                    if (lastPeriod > 0) return truncated.slice(0, lastPeriod + 1);
                    return truncated + '.';
                  })()}
            </p>
          </div>
        </div>
        <div className="mt-auto pt-2 flex items-center gap-2">
          <div className="flex-shrink-0">
            <LogoBlack viewBox="0 0 82 82" className="h-10 w-10 dark:invert" />
          </div>
          <div className="ml-3">
            <b className="text-[16px] text-black dark:text-white truncate max-w-[140px]">
              {author}
            </b>
            <div className="flex space-x-1">
              <p className="text-[#000000] dark:text-white truncate whitespace-nowrap max-w-[160px]">
                <FormattedDate value={date} day="numeric" month="long" year="numeric" />
              </p>
            </div>
          </div>
        </div>
      </div>
      {type === 'news' ? (
        <span className="absolute bottom-3 right-3 z-20 px-3 py-1 rounded-full text-xs font-semibold bg-brand-orange text-white shadow-md">
          📣 News
        </span>
      ) : null}
    </div>
  );
}
