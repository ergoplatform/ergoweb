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
  let textClasses = '';
  let darkTextClass = '';

  if (background) {
    // Orange background button
    textClasses = 'text-black'; // Black text in light mode
    darkTextClass = 'dark:text-white'; // White text in dark mode
  } else {
    // Transparent background button
    textClasses = `text-${textColor}`; // Use textColor prop
    darkTextClass = customClass.includes('dark:') ? '' : 'dark:text-white'; // Add dark:text-white if not already present in customClass
  }

  var className =
    `py-1 px-4 inline-flex items-center whitespace-nowrap btn rounded-full font-vinila-extended text-[14px] md:text-[16px]` +
    (background ? ' bg-brand-orange' : ' bg-transparent') +
    ` ${textClasses} ${darkTextClass} ` + // Add the dynamic text classes and dark mode class
    customClass; // Append customClass at the end

  var target = '_self';

  if (underline == true) {
    className += ' underline';
  }

  if (newTab == true) {
    target = '_blank';
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
