import React, { useState } from 'react';
import Input from 'components/rework/Input';
import ArroweBig from 'assets/icons/arrow-big.svg';
import classNames from 'classnames';

interface Props {
  onSubmit?(): void;
  className?: string;
}

function SingleFieldForm(props: Props) {
  const [value, setValue] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={classNames(props.className, 'relative')}>
      <Input
        value={value}
        onChange={handleInput}
        placeholder="Email"
        className="pr-16 background-none lg-max:pr-16"
      />
      <button
        className="absolute right-8 top-5 lg-max:top-4 md-max:top-3 md-max:right-6"
        type="button"
      >
        <ArroweBig />
      </button>
    </div>
  );
}

export default SingleFieldForm;
