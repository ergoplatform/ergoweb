import { useIntl } from "react-intl";
import CommunityCardsFeed from "../components/community/CommunityCardsFeed";
import CommunityHero from "../components/community/CommunityHero";
import HallOfFame from "../components/community/HallOfFame";
// import HallOfFame from "../components/community/HallOfFame";
import Sigmanauts from "../components/community/Sigmanauts";
import Spotlight from "../components/community/Spotlight";
import Layout from "../components/Layout";
import ContributeForm from "../components/shared/ContributeForm";
import Feed from "../components/shared/Feed";

type Props = {
  posts?: any;
  teamMembers?: any;
};

export default function Community(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: "pages.community.title",
    defaultMessage: "Community",
  });
  return (
    <Layout title={title}>
      <CommunityHero />
      <CommunityCardsFeed />
      <Sigmanauts />
      <ContributeForm />
      <Spotlight />
      <Feed posts={props.posts} />
      <HallOfFame teamMembers={props.teamMembers} />
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  const posts = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      "/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=20&populate=*&filters[type][$eq]=blog&filters[spotlight][$eq]=true&locale=" +
      context.locale
  ).then((response) => response.json());
  const teamMembers = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API + "/api/team-members?populate=*"
  ).then((response) => response.json());
  return {
    props: { posts, teamMembers },
  };
};
