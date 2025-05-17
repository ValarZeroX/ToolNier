import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../i18n/index';
import SymbolsActionsGrid from '@/components/ActionsGrid/SymbolsActionsGrid';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'grid');

  return {
    title: t('metadata.symbols_page_title'),
    description: t('metadata.symbols_page_description'),
    keywords: t('metadata.symbols_page_keywords'),
  };
}

type SymbolsPageProps = { params: Promise<{ lng: string }> };

const SymbolsPage = async ({ params }: SymbolsPageProps) => {
  const { lng } = await params;
//   const { t } = await useTranslation(lng, 'common');

  return (
    <Layout lng={lng}>
      <SymbolsActionsGrid lng={lng} />
    </Layout>
  );
};

export default SymbolsPage;
