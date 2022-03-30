import type { NextPage } from "next";
import { FormattedMessage, useIntl } from "react-intl";
import Layout from "../components/Layout";

const Custom500: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: "pages.500.title",
    defaultMessage: "Server Error",
  });
  return (
    <Layout title={title}>
      <div className="max-w-[1300px] mx-auto p-4 relative z-10 min-h-[400px]">
        <h1 className="text-3xl font-bold">
          <FormattedMessage defaultMessage="500 Server Error" id="pages.500.hero" />
        </h1>
      </div>
    </Layout>
  );
};

export default Custom500;
