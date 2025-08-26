export const SUPPORTED_LOCALES = [
  'en',
  'es',
  'de',
  'it',
  'pl',
  'pt',
  'sk',
  'zh',
  'hu',
  'ru',
  'id',
  'tr',
];
export const NON_DEFAULT_LOCALES = SUPPORTED_LOCALES.filter((l) => l !== 'en');

export type LocaleMeta = {
  nativeName: string;
  englishName: string;
  flag: string; // matches Flag code in components/icons/flags.tsx
};

export const LOCALE_META: Record<string, LocaleMeta> = {
  en: { nativeName: 'English', englishName: 'English', flag: 'gb' }, // Use GB by default; switch to 'us' if preferred
  es: { nativeName: 'Español', englishName: 'Spanish', flag: 'es' },
  de: { nativeName: 'Deutsch', englishName: 'German', flag: 'de' },
  it: { nativeName: 'Italiano', englishName: 'Italian', flag: 'it' },
  pl: { nativeName: 'Polski', englishName: 'Polish', flag: 'pl' },
  pt: { nativeName: 'Português', englishName: 'Portuguese', flag: 'pt' },
  sk: { nativeName: 'Slovenčina', englishName: 'Slovak', flag: 'sk' },
  zh: { nativeName: '简体中文', englishName: 'Chinese (Simplified)', flag: 'cn' },
  cn: { nativeName: '简体中文', englishName: 'Chinese (Simplified)', flag: 'cn' }, // alias for compatibility
  hu: { nativeName: 'Magyar', englishName: 'Hungarian', flag: 'hu' },
  ru: { nativeName: 'Русский', englishName: 'Russian', flag: 'ru' },
  id: { nativeName: 'Bahasa Indonesia', englishName: 'Indonesian', flag: 'id' },
  tr: { nativeName: 'Türkçe', englishName: 'Turkish', flag: 'tr' },
};
