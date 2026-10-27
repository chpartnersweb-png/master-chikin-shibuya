import type { APIRoute } from 'astro';
import { absoluteUrl, localizedPages, siteUrl } from '../data/site.mjs';

export const prerender = true;

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export const GET: APIRoute = () => {
  const pages = Object.values(localizedPages);
  const alternates = pages.map((page) => `    <xhtml:link rel="alternate" hreflang="${page.language}" href="${escapeXml(absoluteUrl(page.path))}" />`).join('\n');
  const urls = pages.map((page) => `  <url>\n    <loc>${escapeXml(absoluteUrl(page.path))}</loc>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(siteUrl)}" />\n  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
