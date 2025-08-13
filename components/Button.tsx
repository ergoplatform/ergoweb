import Link from 'next/link';
import { getIconComponentByName } from '../utils/icons-map';
import React from 'react';

type Props = {
  text: React.ReactNode;
  url: string;
  icon?: string;
  textColor?: string;
  newTab?: boolean;
  underline?: boolean;
  background?: boolean;
  iconColor?: string;
  customClass?: string;
  animation?: boolean;
};

export default function Button({
  text,
  url,
  icon = 'none',
  textColor,
  newTab = false,
  underline = false,
  background = true,
  iconColor = 'black',
  customClass = '',
  animation,
}: Props) {
  const finalTextColor = background ? 'white' : textColor; // Set text to white if background is true
  var className =
    `py-1 px-4 inline-flex items-center whitespace-nowrap btn rounded-full text-${finalTextColor} font-vinila-extended text-[14px] md:text-[16px] bg-brand-orange` +
    customClass;
  var target = '_self';

  if (underline == true) {
    className += ' underline';
  }

  if (newTab == true) {
    target = '_blank';
  }

  if (background == false) {
    className += ' bg-transparent';
  }

  if (animation) {
    className += ' animate-pulse';
  }

  return (
    <>
      {url ? (
        <Link href={url} passHref>
          <a
            className={className}
            target={target}
            aria-label={typeof text === 'string' ? text : undefined}
          >
            <span>{text}</span>
            {icon === 'none' ? (
              ``
            ) : (
              <span className="w-4 h-4 ml-2">
                {getIconComponentByName(
                  'ArrowRight' + iconColor.charAt(0).toUpperCase() + iconColor.slice(1),
                )}
              </span>
            )}
          </a>
        </Link>
      ) : null}
    </>
  );
}
