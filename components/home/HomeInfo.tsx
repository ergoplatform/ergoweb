import { FormattedMessage } from 'react-intl';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

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
  // Trigger animation only when the block comes into view (once)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Normalize values for display
  const hr = hashRate / 1000000000000;
  const cs = circulatingSupply / 1000000000;

  // Pre-format strings for placeholder width (prevents CLS)
  const nf0 = new Intl.NumberFormat('en-US');
  const nf2 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const brStr = nf0.format(blockReward);
  const csStr = nf0.format(cs);
  const tpdStr = nf0.format(transactionPerDay);
  const hrStr = `${nf2.format(hr)} TH/s`;

  // Shared styles for numbers
  const metricText =
    'font-roboto tabular-nums text-[20px] text-black dark:text-black whitespace-nowrap min-h-[28px] md:min-h-[32px]';

  // Renders a metric with a placeholder that reserves final width,
  // and an overlaid animated value that does not affect layout.
  const Metric = ({
    finalStr,
    children,
  }: {
    finalStr: string;
    children: React.ReactNode;
  }) => (
    <span className="inline-grid relative align-bottom">
      {/* Placeholder reserves exact final width and line-height */}
      <span aria-hidden className={`${metricText} invisible col-start-1 row-start-1`}>
        {finalStr}
      </span>
      {/* Visible animated value overlays in same grid cell (no layout change) */}
      <span className={`${metricText} col-start-1 row-start-1`}>{children}</span>
    </span>
  );

  return (
    <div
      id="HomeInfo"
      ref={ref}
      className="relative z-10 md:h-[200px] md:overflow-hidden"
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
            <Metric finalStr={brStr}>
              {inView ? (
                <CountUp separator="," start={0} end={blockReward} duration={1.2} />
              ) : (
                '0'
              )}
            </Metric>
          </div>

          <div className="verticalLine h-14 my-auto"></div>

          <div className="mx-8 my-4 text-center min-w-[200px]">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage
                defaultMessage="CIRCULATING SUPPLY"
                id="components.homeInfo.circulatingSupply"
              />
            </b>
            <Metric finalStr={csStr}>
              {inView ? (
                <CountUp separator="," start={0} end={cs} duration={1.2} />
              ) : (
                '0'
              )}
            </Metric>
          </div>

          <div className="verticalLine h-14 my-auto"></div>

          <div className="mx-8 my-4 text-center min-w-[200px]">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage
                defaultMessage="TRANSACTIONS PER DAY"
                id="components.homeInfo.transactionPerDay"
              />
            </b>
            <Metric finalStr={tpdStr}>
              {inView ? (
                <CountUp separator="," start={0} end={transactionPerDay} duration={1.2} />
              ) : (
                '0'
              )}
            </Metric>
          </div>

          <div className="verticalLine h-14 my-auto"></div>

          <div className="mx-8 my-4 text-center min-w-[200px]">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage defaultMessage="HASH RATE" id="components.homeInfo.hashRate" />
            </b>
            <Metric finalStr={hrStr}>
              {inView ? (
                <>
                  <CountUp
                    separator=","
                    start={0}
                    end={hr}
                    duration={1.2}
                    decimals={2}
                  />{' '}
                  TH/s
                </>
              ) : (
                '0.00 TH/s'
              )}
            </Metric>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex justify-center items-stretch px-4">
        <div className="bg-white w-full max-w-[360px] mx-auto rounded-xl py-1 homeInfo-shadow overflow-hidden my-4">
          <div className="mx-8 my-6">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage
                defaultMessage="BLOCK REWARD"
                id="components.homeInfo.blockReward"
              />
            </b>
            <Metric finalStr={brStr}>
              {inView ? (
                <CountUp separator="," start={0} end={blockReward} duration={1.2} />
              ) : (
                '0'
              )}
            </Metric>
          </div>

          <div className="horizontallLine"></div>

          <div className="mx-8 my-6">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage
                defaultMessage="CIRCULATING SUPPLY"
                id="components.homeInfo.circulatingSupply"
              />
            </b>
            <Metric finalStr={csStr}>
              {inView ? (
                <CountUp separator="," start={0} end={cs} duration={1.2} />
              ) : (
                '0'
              )}
            </Metric>
          </div>

          <div className="horizontallLine"></div>

          <div className="mx-8 my-6">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage
                defaultMessage="TRANSACTIONS PER DAY"
                id="components.homeInfo.transactionPerDay"
              />
            </b>
            <Metric finalStr={tpdStr}>
              {inView ? (
                <CountUp separator="," start={0} end={transactionPerDay} duration={1.2} />
              ) : (
                '0'
              )}
            </Metric>
          </div>

          <div className="horizontallLine"></div>

          <div className="mx-8 my-6">
            <b className="text-brand-orange dark:text-brand-orange block whitespace-nowrap leading-none h-[20px] md:h-[24px]">
              <FormattedMessage defaultMessage="HASH RATE" id="components.homeInfo.hashRate" />
            </b>
            <Metric finalStr={hrStr}>
              {inView ? (
                <>
                  <CountUp
                    separator=","
                    start={0}
                    end={hr}
                    duration={1.2}
                    decimals={2}
                  />{' '}
                  TH/s
                </>
              ) : (
                '0.00 TH/s'
              )}
            </Metric>
          </div>
        </div>
      </div>
    </div>
  );
}
