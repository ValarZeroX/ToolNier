import React from 'react';
import { Metadata } from 'next';
import ActionsGrid from '@/components/ActionsGrid/ActionsGrid';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'grid');

  return generateSeoMetadata({
    title: t('metadata.all_page_title'),
    description: t('metadata.all_page_description'),
    keywords: t('metadata.all_page_keywords'),
    lng,
    path: '/all',
  });
}

type AllPageProps = { params: Promise<{ lng: string }> };

const AllPage = async ({ params }: AllPageProps) => {
  const { lng } = await params;

  return (
    <Layout lng={lng}>
      <ActionsGrid lng={lng} />
    </Layout>
  );
};

export default AllPage;
