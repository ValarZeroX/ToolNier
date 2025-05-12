'use client';
import React, { useState } from 'react';
import { Container, Paper, Title, Grid, Tabs, Tooltip } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { useTranslation } from "../../../i18n/client";
import emojis from './emojis.json';
import { IconMoodHappy, IconDog, IconCake, IconBallBasketball, IconCar, IconBulb, IconMathSymbols, IconFlag } from '@tabler/icons-react';

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

// ✅ 用 React.memo 避免不必要 re-render
const EmojiItem = React.memo(({ emojiChar, copiedEmoji, handleCopy, t }: {
    emojiChar: string,
    copiedEmoji: string | null,
    handleCopy: (emoji: string) => void,
    t: (key: string) => string
}) => (
    <Grid.Col span={1}>
        <Tooltip
            label={copiedEmoji === emojiChar ? t('copied') : t('copy')}
            withArrow
            position="top"
        >
            <Paper
                shadow="xs"
                p="xs"
                radius="sm"
                ta="center"
                style={{
                    cursor: 'pointer',
                    fontSize: '24px',
                    fontFamily: `"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color", "Twemoji Mozilla", sans-serif`,
                }}
                onClick={() => handleCopy(emojiChar)}
            >
                {emojiChar}
            </Paper>
        </Tooltip>
    </Grid.Col>
));

const EmojiClient: React.FC<EmojiClientProps> = ({ lng }) => {
    const clipboard = useClipboard({ timeout: 500 });
    const [copiedEmoji, setCopiedEmoji] = useState<string | null>(null);
    const { t } = useTranslation(lng, 'common');
    const [activeTab, setActiveTab] = useState<string | null>('people');  // ✅ 加 lazy tab

    const handleCopy = (emoji: string) => {
        clipboard.copy(emoji);
        setCopiedEmoji(emoji);
    };

    return (
        <Container size="xs" mt="lg">
            <Title order={3} ta="center">{t('emoji_page_title')}</Title>

            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    {emojis.categories.map((category) => (
                        <Tabs.Tab
                            key={category.id}
                            value={category.id}
                            leftSection={emojiCategoriesIcon[category.id as keyof typeof emojiCategoriesIcon]}
                        >
                            {/* {category.name} */}
                        </Tabs.Tab>
                    ))}
                </Tabs.List>

                {/* ✅ 只渲染 active tab 的 Panel */}
                {emojis.categories.map((category) =>
                    category.id === activeTab ? (
                        <Tabs.Panel key={category.id} value={category.id} mt="md">
                            <Grid columns={8}>
                                {category.emojis.map((emojiId, index) => {
                                    const emojiData = (emojis.emojis as Record<string, any>)[emojiId];
                                    const emojiChar = unifiedToEmoji(emojiData?.skins[0]?.unified ?? '');
                                    if (!emojiChar) return null; // ✅ 防止空值 crash

                                    return (
                                        <EmojiItem
                                            key={`${emojiChar}-${index}`} // ✅ 防重複 key
                                            emojiChar={emojiChar}
                                            copiedEmoji={copiedEmoji}
                                            handleCopy={handleCopy}
                                            t={t}
                                        />
                                    );
                                })}
                            </Grid>
                        </Tabs.Panel>
                    ) : null
                )}
            </Tabs>
        </Container>
    );
};

export default EmojiClient;
