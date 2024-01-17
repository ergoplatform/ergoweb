import React from 'react';
import Typography from 'components/rework/Typography';
import Button from 'components/rework/Button';
import { miners, miningPools } from 'content/mine';
import ExternalLink from 'components/rework/ExternalLink';
import Arrow from 'assets/icons/arrow-big.svg';

function Mine() {
  return (
    <div className="container-rework section flex gap-x-[104px] lg-max:gap-x-[40px] md-max:block">
      <div className="w-[384px] shrink-0 lg-max:w-[360px] md-max:w-full md-max:mb-6">
        <Typography as={'h2'} type="heading-3" className="mb-8 md-max:mb-2">
          How to mine ERGO with ease?
        </Typography>
        <Typography as={'p'} className="mb-12 md-max:mb-5">
          Ergo's mining uses Autolykos, an ASIC-resistant Proof of Work. Miners
          adjust settings through on-chain votes, major changes via
          supermajority voting. They engage in innovations like voting tokens,
          subpooling, and log-space mining. Ergo emphasizes core simplicity and
          resilient, contract-based currency with advanced application layer
          features
        </Typography>
        <div className="flex gap-x-2.5">
          <Button kind="filled" type="link" link="/">
            Docs
          </Button>
          <Button kind="filled" type="link" link="/">
            Emission & tokenomics
          </Button>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-background-card p-10 mb-[2px] sm-max:p-5">
          <div className="flex justify-between mb-8 md-max:mb-6 sm-max:block">
            <Typography as="h3" type="title-3" className="sm-max:mb-4">
              Mining Pools
            </Typography>
            <Button
              type="link"
              link="/"
              kind="underline"
              icon={<Arrow className="stroke-2 h-auto md-max:w-5" />}
            >
              Explore mining pools stats
            </Button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {miningPools.map((item, idx) => {
              return (
                <ExternalLink link={item.link} key={idx}>
                  {item.name}
                </ExternalLink>
              );
            })}
          </div>
        </div>
        <div className="bg-background-card p-10 sm-max:p-5">
          <div className="mb-8  md-max:mb-6 sm-max:mb-5">
            <Typography as="h3" type="title-3">
              Miners
            </Typography>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {miners.map((item, idx) => {
              return (
                <ExternalLink link={item.link} key={idx}>
                  {item.name}
                </ExternalLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mine;
