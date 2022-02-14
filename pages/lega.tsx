import type { NextPage } from 'next'
import { FormattedMessage, useIntl } from 'react-intl'
import Layout from '../components/Layout'

const Legal: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.legal.title', defaultMessage: 'Legal' });
  return (
    <Layout title={title}>
      <h1 className="text-3xl font-bold dark:underline">
        <FormattedMessage defaultMessage="Legal" id="pages.legal.hero" />
      </h1>
    </Layout>
  )
}

export default Legal;