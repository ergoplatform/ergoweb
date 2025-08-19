import { useIntl } from 'react-intl';
import Layout from '../components/Layout';
import dynamic from 'next/dynamic';
import LazyInView from '../utils/LazyInView';

const GetErgHero = dynamic(() => import('../components/getErg/GetErgHero'), {
  ssr: false,
});
const Wallets = dynamic(() => import('../components/getErg/Wallets'), {
  ssr: false,
});
const Mining = dynamic(() => import('../components/getErg/Mining'), {
  ssr: false,
});
const MiningCalculator = dynamic(() => import('../components/getErg/MiningCalculator'), {
  ssr: false,
});
const Exchanges = dynamic(() => import('../components/getErg/Exchanges'), {
  ssr: false,
});

type Props = {
  exchanges?: any;
  price?: any;
  hashRate?: any;
  currentBlockReward?: any;
  difficulty?: any;
};

export default function GetErg(props: Props) {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: 'pages.get-erg.title',
    defaultMessage: 'GetErg',
  });

  return (
    <div className="overflow-hidden">
      <div className="geterg-frame-1"></div>
      <div className="parent">
        <div className="hideOverflow">
          <div className="geterg-frame-2"></div>
        </div>
      </div>
      <div className="geterg-frame-3"></div>
      <div className="geterg-frame-4"></div>
      <div className="geterg-blur-1"></div>
      <div className="geterg-blur-2"></div>
      <div className="geterg-blur-3"></div>
      <Layout title={title}>
        <LazyInView rootMargin="200px 0px">{() => <GetErgHero title="Get ERG" />}</LazyInView>

        <LazyInView rootMargin="200px 0px">{() => <Wallets />}</LazyInView>

        <LazyInView rootMargin="200px 0px">{() => <Mining />}</LazyInView>

        <LazyInView rootMargin="200px 0px">
          {() =>
            props.currentBlockReward && props.price && props.hashRate && props.difficulty ? (
              <MiningCalculator
                currentBlockReward={props.currentBlockReward}
                currentPrice={props.price}
                networkHashrate={props.hashRate}
                difficulty={props.difficulty}
              />
            ) : null
          }
        </LazyInView>

        <LazyInView rootMargin="200px 0px">
          {() => (props.exchanges ? <Exchanges exchanges={props.exchanges} /> : null)}
        </LazyInView>
      </Layout>
    </div>
  );
}

export const getStaticProps = async (context: any) => {
  const exchanges = await fetch(
    process.env.NEXT_PUBLIC_STRAPI_API +
      '/api/exchanges?sort=order:asc&populate=*&locale=' +
      context.locale,
  )
    .then((response) => response.json())
    .then((response) => response.data)
    .catch((err) => null);
  const price = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=ergo&vs_currencies=USD',
  )
    .then((response) => response.json())
    .then((data) => data.ergo.usd)
    .catch((err) => null);
  const hashRate = await fetch('https://api.ergoplatform.com/info/')
    .then((response) => response.json().then((data) => data.hashRate))
    .catch((err) => null);
  const info = await fetch('https://api.ergoplatform.com/blocks')
    .then((response) =>
      response.json().then((data) => {
        return {
          currentBlockReward: data.items[0].minerReward / 1000000000,
          difficulty: data.items[0].difficulty,
        };
      }),
    )
    .catch((err) => null);

  let currentBlockReward = null;
  let difficulty = null;
  if (info !== null) {
    currentBlockReward = info.currentBlockReward;
    difficulty = info.difficulty;
  }

  return {
    props: { exchanges, price, hashRate, currentBlockReward, difficulty },
    revalidate: 60,
  };
};
