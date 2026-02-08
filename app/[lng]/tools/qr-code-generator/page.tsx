import React from 'react';
import { Metadata } from 'next';

import QRCodeGeneratorClient from './QRCodeGeneratorClient';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'tools');
    const { t: translate } = translation;

    return generateSeoMetadata({
        title: translate('metadata.qr_generator_page_title'),
        description: translate('metadata.qr_generator_page_description'),
        keywords: translate('metadata.qr_generator_page_keywords'),
        lng,
        path: '/tools/qr-code-generator',
    });
}

type QRCodeGeneratorPageProps = { params: Promise<{ lng: string }> };

const QRCodeGeneratorPage = async ({ params }: QRCodeGeneratorPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <QRCodeGeneratorClient lng={lng} />
        </Layout>
    );
};

export default QRCodeGeneratorPage;