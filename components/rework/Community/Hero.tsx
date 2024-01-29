import React from 'react';
import Typography from 'components/rework/Typography';
import Button from 'components/rework/Button';
import HeroTemplate from 'components/rework/Wrapper/HeroTemplate';
import ArrowTitle from 'components/rework/Title/ArrowTitle';

function Hero() {
  const leftSide = (
    <>
      <ArrowTitle className="max-w-[448px] mb-8 md-max:mb-2 sm-max:max-w-[220px]">
        Together, crafting <br /> the vision <br /> of tomorrow
      </ArrowTitle>
      <Typography as="p" className="mb-12 md-max:mb-5">
        Resilient Layer-1 PoW blockchain with efficient, eUTXO-based smart
        contracts, enhancing security and flexibility
      </Typography>
    </>
  );

  const rightSide = (
    <img
      src="/assets/rework/community/hero/bg.png"
      className="w-full"
      alt="Ergo token"
    />
  );

  return (
    <HeroTemplate
      LeftSide={leftSide}
      RightSide={rightSide}
      leftSideClassName={
        "sm-max:bg-[url('/assets/rework/community/hero/bg.png')] sm-max:bg-[length:300px] sm-max:bg-[right_-120px_top_-50px]"
      }
      gradientType="dark"
    />
  );
}

export default Hero;
