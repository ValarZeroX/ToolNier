import React from 'react';
import { Metadata } from 'next';

import TdeeCalculatorClient from './TdeeCalculatorClient'; // 客戶端組件
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
        title: translate('metadata.tdee_calculator_title'),
        description: translate('metadata.tdee_calculator_description'),
        keywords: translate('metadata.tdee_calculator_keywords'),
        lng,
        path: '/calculator/tdee',
    });
}

type TdeeCalculatorPageProps = { params: Promise<{ lng: string }> };

const TdeeCalculatorPage = async ({ params }: TdeeCalculatorPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <TdeeCalculatorClient lng={lng} />
        </Layout>
    );
};

export default TdeeCalculatorPage;