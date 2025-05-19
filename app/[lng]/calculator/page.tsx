import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../i18n/index';
import CalculatorActionsGrid from '@/components/ActionsGrid/CalculatorActionsGrid';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'grid');

  return {
    title: t('metadata.calculator_page_title'),
    description: t('metadata.calculator_page_description'),
    keywords: t('metadata.calculator_page_keywords'),
  };
}

type CalculatorPageProps = { params: Promise<{ lng: string }> };

const CalculatorPage = async ({ params }: CalculatorPageProps) => {
  const { lng } = await params;
//   const { t } = await useTranslation(lng, 'common');

  return (
    <Layout lng={lng}>
      <CalculatorActionsGrid lng={lng} />
    </Layout>
  );
};

    export default CalculatorPage;
