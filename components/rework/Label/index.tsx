import React from 'react';
import Typography from 'components/rework/Typography';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const staticClass = `
    inline-block font-bold bg-background-card rounded-full py-2 px-3
    lg-max:py-1.5
    md-max:py-1 md-max:px-2
`;

function Label(props: Props) {
  const { children } = props;
  const className = classNames(staticClass, props.className || '');

  return (
    <Typography as={'span'} type="bage-label" className={className}>
      {children}
    </Typography>
  );
}

export default Label;
