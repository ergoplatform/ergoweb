import React from 'react';
import { IStatistic } from '.';
import Typography from 'components/rework/Typography';

interface Props {
  data: IStatistic;
}

function Statistic({ data }: Props) {
  return (
    <div
      className="
        grow bg-background-opacity p-11 
        lg-max:py-9 md-max:p-5
      "
    >
      <div
        className="
          text-5xl mb-5 font-inter font-semibold 
          lg-max:text-3xl lg-max:mb-3
          md-max:text-xl md-max:mb-1
        "
      >
        {data.value}
      </div>
      <Typography type="alt">{data.name}</Typography>
    </div>
  );
}

export default Statistic;
