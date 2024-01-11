export type IAble = boolean | 'rotate';

interface ITableItemTitle {
  logo: string;
  name: string;
}

interface ITableItemText {
  text: string;
}

interface ITableItemAble {
  able: IAble;
}

export interface ITable {
  theads: string[];
  items: [
    ITableItemTitle,
    ITableItemText,
    ITableItemAble,
    ITableItemAble,
    ITableItemAble,
  ][];
}
