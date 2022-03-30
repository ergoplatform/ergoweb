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
    <div>
      <div className="ecosystem-frame-1"></div>
      <div className="ecosystem-frame-2"></div>
      <div className="ecosystem-frame-3"></div>
      <div className="ecosystem-frame-4"></div>
      <div className="ecosystem-frame-5"></div>
      <div className="ecosystem-blur-1"></div>
      <div className="ecosystem-blur-2"></div>
      <div className="ecosystem-blur-3"></div>
      <Layout title={title}>
        <EcosystemHero />
        <DApps apps={props.apps} />
        <Roadmap roadmapItems={props.roadmap} />
        <FeaturesAndProjects projects={props.projects} />
      </Layout>
    </div>
  );
}

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
      "/api/features-and-projects?populate=*&pagination[page]=1&pagination[pageSize]=4&sort=order:asc&locale=" +
      context.locale
  ).then((response) => response.json());
  return {
    props: { apps, roadmap, projects },
  };
};
