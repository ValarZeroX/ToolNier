import React from 'react';
import { Metadata } from 'next';

import DaysBetweenDatesCalculatorClient from './DaysBetweenDatesCalculatorClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'calculator');
    const { t: translate } = translation;

    return {
        title: translate('metadata.days_between_dates_calculator_title'),
        description: translate('metadata.days_between_dates_calculator_description'),
        keywords: translate('metadata.days_between_dates_calculator_keywords'),
    };
}

type DaysBetweenDatesCalculatorPageProps = { params: Promise<{ lng: string }> };

const DaysBetweenDatesCalculatorPage = async ({ params }: DaysBetweenDatesCalculatorPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <DaysBetweenDatesCalculatorClient lng={lng} />
        </Layout>
    );
};

export default DaysBetweenDatesCalculatorPage;