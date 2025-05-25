import { languages } from '@/app/i18n/settings';

export async function GET() {
  const baseUrl = 'https://toolnier.com';
  const staticPaths = [
    '',
    '/all',
    '/random',
    '/tools',
    '/symbols',
    '/converters',
    '/calculator',
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

  const urls = languages.flatMap((lng) =>
    staticPaths.map((path) => {
      const fullUrl = `${baseUrl}/${lng}${path}`;
      return `<url><loc>${fullUrl}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`;
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