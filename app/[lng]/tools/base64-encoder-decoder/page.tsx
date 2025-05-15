import React from 'react';
import { Metadata } from 'next';

import Base64ToolClient from './Base64ToolClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';

// interface MetadataParams {
//     params: Promise<{ lng: string }>;
// }

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'common');
    const { t: translate } = translation;

    return {
        title: translate('metadata.base64_tool_page_title'),
        description: translate('metadata.base64_tool_page_description'),
        keywords: translate('metadata.base64_tool_page_keywords'),
    };
}

type Base64ToolPageProps = { params: Promise<{ lng: string }> };

const Base64ToolPage = async ({ params }: Base64ToolPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <Base64ToolClient lng={lng} />
        </Layout>
    );
};

export default Base64ToolPage;