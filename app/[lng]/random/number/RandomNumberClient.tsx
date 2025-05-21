'use client';
import React, { useState } from 'react';
import { Container, Title, NumberInput, Button, Stack, Paper, Text, Checkbox, Divider, Group } from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import RandomActionsGrid from '@/components/ActionsGrid/RandomActionsGrid';

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
        <Container size="md" mt="lg">
            <Title order={3} ta="center">{t('random_number.title')}</Title>
            <Text size="sm" c="dimmed" mt="md">
                {t('random_number.intro')}
            </Text>

            <Stack gap="md" mt="md">
                <NumberInput
                    label={t('random_number.min')}
                    value={min}
                    onChange={(value) => setMin(Number(value))}
                    decimalScale={0}
                    allowDecimal={false}
                />
                <NumberInput
                    label={t('random_number.max')}
                    value={max}
                    onChange={(value) => setMax(Number(value))}
                    decimalScale={0}
                    allowDecimal={false}
                />
                <NumberInput
                    label={t('random_number.count')}
                    value={count}
                    onChange={(value) => setCount(Number(value))}
                    decimalScale={0}
                    allowDecimal={false}
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
            <Divider mt="md" />
            <Title order={3} mt="lg">{t('random_number.how_to_use_title')}</Title>
            <Paper withBorder radius="md" p="md" mt="md">
                <Stack gap="xs">
                    {[0, 1, 2].map((index) => (
                        <Group key={index} wrap="nowrap" align="flex-start">
                            <Text fw={600} c="blue" size="sm" style={{ minWidth: '8px' }}>{index + 1}.</Text>
                            <Text size="sm" style={{ lineHeight: 1.6 }}>{t(`random_number.how_to_use_steps.${index}`)}</Text>
                        </Group>
                    ))}
                </Stack>
            </Paper>
            <Title order={3} mt="lg">{t('random_number.faq_title')}</Title>
            <Stack gap="md" mt="md">
                {[0, 1, 2].map((index) => (
                    <Paper key={index} p="md" withBorder radius="md">
                        <Text fw={600} size="sm" mb="xs" c="blue">
                            {t(`random_number.faq.${index}.q`)}
                        </Text>
                        <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                            {t(`random_number.faq.${index}.a`)}
                        </Text>
                    </Paper>
                ))}
            </Stack>
            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <RandomActionsGrid lng={lng} />
        </Container>
    );
};

export default RandomNumberClient;
