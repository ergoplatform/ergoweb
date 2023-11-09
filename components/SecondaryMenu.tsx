import Link from 'next/link';
{
  /* think it'd look better at the very top of the page (no padding) */
}
{
  /* maybe some drop-shadow, or hover animation to make it look more polished. */
}
function SecondaryMenu() {
  return (
    <div className="justify-between bg-red-500 p-2 rounded-lg w-full z-[500] relative md:flex hidden">
      <div className="max-w-[500px] mx-auto flex justify-between">
        <Link href="/get-erg#Wallets">
          <a className="text-xs mr-2">WALLETS</a>
        </Link>
        <span className="text-xs mx-2">•</span>
        <Link href="/get-erg#Exchanges">
          <a className="text-xs mr-2">EXCHANGES</a>
        </Link>
        <span className="text-xs mx-2">•</span>
        {/* links beyond here broken? tried z-index */}
        <Link href="/ecosystem#Roadmap">
          <a className="text-xs mr-2">ROADMAP</a>
        </Link>
        <span className="text-xs mx-2">•</span>
        <Link href="/blog">
          <a className="text-xs mr-2">BLOG</a>
        </Link>
        <span className="text-xs mx-2">•</span>
        <a
          href="https://docs.ergoplatform.org/"
          target="_blank"
          className="text-xs mr-2"
          rel="noreferrer"
        >
          DOCUMENTATION
        </a>
        <span className="text-xs mx-2">•</span>
        <a href="https://sigmaverse.io/" target="_blank" className="text-xs mr-2" rel="noreferrer">
          SIGMAVERSE
        </a>
      </div>
    </div>
  );
}

export default SecondaryMenu;
