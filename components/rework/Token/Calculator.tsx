import React, { useState } from 'react';
import Typography from 'components/rework/Typography';
import Input from 'components/rework/Input';

interface Props {
  currentBlockReward: number;
  currentPrice: number;
  networkHashrate: number;
  difficulty: number;
}

const BLOCK_TIME = 120;
const BLOCKS_PER_DAY = 86400 / BLOCK_TIME;

function Calculator(props: Props) {
  const [value, setValue] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue.match(/^(([0-9.]?)*)+$/) && inputValue[0] !== '.') {
      setValue(inputValue);
    }
  };

  const dailyRevenueERG =
    ((1000000 * props.currentBlockReward * parseFloat(value) * BLOCK_TIME) /
      props.difficulty) *
    BLOCKS_PER_DAY;

  return (
    <div className="container-rework section">
      <div
        className="
          bg-background p-15 flex items-end gap-x-24
          lg-max:gap-x-12 md-max:block md-max:p-10
          sm-max:p-5
        "
      >
        <div className="w-1/2 md-max:w-full md-max:mb-10 sm-max:mb-6">
          <Typography
            as={'h2'}
            type="heading-2"
            className="mb-12 md-max:mb-6 sm-max:mb-5"
          >
            Mining calculator
          </Typography>
          <div className="px-8 flex justify-between mb-2.5 md-max:px-6">
            <Typography type="alt">Your hashrate</Typography>
            <Typography type="alt" className="text-secondary">
              <span className="font-inter">1</span> ERG = ${' '}
              <span className="font-inter">
                {props.currentPrice.toFixed(2)}
              </span>
            </Typography>
          </div>
          <div className="relative mb-12 md-max:mb-6 sm-max:mb-5">
            <Input
              placeholder="Hashrate value"
              onChange={handleInput}
              value={value}
              className="bg-brand-black"
            />
            <Typography className="absolute right-8 top-5 text-secondary lg-max:top-4">
              MH/s
            </Typography>
          </div>
          <Typography as={'p'} type="title-3">
            Autolykos is the underlying memory-hard ASIC-resistant Proof of Work
            (PoW) algorithm oriented towards GPUs
          </Typography>
        </div>
        <div className="w-1/2 md-max:w-full">
          <div className="pb-6 border-b border-main-border mb-6 md-max:pb-5 md-max:mb-5">
            <Typography
              type="alt"
              className="text-secondary mb-2.5 sm-max:mb-1"
            >
              Current block reward
            </Typography>
            <Typography type="title-1">
              <span className="text-secondary">
                <span className="font-inter">
                  {props.currentBlockReward.toFixed(2)}
                </span>{' '}
                ERG =
              </span>{' '}
              ${' '}
              <span className="font-inter">
                {(props.currentBlockReward * props.currentPrice).toFixed(2)}
              </span>
            </Typography>
          </div>
          <div className="mb-6 md-max:mb-5">
            <Typography
              type="alt"
              className="text-secondary mb-2.5 sm-max:mb-1"
            >
              Network hashrate
            </Typography>
            <Typography type="title-1">
              <span className="font-inter">
                {(props.networkHashrate / 1000000000000).toFixed(2)}{' '}
              </span>
              <span className="text-secondary">TH/s</span>
            </Typography>
          </div>
          <div className="p-6 bg-brand-black border border-main-border sm-max:p-4">
            <Typography
              type="alt"
              className="text-secondary mb-2.5 sm-max:mb-1"
            >
              Daily revenue
            </Typography>
            <Typography type="title-1">
              <span className="text-secondary">
                <span className="font-inter">
                  {value ? dailyRevenueERG.toFixed(2) : '0.00'}
                </span>{' '}
                ERG
              </span>{' '}
              = $
              <span className="font-inter">
                {value
                  ? (dailyRevenueERG * props.currentPrice).toFixed(2)
                  : '0.00'}
              </span>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
