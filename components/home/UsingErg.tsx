import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import UsingErgMineIt from '../icons/UsingErgMineIt';
import UsingErgMineItLight from '../icons/UsingErgMineItLight';
import UsingErgBuyIt from '../icons/UsingErgBuyIt';
import UsingErgBuyItLight from '../icons/UsingErgBuyItLight';
import UsingErgStoreIt from '../icons/UsingErgStoreIt';
import UsingErgStoreItLight from '../icons/UsingErgStoreItLight';
import UsingErgUseIt from '../icons/UsingErgUseIt';
import UsingErgUseItLight from '../icons/UsingErgUseItLight';

const cards = [
  {
    title: <FormattedMessageFixed defaultMessage="Mine it" id="components.usingErg.MineIt.title" />,
    text: (
      <FormattedMessageFixed
        defaultMessage="Autolykos, an ASIC resistant & fairly mined Proof-of-Work algorithm friendly to common GPUs."
        id="components.usingErg.MineIt.text"
      />
    ),
    Icon: UsingErgMineIt,
    IconLight: UsingErgMineItLight,
    url: '/get-erg/#Mining',
  },
  {
    title: (
      <FormattedMessageFixed defaultMessage="Exchanges" id="components.usingErg.BuyIt.title" />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Available across popular centralized and decentralized exchanges."
        id="components.usingErg.BuyIt.text"
      />
    ),
    Icon: UsingErgBuyIt,
    IconLight: UsingErgBuyItLight,
    url: '/get-erg/#Exchanges',
  },
  {
    title: (
      <FormattedMessageFixed defaultMessage="Wallets" id="components.usingErg.StoreIt.title" />
    ),
    text: (
      <FormattedMessageFixed
        defaultMessage="Simple and secure non-custodial wallets to keep your ERG safe."
        id="components.usingErg.StoreIt.text"
      />
    ),
    Icon: UsingErgStoreIt,
    IconLight: UsingErgStoreItLight,
    url: '/get-erg/#Wallets',
  },
  {
    title: <FormattedMessageFixed defaultMessage="Ecosystem" id="components.getErg.UseIt.title" />,
    text: (
      <FormattedMessageFixed
        defaultMessage="Put your ERG to use today in our growing ecosystem"
        id="components.getErg.UseIt.text"
      />
    ),
    Icon: UsingErgUseIt,
    IconLight: UsingErgUseItLight,
    url: '/ecosystem',
  },
];

function FormattedMessageFixed(props: any) {
  return <FormattedMessage {...props} />;
}

export default function UsingErg() {
  return (
    <div
      id="UsingErg"
      className="max-w-[1300px] mx-auto py-12 px-4 lg:py-16 lg:px-4 relative"
      style={{ zIndex: 13 }}
    >
      <div className="flex flex-col xl:flex-row justify-between">
        <div className="lg:flex lg:flex-col lg:items-start lg:mb-44">
          <p className="text-black dark:text-white mb-4 font-bold">
            <FormattedMessage
              defaultMessage={'UNSTOPPABLE DEFI'}
              id="components.usingErg.subtitle"
            ></FormattedMessage>
          </p>
          <h2 className="leading-none text-h2">
            <b>
              <FormattedMessage
                defaultMessage={'GET ERG'}
                id="components.usingErg.title"
              ></FormattedMessage>
            </b>
          </h2>
          <p className="text-black dark:text-white mt-6 max-w-xs mr-4">
            <FormattedMessage
              defaultMessage="There is a rich ecosystem budding on top of Ergo. Whether you are a developer, miner, or
              investor, we have you covered."
              id="components.usingErg.description"
            ></FormattedMessage>
          </p>
        </div>
        <div className="lg:grid flex grid-cols-4 grid-rows-1 ml-4 overflow-x-auto lg:gap-4 gap-8 mt-10 no-scrollbar pb-10">
          {cards.map((card: any, i: number) => (
            <Link
              key={i}
              href={card.url}
              aria-label={typeof card.title === 'string' ? card.title : undefined}
            >
              <div className="cursor-pointer z-20">
                <div className="h-[350px] min-w-[238px] flex dark:hidden items-end using-erg-card dark:using-erg-card p-4 mb-8">
                  <card.IconLight width="100%" height="100%" />
                </div>
                <div className="hidden dark:flex h-[350px] min-w-[238px] items-end using-erg-card dark:using-erg-card p-4 mb-8">
                  <card.Icon width="100%" height="100%" />
                </div>
                <p className="font-subtitle-3 mb-3">{card.title}</p>
                <p>{card.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
