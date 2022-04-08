import { useIntl } from "react-intl";
import { getIconComponentByName } from "../../utils/icons-map";

export default function ErgoExplorer() {
  const intl = useIntl();
  const button1Text = intl.formatMessage({
    id: "components.ergoExplorer.button1",
    defaultMessage: "ERGO EXPLORER",
  });

  const button2Text = intl.formatMessage({
    id: "components.ergoExplorer.button2",
    defaultMessage: "ergo watch",
  });

  return (
    <div className="max-w-[1300px] mx-auto p-4 mt-40 relative z-10">
      <p className="text-[#585858] dark:text-[#585858] mb-4 xl:ml-60">
        DIVE INTO THE ERGO SEA OF TRANSACTIONS
      </p>
      <h1 className="leading-tight xl:ml-60">
        <b>Explore</b>
      </h1>
      <p className="max-w-xs text-[#989898] dark:text-[#989898] mt-6 xl:mt-12 xl:ml-[400px] xl:max-w-lg">
        The Ergo Explorer is your interface with the blockchain. 
        Watch every transaction made in real-time.
        Or, view community curated metrics on ergo.watch.
      </p>
      <button
        type="submit"
        className="py-1 px-4 inline-flex items-center whitespace-nowrap btn rounded-full text-black font-vinila-extended text-[14px] md:text-[16px] bg-brand-orange mt-6 xl:ml-[400px]"
      >
        <span>{button1Text}</span>
        <span className="w-4 h-4 ml-2">
          {getIconComponentByName("ArrowRightBlack")}
        </span>
      </button>
      <button
        type="submit"
        className="py-1 px-4 inline-flex items-center whitespace-nowrap btn rounded-full text-black font-vinila-extended text-[14px] md:text-[16px] bg-brand-orange mt-6 xl:ml-[10px]"
      >
        <span>{button2Text}</span>
        <span className="w-4 h-4 ml-2">
          {getIconComponentByName("ArrowRightBlack")}
        </span>
      </button>
    </div>
  );
}
