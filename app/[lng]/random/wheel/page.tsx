import React from 'react';
import { Metadata } from 'next';

import WheelDrawClient from './WheelDrawClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';

// interface MetadataParams {
//     params: Promise<{ lng: string }>;
// }

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'common');
    const { t: translate } = translation;

    return {
        title: translate('metadata.random_draw_wheel_page_title'),
        description: translate('metadata.random_draw_wheel_page_description'),
        keywords: translate('metadata.random_draw_wheel_page_keywords'),
    };
}

type WheelDrawPageProps = { params: Promise<{ lng: string }> };

const WheelDrawPage = async ({ params }: WheelDrawPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <WheelDrawClient lng={lng} />
        </Layout>
    );
};

export default WheelDrawPage;