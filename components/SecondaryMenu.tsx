import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';

function SecondaryMenu() {
  const intl = useIntl();
  return (
    <>
      {/* 
        think it'd look better at the very top of the page (no padding)
        maybe some drop-shadow, or hover animation to make it look more polished.
        links beyond here broken? tried z-index
      */}
      <div
        className="justify-between bg-gray-100 dark:bg-gray-800 w-full relative md:flex hidden"
        style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', zIndex: 100 }}
      >
        <div className="max-w-[700px] mx-auto flex justify-between w-full px-4 py-2">
          <Link
            href="/get-erg#Wallets"
            className="text-xs mr-2 hover:text-orange-500 transition-colors duration-300 text-gray-900 dark:text-white hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
            aria-label={intl.formatMessage({
              id: 'secondaryMenu.wallets',
              defaultMessage: 'WALLETS',
            })}
          >
            <FormattedMessage id="secondaryMenu.wallets" defaultMessage="WALLETS" />
          </Link>
          <span className="text-xs mx-2 text-gray-900 dark:text-white">•</span>
          <Link
            href="/get-erg#Exchanges"
            className="text-xs mr-2 hover:text-orange-500 transition-colors duration-300 text-gray-900 dark:text-white hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
            aria-label={intl.formatMessage({
              id: 'secondaryMenu.exchanges',
              defaultMessage: 'EXCHANGES',
            })}
          >
            <FormattedMessage id="secondaryMenu.exchanges" defaultMessage="EXCHANGES" />
          </Link>
          <span className="text-xs mx-2 text-gray-900 dark:text-white">•</span>
          <Link
            href="/ecosystem#Roadmap"
            className="text-xs mr-2 hover:text-orange-500 transition-colors duration-300 text-gray-900 dark:text-white hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
            aria-label={intl.formatMessage({
              id: 'secondaryMenu.roadmap',
              defaultMessage: 'ROADMAP',
            })}
          >
            <FormattedMessage id="secondaryMenu.roadmap" defaultMessage="ROADMAP" />
          </Link>
          <span className="text-xs mx-2 text-gray-900 dark:text-white">•</span>
          <Link
            href="/blog"
            className="text-xs mr-2 hover:text-orange-500 transition-colors duration-300 text-gray-900 dark:text-white hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
            aria-label={intl.formatMessage({
              id: 'secondaryMenu.blog',
              defaultMessage: 'BLOG',
            })}
          >
            <FormattedMessage id="secondaryMenu.blog" defaultMessage="BLOG" />
          </Link>
          <span className="text-xs mx-2 text-gray-900 dark:text-white">•</span>
          <a
            href="https://docs.ergoplatform.org/"
            target="_blank"
            className="text-xs mr-2 hover:text-orange-500 transition-colors duration-300 text-gray-900 dark:text-white hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
            rel="noreferrer"
            aria-label={intl.formatMessage({
              id: 'secondaryMenu.documentation',
              defaultMessage: 'DOCUMENTATION',
            })}
          >
            <FormattedMessage id="secondaryMenu.documentation" defaultMessage="DOCUMENTATION" />
          </a>
          <span className="text-xs mx-2 text-gray-900 dark:text-white">•</span>
          <a
            href="https://sigmaverse.io/"
            target="_blank"
            className="text-xs mr-2 hover:text-orange-500 transition-colors duration-300 text-gray-900 dark:text-white hover:brightness-125 hover:scale-110 transform transition-transform ease-in-out"
            rel="noreferrer"
            aria-label={intl.formatMessage({
              id: 'secondaryMenu.sigmaverse',
              defaultMessage: 'SIGMAVERSE',
            })}
          >
            <FormattedMessage id="secondaryMenu.sigmaverse" defaultMessage="SIGMAVERSE" />
          </a>
        </div>
      </div>
    </>
  );
}

export default SecondaryMenu;
