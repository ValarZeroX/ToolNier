import React from 'react';
import { Metadata } from 'next';

import BMICalculatorClient from './BMICalculatorClient';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'calculator');
    const { t: translate } = translation;

    return generateSeoMetadata({
        title: translate('metadata.bmi_calculator_title'),
        description: translate('metadata.bmi_calculator_description'),
        keywords: translate('metadata.bmi_calculator_keywords'),
        lng,
        path: '/calculator/bmi',
    });
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