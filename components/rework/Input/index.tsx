import classNames from 'classnames';
import React, { useState } from 'react';

interface Props {
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  value: string;
  placeholder?: string;
  className?: string;
}

function Input(props: Props) {
  const className = classNames(
    props.className,
    `w-full text-base h-16 rounded-4xl outline-0 border border-main-border px-8
    placeholder:text-secondary bg-transparent focus:border-brand-orange
    transition-all focus:shadow-focus lg-max:h-14 lg-max:px-7 md-max:px-6 
    md-max:h-12 md-max:text-sm
    `,
  );

  return (
    <input
      type="text"
      placeholder={props.placeholder}
      onChange={props.onChange}
      value={props.value}
      className={className}
    />
  );
}

export default Input;
