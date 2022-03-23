import { useIntl } from "react-intl";
import DApps from "../components/ecosystem/DApps";
import EcosystemHero from "../components/ecosystem/DiscoverHero";
import Roadmap from "../components/ecosystem/Roadmap";
import Layout from "../components/Layout";

type Props = {
  apps?: any;
  roadmap?: any;
};

export default function Ecosystem(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: "pages.ecosystem.title",
    defaultMessage: "Ecosystem",
  });
  return (
    <Layout title={title}>
      <EcosystemHero />
      <DApps apps={props.apps}/>
      <Roadmap roadmapItems={props.roadmap}/>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const apps = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      "/api/dapps?populate=*&locale=" +
      context.locale
  ).then((response) => response.json());
  const roadmap = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      "/api/roadmaps?populate=*&locale=" +
      context.locale
  ).then((response) => response.json());
  return {
    props: { apps, roadmap },
  };
};

