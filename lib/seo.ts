import { Metadata } from 'next';
import { languages } from '@/app/i18n/settings';

export const BASE_URL = 'https://toolnier.com';

interface SeoMetadataParams {
  title: string;
  description: string;
  keywords: string;
  lng: string;
  path: string; // path without language prefix, e.g., '/tools/qr-code-generator' or '' for homepage
}

export function generateSeoMetadata({ title, description, keywords, lng, path }: SeoMetadataParams): Metadata {
  const url = `${BASE_URL}/${lng}${path}`;

  const uniqueLanguages = Array.from(new Set(languages));
  const alternateLanguages: Record<string, string> = {};
  uniqueLanguages.forEach((lang) => {
    alternateLanguages[lang] = `${BASE_URL}/${lang}${path}`;
  });
  alternateLanguages['x-default'] = `${BASE_URL}/${uniqueLanguages[0]}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'ToolNier',
      locale: lng.replace('-', '_'),
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}
