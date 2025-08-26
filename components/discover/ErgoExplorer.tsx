import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';
import { getIconComponentByName } from '../../utils/icons-map';

export default function Explore() {
  const intl = useIntl();
  const button1Text = intl.formatMessage({
    id: 'components.ergoExplorer.button1',
    defaultMessage: 'EXPLORER',
  });

  const button2Text = intl.formatMessage({
    id: 'components.ergoExplorer.button2',
    defaultMessage: 'ERGO.WATCH',
  });

  return (
    <div id="Explore" className="max-w-[1300px] mx-auto p-4 mt-40 relative z-10">
      <p className="text-[#585858] dark:text-[#585858] mb-4 xl:ml-60">
        <FormattedMessage
          defaultMessage="DIVE INTO THE ERGO SEA OF TRANSACTIONS"
          id="components.explore.subheading"
        />
      </p>
      <h1 className="leading-tight xl:ml-60">
        <b>
          <FormattedMessage defaultMessage="Explore" id="components.explore.heading" />
        </b>
      </h1>
      <p className="max-w-xs text-[#807e7e] dark:text-[#807e7e] mt-6 xl:mt-12 xl:ml-[400px] xl:max-w-lg">
        <FormattedMessage
          id="components.ergoExplorer.description"
          defaultMessage="The Ergo Explorer is your interface with the blockchain. Watch every transaction made in real-time. Or, view community curated metrics on ergo.watch."
        />
      </p>

      <div className="flex flex-col xl:flex-row xl:ml-[400px] gap-6 mt-6">
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-lg">
            <FormattedMessage
              id="components.ergoExplorer.blockchainExplorers"
              defaultMessage="Blockchain Explorers"
            />
          </h2>
          <Link href="https://explorer.ergoplatform.com/" target="_blank" rel="noopener noreferrer">
            <button
              type="submit"
              className="py-1 px-4 inline-flex items-center whitespace-nowrap inline-block rounded-full text-white font-vinila-extended text-[14px] md:text-[16px] bg-brand-orange hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
            >
              <span>
                <FormattedMessage
                  id="components.ergoExplorer.ergoExplorer"
                  defaultMessage="Ergo Explorer"
                />
              </span>
              <span className="w-4 h-4 ml-2">{getIconComponentByName('ArrowRightWhite')}</span>
            </button>
          </Link>
          <Link href="https://sigmaspace.io/en" target="_blank" rel="noopener noreferrer">
            <button
              type="submit"
              className="py-1 px-4 inline-flex items-center whitespace-nowrap inline-block rounded-full text-white font-vinila-extended text-[14px] md:text-[16px] bg-brand-orange hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
            >
              <span>
                <FormattedMessage
                  id="components.ergoExplorer.sigmaSpaceAltBackend"
                  defaultMessage="SigmaSpace (alternative backend)"
                />
              </span>
              <span className="w-4 h-4 ml-2">{getIconComponentByName('ArrowRightWhite')}</span>
            </button>
          </Link>
          <Link href="https://ergexplorer.com" target="_blank" rel="noopener noreferrer">
            <button
              type="submit"
              className="py-1 px-4 inline-flex items-center whitespace-nowrap btn rounded-full text-white font-vinila-extended text-[14px] md:text-[16px] bg-brand-orange hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
            >
              <span>
                <FormattedMessage
                  id="components.ergoExplorer.ergExplorerAltFrontend"
                  defaultMessage="ErgExplorer (alternative frontend)"
                />
              </span>
              <span className="w-4 h-4 ml-2">{getIconComponentByName('ArrowRightWhite')}</span>
            </button>
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-lg">
            <FormattedMessage id="components.ergoExplorer.metrics" defaultMessage="Metrics" />
          </h2>
          <Link href="https://ergo.watch/" target="_blank" rel="noopener noreferrer">
            <button
              type="submit"
              className="py-1 px-4 inline-flex items-center whitespace-nowrap btn rounded-full text-white font-vinila-extended text-[14px] md:text-[16px] bg-brand-orange hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
            >
              <span>
                <FormattedMessage
                  id="components.ergoExplorer.ergoWatch"
                  defaultMessage="Ergo.Watch"
                />
              </span>
              <span className="w-4 h-4 ml-2">{getIconComponentByName('ArrowRightWhite')}</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
