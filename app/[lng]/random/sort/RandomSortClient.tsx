'use client';
import React, { useState } from 'react';
import { Container, Title, Textarea, Button, Stack, Text, Divider, Paper, Group } from '@mantine/core';
import { useTranslation } from "../../../i18n/client";
import { IconX } from '@tabler/icons-react';
import RandomActionsGrid from '@/components/ActionsGrid/RandomActionsGrid';

interface RandomSortClientProps {
    lng: string;
}

const RandomSortClient: React.FC<RandomSortClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'random');
    const [inputValue, setInputValue] = useState('A\nB\nC\nD\nE\nF\nG\nH');

    const handleRandomSort = () => {
        const entries = inputValue
            .split('\n')
            .map(item => item.trim())
            .filter(item => item.length > 0);

        // Fisher–Yates shuffle
        for (let i = entries.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [entries[i], entries[j]] = [entries[j], entries[i]];
        }

        // 直接把結果塞回 Textarea
        setInputValue(entries.join('\n'));
    };

    const handleReset = () => {
        setInputValue('');
    };

    return (
        <Container size="md" mt="lg">
            <Title order={3} ta="center">{t('random_sort.title')}</Title>
            <Text size="sm" c="dimmed" mt="md">
                {t('random_draw_page.intro')}
            </Text>
            <Stack gap="md" mt="md">
                <Textarea
                    label={t('random_draw_page.input_label')}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.currentTarget.value)}
                    autosize
                    minRows={5}
                    maxRows={10}
                />

                <Button color="blue" onClick={handleRandomSort} disabled={!inputValue.trim()}>
                    {t('random_draw_page.start')}
                </Button>

                <Button color="red" variant="outline" onClick={handleReset} leftSection={<IconX size={14} />} disabled={!inputValue.trim()}>
                    {t('random_draw_page.clear_options')}
                </Button>
            </Stack>
            <Divider mt="md" />
            <Title order={3} mt="lg">{t('random_sort.how_to_use_title')}</Title>
            <Paper withBorder radius="md" p="md" mt="md">
                <Stack gap="xs">
                    {[0, 1, 2].map((index) => (
                        <Group key={index} wrap="nowrap" align="flex-start">
                            <Text fw={600} c="blue" size="sm" style={{ minWidth: '8px' }}>{index + 1}.</Text>
                            <Text size="sm" style={{ lineHeight: 1.6 }}>{t(`random_sort.how_to_use_steps.${index}`)}</Text>
                        </Group>
                    ))}
                </Stack>
            </Paper>
            <Title order={3} mt="lg">{t('random_sort.usage_scenarios_title')}</Title>
            <Paper withBorder radius="md" p="md" mt="md">
                <Stack gap="xs">
                    {[0, 1, 2, 3].map((index) => (
                        <Group key={index} wrap="nowrap" align="flex-start">
                            <Text fw={600} c="blue" size="sm" style={{ minWidth: '8px' }}>{index + 1}.</Text>
                            <Text size="sm" style={{ lineHeight: 1.6 }}>{t(`random_sort.usage_scenarios.${index}`)}</Text>
                        </Group>
                    ))}
                </Stack>
            </Paper>
            <Title order={3} mt="lg">{t('random_sort.faq_title')}</Title>
            <Stack gap="md" mt="md">
                {[0, 1, 2].map((index) => (
                    <Paper key={index} p="md" withBorder radius="md">
                        <Text fw={600} size="sm" mb="xs" c="blue">
                            {t(`random_sort.faq.${index}.q`)}
                        </Text>
                        <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                            {t(`random_sort.faq.${index}.a`)}
                        </Text>
                    </Paper>
                ))}
            </Stack>
            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <RandomActionsGrid lng={lng} />
        </Container>
    );
};

export default RandomSortClient;
