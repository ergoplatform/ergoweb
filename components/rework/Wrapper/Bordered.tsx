import React from 'react';
import LineBox from 'assets/index/why/line-box.svg';

interface Props {
  LeftSide: React.ReactNode;
  RightSide: React.ReactNode;
}

function Bordered(props: Props) {
  const { LeftSide, RightSide } = props;

  return (
    <div className="flex md-max:flex-col-reverse">
      <div
        className="
          w-1/2 p-13.5 pr-0 lg-max:p-10 lg-max:pr-0
          md-max:w-full md-max:pr-10 md-max:pt-0 md-max:pb-0
          sm-max:px-5
        "
      >
        <div className="brand-139-gradient p-13.5 h-full lg-max:p-10 sm-max:p-5">
          {LeftSide}
        </div>
      </div>
      <div
        className="
          grid grid-flow-col w-1/2 grid-rows-bordered grid-cols-bordered 
          lg-max:grid-rows-bordered-lg lg-max:grid-cols-bordered-lg 
          md-max:w-full md-max:grid-rows-bordered-md md-max:grid-cols-bordered-md
          sm-max:grid-rows-bordered-sm sm-max:grid-cols-bordered-sm
        "
      >
        <div
          className="
            relative h-13.5 col-span-1 row-span-1 w-full-1 bg-dark 
            border border-brand-orange border-r-0 lg-max:h-10
            md-max:col-start-1 md-max:h-full md-max:col-span-full
          "
        >
          <LineBox className="h-full w-auto" />
        </div>
        <div
          className="
            flex items-center justify-center
            bg-background-transparent row-span-start col-span-1 row-span-1 h-full
            md-max:col-span-2  md-max:row-start-2
          "
        >
          {RightSide}
        </div>
        <div
          className="
            relative h-13.5 col-start-1 row-start-3 w-full-1 bg-dark
            border border-brand-orange border-r-0 lg-max:h-10
            md-max:row-start-2 md-max:w-full md-max:border-r md-max:border-t-0 md-max:h-full-1 md-max:top-[-1px]
          "
        />
        <div
          className="
            row-span-full col-span-1 w-13.5 h-full 
            border border-brand-orange lg-max:w-10 sm-max:w-5
          "
        />
      </div>
    </div>
  );
}

export default Bordered;
