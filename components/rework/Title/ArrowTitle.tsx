import React from 'react';
import Typography from 'components/rework/Typography';
import ArroweBig from 'assets/icons/arrow-big.svg';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function ArrowTitle(props: Props) {
  const { children } = props;

  const className = classNames(props.className);

  return (
    <Typography className={className} type="heading-1" as="h2">
      <span
        className="
          inline-flex items-center justify-center size-[70px] bg-brand-orange rounded-full mr-3 relative top-[-11px]
          lg-max:size-12
          md-max:size-10 md-max:mr-2 md-max:top-[-1px]
        "
      >
        <ArroweBig className="inline-block width-8 stroke-brand-black stroke-[3px]" />
      </span>
      {children}
    </Typography>
  );
}

export default ArrowTitle;
