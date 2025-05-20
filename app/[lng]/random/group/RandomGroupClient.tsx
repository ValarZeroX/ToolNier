'use client';
import React, { useState } from 'react';
import { Container, Title, Textarea, Button, Stack, NumberInput, Paper, Text } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { useTranslation } from "../../../i18n/client";
import { IconX } from '@tabler/icons-react';

interface RandomGroupClientProps {
    lng: string;
}

const RandomGroupClient: React.FC<RandomGroupClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'random');
    const [inputValue, setInputValue] = useState('A\nB\nC\nD\nE\nF\nG\nH');
    const [groupCount, setGroupCount] = useState<number | ''>(2);
    const [groups, setGroups] = useState<string[][]>([]);

    const handleRandomGroup = () => {
        const entries = inputValue
            .split('\n')
            .map(item => item.trim())
            .filter(item => item.length > 0);

        if (!groupCount || groupCount < 1 || groupCount > entries.length) {
            Notifications.show({
                title: t('random_group.error_title'),
                message: t('random_group.error_message'),
                color: 'red',
            });
            return;
        }

        // 隨機打散
        const shuffled = [...entries];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // 平均分組
        const result: string[][] = Array.from({ length: groupCount }, () => []);
        shuffled.forEach((item, index) => {
            result[index % (groupCount as number)].push(item);
        });

        setGroups(result);
    };

    const handleReset = () => {
        setInputValue('');
        setGroupCount(2);
        setGroups([]);
    };

    return (
        <Container size="xs" mt="lg">
            <Title order={3} ta="center">{t('random_group.title')}</Title>
            <Text size="sm" c="dimmed">
                {t('random_group.description')}
            </Text>
            <Stack gap="md" mt="md">
                <Textarea
                    label={t('random_group.input_label')}
                    value={inputValue}
                    onChange={(event) => setInputValue(event.currentTarget.value)}
                    autosize
                    minRows={5}
                    maxRows={10}
                />

                <NumberInput
                    label={t('random_group.group_count')}
                    value={groupCount}
                    onChange={(value) => setGroupCount(Number(value) || '')}
                    min={1}
                    max={100}
                />

                <Button color="blue" onClick={handleRandomGroup} disabled={!inputValue.trim()}>
                    {t('random_group.start')}
                </Button>

                <Button color="red" variant="outline" onClick={handleReset} leftSection={<IconX size={14} />} disabled={!inputValue.trim()}>
                {t('random_group.clear_options')}
                </Button>

                {groups.length > 0 && (
                    <Paper shadow="xs" p="md" radius="md" withBorder>
                        <Text ta="center" fw={700}>{t('random_group.result_title')}</Text>
                        <Stack mt="sm">
                            {groups.map((group, index) => (
                                <Paper key={index} p="sm" withBorder>
                                    <Text fw={700}>{t('random_group.group', { number: index + 1 })}</Text>
                                    {group.map((item, idx) => (
                                        <Text key={idx}>{item}</Text>
                                    ))}
                                </Paper>
                            ))}
                        </Stack>
                    </Paper>
                )}
            </Stack>
        </Container>
    );
};

export default RandomGroupClient;
