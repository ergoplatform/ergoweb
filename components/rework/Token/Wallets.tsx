import React from 'react';
import Typography from 'components/rework/Typography';
import Table from 'components/rework/Table';
import { wallets } from 'content/tables/wallets';

function Wallets() {
  const Header = (
    <>
      <Typography
        as="h2"
        type="heading-3"
        className="w-[410px] shrink-0 lg-max:w-[370px] md-max:mb-2 md-max:w-full"
      >
        Easiest and fastest way to hold Ergo
      </Typography>
      <Typography as="p">
        Digital wallets safeguard your digital currency, ensuring its security,
        privacy, and control. Remember, your wallet differs from a bank account;
        hence, prioritize password security and regular backups to safeguard
        your funds. Additionally, note that wallets are supported by third
        parties; the information provided aims to streamline your digital
        currency experience for your convenience
      </Typography>
    </>
  );

  return (
    <Table
      content={wallets}
      gridClass="grid-cols-wallets md-max:grid-cols-wallets-md"
    >
      {Header}
    </Table>
  );
}

export default Wallets;
