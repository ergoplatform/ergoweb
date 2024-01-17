import React from 'react';
import ArrowTitle from 'components/rework/Title/ArrowTitle';
import Typography from 'components/rework/Typography';

function Hero() {
  return (
    <div className="container-rework">
      <div className="relative flex justify-between bg-background-card sm-max:flex-col-reverse sm-max:overflow-hidden">
        <div
          className="
          w-[489px] bg-background-card py-24 px-20 
          lg-max:py-16 lg-max:px-15 md-max:px-10
          md-max:py-12 sm-max:px-5 sm-max:pb-5 sm-max:pt-0 
          sm-max:mt-[-40px] sm-max:w-full
        "
        >
          <ArrowTitle className="mb-8 md-max:mb-2">
            Ergo <br /> token
          </ArrowTitle>
          <Typography
            as={'p'}
            className="max-w-[275px] lg-max:max-w-[250px] md-max:w-[190px] sm-max:w-full"
          >
            There is a rich ecosystem budding on top of Ergo. Whether you are a
            developer, miner, or investor - we’ve got you covered
          </Typography>
        </div>
        <div className="w-[608px] brand-139-gradient lg-max:w-[500px] md-max:hidden" />
        <div
          className="
            absolute size-full overflow-hidden flex items-center justify-center pl-72
            pointer-events-none	lg-max:pl-80 md-max:pl-0 md-max:justify-end sm-max:static 
            sm-max:overflow-visible
          "
        >
          <img
            src="/assets/token/coin.png"
            className="
              relative h-[140%] top-[7px] md-max:right-[-85px] sm-max:h-[220px] 
              sm-max:right-[-50px] sm-max:top-[-22px]
            "
            alt="Coin"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
