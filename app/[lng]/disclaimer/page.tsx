import React from 'react';
import { Metadata } from 'next';
import { Container, Title, Text, Stack } from '@mantine/core';

import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lng: string }> }): Promise<Metadata> {
    const { lng } = await params;
    const { t } = await useTranslation(lng, 'disclaimer');

    return generateSeoMetadata({
        title: t('metadata.disclaimer_page_title'),
        description: t('metadata.disclaimer_page_description'),
        keywords: t('metadata.disclaimer_page_keywords'),
        lng,
        path: '/disclaimer',
    });
}

type DisclaimerPageProps = { params: Promise<{ lng: string }> };

const DisclaimerPage = async ({ params }: DisclaimerPageProps) => {
    const { lng } = await params;
    const { t } = await useTranslation(lng, 'disclaimer');
    console.log(lng);
    return (
        <Layout lng={lng}>
            <Container size="md" py="xl">
                <Stack gap="md">
                    <Title order={1}>{t('disclaimer.title')}</Title>
                    
                    <Text>
                        {t('disclaimer.introduction')}
                    </Text>

                    <Title order={2}>{t('disclaimer.sections.usage_risk.title')}</Title>
                    <Text>
                        {t('disclaimer.sections.usage_risk.content')}
                    </Text>

                    <Title order={2}>{t('disclaimer.sections.content_accuracy.title')}</Title>
                    <Text>
                        {t('disclaimer.sections.content_accuracy.content')}
                    </Text>

                    <Title order={2}>{t('disclaimer.sections.third_party_links.title')}</Title>
                    <Text>
                        {t('disclaimer.sections.third_party_links.content')}
                    </Text>

                    <Title order={2}>{t('disclaimer.sections.service_interruption.title')}</Title>
                    <Text>
                        {t('disclaimer.sections.service_interruption.content')}
                    </Text>

                    <Text fw={500} mt="xl">
                        {t('disclaimer.agreement')}
                    </Text>
                </Stack>
            </Container>
        </Layout>
    );
};

export default DisclaimerPage;
