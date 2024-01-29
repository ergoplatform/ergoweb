import React from 'react';
import Bordered from 'components/rework/Wrapper/Bordered';
import Typography from 'components/rework/Typography';
import Button from 'components/rework/Button';

function Help() {
  const LeftSide = (
    <div className="flex items-center justify-center w-full h-full md-max:h-auto">
      <img
        src="/assets/rework/community/help/screen.png"
        alt="Screen"
        className="screen-shadow max-h-[276px] w-auto"
      />
    </div>
  );

  const RightSide = (
    <div className="flex justify-start flex-col	items-start p-13.5 lg-max:p-10 sm-max:p-5">
      <Typography as={'span'} type="heading-3" className="mb-5 sm-max:mb-2">
        Haven’t find your answer? Mention these team to help
      </Typography>
      <Typography as={'p'} className="mb-12 md-max:mb-8 sm-max:mb-5">
        Our strength - our helpful community. Any question can be solved
        together
      </Typography>
      <Button type="link" link="/" kind="filled">
        Explore
      </Button>
    </div>
  );

  return (
    <div className="container-rework flex section">
      <Bordered
        LeftSide={LeftSide}
        RightSide={RightSide}
        leftSideStyles="brand-139-gradient"
      />
    </div>
  );
}

export default Help;
