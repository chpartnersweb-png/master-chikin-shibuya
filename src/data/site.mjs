// The user-supplied production URL is the single source for all SEO URLs.
export const siteUrl = 'https://master-chikin-shibuya.pages.dev/';

export const localizedPages = {
  ja: { path: '/', language: 'ja', ogLocale: 'ja_JP' },
  en: { path: '/en/', language: 'en', ogLocale: 'en_US' },
};

/** @param {string} path */
export function absoluteUrl(path = '/') {
  return new URL(path, siteUrl).href;
}

export const robotsPolicy = 'index, follow, max-image-preview:large';
