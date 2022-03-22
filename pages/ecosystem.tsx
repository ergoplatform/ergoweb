import type { NextPage } from "next";
import { FormattedMessage, useIntl } from "react-intl";
import EcosystemHero from "../components/ecosystem/DiscoverHero";
import Layout from "../components/Layout";

const Ecosystem: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: "pages.ecosystem.title",
    defaultMessage: "Ecosystem",
  });
  return (
    <Layout title={title}>
      <EcosystemHero />
    </Layout>
  );
};

export default Ecosystem;
