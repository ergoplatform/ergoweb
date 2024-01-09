import React from 'react';
import Typography from 'components/rework/Typography';
import SingleFieldForm from 'components/rework/Form/SingleFieldForm';
import ArrowTitle from 'components/rework/Title/ArrowTitle';

function Newsletter() {
  return (
    <div className="container-rework section">
      <div
        className="
          flex items-center space-between gap-6 px-24.5
          lg-max:px-20 lg-max:gap-8
          md-max:px-0 md-max:gap-14.5 md-max:justify-center
          sm-max:block
        "
      >
        <ArrowTitle className="w-[498px] shrink-0 lg-max:w-auto sm-max:mb-6">
          Ergo's <br />
          newsletter
        </ArrowTitle>
        <div>
          <Typography type="title-3" as={'p'} className="mb-6 md-max:mb-5">
            Stay up to date for the latest crypto news, courses & more!
          </Typography>
          <SingleFieldForm className="w-[444px] lg-max:w-auto" />
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
