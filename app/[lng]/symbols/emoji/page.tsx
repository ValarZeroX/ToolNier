import React from 'react';
import { Metadata } from 'next';

import EmojiClient from './EmojiClient'; // 客戶端組件
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
        title: translate('metadata.emoji_page_title'),
        description: translate('metadata.emoji_page_description'),
        keywords: translate('metadata.emoji_page_keywords'),
    };
}

type EmojiPageProps = { params: Promise<{ lng: string }> };

const EmojiPage = async ({ params }: EmojiPageProps) => {
    const { lng } = await params;
    return (
        <Layout lng={lng}>
            <EmojiClient lng={lng} />
        </Layout>
    );
};

export default EmojiPage;