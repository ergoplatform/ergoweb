import React, { ElementType } from 'react';
import classNames from 'classnames';

type TypographyType =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'title-1'
  | 'title-2'
  | 'title-3'
  | 'paragraph'
  | 'alt'
  | 'bage-label';

interface Props {
  as?: ElementType;
  type?: TypographyType;
  children: React.ReactNode;
  className?: string;
}

const getTextClass = (type: TypographyType) => {
  switch (type) {
    case 'heading-1':
      return `
        text-7xl tracking-[-.125rem] font-vinila-test font-bold
        lg-max:text-6xl
        md-max:text-4xl
      `;
    case 'heading-2':
      return `
        text-6xl font-vinila-test font-bold tracking-[-.125rem]
        lg-max:text-5xl
        md-max:text-3xl
      `;
    case 'heading-3':
      return `
        text-5xl font-vinila-test font-bold tracking-[-.125rem]
        md-max:text-2xl
      `;
    case 'title-1':
      return `
        text-4xl font-vinila-test font-bold tracking-[-.125rem] 
        lg-max:text-3xl
        md-max:text-2xl
      `;
    case 'title-2':
      return `
        text-3xl tracking-[-.125rem] 
        lg-max:text-2xl
        md-max:text-xl
      `;
    case 'title-3':
      return `
        text-2xl 
        lg-max:text-xl
        md-max:text-lg
      `;
    case 'paragraph':
      return `
        text-lg
        lg-max:text-base
        md-max:text-sm
      `;
    case 'alt':
      return `
        text-sm
        md-max:text-xs
      `;
    case 'bage-label':
      return `text-xs`;
    default:
      return `text-lg`;
  }
};

const Typography: React.FC<Props> = (props) => {
  const Tag = props.as || 'div';
  const type = props.type || 'paragraph';
  const textClass = getTextClass(type);
  const className = classNames(textClass, props.className || '');
  return <Tag className={className}>{props.children}</Tag>;
};

export default Typography;
