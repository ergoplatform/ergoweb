import { useIntl } from 'react-intl'
import Exchanges from '../components/getErg/Exchanges';
import UsingErg from '../components/home/UsingErg';
import Layout from '../components/Layout'

type Props = {
  exchanges?: any;
};

export default function GetErg(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.get-erg.title', defaultMessage: 'GetErg' });
  return (
    <Layout title={title}>
      <UsingErg title='Get ERG' />
      <Exchanges exchanges={props.exchanges} />
    </Layout>
  )
}

export const getServerSideProps = async (context: any) => {
  const exchanges = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API + "/api/exchanges?populate=*&locale=" + context.locale
  ).then((response) => response.json());
  return {
    props: { exchanges }
  };
};