import React from 'react';
import { Metadata } from 'next';

import SymbolClient from './SymbolClient';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'common');
    const { t: translate } = translation;

    return generateSeoMetadata({
        title: translate('metadata.symbol_page_title'),
        description: translate('metadata.symbol_page_description'),
        keywords: translate('metadata.symbol_page_keywords'),
        lng,
        path: '/symbols/symbol',
    });
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