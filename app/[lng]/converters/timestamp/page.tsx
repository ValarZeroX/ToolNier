import React from 'react';
import { Metadata } from 'next';

import TimestampConverterClient from './TimestampConverterClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';


export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'converters');
    const { t: translate } = translation;

    return {
        title: translate('metadata.timestamp_converter_title'),
        description: translate('metadata.timestamp_converter_description'),
        keywords: translate('metadata.timestamp_converter_keywords'),
    };
}

type TimestampConverterPageProps = { params: Promise<{ lng: string }> };

const TimestampConverterPage = async ({ params }: TimestampConverterPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <TimestampConverterClient lng={lng} />
        </Layout>
    );
};

export default TimestampConverterPage;