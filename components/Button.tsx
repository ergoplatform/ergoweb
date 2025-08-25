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
  customClass?: string; // Add customClass to Props
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
  customClass = '', // Destructure customClass
  animation,
  ariaLabel, // Destructure ariaLabel
  prefetch = false,
}: Props) {
  const { resolvedTheme } = useTheme();
  let textClasses = '';
  let darkTextClass = '';

  if (background) {
    // Orange background button
    // Always use white text and white arrow regardless of theme or props
    textClasses = 'text-white';
    darkTextClass = 'dark:text-white';
  } else {
    // Transparent background button
    textClasses = `text-${textColor}`; // Use textColor prop
    darkTextClass = customClass.includes('dark:') ? '' : 'dark:text-white'; // Add dark:text-white if not already present in customClass
  }

  var className =
    `py-1 px-4 inline-flex items-center whitespace-nowrap btn rounded-full font-vinila-extended text-[14px] md:text-[16px] shadow-sm transition-transform duration-200 hover:scale-110` +
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

  // For orange background buttons, always use white arrow
  if (background) {
    effectiveIconColor = 'white';
  } else if (icon === 'ArrowRightWhite') {
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
      <span className="leading-none">{text}</span>
      {icon === 'none' ? (
        ``
      ) : (
        <span className="w-5 h-5 ml-2 flex items-center">
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
