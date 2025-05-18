'use client';
import React, { useState } from 'react';
import {
    Container,
    Title,
    Stack,
    TextInput,
    Select,
    Text,
} from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { formatNumber } from '@/lib/utils/formatNumber';
import { Paper, Group } from '@mantine/core';
import { IconEqual } from '@tabler/icons-react';

interface WeightConverterClientProps {
    lng: string;
}

const WeightConverterClient: React.FC<WeightConverterClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'common');
    const [inputValue, setInputValue] = useState('100');
    const [fromUnit, setFromUnit] = useState('kg');
    const [toUnit, setToUnit] = useState('lb');

    const weightUnits = [
        { label: t('weight_converter.units.mg'), value: 'mg' },
        { label: t('weight_converter.units.g'), value: 'g' },
        { label: t('weight_converter.units.kg'), value: 'kg' },
        { label: t('weight_converter.units.t'), value: 't' },
        { label: t('weight_converter.units.oz'), value: 'oz' },
        { label: t('weight_converter.units.lb'), value: 'lb' },
    ];

    const conversionRates: Record<string, number> = {
        mg: 0.000001,
        g: 0.001,
        kg: 1,
        t: 1000,
        oz: 0.0283495,
        lb: 0.453592,
    };

    const convert = () => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) return '';
        const valueInKg = value * conversionRates[fromUnit];
        const converted = valueInKg / conversionRates[toUnit];
        return formatNumber(converted);
    };

    return (
        <Container size="xs" mt="lg">
            <Title order={3} ta="center">{t('weight_converter.title')}</Title>
            <Text ta="center" size="sm" c="dimmed" mt="xs">{t('weight_converter.description')}</Text>
            <Stack gap="md" mt="md">
                <TextInput
                    label={t('weight_converter.input_label')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    placeholder="100"
                />

                <Select
                    label={t('weight_converter.from_label')}
                    data={weightUnits}
                    value={fromUnit}
                    onChange={(value) => setFromUnit(value || 'kg')}
                />

                <Select
                    label={t('weight_converter.to_label')}
                    data={weightUnits}
                    value={toUnit}
                    onChange={(value) => setToUnit(value || 'lb')}
                />
                <Paper withBorder shadow="sm" radius="md" p="md" ta="center" mt="md">
                    <Text size="sm" c="dimmed">{t('weight_converter.result')}</Text>
                    <Group justify="center" mt="xs" gap="xs">
                        <IconEqual size={18} />
                        <Text size="xl" fw={700}>
                            {convert()} {toUnit}
                        </Text>
                    </Group>
                </Paper>
            </Stack>
        </Container>
    );
};

export default WeightConverterClient;
