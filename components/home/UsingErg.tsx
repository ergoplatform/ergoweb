import { FormattedMessage } from "react-intl";
import { getIconComponentByName } from "../../utils/icons-map";

const cards = [
  { title: <FormattedMessageFixed defaultMessage="Mine it" id="components.usingErg.MineIt.title" />, text: <FormattedMessageFixed defaultMessage="At eripuit signiferumque sea, vel ad mucius molestie, cu labitur." id="components.usingErg.MineIt.text" />, icon: 'UsingErgMineIt' },
  { title: <FormattedMessageFixed defaultMessage="Buy it" id="components.usingErg.BuyIt.title" />, text: <FormattedMessageFixed defaultMessage="At eripuit signiferumque sea, vel ad mucius molestie, cu labitur." id="components.usingErg.BuyIt.text" />, icon: 'UsingErgBuyIt' },
  { title: <FormattedMessageFixed defaultMessage="Store it" id="components.usingErg.StoreIt.title" />, text: <FormattedMessageFixed defaultMessage="At eripuit signiferumque sea, vel ad mucius molestie, cu labitur." id="components.usingErg.StoreIt.text" />, icon: 'UsingErgStoreIt' },
]

function FormattedMessageFixed(props: any) {
  return <FormattedMessage {...props} />;
}

type Props = {
  title: string;
};

export default function UsingErg(props: Props) {
  return (
    <div className="max-w-[1300px] mx-auto py-12 px-4 lg:py-16 lg:px-4">
      <div className="flex flex-col xl:flex-row justify-between">
        <div>
          <p className="text-[#585858] dark:text-[#585858] mb-4">UNSTOPPABLE DEFI</p>
          <h2 className="leading-none"><b>{props.title}</b></h2>
          <p className="text-[#989898] dark:text-[#989898] mt-6 max-w-xs">There is a rich budding ecosystem budding ontop of Ergo. Whether you are a developer, miner, or investor - we’ve got you covered.</p>
        </div>
        <div className="flex overflow-x-auto space-x-8 mt-10 no-scrollbar pb-10">
          {cards.map((card: any, i: number) => (
            <div key={i}>
              <div className="h-[450px] flex items-end using-erg-card p-4 mb-8">{getIconComponentByName(card.icon)}</div>
              <p className="font-subtitle-3 mb-3">{card.title}</p>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
