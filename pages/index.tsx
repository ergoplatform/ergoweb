import { useIntl } from "react-intl";
import Autolykos from "../components/home/Autolykos";
import Highlights from "../components/home/Highlights";
import HomeHero from "../components/home/HomeHero";
import HomeInfo from "../components/home/HomeInfo";
import News from "../components/home/News";
import Partners from "../components/home/Partners";
import UsingErg from "../components/home/UsingErg";
import Layout from "../components/Layout";
import ContributeForm from "../components/shared/ContributeForm";
import Feed from "../components/shared/Feed";

type Props = {
  posts?: any;
  partners?: any;
  news?: any;
};

export default function Home(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: "pages.home.title",
    defaultMessage: "Home",
  });
  return (
    <Layout title={title}>
      <HomeHero />
      <Highlights />
      <HomeInfo />
      <UsingErg title="Using ERG" />
      <Autolykos />
      <News news={props.news} />
      <Feed posts={props.posts} />
      <Partners partners={props.partners} />
      <ContributeForm />
    </Layout>
  );
}

export const getServerSideProps = async (context: any) => {
  const posts = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      "/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=20&populate=*&filters[type][$eq]=blog&locale=" +
      context.locale
  ).then((response) => response.json());
  const partners = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API + "/api/partners?populate=*"
  ).then((response) => response.json());
  const news = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      "/api/posts?sort=date:desc&pagination[page]=1&pagination[pageSize]=3&populate=*&filters[type][$eq]=news&locale=" +
      context.locale
  ).then((response) => response.json());

  return {
    props: { posts, partners, news },
  };
};
