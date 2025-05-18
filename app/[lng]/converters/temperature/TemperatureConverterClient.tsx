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

interface TemperatureConverterClientProps {
  lng: string;
}

const TemperatureConverterClient: React.FC<TemperatureConverterClientProps> = ({ lng }) => {
  const { t } = useTranslation(lng, 'converters');
  const [inputValue, setInputValue] = useState('');
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
        return celsius.toFixed(2);
      case 'F':
        return ((celsius * 9) / 5 + 32).toFixed(2);
      case 'K':
        return (celsius + 273.15).toFixed(2);
      default:
        return '';
    }
  };

  return (
    <Container size="xs" mt="lg">
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

        <Text fw={700} ta="center">
          {t('temperature_converter.result')} {convert()} {toUnit}
        </Text>
      </Stack>
    </Container>
  );
};

export default TemperatureConverterClient;
