import React from 'react';
import Layout from 'components/rework/Layout';
import Hero from 'components/rework/Token/Hero';
import Statistic from 'components/rework/Statistic';
import Exchanges from 'components/rework/Token/Exchanges';
import Wallets from 'components/rework/Token/Wallets';
import Mine from 'components/rework/Token/Mine';
import Spaces from 'components/rework/Token/Spaces';
import Calculator from 'components/rework/Token/Calculator';
import News from 'components/rework/News';
import {
  getNews,
  getExchanges,
  getErgoPrice,
  getHashRate,
  getBlockInfo,
} from 'api';

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

type Props = {
  exchanges?: any;
  price?: any;
  news?: any;
  info?: any;
  hashRate?: any;
};

export const getStaticProps = async (context: any) => {
  const [news, exchanges, price, hashRate, info] = await Promise.all([
    getNews(),
    getExchanges(context.locale),
    getErgoPrice(),
    getHashRate(),
    getBlockInfo(),
  ]);

  return {
    props: { news, exchanges, price, hashRate, info },
    revalidate: 60,
  };
};

function Token(props: Props) {
  return (
    <Layout>
      <Hero />
      <Statistic list={list} />
      {typeof window !== undefined && <Exchanges />}
      {typeof window !== undefined && <Wallets />}
      <Mine />
      <Spaces />
      <Calculator
        currentBlockReward={props.info.currentBlockReward}
        currentPrice={props.price}
        networkHashrate={props.hashRate}
        difficulty={props.info.difficulty}
      />
      {props.news && <News news={props.news} />}
    </Layout>
  );
}

export default Token;
