import React from 'react';
import { Metadata } from 'next';

import BodyFatCalculatorClient from './BodyFatCalculatorClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';

// interface MetadataParams {
//     params: Promise<{ lng: string }>;
// }

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'calculator');
    const { t: translate } = translation;

    return generateSeoMetadata({
        title: translate('metadata.body_fat_calculator_title'),
        description: translate('metadata.body_fat_calculator_description'),
        keywords: translate('metadata.body_fat_calculator_keywords'),
        lng,
        path: '/calculator/body-fat',
    });
}

type BodyFatCalculatorPageProps = { params: Promise<{ lng: string }> };

const BodyFatCalculatorPage = async ({ params }: BodyFatCalculatorPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <BodyFatCalculatorClient lng={lng} />
        </Layout>
    );
};

export default BodyFatCalculatorPage;