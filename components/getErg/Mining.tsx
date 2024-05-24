import { FormattedMessage, useIntl } from 'react-intl';
import Button from '../Button';

function FormattedMessageFixed(props: any) {
  return <FormattedMessage {...props} />;
}

export default function Mining() {
  const intl = useIntl();
  const button1Text = intl.formatMessage({
    id: 'components.mining.button1',
    defaultMessage: 'DOCUMENTATION',
  });
  const button2Text = intl.formatMessage({
    id: 'components.mining.button2',
    defaultMessage: 'MINING POOL STATS',
  });
  const button3Text = intl.formatMessage({
    id: 'components.mining.button3',
    defaultMessage: 'DISCORD',
  });
  const button4Text = intl.formatMessage({
    id: 'components.mining.button4',
    defaultMessage: 'SUBREDDIT',
  });
  const button5Text = intl.formatMessage({
    id: 'components.mining.button5',
    defaultMessage: 'MINING BLOG POSTS',
  });
  const button6Text = intl.formatMessage({
    id: 'components.mining.button6',
    defaultMessage: 'EMISSION & TOKENOMICS',
  });

  let miningPoolsUrls = [
    {
      text: (
        <FormattedMessageFixed defaultMessage="F2POOL" id="components.mining.miningPools.f2pool" />
      ),
      url: 'https://www.f2pool.com/coin/ergo',
    },
    {
      text: (
        <FormattedMessageFixed defaultMessage="666 POOL" id="components.mining.miningPools.1" />
      ),
      url: 'https://www.666pool.cn/pool2',
    },
    {
      text: (
        <FormattedMessageFixed defaultMessage="HEROMINERS" id="components.mining.miningPools.2" />
      ),
      url: 'https://ergo.herominers.com/',
    },
    {
      text: (
        <FormattedMessageFixed defaultMessage="NANOPOOL" id="components.mining.miningPools.3" />
      ),
      url: 'https://ergo.nanopool.org/',
    },
    {
      text: (
        <FormattedMessageFixed defaultMessage="WOOLYPOOLY" id="components.mining.miningPools.4" />
      ),
      url: 'https://woolypooly.com/#/coin/erg',
    },
    {
      text: <FormattedMessageFixed defaultMessage="2MINERS" id="components.mining.miningPools.6" />,
      url: 'https://2miners.com/erg-mining-pool',
    },
    {
      text: <FormattedMessageFixed defaultMessage="KRYPTEX" id="components.mining.miningPools.7" />,
      url: 'https://pool.kryptex.com/erg',
    },
    {
      text: <FormattedMessageFixed defaultMessage="K1POOL" id="components.mining.miningPools.8" />,
      url: 'https://k1pool.com',
    },
    {
      text: <FormattedMessageFixed defaultMessage="Sigmanauts Pool" id="components.mining.miningPools.9" />,
      url: 'https://sigmanauts.com/mining/',
    },
  ];
  let minersUrls = [
    {
      text: <FormattedMessageFixed defaultMessage="RIGEL" id="components.mining.miners.1" />,
      url: 'https://github.com/rigelminer/rigel',
    },
    {
      text: <FormattedMessageFixed defaultMessage="NANOMINER" id="components.mining.miners.2" />,
      url: 'https://github.com/nanopool/nanominer/releases',
    },
    {
      text: <FormattedMessageFixed defaultMessage="NBMINER" id="components.mining.miners.3" />,
      url: 'https://github.com/NebuTech/NBMiner/releases',
    },
    {
      text: (
        <FormattedMessageFixed defaultMessage="SRBMINER-MULTI" id="components.mining.miners.4" />
      ),
      url: 'https://github.com/doktor83/SRBMiner-Multi/releases',
    },
    {
      text: (
        <FormattedMessageFixed defaultMessage="TEAM RED MINER" id="components.mining.miners.5" />
      ),
      url: 'https://github.com/todxx/teamredminer/releases/',
    },
  ];

  let urlsComponent = (
    <div>
      <h2 className="mt-8 lg:mt-24 font-vinila-extended-light text-[40px] lg:text-[48px] mb-14">
        <FormattedMessage defaultMessage="Mining Pools" id="components.mining.miningPoolsTitle" />
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {miningPoolsUrls.map((link, i) => (
          <div className="ml-6 mb-10" key={i}>
            <Button
              text={link.text}
              url={link.url}
              newTab={true}
              underline={true}
              textColor="brand-orange"
              background={false}
              icon="ArrowRight"
              iconColor="orange"
            />
          </div>
        ))}
      </div>
      <h2 className="mt-8 lg:mt-12 font-vinila-extended-light text-[40px] lg:text-[48px]  mb-14">
        <FormattedMessage defaultMessage="Miners" id="components.mining.minersTitle" />
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {minersUrls.map((link, i) => (
          <div className="ml-6 mb-10" key={i}>
            <Button
              text={link.text}
              url={link.url}
              newTab={true}
              underline={true}
              textColor="brand-orange"
              background={false}
              icon="ArrowRight"
              iconColor="orange"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div
      id="Mining"
      className="max-w-[1300px] mx-auto py-12 px-4 lg:py-16 lg:px-4 flex flex-col lg:flex-row relative z-10"
    >
      <div className="lg:w-1/2">
        <h1 className="font-vinila-extended text-bold text-[48px] lg:text-[120px]">
          <FormattedMessage defaultMessage="Mining" id="components.mining.title" />
        </h1>
        <div className="hidden lg:block">{urlsComponent}</div>
      </div>
      <div className="lg:w-1/2">
        <p className="text-[#807e7e] dark:text-[#807e7e] mt-8 lg:mt-16 text-[14px] lg:text-[16px] max-w-sm">
          <FormattedMessage
            defaultMessage="Ergo mining is based on Autolykos, a fairly launched efficient ASIC-resistant Proof of Work algorithm. Miners can adjust parameters with on-chain voting, with larger changes implemented by a supermajority via a soft-fork. As well as participate in any of the exciting developments such as voting tokens, subpooling, and log-space mining. Ergo focuses on simplicity in the core, with advanced features built on the application layer to create resilient, contractual money. "
            id={'components.mining.text.1'}
            values={{ breakingLine: <br /> }}
          />
        </p>
        <p className="text-[#807e7e] dark:text-[#807e7e] mt-8 text-bold text-[14px] lg:text-[24px]  max-w-lg">
          <FormattedMessage
            defaultMessage="Welcome to the future of Proof of Work."
            id={'components.mining.text.2'}
            values={{ breakingLine: <br /> }}
          />
        </p>
        <p className="text-[#807e7e] dark:text-[#807e7e] mt-8 lg:mt-16 text-[14px] lg:text-[16px] max-w-sm">
          <FormattedMessage
            defaultMessage="To get started, check out the community-built Mining Handbook, Documentation or join the mining discussion spaces."
            id={'components.mining.text.3'}
            values={{ breakingLine: <br /> }}
          />
        </p>
        <br />
        <Button
          text={button1Text}
          url="https://docs.ergoplatform.com/mining/"
          newTab={false}
          underline={true}
          textColor="brand-orange"
          background={false}
          icon="ArrowRight"
          iconColor="orange"
          customClass=" -ml-4 mb-8"
        />
        <br />
        <Button
          text={button2Text}
          url="https://miningpoolstats.stream/ergo"
          newTab={true}
          underline={true}
          textColor="brand-orange"
          background={false}
          icon="ArrowRight"
          iconColor="orange"
          customClass=" -ml-4 mb-8"
        />
        <br />
        <Button
          text={button3Text}
          url="https://discord.gg/ergo-platform-6689037863616512008"
          newTab={true}
          underline={true}
          textColor="brand-orange"
          background={false}
          icon="ArrowRight"
          iconColor="orange"
          customClass=" -ml-4 mb-8"
        />
        <br />
        <Button
          text={button4Text}
          url="https://www.reddit.com/r/erg_miners/"
          newTab={true}
          underline={true}
          textColor="brand-orange"
          background={false}
          icon="ArrowRight"
          iconColor="orange"
          customClass=" -ml-4 mb-8"
        />
        <br />
        <Button
          text={button5Text}
          url="/category/Mining/"
          newTab={false}
          underline={true}
          textColor="brand-orange"
          background={false}
          icon="ArrowRight"
          iconColor="orange"
          customClass=" -ml-4 mb-8"
        />
        <br />
        <Button
          text={button6Text}
          url="https://docs.ergoplatform.com/mining/emission/"
          newTab={true}
          underline={true}
          textColor="brand-orange"
          background={false}
          icon="ArrowRight"
          iconColor="orange"
          customClass=" -ml-4 mb-8"
        />
        <div className="lg:hidden">{urlsComponent}</div>
      </div>
    </div>
  );
}
