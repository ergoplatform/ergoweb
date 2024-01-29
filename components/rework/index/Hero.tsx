import React from 'react';
import Typography from 'components/rework/Typography';
import Button from 'components/rework/Button';
import HeroTemplate from 'components/rework/Wrapper/HeroTemplate';

function Hero() {
  const leftSide = (
    <>
      <Typography
        className="mb-8 md-max:mb-2 sm-max:max-w-[220px]"
        as="h1"
        type="heading-1"
      >
        ERGO. Customisable Cash
      </Typography>
      <Typography as="p" className="mb-12 md-max:mb-5">
        Resilient Layer-1 PoW blockchain with efficient, eUTXO-based smart
        contracts, enhancing security and flexibility
      </Typography>
      <div className="flex items-center gap-x-6 md-max:inline-block sm-max:flex sm-max:items-center sm-max:gap-x-3">
        <Button
          kind="filled"
          type="link"
          link={'/'}
          className="md-max:mb-6 sm-max:mb-0"
        >
          Discover Ergo
        </Button>
        <Button kind="underline" type="link" link={'/'}>
          Start building
        </Button>
      </div>
    </>
  );

  const rightSide = (
    <img src="/assets/index/hero/bg.png" className="w-[92%]" alt="Ergo token" />
  );

  return (
    <HeroTemplate
      LeftSide={leftSide}
      RightSide={rightSide}
      leftSideClassName={"sm-max:bg-[url('/assets/index/hero/bg-sm.png')]"}
    />
  );
}

export default Hero;
