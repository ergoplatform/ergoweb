import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import { IAdvantage } from 'content/advantages';
import Typography from 'components/rework/Typography';
import PlusIcon from 'assets/icons/plus.svg';
import MinusIcon from 'assets/icons/minus.svg';
import Label from 'components/rework/Label';
import Button from 'components/rework/Button';

interface Props {
  item: IAdvantage;
}

function Item(props: Props) {
  const { item } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => setIsOpen((open) => !open);

  return (
    <div
      className="
        flex gap-x-6 border-b border-main-border pb-8 justify-between cursor-pointer
        transition-colors hover:border-brand-orange 
        lg-max:mb-6 lg-max:pb-6 lg-max:last:mb-0
        md-max:gap-x-3 md-max:pb-5
      "
      onClick={toggleCollapse}
    >
      <div
        className="
          size-16.5 flex shrink-0 items-center justify-center bg-background-card
          lg-max:size-13.5
          md-max:size-6
        "
      >
        <img
          src={item.icon}
          className="
          lg-max:max-w-11 lg-max:max-h-8
          md-max:max-w-[18px] md-max:max-h-3
        "
        />
      </div>
      <div className="w-full">
        <Label className="mb-2">{item.tag}</Label>
        <Typography as={'p'} type="title-3">
          {item.description}
        </Typography>
        <Collapse isOpened={isOpen}>
          <Typography className="mb-6 pt-4">{item.content}</Typography>
          <Button type="link" size="small" link="/" className="inline-block">
            Find out more
          </Button>
        </Collapse>
      </div>
      <div className="flex items-center justify-center shrink-0 size-9 rounded-full border border-transparent-20 lg-max:size-7">
        {!isOpen ? (
          <PlusIcon className="lg-max:size-3.5" />
        ) : (
          <MinusIcon className="lg-max:size-3.5" />
        )}
      </div>
    </div>
  );
}

export default Item;
