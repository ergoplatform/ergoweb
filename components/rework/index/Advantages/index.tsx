import React from 'react';
import Typography from 'components/rework/Typography';
import { advantages } from 'content/advantages';
import Item from './Item';

function Advantages() {
  return (
    <div className="container-rework section">
      <Typography as="h2" type="heading-3" className="mb-12 md-max:mb-6">
        Network advantages
      </Typography>
      <div className="grid grid-cols-2 gap-6 lg-max:block">
        {advantages.map((item, idx) => {
          return <Item item={item} key={idx} />;
        })}
      </div>
    </div>
  );
}

export default Advantages;
