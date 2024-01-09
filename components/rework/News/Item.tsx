import React from 'react';
import Link from 'next/link';
import FormattedDate from 'components/rework/FormattedDate';
import { New } from 'types/new';
import Typography from 'components/rework/Typography';
import Label from 'components/rework/Label';

interface Props {
  new: New;
}

function Item(props: Props) {
  return (
    <Link
      href={props.new.attributes.url}
      className="
        flex space-between items-center gap-x-8 py-8 border-b border-main-border
        md-max:py-4 md-max:gap-x-5 md-max:items-start sm-max:flex-wrap sm-max:py-5 sm-max:px-2 
        transition-colors hover:border-brand-orange
      "
    >
      <Typography
        type="title-3"
        as={'span'}
        className="shrink-0 text-secondary font-inter font-normal md-max:text-base"
      >
        <FormattedDate date={props.new.attributes.date} />
      </Typography>
      <Typography
        type="title-3"
        as={'span'}
        className="w-full sm-max:order-first sm-max:w-full sm-max:mb-3"
      >
        {props.new.attributes.title}
      </Typography>
      {props.new.attributes.tag.length < 30 && (
        <Label className="shrink-0 sm-max:ml-auto">
          {props.new.attributes.tag}
        </Label>
      )}
    </Link>
  );
}

export default Item;
