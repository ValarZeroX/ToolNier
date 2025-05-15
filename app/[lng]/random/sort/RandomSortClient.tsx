'use client';
import React, { useState } from 'react';
import { Container, Title, Textarea, Button, Stack, Text } from '@mantine/core';
import { useTranslation } from "../../../i18n/client";
import { IconX } from '@tabler/icons-react';

interface RandomSortClientProps {
    lng: string;
}

const RandomSortClient: React.FC<RandomSortClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'common');
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
        <Container size="xs" mt="lg">
            <Title order={3} ta="center">{t('random_sort')}</Title>
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
                />

                <Button color="blue" onClick={handleRandomSort} disabled={!inputValue.trim()}>
                    {t('random_draw_page.start')}
                </Button>

                <Button color="red" variant="outline" onClick={handleReset} leftSection={<IconX size={14} />} disabled={!inputValue.trim()}>
                    {t('random_draw_page.clear_options')}
                </Button>
            </Stack>
        </Container>
    );
};

export default RandomSortClient;
