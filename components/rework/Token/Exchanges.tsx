import React from 'react';
import Typography from 'components/rework/Typography';
import Table from 'components/rework/Table';
import { exchanges } from 'content/tables/exchanges';

function Exchanges() {
  const Header = (
    <>
      <Typography
        as="h2"
        type="heading-3"
        className="w-[365px] shrink-0 md-max:mb-2 md-max:w-full"
      >
        Crypto exchange you can trust
      </Typography>
      <Typography as="p">
        You can trade Ergo on various online platforms known as exchanges.
        However, please note that exchanges differ in safety, security, and
        control over your funds and data. It's advisable to conduct your
        research and contemplate whether storing your coins in a wallet might be
        a safer choice.
      </Typography>
    </>
  );

  return (
    <Table
      content={exchanges}
      gridClass="grid-cols-exchanges md:grid-cols-exchanges-md"
    >
      {Header}
    </Table>
  );
}

export default Exchanges;
