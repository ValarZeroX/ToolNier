import { Metadata } from 'next';
import { Welcome } from '@/components/Welcome/Welcome';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../i18n';
import ActionsGrid from '@/components/ActionsGrid/ActionsGrid';
import { generateSeoMetadata } from '@/lib/seo';
import JsonLd from '@/components/SEO/JsonLd';

type PageProps = { params: Promise<{ lng: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'grid');

  return generateSeoMetadata({
    title: t('metadata.home_page_title'),
    description: t('metadata.home_page_description'),
    keywords: t('metadata.home_page_keywords'),
    lng,
    path: '',
  });
}

export default async function HomePage({ params }: PageProps) {
  const { lng } = await params;

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ToolNier',
    url: 'https://toolnier.com',
    description: 'Free online tools: calculators, converters, random generators, developer utilities, and more.',
    inLanguage: [lng, 'zh-Hant', 'zh-Hans', 'en', 'ja'],
  };

  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <Layout lng={lng}>
        <Welcome lng={lng} />
        <ActionsGrid lng={lng} />
      </Layout>
    </>
  );
}
