import { ErgoFoundationIcon, ErgoFoundationIconLight } from '../icons';

export default function ErgoFoundation() {
  return (
    <div id="ErgoFoundation" className="max-w-[1300px] mx-auto p-4 relative z-10">
      <div className="flex flex-col md:flex-row mb-14">
        <div className="mb-12 md:my-auto">
          <ErgoFoundationIcon className="h-40 md:h-60 hidden dark:block" viewBox="0 0 248 248" />
          <ErgoFoundationIconLight className="h-40 md:h-60 dark:hidden" viewBox="0 0 248 248" />
        </div>
        <div className="font-vinila-extended text-[24px] md:text-[56px] max-w-xs md:max-w-3xl md:ml-14 leading-tight md:my-auto">
          The <b>Ergo Foundation</b> is a community-driven entity focused on
        </div>
      </div>
      <div className="flex flex-row-reverse md:r-40">
        <div></div>
        <ul className="ergo-foundation list-disc mx-4">
          <li>
            Promoting <b>non-breaking development </b> of Ergo Platform protocol;
          </li>
          <li>
            Publicizing the widespread adoption and use of Ergo Platform and its
            <b> native token </b> (ERG);
          </li>
          <li>
            Developing the <b>ecosystem </b> around the Ergo Platform;
          </li>
          <li>
            Spread the use of Ergo Platform and blockchain technology for
            <b> social good </b>;
          </li>
          <li>
            Uphold <b>truly decentralized infrastructure</b>, and;
          </li>
          <li>
            Supporting <b>privacy </b> as a basic human right.
          </li>
        </ul>
      </div>
    </div>
  );
}
