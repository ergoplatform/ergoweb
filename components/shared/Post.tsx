import Image from 'next/image';
import Link from 'next/link';
import { FormattedDate } from 'react-intl';
import { LogoBlack } from '../icons';
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
}: Props) {
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

  return (
    <div className="blog-post flex-shrink-0 shadow-xl rounded-2xl relative z-10 overflow-hidden bg-white dark:bg-white">
      <div className="flex-shrink-0 relative">
        <Link href={type == 'news' ? url : '/blog/' + permalink}>
          <a className="block leading-none">
            {hasImage == false ? (
              <div className="post-image-wrap rounded-t-2xl overflow-hidden leading-none">
                <div className="h-48 bg-gray-200 w-full"></div>
              </div>
            ) : (
              <div className="post-image-wrap rounded-t-2xl overflow-hidden leading-none">
                <Image
                  className="w-full object-cover block"
                  src={imageUrl}
                  alt=""
                  height={186}
                  width={384}
                  layout="responsive"
                />
              </div>
            )}
            <div className="absolute left-4 top-4">
              {tags
                ?.split(',')
                .slice(0, 3)
                .filter((word: string) => word.length > 0)
                .map((item) => (
                  <Link href={`/category/${item.trim()}`} key={item.trim()} passHref>
                    <b
                      key={item.trim()}
                      className="items-center px-3 py-0.5 rounded-full text-sm font-medium mr-4 bg-brand-black text-white uppercase z-10"
                    >
                      {item.trim()}
                    </b>
                  </Link>
                ))}
            </div>
          </a>
        </Link>
      </div>
      <div className="flex-1 p-4 md:p-6 h-72 flex flex-col justify-between rounded-b-2xl">
        <div className="flex-1 text-clip">
          <Link href={type == 'news' ? url : '/blog/' + permalink}>
            <a className="block mt-2" rel="noreferrer">
              <p className="font-roboto text-[20px] text-black dark:text-black mb-4">{title}</p>
              <p className="font-roboto text-[14px] text-[#585858] dark:text-black mb-0">
                {type == 'news' ? subtitle : removeMd(content)?.slice(0, 130) + '...'}
              </p>
            </a>
          </Link>
        </div>
        <div className="mt-4 flex items-center">
          <div className="flex-shrink-0">
            <LogoBlack viewBox="0 0 82 82" className="h-10 w-10" />
          </div>
          <div className="ml-3">
            <b className="text-[14px] text-brand-orange dark:text-white">{author}</b>
            <div className="flex space-x-1">
              <p className="text-[#000000] dark:text-black">
                <FormattedDate value={date} day="numeric" month="long" year="numeric" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
