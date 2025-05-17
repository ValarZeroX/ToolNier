import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../i18n/index';
import ConvertersActionsGrid from '@/components/ActionsGrid/ConvertersActionsGrid';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'grid');

  return {
    title: t('metadata.converters_page_title'),
    description: t('metadata.converters_page_description'),
    keywords: t('metadata.converters_page_keywords'),
  };
}

type ConvertersPageProps = { params: Promise<{ lng: string }> };

const ConvertersPage = async ({ params }: ConvertersPageProps) => {
  const { lng } = await params;
//   const { t } = await useTranslation(lng, 'common');

  return (
    <Layout lng={lng}>
      <ConvertersActionsGrid lng={lng} />
    </Layout>
  );
};

    export default ConvertersPage;
