import assert from 'node:assert/strict';
import test from 'node:test';
import localeConfig from '../utils/localeConfig.js';

test('Next i18n locales keep default plus supported locales', () => {
  assert.equal(localeConfig.NEXT_I18N_LOCALES[0], 'default');
  assert.deepEqual(localeConfig.NEXT_I18N_LOCALES.slice(1), localeConfig.SUPPORTED_LOCALES);
});

test('Chinese aliases map to site and Strapi locales', () => {
  assert.equal(localeConfig.toSiteLocale('zh-CN'), 'zh');
  assert.equal(localeConfig.toSiteLocale('cn'), 'zh');
  assert.equal(localeConfig.toStrapiLocale('cn'), 'zh');
});

test('Accept-Language base tags map to supported site locales', () => {
  assert.equal(localeConfig.toSiteLocale('pt-BR'), 'pt');
  assert.equal(localeConfig.toSiteLocale('de-CH'), 'de');
  assert.equal(localeConfig.toSiteLocale('fr-FR'), null);
});
