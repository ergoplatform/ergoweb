import React from 'react';
import Link from 'next/link';
import Typography from 'components/rework/Typography';
import ArrowIcon from 'assets/icons/arrow-rt.svg';
import LineBox from 'assets/index/why/line-box.svg';

function Explore() {
  const Arrow = (
    <div className="flex items-center justify-center size-16 rounded-full border border-transparent-20 md-max:size-11  transition-colors group-hover:border-brand-orange">
      <ArrowIcon />
    </div>
  );
  return (
    <div className="container-rework section">
      <div className="flex mb-12 items-center gap-x-16 md-max:block md-max:mb-6">
        <Typography as="h2" type="heading-3" className="md-max:mb-2">
          Explore ERG
        </Typography>
        <Typography as={'p'} className="max-w-[505px] lg-max:max-w-[440px]">
          There is a rich ecosystem budding on top of Ergo. Whether you are a
          developer, miner, or investor, we have you covered
        </Typography>
      </div>
      <div
        className="
          relative border border-main-border p-13.5 pb-0
          lg-max:p-10 lg-max:pb-0
          sm-max:p-5 sm-max:pb-0
        "
      >
        <LineBox className="absolute left-0 bottom-0 stroke-main-border size-13.5 lg-max:size-10 sm-max:size-5" />
        <Link
          href={'#'}
          className=" block
        relative overflow-hidden h-full-1 border border-main-border border-b-0 
        p-13.5 mb-[-1px] bg-background-cardDark lg-max:p-10 sm-max:p-5 group"
        >
          <Typography type="title-1" className="mb-5 sm-max:mb-2">
            Buy & hodl
          </Typography>
          <Typography
            as={'p'}
            className="mb-8 md-max:max-w-[185px] sm-max:max-w-[110px] sm-max:mb-5"
          >
            Purchase ERG and hold with confidence
          </Typography>
          {Arrow}
          <img
            src="/assets/index/explore/buy.svg"
            className="
              absolute right-[136px] top-[-69px] w-[302px]
              lg-max:right-[88px] lg-max:top-[-95px] lg-max:w-[279px]
              md-max:w-[180px] md-max:right-[45px] md-max:top-[30px]
              sm-max:w-[105px] sm-max:right-[20px] sm-max:top-[48px]
            "
          />
        </Link>
      </div>
      <div
        className="
          flex relative border border-brand-orange border-t-0 p-13.5 pt-0
          lg-max:p-10 lg-max:pt-0
          md-max:block
          sm-max:p-5 sm-max:pt-0
        "
      >
        <Link
          href={'#'}
          className="
            relative overflow-hidden h-full-1 border border-brand-orange border-t-0 
            border-r-0 p-13.5 mb-[-1px] bg-card-transparent-2 w-1/2 lg-max:p-10
            md-max:w-full md-max:border md-max:border-b-0 md-max:border-t-0
            sm-max:p-5 group block
          "
        >
          <Typography type="title-1" className="mb-5 sm-max:mb-2">
            Earn
          </Typography>
          <Typography
            as={'p'}
            className="mb-8 lg-max:max-w-[160px] sm-max:w-[110px] sm-max:mb-5"
          >
            Earn by contributing to the network
          </Typography>
          {Arrow}
          <img
            src="/assets/index/explore/earn.svg"
            className="
              absolute right-[-22px] bottom-[40px] w-[209px]
              lg-max:bottom-[30px] lg-max:w-[191px]
              md-max:right-[50px]
              sm-max:w-[135px]  sm-max:right-[-15px] sm-max:bottom-[25px]
            "
          />
        </Link>
        <Link
          href={'#'}
          className="
            relative overflow-hidden h-full-1 border-b border-brand-orange
            p-13.5 mb-[-1px] bg-card-transparent-3 w-1/2 lg-max:p-10
            md-max:w-full md-max:border md-max:border-t-0
            sm-max:p-5 group block
          "
        >
          <Typography type="title-1" className="mb-5 sm-max:mb-2">
            Mine
          </Typography>
          <Typography
            as={'p'}
            className="mb-8 lg-max:max-w-[215px] md-max:max-w-[130px] sm-max:w-[110px] sm-max:mb-5"
          >
            Mine ERG, simple and accessible
          </Typography>
          {Arrow}
          <img
            src="/assets/index/explore/mine.svg"
            className="
              absolute right-[-10px] bottom-[58px] w-[255px]
              lg-max:w-[220px]
              md-max:right-[32px]
              sm-max:w-[154px] sm-max:right-[-10px] sm-max:bottom-[32px]
            "
          />
        </Link>
        <LineBox className="absolute right-0 top-0 size-13.5 lg-max:size-10 sm-max:size-5" />
      </div>
    </div>
  );
}

export default Explore;
