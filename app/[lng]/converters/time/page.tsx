import React from 'react';
import { Metadata } from 'next';

import TimeConverterClient from './TimeConverterClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';


export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'converters');
    const { t: translate } = translation;

    return generateSeoMetadata({
        title: translate('metadata.time_converter_title'),
        description: translate('metadata.time_converter_description'),
        keywords: translate('metadata.time_converter_keywords'),
        lng,
        path: '/converters/time',
    });
}

type TimeConverterPageProps = { params: Promise<{ lng: string }> };

const TimeConverterPage = async ({ params }: TimeConverterPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <TimeConverterClient lng={lng} />
        </Layout>
    );
};

export default TimeConverterPage;