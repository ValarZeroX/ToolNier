import React from 'react';
import { Metadata } from 'next';

import ImageBase64ToolClient from './ImageBase64ToolClient'; // 客戶端組件
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
        title: translate('metadata.image_base64_tool_page_title'),
        description: translate('metadata.image_base64_tool_page_description'),
        keywords: translate('metadata.image_base64_tool_page_keywords'),
        lng,
        path: '/tools/image-base64-converter',
    });
}

type ImageBase64ToolPageProps = { params: Promise<{ lng: string }> };

const ImageBase64ToolPage = async ({ params }: ImageBase64ToolPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <ImageBase64ToolClient lng={lng} />
        </Layout>
    );
};

export default ImageBase64ToolPage;