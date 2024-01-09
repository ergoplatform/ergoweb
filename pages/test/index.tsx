import React from 'react';
import { New } from 'types/new';
import Layout from 'components/rework/Layout';
import Hero from 'components/rework/index/Hero';
import Statistic from 'components/rework/Statistic';
import Why from 'components/rework/index/Why';
import Advantages from 'components/rework/index/Advantages';
import Explore from 'components/rework/index/Explore';
import News from 'components/rework/News';
import Newsletter from 'components/rework/Newsletter';
import Contributing from 'components/rework/index/Contributing';

type Props = {
  // posts?: any;
  // partners?: any;
  news?: any;
  // info?: any;
  // blockReward: number;
};

const getNews = async (): Promise<New[]> => {
  try {
    const news = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API +
        '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=5&populate=*&filters[type][$eq]=news'
    );
    const json = await news.json();
    return json.data;
  } catch (err) {
    const result = (err as Error).message;
    console.log(err);
    // TODO: Add logger
    throw Error(`Fetch News error ${result}`);
  }
};

export const getStaticProps = async (context: any) => {
  const news = await getNews();

  return {
    props: { news },
    revalidate: 60,
  };
};

const list = [
  {
    value: '$117.47M',
    name: 'Capitalization',
  },
  {
    value: '$8,15M',
    name: 'TVL',
  },
  {
    value: '17.75TH/s',
    name: 'Network power',
  },
  {
    value: '190k',
    name: 'Active addresses',
  },
];

function Index(props: Props) {
  return (
    <Layout>
      <Hero />
      <Statistic list={list} />
      <Why />
      <Advantages />
      <Explore />
      {props.news && <News news={props.news} />}
      <Newsletter />
      <Contributing />
    </Layout>
  );
}

export default Index;
