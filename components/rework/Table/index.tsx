import React from 'react';
import Typography from 'components/rework/Typography';
import { IAble, ITable } from 'types/table';
import Check from 'assets/icons/check.svg';
import Cross from 'assets/icons/cross.svg';
import RotateIcon from 'assets/icons/rotate.svg';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  content: ITable;
  gridClass: string;
}

const sliderScrollbar = {
  el: '.slider-scrollbar',
  dragClass: 'slider-scrollbar__drag',
  draggable: true,
};

function Table(props: Props) {
  const Able = (
    <div className="flex items-center justify-center mx-auto size-7.5 bg-secondary-green rounded-full md-max:size-6">
      <Check className="w-4 stroke-2" />
    </div>
  );

  const Unable = (
    <div className="flex items-center justify-center mx-auto size-7.5 bg-secondary-red rounded-full md-max:size-6">
      <Cross className="w-4 stroke-2" />
    </div>
  );

  const Rotate = (
    <div className="flex items-center justify-center size-7.5 mx-auto md-max:size-6">
      <RotateIcon className="shrink-0 md-max:w-7.5" />
    </div>
  );

  const getStatus = (status: IAble) => {
    switch (status) {
      case true:
        return Able;
      case false:
        return Unable;
      case 'rotate':
        return Rotate;
    }
  };

  const tableHeaderClass = classNames(
    props.gridClass,
    'grid justify-between items-center text-secondary-gray mb-8'
  );
  const tableBodyClass = classNames(
    props.gridClass,
    'grid justify-between items-center mb-1 py-6 md-max:py-5'
  );

  return (
    <div className="container-rework section">
      <div className="flex gap-x-16 items-center mb-12 lg-max:gap-x-7 md-max:block md-max:mb-6">
        {props.children}
      </div>
      <div className="border border-main-border p-15 text-left md-max:p-10 sm-max:p-5 md-max:overflow-x-auto">
        <div className={tableHeaderClass}>
          {props.content.theads.map((item, idx) => {
            return (
              <Typography as={'span'} className={idx >= 2 ? 'text-center' : ''}>
                {item}
              </Typography>
            );
          })}
        </div>
        <div>
          {props.content.items.map((item) => {
            return (
              <div className={tableBodyClass}>
                <div className="flex items-center gap-x-3 whitespace-nowrap">
                  <img
                    src={item[0].logo}
                    alt={`Logo ${item[0].name}`}
                    className="md-max:size-6"
                  />
                  <Typography as={'span'}>{item[0].name}</Typography>
                </div>
                <Typography as={'span'} className="whitespace-nowrap">
                  {item[1].text}
                </Typography>
                <div>{getStatus(item[2].able)}</div>
                <div>{getStatus(item[3].able)}</div>
                <div>{getStatus(item[4].able)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Table;
