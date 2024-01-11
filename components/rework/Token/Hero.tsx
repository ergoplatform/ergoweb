import React from 'react';
import ArrowTitle from 'components/rework/Title/ArrowTitle';
import Typography from 'components/rework/Typography';

function Hero() {
  return (
    <div className="container-rework">
      <div className="relative flex justify-between bg-background-card">
        <div className="w-[489px] bg-background-card py-24 px-20">
          <ArrowTitle className="mb-8">
            Ergo <br /> token
          </ArrowTitle>
          <Typography as={'p'} className="max-w-[275px]">
            There is a rich ecosystem budding on top of Ergo. Whether you are a
            developer, miner, or investor - we’ve got you covered
          </Typography>
        </div>
        <div className="w-[608px] brand-139-gradient" />
        <div className="absolute size-full">
          <img src="/assets/token/coin.png" className="h-full" alt="Coin" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
