import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import Layout from '../../components/Layout';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import Button from '../../components/Button';
import { BlogFacebook, BlogLink, BlogX, LogoBlack } from '../../components/icons';
import Link from 'next/link';
import BlogPosts from '../../components/blog/BlogPosts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { translateFields, aiProviderAvailable } from '../../utils/aiTranslation';
import { getCachedTranslation, setCachedTranslation } from '../../utils/translationCache';
import { ensureLocalizationFromCanonical } from '../../utils/strapiTranslations';

type Props = {
  post?: any;
  posts?: any;
};

export default function Post(props: Props) {
  const { locale } = useRouter();
  const intl = useIntl();
  let hasImage = false;
  let imageUrl = '';

  if (props.post.attributes.blogPhoto?.length > 0) {
    hasImage = true;
    imageUrl = 'https://storage.googleapis.com/ergo-cms-media' + props.post.attributes.blogPhoto;
  }
  if (props.post.attributes.image?.data) {
    hasImage = true;
    imageUrl = props.post.attributes.image.data.attributes.url;
  }

  const [pageUrl, setPageUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  return (
    <div className="single-post">
      <Layout title={props.post.attributes.title}>
        <div className="blog-frame-1"></div>
        <div className="blog-frame-2"></div>
        <div className="blog-frame-3"></div>
        <div className="blog-blur-1"></div>
        <div className=" max-w-[1300px] mx-auto p-4 relative z-10 min-h-[1800px]">
          <div className="post bg-white rounded-xl px pt-8 border-[1px] border-gray-300 mt-20 mb-40">
            <div className="px-4 md:px-32 md:py-20">
              <div className="-ml-4">
                <Button
                  text={intl.formatMessage({
                    id: 'blog.post.backToAll',
                    defaultMessage: 'BACK TO ALL POSTS',
                  })}
                  url="/blog"
                  newTab={false}
                  underline={true}
                  textColor="brand-orange"
                  background={false}
                  ariaLabel={intl.formatMessage({
                    id: 'blog.post.backToAll',
                    defaultMessage: 'BACK TO ALL POSTS',
                  })}
                />
              </div>
              <h1 className="blog-title text-black dark:text-black">
                {props.post.attributes.title}
              </h1>
              {props.post?.attributes?.translationFailed ? (
                <div className="mt-2 text-xs text-red-600">
                  <FormattedMessage
                    id="blog.post.translationUnavailable"
                    defaultMessage="Translation temporarily unavailable. Showing original English."
                  />
                </div>
              ) : props.post?.attributes?.isAiTranslation ? (
                <div className="mt-2 text-xs text-gray-600">
                  <FormattedMessage
                    id="blog.post.machineTranslated"
                    defaultMessage="This page is machine-translated."
                  />
                </div>
              ) : null}
              <div className="mb-8 mt-4 flex flex-row flex-wrap">
                {props.post.attributes.tag
                  ?.split(',')
                  .filter((word: string) => word.length > 0)
                  .map((item: string) => (
                    <Link
                      href={`/category/${item.trim()}`}
                      key={item.trim()}
                      className="my-2 cursor-pointer"
                    >
                      <b
                        key={item.trim()}
                        className="items-center px-3 py-2 rounded-full text-sm font-[12px] mr-4 bg-brand-orange text-white uppercase z-10 tag"
                      >
                        {item.trim()}
                      </b>
                    </Link>
                  ))}
              </div>
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <LogoBlack viewBox="0 0 82 82" className="h-10 w-10" />
                </div>
                <div className="ml-3">
                  <b className="text-[14px] text-black dark:text-black">
                    {props.post.attributes.author}
                  </b>
                  <div className="flex space-x-1">
                    <p className="text-[14px] text-black dark:text-black">
                      <FormattedDate
                        value={props.post.attributes.date}
                        day="numeric"
                        month="long"
                        year="numeric"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-center md:mx-32">
              {hasImage == true ? (
                <Image
                  src={imageUrl}
                  alt=""
                  width={1200}
                  height={630}
                  className="md:rounded-xl w-full h-auto"
                />
              ) : (
                ''
              )}
            </div>
            <div className="px-4 md:px-32 md:py-20">
              <p className="text-black dark:text-black">{props.post.attributes.subtitle}</p>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
                className="blog-md markdown-body"
              >
                {props.post.attributes.content}
              </ReactMarkdown>
              <p className="mt-10 text-black dark:text-black font-vinila-extended text-[24px]">
                <FormattedMessage id="blog.post.sharePost" defaultMessage="Share post" />
              </p>
              <div className="flex flex-row gap-x-16 pb-10">
                <div className="cursor-pointer">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BlogFacebook />
                  </a>
                </div>
                <div className="cursor-pointer">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${pageUrl}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BlogX />
                  </a>
                </div>
                {/* <div className="cursor-pointer">
                  <Link href="https://google.com" passHref>
                    <BlogLink />
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
          <BlogPosts data={props.posts} locale={locale} />
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { query, locale } = context;
  const permalink = encodeURIComponent(query.id);
  // Map app locale to Strapi locale (cn -> zh) so we can find newly persisted CN posts
  const strapiLocale = locale === 'cn' ? 'zh' : locale;

  // Try to fetch localized post first
  const localizedRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/posts?&filters[permalink][$eq]=' +
      permalink +
      '&populate=*&locale=' +
      strapiLocale,
  ).then((response) => response.json());

  // Fetch posts list for current locale (unchanged)
  const postsRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=21&populate=*&filters[type][$eq]=blog&locale=' +
      strapiLocale,
  ).then((response) => response.json());

  if (localizedRes?.data?.length > 0) {
    return {
      props: { post: localizedRes.data[0], posts: postsRes.data },
    };
  }

  // Fallback: fetch canonical (en) and AI-translate fields, cache, and serve
  const canonicalLocale = 'en';
  const canonicalRes = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/posts?&filters[permalink][$eq]=' +
      permalink +
      '&populate=*&locale=' +
      canonicalLocale,
  ).then((response) => response.json());

  if (!canonicalRes?.data || canonicalRes.data.length === 0) {
    return {
      notFound: true,
    };
  }

  const canonical = canonicalRes.data[0];

  // Build canonical fields to translate
  const fields = {
    title: canonical.attributes?.title || '',
    subtitle: canonical.attributes?.subtitle || '',
    content: canonical.attributes?.content || '',
  };

  // Helper to detect no-op translations
  const equal = (
    a: { title: string; subtitle: string; content: string },
    b: { title: string; subtitle: string; content: string },
  ) => {
    const norm = (s: string) => (s || '').trim();
    return (
      norm(a.title) === norm(b.title) &&
      norm(a.subtitle) === norm(b.subtitle) &&
      norm(a.content) === norm(b.content)
    );
  };

  // Try cache first; invalidate if cache holds an un-translated (no-op) result
  let cached = await getCachedTranslation(query.id, locale);
  if (cached && equal(cached, fields)) {
    cached = null;
  }
  let translated = cached;

  if (!translated) {
    translated = await translateFields(fields, canonicalLocale, locale);
    const changed = !equal(translated, fields);

    // Only cache and persist if translation actually changed content
    if (changed) {
      await setCachedTranslation(query.id, locale, translated);

      // Persist translation into Strapi as a real localization if possible
      if (aiProviderAvailable()) {
        try {
          const persisted = await ensureLocalizationFromCanonical(canonical, locale, {
            title: translated?.title || fields.title,
            subtitle: translated?.subtitle || fields.subtitle,
            content: translated?.content || fields.content,
          });
          if (persisted) {
            // Re-fetch the just-created localization and serve it (no AI banner)
            const persistedRes = await fetch(
              process.env.NEXT_PUBLIC_STRAPI_API +
                '/api/posts?&filters[permalink][$eq]=' +
                permalink +
                '&populate=*&locale=' +
                strapiLocale,
            ).then((response) => response.json());
            if (persistedRes?.data?.length > 0) {
              // Ensure media relations (image/blogPhoto) are present; fallback to canonical if missing
              const persistedPost = persistedRes.data[0];
              const mergedPost = JSON.parse(JSON.stringify(persistedPost));

              const hasImageData = Boolean(mergedPost?.attributes?.image?.data);
              const hasBlogPhoto = Boolean(mergedPost?.attributes?.blogPhoto);
              const canonicalHasImage = Boolean(canonical?.attributes?.image?.data);
              const canonicalHasBlogPhoto = Boolean(canonical?.attributes?.blogPhoto);

              mergedPost.attributes = {
                ...mergedPost.attributes,
                image: hasImageData
                  ? mergedPost.attributes.image
                  : canonicalHasImage
                  ? canonical.attributes.image
                  : mergedPost.attributes?.image,
                blogPhoto: hasBlogPhoto
                  ? mergedPost.attributes.blogPhoto
                  : canonicalHasBlogPhoto
                  ? canonical.attributes.blogPhoto
                  : mergedPost.attributes?.blogPhoto,
              };

              return {
                props: { post: mergedPost, posts: postsRes.data },
              };
            }
          }
        } catch (e) {
          // Non-fatal: fall back to synthetic rendering below
          console.error('Persist localization failed:', e);
        }
      }
    } else {
      // Translation provider returned effectively the same content; log and fall back to canonical
      console.warn('Translation returned unchanged content; falling back to English', {
        permalink: query.id,
        locale,
      });
    }
  }

  // Build a synthetic localized post object by cloning canonical and overriding text fields
  const synthetic = JSON.parse(JSON.stringify(canonical));
  const changedFinal = translated ? !equal(translated, fields) : false;
  synthetic.attributes = {
    ...canonical.attributes,
    title: changedFinal ? translated!.title : canonical.attributes?.title,
    subtitle: changedFinal ? translated!.subtitle : canonical.attributes?.subtitle,
    content: changedFinal ? translated!.content : canonical.attributes?.content,
    isAiTranslation: changedFinal ? true : false,
    translationFailed: changedFinal ? false : true,
    locale,
  };

  return {
    props: { post: synthetic, posts: postsRes.data },
  };
}
