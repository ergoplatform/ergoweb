import { useIntl } from "react-intl";
import { getIconComponentByName } from "../../utils/icons-map";

export default function ErgoExplorer() {
  const intl = useIntl();
  const button1Text = intl.formatMessage({ id: 'components.ergoExplorer.button1', defaultMessage: 'DEV BOUNTIES' });

  return (
    <div className="max-w-[1300px] mx-auto p-4 mt-40">
      <p className="text-[#585858] dark:text-[#585858] mb-4 xl:ml-60">DIVE INTO THE ERGO SEA OF TRANSACTIONS</p>
      <h1 className="leading-tight xl:ml-60"><b>Ergo Explorer</b></h1>
      <p className="max-w-xs text-[#989898] dark:text-[#989898] mt-6 xl:mt-12 xl:ml-[400px] xl:max-w-lg">Ergo is designed for mass adoption. Its efficient blockchain protocol will allow it to be widely used while still remaining friendly to application protocols thanks to its unique transaction language. In the explorer you can watch every transaction made in real-time.</p>
      <button type="submit" className='py-1 px-4 inline-flex items-center whitespace-nowrap btn rounded-full text-black font-vinila-extended text-[14px] md:text-[16px] bg-brand-orange mt-6 xl:ml-[400px]'>
        <span>{button1Text}</span>
        <span className="w-4 h-4 ml-2">{getIconComponentByName('ArrowRightBlack')}</span>
      </button>
    </div>
  );
}
