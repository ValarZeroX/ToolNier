'use client';
import React, { useState } from 'react';
import { Container, Title, NumberInput, Button, Stack, Paper, Text, Checkbox } from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';

interface RandomNumberClientProps {
    lng: string;
}

const RandomNumberClient: React.FC<RandomNumberClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'random');
    const [min, setMin] = useState<number>(1);
    const [max, setMax] = useState<number>(49);
    const [count, setCount] = useState<number>(6);
    const [noRepeat, setNoRepeat] = useState<boolean>(true);
    const [result, setResult] = useState<number[]>([]);

    const handleGenerate = () => {
        if (min > max || count <= 0 || (noRepeat && count > (max - min + 1))) {
            Notifications.show({
                title: t('random_number.error_title'),
                message: t('random_number.error_message'),
                color: 'red',
            });
            return;
        }

        const numbers: number[] = [];

        if (noRepeat) {
            const pool = Array.from({ length: max - min + 1 }, (_, i) => i + min);
            for (let i = 0; i < count; i++) {
                const index = Math.floor(Math.random() * pool.length);
                numbers.push(pool.splice(index, 1)[0]);
            }
        } else {
            for (let i = 0; i < count; i++) {
                numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
            }
        }

        setResult(numbers);
    };

    return (
        <Container size="xs" mt="lg">
            <Title order={3} ta="center">{t('random_number.title')}</Title>
            <Text size="sm" c="dimmed" mt="md">
                {t('random_number.intro')}
            </Text>

            <Stack gap="md" mt="md">
                <NumberInput
                    label={t('random_number.min')}
                    value={min}
                    onChange={(value) => setMin(Number(value))}
                />
                <NumberInput
                    label={t('random_number.max')}
                    value={max}
                    onChange={(value) => setMax(Number(value))}
                />
                <NumberInput
                    label={t('random_number.count')}
                    value={count}
                    onChange={(value) => setCount(Number(value))}
                />
                <Checkbox
                    label={t('random_number.no_repeat')}
                    checked={noRepeat}
                    onChange={(event) => setNoRepeat(event.currentTarget.checked)}
                />
                <Button color="blue" onClick={handleGenerate}>
                    {t('random_number.generate')}
                </Button>

                {result.length > 0 && (
                    <Paper shadow="xs" p="md" radius="md" withBorder>
                        <Text ta="center" fw={700}>{t('random_number.result')}：</Text>
                        <Text ta="center" size="xl">{result.join(', ')}</Text>
                    </Paper>
                )}
            </Stack>
        </Container>
    );
};

export default RandomNumberClient;
