import type { NextPage } from 'next'
import { FormattedMessage, useIntl } from 'react-intl'
import Layout from '../components/Layout'

const GetErg: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.get-erg.title', defaultMessage: 'GetErg' });
  return (
    <Layout title={title}>
      <h1 className="text-3xl font-bold">
        <FormattedMessage defaultMessage="GetErg" id="pages.get-erg.hero" />
      </h1>
    </Layout>
  )
}

export default GetErg;