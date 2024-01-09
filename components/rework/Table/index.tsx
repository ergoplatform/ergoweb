import React from 'react';
import Typography from 'components/rework/Typography';
import { ITable } from 'types/table';
import { exchanges } from 'content/tables/exchanges';

interface Props {
  children: React.ReactNode;
  content: ITable;
}

function Table(props: Props) {
  return (
    <div className="container-rework section">
      <div className="flex gap-x-6 items-center mb-12">{props.children}</div>
      <div className="border border-main-border p-15">
        <div className="flex justify-between text-secondary-gray">
          {exchanges.theads.map((item) => {
            return <Typography as={'span'}>{item}</Typography>;
          })}
        </div>
        <div>
          {exchanges.items.map((item) => {
            return (
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-x-3">
                  <img src={item[0].logo} alt={`Logo ${item[0].name}`} />
                  <Typography as={'span'}>{item[0].name}</Typography>
                </div>
                <Typography as={'span'}>{item[1].text}</Typography>
                <div></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Table;
