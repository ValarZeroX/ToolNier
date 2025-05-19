import React from 'react';
import { Metadata } from 'next';

import LengthConverterClient from './LengthConverterClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';

// interface MetadataParams {
//     params: Promise<{ lng: string }>;
// }

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'converters');
    const { t: translate } = translation;

    return {
        title: translate('metadata.length_converter_title'),
        description: translate('metadata.length_converter_description'),
        keywords: translate('metadata.length_converter_keywords'),
    };
}

type LengthConverterPageProps = { params: Promise<{ lng: string }> };

const LengthConverterPage = async ({ params }: LengthConverterPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <LengthConverterClient lng={lng} />
        </Layout>
    );
};

export default LengthConverterPage;