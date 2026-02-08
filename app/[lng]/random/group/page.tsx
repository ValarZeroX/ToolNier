import React from 'react';
import { Metadata } from 'next';

import RandomGroupClient from './RandomGroupClient'; // 客戶端組件
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
        title: translate('metadata.random_group_page_title'),
        description: translate('metadata.random_group_page_description'),
        keywords: translate('metadata.random_group_page_keywords'),
        lng,
        path: '/random/group',
    });
}

type RandomGroupPageProps = { params: Promise<{ lng: string }> };

const RandomGroupPage = async ({ params }: RandomGroupPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <RandomGroupClient lng={lng} />
        </Layout>
    );
};

export default RandomGroupPage;