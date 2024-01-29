import Typography from 'components/rework/Typography';
import React from 'react';
import Button from 'components/rework/Button';
import classNames from 'classnames';

interface Props {
  LeftSide: React.ReactNode;
  RightSide: React.ReactNode;
  leftSideClassName?: string;
  gradientType?: 'dark' | 'light';
}

function HeroTemplate(props: Props) {
  const { LeftSide, RightSide, gradientType = 'light' } = props;

  const leftSideStyles = classNames(
    `w-1/2 py-28 px-20 bg-background
    lg-max:px-13.5 lg-max:py-20.5
    md-max:px-7.5 md-max:py-10
    sm-max:w-full sm-max:p-5 sm-max:pt-20 sm-max:bg-right-top
    sm-max:bg-no-repeat`,
    props.leftSideClassName
  );

  const gradientClass =
    gradientType === 'light' ? 'brand-gradient' : 'brand-139-gradient';

  const rightSideStyles = classNames(
    'flex items-center justify-center w-1/2 sm-max:hidden',
    gradientClass
  );

  return (
    <div className="container-rework flex">
      <div className={leftSideStyles}>{LeftSide}</div>
      <div className={rightSideStyles}>{RightSide}</div>
    </div>
  );
}

export default HeroTemplate;
