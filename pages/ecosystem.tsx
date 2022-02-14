import type { NextPage } from 'next'
import { FormattedMessage, useIntl } from 'react-intl'
import Layout from '../components/Layout'

const Ecosystem: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.ecosystem.title', defaultMessage: 'Ecosystem' });
  return (
    <Layout title={title}>
      <h1 className="text-3xl font-bold">
        <FormattedMessage defaultMessage="Ecosystem" id="pages.ecosystem.hero" />
      </h1>
    </Layout>
  )
}

export default Ecosystem;