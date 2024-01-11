import { ITable } from 'types/table';

const logosPath = '/assets/logos/wallets/';

export const wallets: ITable = {
  theads: ['Wallets', 'Feature', 'Cold Storage', 'dApp Connector', 'ErgoPay'],
  items: [
    [
      {
        logo: logosPath + 'ergo.svg',
        name: 'Ergo Wallet App',
      },
      {
        text: 'For mobile',
      },
      {
        able: true,
      },
      {
        able: false,
      },
      {
        able: true,
      },
    ],
    [
      {
        logo: logosPath + 'nautilus.svg',
        name: 'Nautilus',
      },
      {
        text: 'For dApps',
      },
      {
        able: true,
      },
      {
        able: true,
      },
      {
        able: false,
      },
    ],
    [
      {
        logo: logosPath + 'satergo.svg',
        name: 'Satergo',
      },
      {
        text: 'Desktop',
      },
      {
        able: 'rotate',
      },
      {
        able: false,
      },
      {
        able: true,
      },
    ],
    [
      {
        logo: logosPath + 'safew.svg',
        name: 'SAFEW',
      },
      {
        text: 'Dev Tooling',
      },
      {
        able: 'rotate',
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
        logo: logosPath + 'minotaur.svg',
        name: 'Minotaur',
      },
      {
        text: 'Multi Platform',
      },
      {
        able: 'rotate',
      },
      {
        able: false,
      },
      {
        able: true,
      },
    ],
    [
      {
        logo: logosPath + 'ergo.svg',
        name: 'Ergo Node',
      },
      {
        text: 'Multi Platform',
      },
      {
        able: false,
      },
      {
        able: false,
      },
      {
        able: false,
      },
    ],
  ],
};
