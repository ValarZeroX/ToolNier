import React from 'react';
import { Metadata } from 'next';

import JsonFormatterClient from './JsonFormatterClient'; // 客戶端組件
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
        title: translate('metadata.json_formatter_tool_page_title'),
        description: translate('metadata.json_formatter_tool_page_description'),
        keywords: translate('metadata.json_formatter_tool_page_keywords'),
        lng,
        path: '/tools/json-formatter',
    });
}

type JsonFormatterClientPageProps = { params: Promise<{ lng: string }> };

const JsonFormatterClientPage = async ({ params }: JsonFormatterClientPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <JsonFormatterClient lng={lng} />
        </Layout>
    );
};

export default JsonFormatterClientPage;