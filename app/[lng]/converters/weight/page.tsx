import React from 'react';
import { Metadata } from 'next';

import WeightConverterClient from './WeightConverterClient'; // 客戶端組件
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
        title: translate('metadata.weight_converter_title'),
        description: translate('metadata.weight_converter_description'),
        keywords: translate('metadata.weight_converter_keywords'),
    };
}

type WeightConverterPageProps = { params: Promise<{ lng: string }> };

const WeightConverterPage = async ({ params }: WeightConverterPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <WeightConverterClient lng={lng} />
        </Layout>
    );
};

export default WeightConverterPage;