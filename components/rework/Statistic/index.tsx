import React from 'react';
import Item from './Item';
import classNames from 'classnames';

export interface IStatistic {
  value: string;
  name: string;
}

interface Props {
  list: IStatistic[];
  className?: string;
}

function Index(props: Props) {
  if (!props.list.length) return null;

  const lengthClass = () => {
    switch (props.list.length) {
      case 4:
        return 'grid-cols-4';
      case 3:
        return 'grid-cols-3';
    }
  };

  const className = classNames(
    'container-rework grid sm-max:grid-cols-2 gap-[2px] mt-[2px] pb-14 md-max:pb-12 sm-max:pb-10',
    props.className,
    lengthClass()
  );

  return (
    <div className={className}>
      {props.list.map((item, idx) => {
        return <Item data={item} key={idx} />;
      })}
    </div>
  );
}

export default Index;
