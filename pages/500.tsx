import type { NextPage } from 'next'
import { FormattedMessage, useIntl } from 'react-intl'
import Layout from '../components/Layout'

const Custom500: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.500.title', defaultMessage: 'Server Error' });
  return (
    <Layout title={title}>
      <h1 className="text-3xl font-bold">
        <FormattedMessage defaultMessage="Server Error" id="pages.500.hero" />
      </h1>
    </Layout>
  )
}

export default Custom500;