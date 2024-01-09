export const getFlagIconPath = (locale: string) => {
  const iconsFolder = '/assets/languages/';
  return iconsFolder + locale + '.svg';
};

export const getFullCountryName = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'English';
    case 'de':
      return 'Deutsch';
    case 'it':
      return 'Italian';
    case 'hu':
      return 'Hungarian';
    case 'ru':
      return 'Russian';
    case 'cn':
      return 'Chinese';
    case 'id':
      return 'Indonesian';
  }
};
