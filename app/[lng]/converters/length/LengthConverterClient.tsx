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
import ConvertersActionsGrid from '@/components/ActionsGrid/ConvertersActionsGrid';

interface LengthConverterClientProps {
  lng: string;
}

const LengthConverterClient: React.FC<LengthConverterClientProps> = ({ lng }) => {
  const { t } = useTranslation(lng, 'converters');
  const [inputValue, setInputValue] = useState('100');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');

  const lengthUnits = [
    { label: t('length_converter.units.mm'), value: 'mm' },
    { label: t('length_converter.units.cm'), value: 'cm' },
    { label: t('length_converter.units.m'), value: 'm' },
    { label: t('length_converter.units.km'), value: 'km' },
    { label: t('length_converter.units.in'), value: 'in' },
    { label: t('length_converter.units.ft'), value: 'ft' },
    { label: t('length_converter.units.yd'), value: 'yd' },
    { label: t('length_converter.units.mi'), value: 'mi' },
  ];

  const conversionRates: Record<string, number> = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344,
  };

  const convert = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value)) return '';
    const valueInMeters = value * conversionRates[fromUnit];
    const converted = valueInMeters / conversionRates[toUnit];
    return formatNumber(converted);
  };

  return (
    <Container size="md" mt="lg">
      <Title order={3} ta="center">{t('length_converter.title')}</Title>
      <Text ta="center" size="sm" c="dimmed" mt="xs">{t('length_converter.description')}</Text>
      <Stack gap="md" mt="md">
        <TextInput
          label={t('length_converter.input_label')}
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          placeholder="100"
        />

        <Select
          label={t('length_converter.from_label')}
          data={lengthUnits}
          value={fromUnit}
          onChange={(value) => setFromUnit(value || 'm')}
        />

        <Select
          label={t('length_converter.to_label')}
          data={lengthUnits}
          value={toUnit}
          onChange={(value) => setToUnit(value || 'ft')}
        />

        <Paper withBorder shadow="sm" radius="md" p="md">
          <Stack gap="md">
            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-blue-0)">
              <Stack gap={4} align="center">
                <Text size="sm" c="dimmed" fw={500}>{t('length_converter.result')}</Text>
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

export default LengthConverterClient;
