import type { NextPage } from 'next'
import { FormattedMessage, useIntl } from 'react-intl'
import Autolykos from '../components/home/Autolykos';
import Highlights from '../components/home/Highlights';
import HomeHero from '../components/home/HomeHero';
import HomeInfo from '../components/home/HomeInfo';
import Layout from '../components/Layout'

const Home: NextPage = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: 'pages.home.title', defaultMessage: 'Home' });
  return (
    <Layout title={title}>
      <HomeHero />
      <Highlights />
      <HomeInfo />
      <Autolykos />
    </Layout>
  )
}

export default Home;