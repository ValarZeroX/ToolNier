import React from 'react';
import { Metadata } from 'next';

import ColorCodeChartClient from './ColorCodeChartClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';


export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'tools');
    const { t: translate } = translation;

    return {
        title: translate('metadata.color_code_chart_tool_page_title'),
        description: translate('metadata.color_code_chart_tool_page_description'),
        keywords: translate('metadata.color_code_chart_tool_page_keywords'),
    };
}

type ColorCodeChartPageProps = { params: Promise<{ lng: string }> };

const ColorCodeChartPage = async ({ params }: ColorCodeChartPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <ColorCodeChartClient lng={lng} />
        </Layout>
    );
};

export default ColorCodeChartPage;