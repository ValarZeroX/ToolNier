import React from 'react';
import { Metadata } from 'next';

import IPLookupClient from './IPLookupClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';


export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'tools');
    const { t: translate } = translation;

    return generateSeoMetadata({
        title: translate('metadata.ip_lookup_tool_page_title'),
        description: translate('metadata.ip_lookup_tool_page_description'),
        keywords: translate('metadata.ip_lookup_tool_page_keywords'),
        lng,
        path: '/tools/ip-lookup',
    });
}

type IPLookupPageProps = { params: Promise<{ lng: string }> };

const IPLookupPage = async ({ params }: IPLookupPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <IPLookupClient lng={lng} />
        </Layout>
    );
};

export default IPLookupPage;