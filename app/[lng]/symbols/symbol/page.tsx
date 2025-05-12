import React from 'react';
import { Metadata } from 'next';

import SymbolClient from './SymbolClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';

interface MetadataParams {
    params: Promise<{ lng: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'common');
    const { t: translate } = translation;

    return {
        title: translate('metadata.login_page_title'),
        description: translate('metadata.login_page_description'),
        keywords: translate('metadata.login_page_keywords'),
    };
}

type SymbolPageProps = { params: Promise<{ lng: string }> };

const SymbolPage = async ({ params }: SymbolPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <SymbolClient lng={lng} />
        </Layout>
    );
};

export default SymbolPage;