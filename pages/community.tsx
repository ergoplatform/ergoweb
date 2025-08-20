import { useIntl } from 'react-intl';
import CommunityCardsFeed from '../components/community/CommunityCardsFeed';
import CommunityHero from '../components/community/CommunityHero';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import LazyInView from '../utils/LazyInView';

const Sigmanauts = dynamic(() => import('../components/community/Sigmanauts'), {
  ssr: false,
});
const ContributeForm = dynamic(() => import('../components/shared/ContributeForm'), {
  ssr: false,
});
const Spotlight = dynamic(() => import('../components/community/Spotlight'), {
  ssr: false,
});
const Feed = dynamic(() => import('../components/shared/Feed'), {
  ssr: false,
});
const ErgoFoundation = dynamic(() => import('../components/community/ErgoFoundation'), {
  ssr: false,
});
const OurMission = dynamic(() => import('../components/community/OurMission'), {
  ssr: false,
});

const DynamicHallOfFame = dynamic(() => import('../components/community/HallOfFame'), {
  ssr: false,
});

type Props = {
  posts?: any;
  teamMembers?: any;
};

export default function Community(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: 'pages.community.title',
    defaultMessage: 'Community',
  });

  return (
    <div className="relative overflow-hidden">
      <div className="community-blur-2"></div>
      <div className="community-frame-3"></div>
      <div className="community-frame-1"></div>
      <div className="community-frame-2"></div>
      <div className="community-frame-4"></div>
      <div className="community-frame-5"></div>
      <div className="community-frame-6"></div>
      <div className="community-frame-7"></div>
      <div className="community-frame-8"></div>
      <div className="community-frame-9"></div>
      <div className="community-frame-10"></div>
      <div className="community-blur-1"></div>
      <Layout title={title}>
        <CommunityHero />
        <CommunityCardsFeed />

        <LazyInView rootMargin="200px 0px" className="min-h-[480px]">
          {() => <Sigmanauts />}
        </LazyInView>

        <LazyInView rootMargin="200px 0px" className="min-h-[440px]">
          {() => <ContributeForm />}
        </LazyInView>

        <LazyInView rootMargin="200px 0px" className="min-h-[900px]">
          {() =>
            props.posts?.data?.length !== 0 ? (
              <>
                <Spotlight />
                <Feed posts={props.posts} />
              </>
            ) : null
          }
        </LazyInView>

        {props.teamMembers ? (
          <LazyInView rootMargin="200px 0px" className="min-h-[720px]">
            {() => <DynamicHallOfFame teamMembers={props.teamMembers} />}
          </LazyInView>
        ) : null}

        <LazyInView rootMargin="200px 0px" className="min-h-[560px]">
          {() => <ErgoFoundation />}
        </LazyInView>
        <LazyInView rootMargin="200px 0px" className="min-h-[520px]">
          {() => <OurMission />}
        </LazyInView>
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const posts = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=20&populate=*&filters[type][$eq]=blog&filters[spotlight][$eq]=true&locale=' +
      context.locale,
  )
    .then((response) => response.json())
    .catch((err) => null);
  const teamMembers = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/team-members?pagination[pageSize]=100&populate=*&locale=' +
      context.locale,
  )
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((err) => null);
  return {
    props: { posts, teamMembers },
  };
};
