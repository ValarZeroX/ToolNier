'use client';

import React, { useState } from 'react';
import {
    Container,
    Title,
    Textarea,
    Stack,
    Group,
    Button,
    Paper,
    Text,
    Divider,
    SimpleGrid,
} from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import ToolsActionsGrid from '@/components/ActionsGrid/ToolsActionsGrid';

interface TextStatClientProps {
    lng: string;
}

const countTextStats = (text: string) => {
    const characterCount = text.length;

    // Improved word counting logic for both Chinese and English
    const wordCount = text
        .trim()
        .split(/[\s\n]+/)  // Split by whitespace and newlines
        .filter(word => {
            // Remove punctuation and check if the word contains any letters or Chinese characters
            const cleanWord = word.replace(/[^\w\u4e00-\u9fa5]/g, '');
            return cleanWord.length > 0;
        })
        .reduce((count, word) => {
            // Count English words
            const englishWords = word.match(/[a-zA-Z]+/g) || [];
            // Count Chinese characters as words
            const chineseChars = word.match(/[\u4e00-\u9fa5]/g) || [];
            return count + englishWords.length + chineseChars.length;
        }, 0);

    const lineCount = text.split(/\n/).length;

    // Count Chinese characters
    const chineseCharCount = (text.match(/[\u4e00-\u9fa5]/g) || []).length;

    // Count characters without spaces
    const charCountNoSpaces = text.replace(/\s/g, '').length;

    // Count paragraphs (non-empty lines)
    const paragraphCount = text.split(/\n/).filter(line => line.trim().length > 0).length;

    return {
        characterCount,
        wordCount,
        lineCount,
        chineseCharCount,
        charCountNoSpaces,
        paragraphCount
    };
};

const TextStatClient: React.FC<TextStatClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'tools');
    const [text, setText] = useState('');
    const {
        characterCount,
        wordCount,
        lineCount,
        chineseCharCount,
        charCountNoSpaces,
        paragraphCount
    } = countTextStats(text);

    const handleClear = () => setText('');

    return (
        <Container size="md" mt="lg">
            <Title order={3} ta="center">{t('text_stats.title')}</Title>
            <Text ta="center" size="sm" c="dimmed" mt="xs">
                {t('text_stats.description')}
            </Text>

            <Stack gap="md" mt="md">
                <Textarea
                    label={t('text_stats.input_label')}
                    value={text}
                    onChange={(e) => setText(e.currentTarget.value)}
                    autosize
                    minRows={6}
                    maxRows={12}
                />

                <Group justify="flex-end">
                    <Button color="red" variant="outline" onClick={handleClear} disabled={!text}>
                        {t('text_stats.clear')}
                    </Button>
                </Group>

                <Paper withBorder shadow="sm" radius="md" p="md">
                    <Stack gap="md">
                        <Group grow>
                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-blue-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('text_stats.char_count')}</Text>
                                    <Text size="2rem" fw={700} c="blue.7">{characterCount}</Text>
                                </Stack>
                            </Paper>
                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-green-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('text_stats.totle_word_count')}</Text>
                                    <Text size="2rem" fw={700} c="green.7">{wordCount}</Text>
                                </Stack>
                            </Paper>
                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-violet-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('text_stats.line_count')}</Text>
                                    <Text size="2rem" fw={700} c="violet.7">{lineCount}</Text>
                                </Stack>
                            </Paper>
                        </Group>

                        <Divider my="sm" />

                        <SimpleGrid cols={2} spacing="md">
                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('text_stats.char_count_no_spaces')}</Text>
                                    <Text size="1.5rem" fw={600} c="gray.7">{charCountNoSpaces}</Text>
                                </Stack>
                            </Paper>
                            {lng !== 'en' && (
                                <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
                                    <Stack gap={4} align="center">
                                        <Text size="sm" c="dimmed" fw={500}>{t('text_stats.chinese_char_count')}</Text>
                                        <Text size="1.5rem" fw={600} c="gray.7">{chineseCharCount}</Text>
                                    </Stack>
                                </Paper>
                            )}
                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('text_stats.word_count')}</Text>
                                    <Text size="1.5rem" fw={600} c="gray.7">{wordCount - chineseCharCount}</Text>
                                </Stack>
                            </Paper>
                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('text_stats.paragraph_count')}</Text>
                                    <Text size="1.5rem" fw={600} c="gray.7">{paragraphCount}</Text>
                                </Stack>
                            </Paper>
                        </SimpleGrid>
                    </Stack>
                </Paper>
            </Stack>

            <Divider mt="md" />
            <Title order={3} mt="lg">{t('text_stats.how_to_use_title')}</Title>
            <Paper withBorder radius="md" p="md" mt="md">
                <Stack gap="xs">
                    {[0, 1, 2].map((index) => (
                        <Group key={index} wrap="nowrap" align="flex-start">
                            <Text fw={600} c="blue" size="sm" style={{ minWidth: '8px' }}>{index + 1}.</Text>
                            <Text size="sm" style={{ lineHeight: 1.6 }}>{t(`text_stats.how_to_use_steps.${index}`)}</Text>
                        </Group>
                    ))}
                </Stack>
            </Paper>
            <Title order={3} mt="lg">{t('text_stats.faq_title')}</Title>
            <Stack gap="md" mt="md">
                {[0, 1].map((index) => (
                    <Paper key={index} p="md" withBorder radius="md">
                        <Text fw={600} size="sm" mb="xs" c="blue">
                            {t(`text_stats.faq.${index}.q`)}
                        </Text>
                        <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                            {t(`text_stats.faq.${index}.a`)}
                        </Text>
                    </Paper>
                ))}
            </Stack>
            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <ToolsActionsGrid lng={lng} />
        </Container>
    );
};

export default TextStatClient;
