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
    Paper,
    Group,
} from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { formatNumber } from '@/lib/utils/formatNumber';
import ConvertersActionsGrid from '@/components/ActionsGrid/ConvertersActionsGrid';

interface TemperatureConverterClientProps {
    lng: string;
}

const TemperatureConverterClient: React.FC<TemperatureConverterClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'converters');
    const [inputValue, setInputValue] = useState('100');
    const [fromUnit, setFromUnit] = useState('C');
    const [toUnit, setToUnit] = useState('F');

    const tempUnits = [
        { label: t('temperature_converter.units.C'), value: 'C' },
        { label: t('temperature_converter.units.F'), value: 'F' },
        { label: t('temperature_converter.units.K'), value: 'K' },
    ];

    const convert = () => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) return '';

        let celsius;

        // 先轉成 Celsius（攝氏）
        switch (fromUnit) {
            case 'C':
                celsius = value;
                break;
            case 'F':
                celsius = (value - 32) * (5 / 9);
                break;
            case 'K':
                celsius = value - 273.15;
                break;
            default:
                return '';
        }

        // 再從 Celsius 轉成目標單位
        switch (toUnit) {
            case 'C':
                return formatNumber(celsius);
            case 'F':
                return formatNumber((celsius * 9) / 5 + 32);
            case 'K':
                return formatNumber(celsius + 273.15);
            default:
                return '';
        }
    };

    return (
        <Container size="md" mt="lg">
            <Title order={3} ta="center">{t('temperature_converter.title')}</Title>
            <Text ta="center" size="sm" c="dimmed" mt="xs">{t('temperature_converter.description')}</Text>
            <Stack gap="md" mt="md">
                <TextInput
                    label={t('temperature_converter.input_label')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    placeholder="100"
                />

                <Select
                    label={t('temperature_converter.from_label')}
                    data={tempUnits}
                    value={fromUnit}
                    onChange={(value) => setFromUnit(value || 'C')}
                />

                <Select
                    label={t('temperature_converter.to_label')}
                    data={tempUnits}
                    value={toUnit}
                    onChange={(value) => setToUnit(value || 'F')}
                />
                <Paper withBorder shadow="sm" radius="md" p="md">
                    <Stack gap="md">
                        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-blue-0)">
                            <Stack gap={4} align="center">
                                <Text size="sm" c="dimmed" fw={500}>{t('temperature_converter.result')}</Text>
                                <Group gap="xs" align="center">
                                    <Text size="2rem" fw={700} c="blue.7">{convert()}</Text>
                                    <Text size="sm" c="dimmed">{toUnit}</Text>
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

export default TemperatureConverterClient;
