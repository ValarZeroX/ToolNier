import React from 'react';
import { Metadata } from 'next';

import URLEncoderClient from './URLEncoderClient';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';


export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'tools');
    const { t: translate } = translation;

    return {
        title: translate('metadata.url_encoder_page_title'),
        description: translate('metadata.url_encoder_page_description'),
        keywords: translate('metadata.url_encoder_page_keywords'),
    };
}

type URLEncoderPageProps = { params: Promise<{ lng: string }> };

const URLEncoderPage = async ({ params }: URLEncoderPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <URLEncoderClient lng={lng} />
        </Layout>
    );
};

export default URLEncoderPage;