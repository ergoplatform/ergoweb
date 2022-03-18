import { useIntl } from 'react-intl'
import DiscoverHero from '../components/discover/DiscoverHero';
import Documents from '../components/discover/Documents';
import ErgoExplorer from '../components/discover/ErgoExplorer';
import GrantsAndBounties from '../components/discover/GrantsAndBounties';
import Layout from '../components/Layout'

type Props = {
  documents?: any;
};

export default function Discover(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.discover.title', defaultMessage: 'Discover' });
  return (
    <Layout title={title}>
      <DiscoverHero />
      <GrantsAndBounties />
      <ErgoExplorer />
      <Documents documents={props.documents}/>
    </Layout>
  )
}

export const getServerSideProps = async (context: any) => {
  const documents = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API + "/api/documents?pagination[page]=1&pagination[pageSize]=500&populate=*&locale=" + context.locale
  ).then((response) => response.json());
  return {
    props: { documents }
  };
};