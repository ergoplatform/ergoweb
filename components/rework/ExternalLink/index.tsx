import React from 'react';
import Link from 'next/link';
import Typography from 'components/rework/Typography';
import ArrowIcon from 'assets/icons/arrow-rt.svg';

interface Props {
  children: React.ReactNode;
  link: string;
}

function ExternalLink(props: Props) {
  const { children, link } = props;

  return (
    <Link
      href={link}
      className="
        px-4 py-2 flex items-center gap-x-1 border border-main-border 
        rounded-full transition-colors hover:border-brand-orange active:bg-brand-orange-active 
        lg-max:px-3 lg-max:py-1.5 md-max:px-2.5 md-max:gap-x-[2px]
      "
    >
      <Typography as={'span'}>{children}</Typography>
      <ArrowIcon className="stroke-[1.5px] h-auto md-max:w-5" />
    </Link>
  );
}

export default ExternalLink;
