import type { NextPage } from 'next'
import { FormattedMessage, useIntl } from 'react-intl'
import Layout from '../components/Layout'

const Discover: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.discover.title', defaultMessage: 'Discover' });
  return (
    <Layout title={title}>
      <h1 className="text-3xl font-bold">
        <FormattedMessage defaultMessage="Discover" id="pages.discover.hero" />
      </h1>
    </Layout>
  )
}

export default Discover;