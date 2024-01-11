import { ITable } from 'types/table';

const logosPath = '/assets/logos/exchanges/';

export const exchanges: ITable = {
  theads: ['Exchange', 'Pairs', 'KYC', 'By crypto', 'By fiat'],
  items: [
    [
      {
        logo: logosPath + 'kucoin.png',
        name: 'KuCoin',
      },
      {
        text: 'USDT, BTC',
      },
      {
        able: true,
      },
      {
        able: true,
      },
      {
        able: true,
      },
    ],
    [
      {
        logo: logosPath + 'coinex.png',
        name: 'CoinEx',
      },
      {
        text: 'USDT, BTC, USDC',
      },
      {
        able: false,
      },
      {
        able: true,
      },
      {
        able: true,
      },
    ],
    [
      {
        logo: logosPath + 'gateio.png',
        name: 'Gate.io',
      },
      {
        text: 'USDT, ETH',
      },
      {
        able: true,
      },
      {
        able: true,
      },
      {
        able: true,
      },
    ],
    [
      {
        logo: logosPath + 'changelly.png',
        name: 'Changelly',
      },
      {
        text: 'USDT, ETH',
      },
      {
        able: false,
      },
      {
        able: true,
      },
      {
        able: true,
      },
    ],
    [
      {
        logo: logosPath + 'bitpanda.png',
        name: 'BitPanda',
      },
      {
        text: 'USDT, ETH',
      },
      {
        able: true,
      },
      {
        able: true,
      },
      {
        able: true,
      },
    ],
    [
      {
        logo: logosPath + 'huobi.png',
        name: 'Huobi',
      },
      {
        text: 'USDT, ETH',
      },
      {
        able: true,
      },
      {
        able: true,
      },
      {
        able: true,
      },
    ],
  ],
};
