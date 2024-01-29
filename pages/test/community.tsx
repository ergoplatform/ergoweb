import React from 'react';
import Layout from 'components/rework/Layout';
import Hero from 'components/rework/Community/Hero';
import Socials from 'components/rework/Community/Socials';
import News from 'components/rework/News';
import Resources from 'components/rework/Community/Resources';
import Help from 'components/rework/Community/Help';
import Spaces from 'components/rework/Community/Spaces';
import Newsletter from 'components/rework/Newsletter';
import { getNews } from 'api';

type Props = {
  news?: any;
};

export const getServerSideProps = async (context: any) => {
  const news = await getNews();

  return {
    props: { news },
  };
};

function Community(props: Props) {
  return (
    <Layout>
      <Hero />
      <Socials />
      <Resources />
      <Spaces />
      <Help />
      {props.news && <News news={props.news} />}
      <Newsletter />
    </Layout>
  );
}

export default Community;
