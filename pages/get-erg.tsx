import { useIntl } from "react-intl";
import Exchanges from "../components/getErg/Exchanges";
import Mining from "../components/getErg/Mining";
import MiningCalculator from "../components/getErg/MiningCalculator";
import UsingErg from "../components/home/UsingErg";
import Layout from "../components/Layout";

type Props = {
  exchanges?: any;
};

export default function GetErg(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: "pages.get-erg.title",
    defaultMessage: "GetErg",
  });
  return (
    <div>
      <div className="geterg-frame-1"></div>
      <div className="geterg-frame-2"></div>
      <div className="geterg-frame-3"></div>
      <div className="geterg-frame-4"></div>
      <div className="geterg-frame-5"></div>
      <Layout title={title}>
        <UsingErg title="Get ERG" />
        <Mining />
        <MiningCalculator
          currentBlockReward={67.5}
          currentPrice={4.1}
          networkHashrate={15.74}
        />
        <Exchanges exchanges={props.exchanges} />
      </Layout>
    </div>
  );
}

export const getServerSideProps = async (context: any) => {
  const exchanges = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      "/api/exchanges?populate=*&locale=" +
      context.locale
  ).then((response) => response.json());
  return {
    props: { exchanges },
  };
};
