import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../i18n/index';
import RandomActionsGrid from '@/components/ActionsGrid/RandomActionsGrid';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'grid');

  return {
    title: t('metadata.random_tools_page_title'),
    description: t('metadata.random_tools_page_description'),
    keywords: t('metadata.random_tools_page_keywords'),
  };
}

type RandomPageProps = { params: Promise<{ lng: string }> };

const RandomPage = async ({ params }: RandomPageProps) => {
  const { lng } = await params;
//   const { t } = await useTranslation(lng, 'common');

  return (
    <Layout lng={lng}>
      <RandomActionsGrid lng={lng} />
    </Layout>
  );
};

export default RandomPage;
