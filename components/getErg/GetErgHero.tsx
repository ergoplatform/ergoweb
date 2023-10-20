import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { getIconComponentByName } from '../../utils/icons-map';

const cards = [
  {
    title: <FormattedMessage defaultMessage="Mine it" id="components.getErg.MineIt.title" />,
    text: (
      <FormattedMessage
        defaultMessage="Autolykos, an ASIC resistant & fairly mined Proof-of-Work algorithm friendly to common GPUs."
        id="components.getErg.MineIt.text"
      />
    ),
    icon: 'UsingErgMineIt',
    url: '/get-erg/#Mining',
  },
  {
    title: <FormattedMessage defaultMessage="Exchanges" id="components.getErg.BuyIt.title" />,
    text: (
      <FormattedMessage
        defaultMessage="Available across popular centralized and decentralized exchanges."
        id="components.getErg.BuyIt.text"
      />
    ),
    icon: 'UsingErgBuyIt',
    url: '/get-erg/#Exchanges',
  },
  {
    title: <FormattedMessage defaultMessage="Wallets" id="components.getErg.StoreIt.title" />,
    text: (
      <FormattedMessage
        defaultMessage="Simple and secure non-custodial wallets to keep your ERG safe."
        id="components.getErg.StoreIt.text"
      />
    ),
    icon: 'UsingErgStoreIt',
    url: '/get-erg/#Wallets',
  },
  {
    title: <FormattedMessage defaultMessage="Ecosystem" id="components.getErg.UseIt.title" />,
    text: (
      <FormattedMessage
        defaultMessage="Put your ERG to use today in our growing ecosystem"
        id="components.getErg.UseIt.text"
      />
    ),
    icon: 'UsingErgUseIt',
    url: '/ecosystem',
  },
];

function FormattedMessageFixed(props: any) {
  return <FormattedMessage {...props} />;
}

type Props = {
  title: string;
};
export default function GetErgHero(props: Props) {
  return (
    <div
      id="GetErgHero"
      className="max-w-[1300px] mx-auto py-12 px-4 lg:py-16 lg:px-4 relative z-10"
    >
      <div className="flex flex-col xl:flex-row justify-between">
        <div className="lg:flex lg:flex-col lg:justify-end lg:mb-40">
          <p
            className="text-[#585858] dark:text-[#585858] mb-4 font-bold"
            id="components.getErg.heroTitle"
          >
            UNSTOPPABLE DEFI
          </p>
          <h2 className="leading-none">
            <b>
              <FormattedMessage defaultMessage="Get ERG" id="components.getErg.title" />
            </b>
          </h2>
          <p className="text-[#807e7e] dark:text-[#807e7e] mt-6 max-w-xs mr-4">
            <FormattedMessage
              defaultMessage="There is a rich ecosystem budding on top of Ergo. Whether you are a developer, miner, or investor - we’ve got you covered."
              id="components.getErg.description"
            />
          </p>
        </div>
        <div className="overflow-x-auto lg:gap-4 gap-8 mt-10 no-scrollbar pb-10 grid grid-cols-2 md:grid-cols-4 grid-rows-2 md:grid-rows-1 ml-4">
          {cards.map((card: any, i: number) => (
            <Link key={i} href={card.url} passHref>
              <div className="cursor-pointer">
                <div className="h-[200px] md:h-[275px] lg:h-[350px] flex dark:hidden items-end using-erg-card dark:using-erg-card p-4 mb-8">
                  {getIconComponentByName(card.icon + 'Light', { width: "100%", height: "100%" })}
                </div>
                <div className="hidden dark:flex h-[200px] md:h-[275px] lg:h-[350px] items-end using-erg-card dark:using-erg-card p-4 mb-8">
                  {getIconComponentByName(card.icon, { width: "100%", height: "100%" })}
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
