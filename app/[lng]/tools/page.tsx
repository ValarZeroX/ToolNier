import React from 'react';
import { Metadata } from 'next';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../i18n/index';
import ToolsActionsGrid from '@/components/ActionsGrid/ToolsActionsGrid';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'grid');

  return {
    title: t('metadata.tools_page_title'),
    description: t('metadata.tools_page_description'),
    keywords: t('metadata.tools_page_keywords'),
  };
}

type ToolsPageProps = { params: Promise<{ lng: string }> };

const ToolsPage = async ({ params }: ToolsPageProps) => {
  const { lng } = await params;
//   const { t } = await useTranslation(lng, 'common');

  return (
    <Layout lng={lng}>
      <ToolsActionsGrid lng={lng} />
    </Layout>
  );
};

export default ToolsPage;
