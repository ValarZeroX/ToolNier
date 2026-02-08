import React from 'react';
import { Metadata } from 'next';

import EmojiClient from './EmojiClient';
import Layout from '@/components/Layout/Layout';
import { useTranslation } from '../../../i18n/index';
import { generateSeoMetadata } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lng: string; }> }): Promise<Metadata> {
    const { lng } = await params;
    const translation = await useTranslation(lng, 'common');
    const { t: translate } = translation;

    return generateSeoMetadata({
        title: translate('metadata.emoji_page_title'),
        description: translate('metadata.emoji_page_description'),
        keywords: translate('metadata.emoji_page_keywords'),
        lng,
        path: '/symbols/emoji',
    });
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