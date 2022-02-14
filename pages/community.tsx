import type { NextPage } from 'next'
import { FormattedMessage, useIntl } from 'react-intl'
import CommunityHero from '../components/community/CommunityHero';
import Layout from '../components/Layout'

const Community: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.community.title', defaultMessage: 'Community' });
  return (
    <Layout title={title}>
      <CommunityHero />
    </Layout>
  )
}

export default Community;