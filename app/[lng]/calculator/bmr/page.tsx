import React from 'react';
import { Metadata } from 'next';

import BmrCalculatorClient from './BmrCalculatorClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';

// interface MetadataParams {
//     params: Promise<{ lng: string }>;
// }

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'calculator');
    const { t: translate } = translation;

    return {
        title: translate('metadata.bmr_calculator_title'),
        description: translate('metadata.bmr_calculator_description'),
        keywords: translate('metadata.bmr_calculator_keywords'),
    };
}

type BmrCalculatorPageProps = { params: Promise<{ lng: string }> };

const BmrCalculatorPage = async ({ params }: BmrCalculatorPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <BmrCalculatorClient lng={lng} />
        </Layout>
    );
};

export default BmrCalculatorPage;