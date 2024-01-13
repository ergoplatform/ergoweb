import React from 'react';
import Bordered from 'components/rework/Wrapper/Bordered';
import Typography from 'components/rework/Typography';

function Why() {
  const LeftSide = (
    <>
      <Typography as="p" type="title-3" className="mb-6 italic sm-max:mb-5">
        "Cryptocurrency should provide tools to enrich ordinary people. Small businesses struggling
        to make ends meet, not big depersonalized financial capital. This is what inspired us. This
        is our dream."
      </Typography>
      <Typography as="p" type="title-3">
        Ergo Manifesto
      </Typography>
    </>
  );

  const RightSide = (
    <div className="md-max:h-36 md-max:flex md-max:items-center sm-max:h-[152px]">
      <Typography as={'span'} type="heading-3">
        Why Ergo?
      </Typography>
    </div>
  );

  return (
    <div className="container-rework flex section">
      <Bordered LeftSide={LeftSide} RightSide={RightSide} />
    </div>
  );
}

export default Why;
