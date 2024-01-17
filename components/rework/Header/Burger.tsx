import classNames from 'classnames';
import React from 'react';

interface Props {
  isOpened: boolean;
  className?: string;
  onClick(): void;
}

const burgerLineClass = 'relative w-full h-[1px] bg-white mb-[6px] last:mb-0';

function Burger(props: Props) {
  const { isOpened = false } = props;
  const className = classNames(props.className, 'w-5 group', isOpened && 'active');
  return (
    <button type="button" className={className} onClick={props.onClick}>
      <div className={`${burgerLineClass} group-[.active]:rotate-45 group-[.active]:top-[4px]`} />
      <div className={`${burgerLineClass} group-[.active]:hidden`} />
      <div
        className={`${burgerLineClass} group-[.active]:-rotate-45 group-[.active]:bottom-[3px]`}
      />
    </button>
  );
}

export default Burger;
