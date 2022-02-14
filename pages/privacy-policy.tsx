import type { NextPage } from 'next'
import { FormattedMessage, useIntl } from 'react-intl'
import Layout from '../components/Layout'

const PrivacyPolicy: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.privacy-policy.title', defaultMessage: 'Privacy Policy' });
  return (
    <Layout title={title}>
      <h1 className="text-3xl font-bold dark:underline">
        <FormattedMessage defaultMessage="Privacy Policy" id="pages.privacy-policy.hero" />
      </h1>
    </Layout>
  )
}

export default PrivacyPolicy;