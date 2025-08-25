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
    title: <FormattedMessageFixed defaultMessage="Mine It" id="components.usingErg.MineIt.title" />,
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
    title: <FormattedMessageFixed defaultMessage="Buy It" id="components.usingErg.BuyIt.title" />,
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
      <FormattedMessageFixed defaultMessage="Store It" id="components.usingErg.StoreIt.title" />
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
    title: 'Use It',
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
      <div className="px-4">
        <div className="flex flex-col xl:flex-row justify-between">
          <div className="lg:flex lg:flex-col lg:items-start lg:mb-0 lg:ml-12 mt-10">
            <p className="text-black dark:text-white mb-4 font-bold pl-4 md:pl-0 text-left">
              <FormattedMessage
                defaultMessage={'UNSTOPPABLE DEFI'}
                id="components.usingErg.subtitle"
              ></FormattedMessage>
            </p>
            <h2 className="leading-none text-h2 pl-4 md:pl-0 text-left">
              <b>
                <FormattedMessage
                  defaultMessage={'GET ERG'}
                  id="components.usingErg.title"
                ></FormattedMessage>
              </b>
            </h2>
            <p className="text-black dark:text-white mt-6 max-w-xs mr-4 pl-4 md:pl-0 text-left md:text-lg lg:text-xl">
              <FormattedMessage
                defaultMessage="There is a rich ecosystem budding on top of Ergo. Whether you are a developer, miner, or
                investor, we have you covered."
                id="components.usingErg.description"
              ></FormattedMessage>
            </p>
          </div>
          <div
            className="lg:grid flex grid-cols-4 grid-rows-1 gap-2 lg:gap-8 xl:gap-[5rem] no-scrollbar pb-2 overflow-x-auto lg:overflow-visible mt-12 lg:ml-12 relative"
            id="erg-card-row"
          >
            {cards.map((card: any, i: number) => (
              <Link
                key={i}
                href={card.url}
                aria-label={typeof card.title === 'string' ? card.title : undefined}
              >
                <div className="cursor-pointer z-20 min-w-[238px] flex flex-col justify-between using-erg-card dark:using-erg-card p-4 md:p-5 lg:p-4 mx-1 md:mx-2 lg:mx-0 transition-all duration-300 h-[630px] md:h-[612px] overflow-hidden">
                  <div className="w-full flex flex-col items-center text-center pt-2 pb-4 mt-8">
                    <p className="font-subtitle-3 mb-2 text-2xl md:text-xl">
                      {typeof card.title === 'string' ? card.title : card.title}
                    </p>
                    <p className="text-base text-[16px]">{card.text}</p>
                  </div>
                  <div className="w-full flex items-end justify-center flex-1 pb-2">
                    <span className="dark:hidden w-full flex justify-center">
                      <card.IconLight
                        className="using-erg-icon object-contain"
                        style={{ maxHeight: 320, maxWidth: 320, width: '100%' }}
                        width={320}
                        height={320}
                      />
                    </span>
                    <span className="hidden dark:flex w-full flex justify-center">
                      <card.Icon
                        className="using-erg-icon object-contain"
                        style={{ maxHeight: 320, maxWidth: 320, width: '100%' }}
                        width={320}
                        height={320}
                      />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Animated arrow for mobile */}
        <button
          className="block md:hidden absolute right-0 top-1/2 transform -translate-y-1/2 z-30 bg-white/90 rounded-full p-2 shadow-lg"
          style={{ marginRight: 4 }}
          aria-label="Scroll cards right"
          onClick={() => {
            const row = document.getElementById('erg-card-row');
            if (row) row.scrollBy({ left: 240, behavior: 'smooth' });
          }}
        >
          <svg
            className="animate-bounce-slow"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            style={{ filter: 'drop-shadow(0 0 2px #FF5E18)' }}
          >
            <path
              d="M8 6L14 12L8 18"
              stroke="#FF5E18"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
