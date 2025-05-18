import React from 'react';
import { Metadata } from 'next';

import TemperatureConverterClient from './TemperatureConverterClient'; // 客戶端組件
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
        title: translate('metadata.temperature_converter_title'),
        description: translate('metadata.temperature_converter_description'),
        keywords: translate('metadata.temperature_converter_keywords'),
    };
}

type TemperatureConverterPageProps = { params: Promise<{ lng: string }> };

const TemperatureConverterPage = async ({ params }: TemperatureConverterPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <TemperatureConverterClient lng={lng} />
        </Layout>
    );
};

export default TemperatureConverterPage;