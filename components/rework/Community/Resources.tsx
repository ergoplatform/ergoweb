import React from 'react';
import Bordered from 'components/rework/Wrapper/Bordered';
import Typography from 'components/rework/Typography';
import ArrowIcon from 'assets/icons/arrow-rt.svg';

function Resources() {
  const Arrow = (
    <div
      className={`
        flex items-center justify-center size-16 rounded-full border border-transparent-20 md-max:size-11
        md-max:right-5 md-max:top-5
        `}
    >
      <ArrowIcon />
    </div>
  );

  const LeftSide = (
    <>
      <div className="max-w-[275px] sm-max:w-full sm-max:pb-36">
        <Typography as="p" type="title-1" className="mb-5 sm-max:mb-2">
          Ergo Community Forum
        </Typography>
        <Typography as="p" className="mb-8 sm-max:mb-5">
          Explore discussions on the Proof-of-Work algorithm Autolykos, Ergo
          mining, pooling efforts, and more. Share tips, ask questions, and
          collaborate
        </Typography>
        {Arrow}
      </div>
      <img
        className="absolute bottom-0 right-0 lg-max:w-[170px] sm-max:w-[170px]"
        src="/assets/rework/community/resources/forum.svg"
        alt="forum"
      />
    </>
  );

  const RightSide = (
    <>
      <div className="max-w-[275px] sm-max:w-full sm-max:pb-36">
        <Typography as="p" type="title-1" className="mb-5 sm-max:mb-2">
          Sigmanauts training programme
        </Typography>
        <Typography as="p" className="mb-8 sm-max:mb-5">
          Apply for the Sigmanaut Training Programme to help shape and grow
          Ergo.
        </Typography>
        {Arrow}
      </div>
      <img
        className="absolute bottom-0 right-0 lg-max:w-[210px] sm-max:w-[180px]"
        src="/assets/rework/community/resources/soldier.svg"
        alt="forum"
      />
    </>
  );

  return (
    <div className="container-rework section">
      <Bordered
        LeftSide={LeftSide}
        RightSide={RightSide}
        leftSideStyles="bg-card-transparent-2 relative"
        rightSideStyles="bg-card-transparent-3 relative border-brand-orange border-l p-15 lg-max:p-10 sm-max:p-5"
      />
    </div>
  );
}

export default Resources;
