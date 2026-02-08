import React from 'react';
import { Metadata } from 'next';

import RandomNumberClient from './RandomNumberClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';

// interface MetadataParams {
//     params: Promise<{ lng: string }>;
// }

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'random');
    const { t: translate } = translation;

    return generateSeoMetadata({
        title: translate('metadata.random_number_page_title'),
        description: translate('metadata.random_number_page_description'),
        keywords: translate('metadata.random_number_page_keywords'),
        lng,
        path: '/random/number',
    });
}

type RandomNumberPageProps = { params: Promise<{ lng: string }> };

const RandomNumberPage = async ({ params }: RandomNumberPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <RandomNumberClient lng={lng} />
        </Layout>
    );
};

export default RandomNumberPage;