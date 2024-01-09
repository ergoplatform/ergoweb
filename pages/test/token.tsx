import React from 'react';
import Layout from 'components/rework/Layout';
import Hero from 'components/rework/Token/Hero';
import Statistic from 'components/rework/Statistic';
import Table from 'components/rework/Table';
import Exchanges from 'components/rework/Token/Exchanges';

const list = [
  {
    value: '$109,1M',
    name: 'Market cap',
  },
  {
    value: '$650,2M',
    name: 'Volume (24h)',
  },
  {
    value: '$1.52',
    name: 'Current price',
  },
];

function Token() {
  return (
    <Layout>
      <Hero />
      <Statistic list={list} />
      <Exchanges />
    </Layout>
  );
}

export default Token;
