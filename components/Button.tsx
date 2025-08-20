import Link from 'next/link';
import ArrowRightBlack from './icons/ArrowRightBlack';
import ArrowRightWhite from './icons/ArrowRightWhite';
import ArrowRightOrange from './icons/ArrowRightOrange';
import React from 'react';
import { useTheme } from 'next-themes';

type Props = {
  text: React.ReactNode;
  url?: string; // Make url optional
  icon?: string;
  textColor?: string;
  newTab?: boolean;
  underline?: boolean;
  background?: boolean;
  iconColor?: string;
  customClass?: string;
  animation?: boolean;
  ariaLabel?: string; // Add ariaLabel to Props
  prefetch?: boolean; // control Next.js Link prefetch behavior
};

export default function Button({
  text,
  url, // url is now optional
  icon = 'none',
  textColor,
  newTab = false,
  underline = false,
  background = true,
  iconColor = 'black',
  customClass = '',
  animation,
  ariaLabel, // Destructure ariaLabel
  prefetch = false,
}: Props) {
  const { resolvedTheme } = useTheme();
  let textClasses = '';
  let darkTextClass = '';

  if (background) {
    // Orange background button
    // Light mode: white text on orange; Dark mode: keep black text for contrast
    textClasses = 'text-white';
    darkTextClass = 'dark:text-black';
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

  // Determine if it should be a link or a button
  const isLink = url && url.trim() !== '';

  // Compute effective icon color
  const isDark = resolvedTheme === 'dark';
  let effectiveIconColor = iconColor;
  if (background && !isDark) {
    // For orange background in light mode, force white arrow per spec
    effectiveIconColor = 'white';
  }

  let ArrowIcon: any = ArrowRightBlack;
  if (effectiveIconColor.toLowerCase() === 'white') {
    ArrowIcon = ArrowRightWhite;
  } else if (effectiveIconColor.toLowerCase() === 'orange') {
    ArrowIcon = ArrowRightOrange;
  } else {
    ArrowIcon = ArrowRightBlack;
  }

  const content = (
    <>
      <span>{text}</span>
      {icon === 'none' ? (
        ``
      ) : (
        <span className="w-4 h-4 ml-2">
          <ArrowIcon />
        </span>
      )}
    </>
  );

  if (isLink) {
    return (
      <Link
        href={url as string}
        className={className}
        target={target}
        aria-label={ariaLabel || (typeof text === 'string' ? text : undefined)}
        prefetch={prefetch}
      >
        {content}
      </Link>
    );
  } else {
    // If no valid URL, render as a button element to avoid uncrawlable <a> tags
    return (
      <button
        className={className}
        aria-label={ariaLabel || (typeof text === 'string' ? text : undefined)}
      >
        {content}
      </button>
    );
  }
}
