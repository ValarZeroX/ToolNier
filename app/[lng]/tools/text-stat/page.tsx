import React from 'react';
import { Metadata } from 'next';

import TextStatClient from './TextStatClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';


export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'tools');
    const { t: translate } = translation;

    return generateSeoMetadata({
        title: translate('metadata.text_stats_tool_page_title'),
        description: translate('metadata.text_stats_tool_page_description'),
        keywords: translate('metadata.text_stats_tool_page_keywords'),
        lng,
        path: '/tools/text-stat',
    });
}

type TextStatPageProps = { params: Promise<{ lng: string }> };

const TextStatPage = async ({ params }: TextStatPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <TextStatClient lng={lng} />
        </Layout>
    );
};

export default TextStatPage;