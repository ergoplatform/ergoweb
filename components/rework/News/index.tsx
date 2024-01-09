import React from 'react';
import { New } from 'types/new';
import Typography from 'components/rework/Typography';
import Item from './Item';

interface Props {
  news: New[];
}

function News(props: Props) {
  return (
    <div className="container-rework section">
      <Typography as="h2" type="heading-3" className="mb-12 md-max:mb-6">
        Latest Ecosystem <span className="text-brand-orange">news</span>
      </Typography>
      {props.news.map((item, idx) => {
        return <Item new={item} key={idx} />;
      })}
    </div>
  );
}

export default News;
