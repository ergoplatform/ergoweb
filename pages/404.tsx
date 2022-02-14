import type { NextPage } from 'next'
import { FormattedMessage, useIntl } from 'react-intl'
import Layout from '../components/Layout'

const Custom404: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.404.title', defaultMessage: 'Not Found' });
  return (
    <Layout title={title}>
      <h1 className="text-3xl font-bold">
        <FormattedMessage defaultMessage="Not Found" id="pages.404.hero" />
      </h1>
    </Layout>
  )
}

export default Custom404;