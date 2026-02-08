import React from 'react';
import { Metadata } from 'next';
import { Container, Title, Text, Stack, Anchor } from '@mantine/core';

import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'privacy');

  return generateSeoMetadata({
    title: t('metadata.privacy_page_title'),
    description: t('metadata.privacy_page_description'),
    keywords: t('metadata.privacy_page_keywords'),
    lng,
    path: '/privacy',
  });
}

type PrivacyPageProps = { params: Promise<{ lng: string }> };

const PrivacyPage = async ({ params }: PrivacyPageProps) => {
  const { lng } = await params;
  const { t } = await useTranslation(lng, 'privacy');

  return (
    <Layout lng={lng}>
      <Container size="md" py="xl">
        <Stack gap="md">
          <Title order={1}>{t('privacy.title')}</Title>

          <Text>
            {t('privacy.introduction')}
          </Text>

          <Title order={2}>{t('privacy.sections.google_analytics.title')}</Title>
          <Text>
            {t('privacy.sections.google_analytics.content')}
          </Text>
          <Text>
            {t('privacy.sections.google_analytics.privacy_policy')}{' '}
            <Anchor href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              {t('privacy.sections.google_analytics.privacy_policy_link')}
            </Anchor>。
          </Text>

          <Title order={2}>{t('privacy.sections.google_adsense.title')}</Title>
          <Text>
            {t('privacy.sections.google_adsense.content')}
          </Text>
          <Text>
            {t('privacy.sections.google_adsense.settings')}{' '}
            <Anchor href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
              {t('privacy.sections.google_adsense.settings_link')}
            </Anchor>
            {t('privacy.sections.google_adsense.settings_middle')}{' '}
            <Anchor href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              {t('privacy.sections.google_adsense.privacy_terms')}
            </Anchor>
            {t('privacy.sections.google_adsense.settings_end')}
          </Text>

          <Title order={2}>{t('privacy.sections.cookies.title')}</Title>
          <Text>
            {t('privacy.sections.cookies.content')}
          </Text>

          <Title order={2}>{t('privacy.sections.third_party_links.title')}</Title>
          <Text>
            {t('privacy.sections.third_party_links.content')}
          </Text>

          <Text fw={500} mt="xl">
            {t('privacy.agreement')}
          </Text>

          <Text>
            {t('privacy.contact')}
          </Text>
        </Stack>
      </Container>
    </Layout>
  );
};

export default PrivacyPage;
