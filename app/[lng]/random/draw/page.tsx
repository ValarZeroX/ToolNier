import React from 'react';
import { Metadata } from 'next';

import RandomDrawClient from './RandomDrawClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';

// interface MetadataParams {
//     params: Promise<{ lng: string }>;
// }

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'random');
    const { t: translate } = translation;

    return {
        title: translate('metadata.random_draw_page_title'),
        description: translate('metadata.random_draw_page_description'),
        keywords: translate('metadata.random_draw_page_keywords'),
    };
}

type RandomDrawPageProps = { params: Promise<{ lng: string }> };

const RandomDrawPage = async ({ params }: RandomDrawPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <RandomDrawClient lng={lng} />
        </Layout>
    );
};

export default RandomDrawPage;