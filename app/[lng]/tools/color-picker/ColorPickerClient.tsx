// app/[lng]/tools/color-picker/ColorPickerClient.tsx

'use client';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Stack,
  Text,
  Group,
  Paper,
  ColorPicker,
  Button,
  Tooltip,
  Divider,
  TextInput,
  ColorInput
} from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { useTranslation } from '../../../i18n/client';
import ToolsActionsGrid from '@/components/ActionsGrid/ToolsActionsGrid';
import { Notifications } from '@mantine/notifications';

interface ColorPickerClientProps {
  lng: string;
}

const ColorPickerClient: React.FC<ColorPickerClientProps> = ({ lng }) => {
  const { t } = useTranslation(lng, 'tools');
  const [color, setColor] = useState('rgba(47, 119, 150, 0.7)');
  const [format, setFormat] = useState<'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'>('rgba');
  const [convertedColors, setConvertedColors] = useState<Record<string, string>>({});
  const [inputColor, setInputColor] = useState('');

  const colorFormats = [
    [
      { value: 'hex', label: 'HEX' },
      { value: 'hexa', label: 'HEXA' },
    ],
    [
      { value: 'rgb', label: 'RGB' },
      { value: 'rgba', label: 'RGBA' },
    ],
    [
      { value: 'hsl', label: 'HSL' },
      { value: 'hsla', label: 'HSLA' },
    ],
  ];

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    Notifications.show({
      title: t('copied'),
      message: value,
      color: 'green',
      autoClose: 2000,
    });
  };

  const handleInputColorChange = (value: string) => {
    setInputColor(value);
    try {
      // Create a temporary div to validate the color
      const div = document.createElement('div');
      div.style.color = value;
      const computedColor = window.getComputedStyle(div).color;
      if (computedColor !== 'rgba(0, 0, 0, 0)') {
        setColor(value);
      }
    } catch (error) {
      // Invalid color format, ignore
    }
  };

  useEffect(() => {
    const convertColor = (color: string, targetFormat: string) => {
      // Create a temporary div to use the browser's color conversion
      const div = document.createElement('div');
      div.style.color = color;
      document.body.appendChild(div);
      const computedColor = window.getComputedStyle(div).color;
      document.body.removeChild(div);

      // Parse the computed color
      const match = computedColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
      if (!match) return color;

      const r = parseInt(match[1]);
      const g = parseInt(match[2]);
      const b = parseInt(match[3]);
      const a = match[4] ? parseFloat(match[4]) : 1;

      switch (targetFormat) {
        case 'hex':
          return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        case 'hexa':
          return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${Math.round(a * 255).toString(16).padStart(2, '0')}`;
        case 'rgb':
          return `rgb(${r}, ${g}, ${b})`;
        case 'rgba':
          return `rgba(${r}, ${g}, ${b}, ${a})`;
        case 'hsl': {
          const [h, s, l] = rgbToHsl(r, g, b);
          return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
        }
        case 'hsla': {
          const [h, s, l] = rgbToHsl(r, g, b);
          return `hsla(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%, ${a})`;
        }
        default:
          return color;
      }
    };

    // Convert color for all formats
    const newConvertedColors: Record<string, string> = {};
    colorFormats.forEach(group => {
      group.forEach(format => {
        newConvertedColors[format.value] = convertColor(color, format.value);
      });
    });
    setConvertedColors(newConvertedColors);
  }, [color]);

  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h *= 60;
    }

    return [h, s * 100, l * 100];
  };

  return (
    <Container size="md" mt="lg">
      <Title order={3} ta="center">{t('color_picker.title')}</Title>
      <Text ta="center" size="sm" c="dimmed" mt="xs">
        {t('color_picker.description')}
      </Text>

      <Stack mt="md" gap="md">
        <ColorPicker 
          format={format} 
          value={color} 
          onChange={setColor} 
          fullWidth 
        />

        <Group align="flex-end">
          <ColorInput
            label={t('color_picker.input_color')}
            placeholder='#2f7796b3'
            value={inputColor}
            onChange={handleInputColorChange}
            style={{ flex: 1 }}
            format="hexa"
            swatches={[
              '#25262bff',
              '#868e96ff',
              '#fa5252ff',
              '#e64980ff',
              '#be4bdbff',
              '#7950f2ff',
              '#4c6ef5ff',
              '#228be6ff',
              '#15aabfff',
              '#12b886ff',
              '#40c057ff',
              '#82c91eff',
              '#fab005ff',
              '#fd7e14ff',
            ]}
          />
        </Group>

        <Stack gap="md">
          {colorFormats.map((group, groupIndex) => (
            <Group key={groupIndex} grow>
              {group.map((format) => (
                <Group key={format.value} justify="space-between" align="flex-end">
                  <TextInput 
                    value={convertedColors[format.value] || color} 
                    readOnly 
                    label={format.label}
                    rightSection={
                      <IconCopy 
                        size={14} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleCopy(convertedColors[format.value] || color)}
                      />
                    }
                  />
                </Group>
              ))}
            </Group>
          ))}
        </Stack>

        <Paper withBorder radius="md" p="md">
          <Text size="sm" c="dimmed">
            {t('color_picker.hint')}
          </Text>
        </Paper>
      </Stack>

      <Divider mt="md" />
      <Title order={3} mt="lg">{t('color_picker.how_to_use_title')}</Title>
            <Paper withBorder radius="md" p="md" mt="md">
                <Stack gap="xs">
                    {[0, 1, 2].map((index) => (
                        <Group key={index} wrap="nowrap" align="flex-start">
                            <Text fw={600} c="blue" size="sm" style={{ minWidth: '8px' }}>{index + 1}.</Text>
                            <Text size="sm" style={{ lineHeight: 1.6 }}>{t(`color_picker.how_to_use_steps.${index}`)}</Text>
                        </Group>
                    ))}
                </Stack>
            </Paper>
            <Title order={3} mt="lg">{t('color_picker.faq_title')}</Title>
            <Stack gap="md" mt="md">
                {[0, 1, 2].map((index) => (
                    <Paper key={index} p="md" withBorder radius="md">
                        <Text fw={600} size="sm" mb="xs" c="blue">
                            {t(`color_picker.faq.${index}.q`)}
                        </Text>
                        <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
                            {t(`color_picker.faq.${index}.a`)}
                        </Text>
                    </Paper>
                ))}
            </Stack>
      <Title order={3} mt="lg">{t('explore_more_title')}</Title>
      <ToolsActionsGrid lng={lng} />
    </Container>
  );
};

export default ColorPickerClient;
