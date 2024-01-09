interface ITableItemTitle {
  logo: string;
  name: string;
}

interface ITableItemText {
  text: string;
}

interface ITableItemAble {
  able: boolean | 'rotate';
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
