import { copy, store, type Locale } from './store';
import { absoluteUrl, localizedPages, siteUrl } from './site.mjs';

interface SeoImage {
  url: string;
  width: number;
  height: number;
}

export function createSeo(locale: Locale, image: SeoImage) {
  const t = copy[locale];
  const canonical = absoluteUrl(localizedPages[locale].path);
  const websiteId = `${siteUrl}#website`;
  const restaurantId = `${siteUrl}#restaurant`;
  const webpageId = `${canonical}#webpage`;
  const imageId = `${canonical}#primaryimage`;

  return {
    title: t.title,
    description: t.description,
    canonical,
    image,
    ogLocale: localizedPages[locale].ogLocale,
    alternateOgLocale: localizedPages[locale === 'ja' ? 'en' : 'ja'].ogLocale,
    alternates: Object.values(localizedPages).map((page) => ({
      language: page.language,
      url: absoluteUrl(page.path),
    })),
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': websiteId,
          url: siteUrl,
          name: store.name,
          alternateName: store.nameJa,
          inLanguage: ['ja', 'en'],
          publisher: { '@id': restaurantId },
        },
        {
          '@type': 'WebPage',
          '@id': webpageId,
          url: canonical,
          name: t.title,
          description: t.description,
          inLanguage: locale,
          isPartOf: { '@id': websiteId },
          mainEntity: { '@id': restaurantId },
          primaryImageOfPage: { '@id': imageId },
        },
        {
          '@type': 'ImageObject',
          '@id': imageId,
          url: image.url,
          contentUrl: image.url,
          width: image.width,
          height: image.height,
          encodingFormat: 'image/jpeg',
          caption: t.heroAlt,
          inLanguage: locale,
        },
        {
          '@type': 'Restaurant',
          '@id': restaurantId,
          name: store.name,
          alternateName: store.nameJa,
          url: siteUrl,
          description: t.description,
          image: { '@id': imageId },
          mainEntityOfPage: { '@id': webpageId },
          servesCuisine: ['Halal', 'Chicken', 'Burgers'],
          address: {
            '@type': 'PostalAddress',
            streetAddress: store.streetAddress,
            addressLocality: '渋谷区',
            addressRegion: '東京都',
            postalCode: store.postalCode,
            addressCountry: 'JP',
          },
          openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: store.hours.opens,
            closes: store.hours.closes,
          },
          hasMenu: `${canonical}#menu`,
          hasMap: store.maps,
          sameAs: [store.instagram],
        },
      ],
    },
  };
}
