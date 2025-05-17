import React from 'react';
import { Metadata } from 'next';
import ActionsGrid from '@/components/ActionsGrid/ActionsGrid';

import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../i18n/index';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'privacy');

  return {
    title: t('metadata.privacy_page_title'),
    description: t('metadata.privacy_page_description'),
    keywords: t('metadata.privacy_page_keywords'),
  };
}

type PrivacyPageProps = { params: Promise<{ lng: string }> };

const PrivacyPage = async ({ params }: PrivacyPageProps) => {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'privacy');

  return (
    <Layout lng={lng}>
      <ActionsGrid lng={lng} />
    </Layout>
  );
};

export default PrivacyPage;
