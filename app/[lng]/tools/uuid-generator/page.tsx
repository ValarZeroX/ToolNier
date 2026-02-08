import React from 'react';
import { Metadata } from 'next';

import UUIDGeneratorClient from './UUIDGeneratorClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';

// interface MetadataParams {
//     params: Promise<{ lng: string }>;
// }

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'tools');
    const { t: translate } = translation;

    return generateSeoMetadata({
        title: translate('metadata.uuid_generator_page_title'),
        description: translate('metadata.uuid_generator_page_description'),
        keywords: translate('metadata.uuid_generator_page_keywords'),
        lng,
        path: '/tools/uuid-generator',
    });
}

type UUIDGeneratorPageProps = { params: Promise<{ lng: string }> };

const UUIDGeneratorPage = async ({ params }: UUIDGeneratorPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <UUIDGeneratorClient lng={lng} />
        </Layout>
    );
};

export default UUIDGeneratorPage;