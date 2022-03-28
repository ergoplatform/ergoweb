import { useIntl } from "react-intl";
import DApps from "../components/ecosystem/DApps";
import EcosystemHero from "../components/ecosystem/EcosystemHero";
import FeaturesAndProjects from "../components/ecosystem/FeaturesAndProjects";
import Roadmap from "../components/ecosystem/Roadmap";
import Layout from "../components/Layout";

type Props = {
  apps?: any;
  roadmap?: any;
  projects?: any;
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
      <FeaturesAndProjects projects={props.projects} />
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
      "/api/roadmaps?populate=*&pagination[pageSize]=100&locale=" +
      context.locale
  ).then((response) => response.json());
  const projects = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      "/api/features-and-projects?populate=*&pagination[page]=1&pagination[pageSize]=4&locale=" +
      context.locale
  ).then((response) => response.json());
  return {
    props: { apps, roadmap, projects },
  };
};

