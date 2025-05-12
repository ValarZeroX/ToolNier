'use client';
import React, { useState } from 'react';
import { Container, Paper, Title, Grid, Tabs } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { VirtuosoGrid } from 'react-virtuoso';
import { useTranslation } from "../../../i18n/client";
import emojis from './emojis.json';
import { IconPhoto, IconMoodHappy, IconDog, IconCake, IconBallBasketball, IconCar, IconBulb, IconMathSymbols, IconFlag } from '@tabler/icons-react';

type EmojiClientProps = {
    lng: string;
};

const emojiCategoriesIcon = {
    people: <IconMoodHappy size={24} />,
    nature: <IconDog size={24} />,
    foods: <IconCake size={24} />,
    activity: <IconBallBasketball size={24} />,
    places: <IconCar size={24} />,
    objects: <IconBulb size={24} />,
    symbols: <IconMathSymbols size={24} />,
    flags: <IconFlag size={24} />,
};

const unifiedToEmoji = (unified: string) => {
    if (!unified) return "";
    return String.fromCodePoint(...unified.split('-').map(u => parseInt(u, 16)));
};


const EmojiClient: React.FC<EmojiClientProps> = ({ lng }) => {
    console.log(emojis);
    const clipboard = useClipboard({ timeout: 500 });
    const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
    const { t } = useTranslation(lng, 'common');

    const handleCopy = (emoji: string) => {
        clipboard.copy(emoji);
        setCopiedEmoji(emoji);
    };


    return (
        <Container size="xs" mt="lg">
            <Title order={3} ta="center">{t('emoji_page_title')}</Title>

            <Tabs defaultValue="people">

                <Tabs.List>
                    {emojis.categories.map((category) => (
                        <Tabs.Tab key={category.id} value={category.id} leftSection={emojiCategoriesIcon[category.id as keyof typeof emojiCategoriesIcon]}>
                        </Tabs.Tab>

                    ))}
                </Tabs.List>
                {emojis.categories.map((category) => (
                    <Tabs.Panel key={category.id} value={category.id}>
                        <Grid columns={9}>
                            {category.emojis.map((emojiId) => {
                                const emojiData = (emojis.emojis as Record<string, any>)[emojiId];
                                const emojiChar = unifiedToEmoji(emojiData.skins[0].unified);
                                return (
                                    <Grid.Col span={1} key={emojiId}>
                                        <span style={{
                                            fontFamily: `"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color", "Twemoji Mozilla", sans-serif`,
                                            fontSize: '1.5rem',
                                            cursor: 'pointer',
                                            display: 'block',
                                            textAlign: 'center'
                                        }}>
                                            {emojiChar}
                                            
                                        </span>
                                    </Grid.Col>
                                );
                            })}
                        </Grid>
                    </Tabs.Panel>
                ))}
            </Tabs>
        </Container>
    );
};

export default EmojiClient;
