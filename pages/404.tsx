import type { NextPage } from "next";
import { FormattedMessage, useIntl } from "react-intl";
import Layout from "../components/Layout";

const Custom404: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: "pages.404.title",
    defaultMessage: "Not Found",
  });
  return (
    <Layout title={title}>
      <div className="max-w-[1300px] mx-auto p-4 relative z-10 min-h-[400px]">
        <h1 className="text-3xl font-bold">
          <FormattedMessage defaultMessage="404 Page Not Found" id="pages.404.hero" />
        </h1>
      </div>
    </Layout>
  );
};

export default Custom404;
