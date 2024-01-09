import React from 'react';
import Bordered from 'components/rework/Wrapper/Bordered';
import Typography from 'components/rework/Typography';
import Button from 'components/rework/Button';

function Contributing() {
  const LeftSide = (
    <div className="flex items-center justify-center w-full h-full p-4 md-max:h-auto">
      <img
        src="/assets/index/contributing/swim.svg"
        alt="Contributing"
        className="w-full"
      />
    </div>
  );

  const RightSide = (
    <div className="flex justify-start flex-col	items-start p-13.5 lg-max:p-10 sm-max:p-5">
      <Typography as={'span'} type="heading-3" className="mb-5 sm-max:mb-2">
        Contributing to Ergo
      </Typography>
      <Typography className="mb-12 md-max:mb-8 sm-max:mb-5">
        Ergo embraces an open model, welcoming and valuing contributions from
        all. Whether you're a developer, marketer, or enthusiast, there are many
        ways to contribute to Ergo's growth
      </Typography>
      <Button type="link" link="/" kind="filled">
        Explore
      </Button>
    </div>
  );

  return (
    <div className="container-rework flex section">
      <Bordered LeftSide={LeftSide} RightSide={RightSide} />
    </div>
  );
}

export default Contributing;
