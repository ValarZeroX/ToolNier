'use client';
import React, { useState } from 'react';
import {
    Container,
    Title,
    Stack,
    TextInput,
    Select,
    Text,
    Divider,
} from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { formatNumber } from '@/lib/utils/formatNumber';
import { Paper, Group } from '@mantine/core';
import { IconEqual } from '@tabler/icons-react';
import ConvertersActionsGrid from '@/components/ActionsGrid/ConvertersActionsGrid';

interface TimeConverterClientProps {
    lng: string;
}

const TimeConverterClient: React.FC<TimeConverterClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'converters');
    const [inputValue, setInputValue] = useState('100');
    const [fromUnit, setFromUnit] = useState('second');
    const [toUnit, setToUnit] = useState('minute');

    const timeUnits = [
        { label: t('time_converter.units.millisecond'), value: 'millisecond' },
        { label: t('time_converter.units.second'), value: 'second' },
        { label: t('time_converter.units.minute'), value: 'minute' },
        { label: t('time_converter.units.hour'), value: 'hour' },
        { label: t('time_converter.units.day'), value: 'day' },
        { label: t('time_converter.units.week'), value: 'week' },
    ];

    const conversionRates: Record<string, number> = {
        millisecond: 1 / 1000,
        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
    };

    const convert = () => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) return '';
        const valueInSeconds = value * conversionRates[fromUnit];
        const converted = valueInSeconds / conversionRates[toUnit];
        return formatNumber(converted);
    };

    return (
        <Container size="md" mt="lg">
            <Title order={3} ta="center">{t('time_converter.title')}</Title>
            <Text ta="center" size="sm" c="dimmed" mt="xs">{t('time_converter.description')}</Text>
            <Stack gap="md" mt="md">
                <TextInput
                    label={t('time_converter.input_label')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    placeholder="100"
                />

                <Select
                    label={t('time_converter.from_label')}
                    data={timeUnits}
                    value={fromUnit}
                    onChange={(value) => setFromUnit(value || 'second')}
                />

                <Select
                    label={t('time_converter.to_label')}
                    data={timeUnits}
                    value={toUnit}
                    onChange={(value) => setToUnit(value || 'minute')}
                />

                <Paper withBorder shadow="sm" radius="md" p="md">
                    <Stack gap="md">
                        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-blue-0)">
                            <Stack gap={4} align="center">
                                <Text size="sm" c="dimmed" fw={500}>{t('time_converter.result')}</Text>
                                <Group gap="xs" align="center">
                                    <Text size="2rem" fw={700} c="blue.7">{convert()}</Text>
                                    <Text size="sm" c="dimmed">{t(`time_converter.units.${toUnit}`)}</Text>
                                </Group>
                            </Stack>
                        </Paper>
                    </Stack>
                </Paper>
            </Stack>
            <Divider mt="md" />
            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <ConvertersActionsGrid lng={lng} />
        </Container>
    );
};

export default TimeConverterClient;
