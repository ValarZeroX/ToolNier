import React from 'react';
import { Metadata } from 'next';

import BMICalculatorClient from './BMICalculatorClient'; // 客戶端組件
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
        title: translate('metadata.bmi_calculator_title'),
        description: translate('metadata.bmi_calculator_description'),
        keywords: translate('metadata.bmi_calculator_keywords'),
    };
}

type BMICalculatorPageProps = { params: Promise<{ lng: string }> };

const BMICalculatorPage = async ({ params }: BMICalculatorPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <BMICalculatorClient lng={lng} />
        </Layout>
    );
};

export default BMICalculatorPage;