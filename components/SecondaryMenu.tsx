import Link from 'next/link';

function SecondaryMenu() {
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
            className="text-xs mr-2 hover:text-orange-500 transition-colors duration-300 text-gray-900 dark:text-white"
            aria-label="Wallets"
          >
            WALLETS
          </Link>
          <span className="text-xs mx-2 text-gray-900 dark:text-white">•</span>
          <Link
            href="/get-erg#Exchanges"
            className="text-xs mr-2 hover:text-orange-500 transition-colors duration-300 text-gray-900 dark:text-white"
            aria-label="Exchanges"
          >
            EXCHANGES
          </Link>
          <span className="text-xs mx-2 text-gray-900 dark:text-white">•</span>
          <Link
            href="/ecosystem#Roadmap"
            className="text-xs mr-2 hover:text-orange-500 transition-colors duration-300 text-gray-900 dark:text-white"
            aria-label="Roadmap"
          >
            ROADMAP
          </Link>
          <span className="text-xs mx-2 text-gray-900 dark:text-white">•</span>
          <Link
            href="/blog"
            className="text-xs mr-2 hover:text-orange-500 transition-colors duration-300 text-gray-900 dark:text-white"
            aria-label="Blog"
          >
            BLOG
          </Link>
          <span className="text-xs mx-2 text-gray-900 dark:text-white">•</span>
          <a
            href="https://docs.ergoplatform.org/"
            target="_blank"
            className="text-xs mr-2 hover:text-orange-500 transition-colors duration-300 text-gray-900 dark:text-white"
            rel="noreferrer"
            aria-label="Documentation"
          >
            DOCUMENTATION
          </a>
          <span className="text-xs mx-2 text-gray-900 dark:text-white">•</span>
          <a
            href="https://sigmaverse.io/"
            target="_blank"
            className="text-xs mr-2 hover:text-orange-500 transition-colors duration-300 text-gray-900 dark:text-white"
            rel="noreferrer"
            aria-label="Sigmaverse"
          >
            SIGMAVERSE
          </a>
        </div>
      </div>
    </>
  );
}

export default SecondaryMenu;
