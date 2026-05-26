const SUPPORTED_LOCALES = ['en', 'es', 'de', 'it', 'pl', 'pt', 'sk', 'zh', 'hu', 'ru', 'id', 'tr'];

const DEFAULT_LOCALE = 'en';
const NEXT_I18N_LOCALES = ['default', ...SUPPORTED_LOCALES];

function toStrapiLocale(locale) {
  return locale === 'cn' ? 'zh' : locale;
}

function toSiteLocale(locale) {
  if (!locale) return null;
  const lower = locale.toLowerCase();
  const base = lower.split('-')[0];
  if (lower.startsWith('zh') || lower === 'cn') return 'zh';
  if (SUPPORTED_LOCALES.includes(lower)) return lower;
  if (SUPPORTED_LOCALES.includes(base)) return base;
  return null;
}

module.exports = {
  DEFAULT_LOCALE,
  NEXT_I18N_LOCALES,
  SUPPORTED_LOCALES,
  toSiteLocale,
  toStrapiLocale,
};
