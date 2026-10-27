// @ts-check
import { defineConfig } from 'astro/config';
import { siteUrl } from './src/data/site.mjs';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    locales: ['ja', 'en'], defaultLocale: 'ja',
    routing: { prefixDefaultLocale: false },
  },
});
