import { languages } from '@/app/i18n/settings';

const BASE_URL = 'https://toolnier.com';

export async function GET() {
  const staticPaths = [
    '',
    '/all',
    '/random',
    '/tools',
    '/symbols',
    '/converters',
    '/calculator',
    '/privacy',
    '/disclaimer',
    '/symbols/symbol',
    '/symbols/emoji',
    '/random/draw',
    '/random/wheel',
    '/random/sort',
    '/random/group',
    '/random/number',
    '/tools/qr-code-generator',
    '/tools/base64-encoder-decoder',
    '/tools/image-base64-converter',
    '/tools/uuid-generator',
    '/tools/json-formatter',
    '/tools/text-stat',
    '/tools/color-picker',
    '/tools/color-code-chart',
    '/tools/password-generator',
    '/tools/ip-lookup',
    '/tools/url-encoder',
    '/converters/length',
    '/converters/weight',
    '/converters/temperature',
    '/converters/time',
    '/converters/timestamp',
    '/calculator/bmi',
    '/calculator/bmr',
    '/calculator/body-fat',
    '/calculator/tdee',
    '/calculator/age',
    '/calculator/days-between-dates',
  ];

  const uniqueLanguages = Array.from(new Set(languages));

  const urls = uniqueLanguages.flatMap((lng) =>
    staticPaths.map((path) => {
      const fullUrl = `${BASE_URL}/${lng}${path}`;

      // Generate hreflang alternate links for all languages
      const hreflangLinks = uniqueLanguages.map(
        (altLng) =>
          `    <xhtml:link rel="alternate" hreflang="${altLng}" href="${BASE_URL}/${altLng}${path}" />`
      );
      // Add x-default pointing to fallback language
      hreflangLinks.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/${uniqueLanguages[0]}${path}" />`
      );

      return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>2025-02-09T00:00:00.000Z</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${path === '' ? '1.0' : path.split('/').length <= 2 ? '0.8' : '0.6'}</priority>
${hreflangLinks.join('\n')}
  </url>`;
    })
  );

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls.join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
