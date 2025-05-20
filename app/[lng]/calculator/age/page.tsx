import React from 'react';
import { Metadata } from 'next';

import AgeCalculatorClient from './AgeCalculatorClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';


export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'calculator');
    const { t: translate } = translation;

    return {
        title: translate('metadata.age_calculator_title'),
        description: translate('metadata.age_calculator_description'),
        keywords: translate('metadata.age_calculator_keywords'),
    };
}

type AgeCalculatorPageProps = { params: Promise<{ lng: string }> };

const AgeCalculatorPage = async ({ params }: AgeCalculatorPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <AgeCalculatorClient lng={lng} />
        </Layout>
    );
};

export default AgeCalculatorPage;