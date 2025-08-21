import { FormattedMessage } from 'react-intl';

type Props = {
  blockReward: number;
  circulatingSupply: number;
  transactionPerDay: number;
  hashRate: number;
};

export default function HomeInfo({
  blockReward = 2,
  circulatingSupply = 46166151,
  transactionPerDay = 6266,
  hashRate = 20.19,
}: Props) {
  // Normalize values for display
  const hr = hashRate / 1000000000000;
  const cs = circulatingSupply / 1000000000;

  // Pre-format strings (static rendering to avoid any animation-induced reflow)
  const nf0 = new Intl.NumberFormat('en-US');
  const nf2 = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const brStr = nf0.format(blockReward);
  const csStr = nf0.format(cs);
  const tpdStr = nf0.format(transactionPerDay);
  const hrStr = `${nf2.format(hr)} TH/s`;

  const metricClass =
    'font-roboto tabular-nums text-[20px] text-black dark:text-black whitespace-nowrap min-h-[28px] md:min-h-[32px]';

  return (
    <div
      id="HomeInfo"
      className="relative z-10 h-[220px] md:h-[200px] overflow-hidden"
      style={{ contain: 'layout paint' }}
    >
      {/* Desktop */}
      <div className="hidden md:flex absolute inset-0 justify-end items-center">
        <div className="mx-4 md:flex flex-row items-center bg-white md:pr-18 lg:pr-20 xl:pr-36 md:w-[980px] lg:w-[1040px] xl:w-[1100px] rounded-l-xl md:mx-0 homeInfo-shadow md:h-[140px] overflow-hidden">
          <div className="mx-8 my-4 text-center min-w-[200px]">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage
                defaultMessage="BLOCK REWARD"
                id="components.homeInfo.blockReward"
              />
            </b>
            <p className={metricClass}>{brStr}</p>
          </div>

          <div className="verticalLine h-14 my-auto"></div>

          <div className="mx-8 my-4 text-center min-w-[200px]">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage
                defaultMessage="CIRCULATING SUPPLY"
                id="components.homeInfo.circulatingSupply"
              />
            </b>
            <p className={metricClass}>{csStr}</p>
          </div>

          <div className="verticalLine h-14 my-auto"></div>

          <div className="mx-8 my-4 text-center min-w-[200px]">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage
                defaultMessage="TRANSACTIONS PER DAY"
                id="components.homeInfo.transactionPerDay"
              />
            </b>
            <p className={metricClass}>{tpdStr}</p>
          </div>

          <div className="verticalLine h-14 my-auto"></div>

          <div className="mx-8 my-4 text-center min-w-[200px]">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage defaultMessage="HASH RATE" id="components.homeInfo.hashRate" />
            </b>
            <p className={metricClass}>{hrStr}</p>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden absolute inset-0 flex justify-end items-center">
        <div className="bg-white mx-4 rounded-xl py-1 homeInfo-shadow overflow-hidden">
          <div className="mx-8 my-6">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage
                defaultMessage="BLOCK REWARD"
                id="components.homeInfo.blockReward"
              />
            </b>
            <p className={metricClass}>{brStr}</p>
          </div>

          <div className="horizontallLine"></div>

          <div className="mx-8 my-6">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage
                defaultMessage="CIRCULATING SUPPLY"
                id="components.homeInfo.circulatingSupply"
              />
            </b>
            <p className={metricClass}>{csStr}</p>
          </div>

          <div className="horizontallLine"></div>

          <div className="mx-8 my-6">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage
                defaultMessage="TRANSACTIONS PER DAY"
                id="components.homeInfo.transactionPerDay"
              />
            </b>
            <p className={metricClass}>{tpdStr}</p>
          </div>

          <div className="horizontallLine"></div>

          <div className="mx-8 my-6">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage defaultMessage="HASH RATE" id="components.homeInfo.hashRate" />
            </b>
            <p className={metricClass}>{hrStr}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
