import React from 'react';
import { Metadata } from 'next';

import PasswordGeneratorClient from './PasswordGeneratorClient'; // 客戶端組件
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';


export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'tools');
    const { t: translate } = translation;

    return {
        title: translate('metadata.password_generator_tool_page_title'),
        description: translate('metadata.password_generator_tool_page_description'),
        keywords: translate('metadata.password_generator_tool_page_keywords'),
    };
}

type PasswordGeneratorPageProps = { params: Promise<{ lng: string }> };

const PasswordGeneratorPage = async ({ params }: PasswordGeneratorPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <PasswordGeneratorClient lng={lng} />
        </Layout>
    );
};

export default PasswordGeneratorPage;