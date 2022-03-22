import type { NextPage } from "next";
import { FormattedMessage, useIntl } from "react-intl";
import DApps from "../components/ecosystem/DApps";
import EcosystemHero from "../components/ecosystem/DiscoverHero";
import Layout from "../components/Layout";

type Props = {
  apps?: any;
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
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const apps = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      "/api/dapps?populate=*&locale=" +
      context.locale
  ).then((response) => response.json());
  console.log(apps)
  return {
    props: { apps },
  };
};

