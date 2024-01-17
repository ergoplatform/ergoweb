import React from 'react';
import Link from 'next/link';
import Typography from 'components/rework/Typography';
import classNames from 'classnames';

interface Button {
  handleClick(): void;
}

interface Link {
  link: string;
}

type Kind = 'filled' | 'underline';
type Size = 'large' | 'medium' | 'small';

interface Params {
  kind?: Kind;
  children: React.ReactNode;
  type?: 'button' | 'link';
  className?: string;
  size?: 'large' | 'medium' | 'small';
  icon?: React.ReactNode;
}

type Props = (Params & Button) | (Params & Link);

const staticButtonClass = `
  block
`;

const underlineSpanClass = `
    before:content-[''] before:w-full before:h-[2px] before:bg-brand-orange before:absolute
    top-[-3px] before:bottom-[-8px] relative block
    hover:before:bg-brand-orange-hover
    active:before:bg-brand-orange-active
    before:transition-colors sm-max:before:bottom-[-4px]
`;

const Button: React.FC<Props> = (props) => {
  const { kind = 'filled', size = 'large' } = props;

  const getButtonKindClasses = (kind: Kind) => {
    switch (kind) {
      case 'underline':
        return 'md-max:py-0 md-max:px-0 md-max:inline-block';
      case 'filled':
        return `
            relative rounded-[3.25rem] overflow-hidden	
            bg-gradient-158 from-[#303237] from-10% via-[#BD3F26] via-63% to-brand-orange to-100%
            before:content-[''] before:absolute before:w-full before:h-full before:bg-brand-orange
            before:transition-opacity before:inset-0 before:opacity-0	 hover:before:opacity-100 
            py-5 px-8 lg-max:py-4 lg-max:px-7.5
            md-max:text-sm md-max:py-3.5 md-max:px-6.5
            sm-max:py-3 sm-max:px-6
            
        `;
    }
  };

  const getButtonSizeClasses = (size: Size) => {
    switch (size) {
      case 'large':
        return `
          text-lg
          lg-max:text-base
        `;
      case 'medium':
        return `
          text-base	py-4 px-7
          md-max:py-3.5 md-max:px-6.5
        `;
      case 'small':
        return `
          text-sm	py-3 px-6
        `;
    }
  };

  const buttonSizeClasses = getButtonSizeClasses(size);
  const buttonKindClasses = getButtonKindClasses(kind);

  const className = classNames(
    staticButtonClass,
    buttonKindClasses,
    buttonSizeClasses,
    props.className
  );

  if ('handleClick' in props) {
    return (
      <button type="button" onClick={props.handleClick} className={className}>
        <span
          className={`relative ${
            props.kind === 'underline' ? underlineSpanClass : ''
          } ${props.icon ? 'flex items-center gap-x-2' : ''}`}
        >
          <Typography>{props.children}</Typography>
          {props.icon}
        </span>
      </button>
    );
  } else {
    return (
      <Link href={''} className={className}>
        <span
          className={`relative ${
            kind === 'underline' ? underlineSpanClass : ''
          } ${props.icon ? 'flex items-center gap-x-2' : ''}`}
        >
          <Typography>{props.children}</Typography>
          {props.icon}
        </span>
      </Link>
    );
  }
};

export default Button;