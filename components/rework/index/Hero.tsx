import Typography from 'components/rework/Typography';
import React from 'react';
import Button from 'components/rework/Button';

function Hero() {
  return (
    <div className="container-rework flex">
      <div
        className="
          w-1/2 py-28 px-20 bg-background
          lg-max:px-13.5 lg-max:py-20.5
          md-max:px-7.5 md-max:py-10
          sm-max:w-full sm-max:p-5 sm-max:pt-20 sm-max:bg-right-top
          sm-max:bg-[url('/assets/index/hero/bg-sm.png')] sm-max:bg-no-repeat
        "
      >
        <Typography className="mb-8 md-max:mb-2 sm-max:max-w-[220px]" as="h1" type="heading-1">
          ERGO. Customisable Cash
        </Typography>
        <Typography as="p" className="mb-12 md-max:mb-5">
          Resilient Layer-1 PoW blockchain with efficient, eUTXO-based smart contracts, enhancing
          security and flexibility
        </Typography>
        <div className="flex md-max:inline-block sm-max:flex sm-max:items-center sm-max:gap-x-3">
          <Button kind="filled" type="link" link={'/'} className="md-max:mb-6 sm-max:mb-0">
            Discover Ergo
          </Button>
          <Button kind="underline" type="link" link={'/'}>
            Start building
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-center w-1/2 brand-gradient sm-max:hidden">
        <img src="/assets/index/hero/bg.png" className="w-[92%]" alt="Ergo token" />
      </div>
    </div>
  );
}

export default Hero;
