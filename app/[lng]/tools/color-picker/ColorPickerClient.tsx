// app/[lng]/tools/color-picker/ColorPickerClient.tsx

'use client';
import React, { useState } from 'react';
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
  CopyButton,
  Select
} from '@mantine/core';
import { IconCopy, IconCheck } from '@tabler/icons-react';
import { useTranslation } from '../../../i18n/client';
import ToolsActionsGrid from '@/components/ActionsGrid/ToolsActionsGrid';

interface ColorPickerClientProps {
  lng: string;
}

const ColorPickerClient: React.FC<ColorPickerClientProps> = ({ lng }) => {
  const { t } = useTranslation(lng, 'tools');
//   const [color, setColor] = useState<string>('#3498db');
  const [color, setColor] = useState('rgba(47, 119, 150, 0.7)');
  const [format, setFormat] = useState<'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'>('rgba');

//   const formatColor = (color: string, format: string): string => {
//     // Convert hex to other formats if needed
//     if (format === 'hex') return color;
//     if (format === 'hexa') return color;
//     if (format === 'rgb') {
//       const r = parseInt(color.slice(1, 3), 16);
//       const g = parseInt(color.slice(3, 5), 16);
//       const b = parseInt(color.slice(5, 7), 16);
//       return `rgb(${r}, ${g}, ${b})`;
//     }
//     if (format === 'rgba') {
//       const r = parseInt(color.slice(1, 3), 16);
//       const g = parseInt(color.slice(3, 5), 16);
//       const b = parseInt(color.slice(5, 7), 16);
//       const a = color.length === 9 ? parseInt(color.slice(7, 9), 16) / 255 : 1;
//       return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
//     }
//     if (format === 'hsl') {
//       const r = parseInt(color.slice(1, 3), 16) / 255;
//       const g = parseInt(color.slice(3, 5), 16) / 255;
//       const b = parseInt(color.slice(5, 7), 16) / 255;
//       const max = Math.max(r, g, b);
//       const min = Math.min(r, g, b);
//       let h = 0;
//       let s = 0;
//       const l = (max + min) / 2;

//       if (max !== min) {
//         const d = max - min;
//         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//         switch (max) {
//           case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//           case g: h = (b - r) / d + 2; break;
//           case b: h = (r - g) / d + 4; break;
//         }
//         h /= 6;
//       }

//       return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
//     }
//     if (format === 'hsla') {
//       const r = parseInt(color.slice(1, 3), 16) / 255;
//       const g = parseInt(color.slice(3, 5), 16) / 255;
//       const b = parseInt(color.slice(5, 7), 16) / 255;
//       const a = color.length === 9 ? parseInt(color.slice(7, 9), 16) / 255 : 1;
//       const max = Math.max(r, g, b);
//       const min = Math.min(r, g, b);
//       let h = 0;
//       let s = 0;
//       const l = (max + min) / 2;

//       if (max !== min) {
//         const d = max - min;
//         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//         switch (max) {
//           case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//           case g: h = (b - r) / d + 2; break;
//           case b: h = (r - g) / d + 4; break;
//         }
//         h /= 6;
//       }

//       return `hsla(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%, ${a.toFixed(2)})`;
//     }
//     return color;
//   };

  return (
    <Container size="sm" mt="lg">
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

        <Group justify="center" align="flex-end">
          <Select
            label={t('color_picker.format')}
            value={format}
            onChange={(value) => value && setFormat(value as 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla')}
            data={[
              { value: 'hex', label: 'HEX' },
              { value: 'hexa', label: 'HEXA' },
              { value: 'rgb', label: 'RGB' },
              { value: 'rgba', label: 'RGBA' },
              { value: 'hsl', label: 'HSL' },
              { value: 'hsla', label: 'HSLA' },
            ]}
            w={120}
          />
          <TextInput 
            value={color} 
            readOnly 
            label={t('color_picker.selected_color')} 
            w={200} 
          />
          <CopyButton value={color} timeout={1000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? t('copied') : t('copy')} withArrow>
                <Button onClick={copy} leftSection={copied ? <IconCheck size={14} /> : <IconCopy size={14} />}>
                  {copied ? t('copied') : t('copy')}
                </Button>
              </Tooltip>
            )}
          </CopyButton>
        </Group>

        <Paper withBorder radius="md" p="md">
          <Text size="sm" c="dimmed">
            {t('color_picker.hint')}
          </Text>
        </Paper>
      </Stack>

      <Divider mt="md" />

      <Title order={3} mt="lg">{t('explore_more_title')}</Title>
      <ToolsActionsGrid lng={lng} />
    </Container>
  );
};

export default ColorPickerClient;
