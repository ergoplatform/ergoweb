import type { NextPage } from 'next'
import { FormattedMessage, useIntl } from 'react-intl'
import DiscoverHero from '../components/discover/DiscoverHero';
import ErgoExplorer from '../components/discover/ErgoExplorer';
import GrantsAndBounties from '../components/discover/GrantsAndBounties';
import Layout from '../components/Layout'

const Discover: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.discover.title', defaultMessage: 'Discover' });
  return (
    <Layout title={title}>
      <DiscoverHero />
      <GrantsAndBounties />
      <ErgoExplorer />
    </Layout>
  )
}

export default Discover;