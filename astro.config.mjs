// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
const siteUrl = process.env.PUBLIC_SITE_URL;
export default defineConfig({
  ...(siteUrl ? { site: siteUrl } : {}),
  output: 'static',
  i18n: {
    locales: ['ja', 'en'], defaultLocale: 'ja',
    routing: { prefixDefaultLocale: false },
  },
});
