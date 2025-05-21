'use client';
import React, { useState } from 'react';
import { Container, Title, Textarea, Button, Stack, Group, Text, Divider, Paper } from '@mantine/core';
import { IconArrowsDownUp, IconX, IconDownload } from '@tabler/icons-react';
import { useTranslation } from '../../../i18n/client';
import ToolsActionsGrid from '@/components/ActionsGrid/ToolsActionsGrid';

interface JsonFormatterClientProps {
  lng: string;
}

const JsonFormatterClient: React.FC<JsonFormatterClientProps> = ({ lng }) => {
  const { t } = useTranslation(lng, 'tools');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
    } catch (e) {
      setOutput(t('json.error'));
    }
  };

  const handleCompress = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
    } catch (e) {
      setOutput(t('json.error'));
    }
  };

  const handleSwap = () => {
    setInput(output);
    setOutput(input);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container size="md" mt="lg">
      <Title order={3} ta="center">{t('json.title')}</Title>
      <Text ta="center" size="sm" c="dimmed" mt="xs">
        {t('json.description')}
      </Text>
      <Stack gap="md" mt="md">
        <Textarea
          label={t('json.input_label')}
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          autosize
          minRows={8}
          maxRows={8}
        />

        <Group justify="center">
          <Button onClick={handleFormat}>{t('json.format')}</Button>
          <Button variant="outline" onClick={handleCompress}>{t('json.compress')}</Button>
          <Button variant="outline" onClick={handleSwap} leftSection={<IconArrowsDownUp size={16} />}>{t('json.swap')}</Button>
          <Button variant="outline" color="red" onClick={handleClear} leftSection={<IconX size={16} />}>{t('json.clear')}</Button>
          <Button variant="outline" onClick={handleDownload} leftSection={<IconDownload size={16} />} disabled={!output}>
            {t('json.download')}
          </Button>
        </Group>

        <Textarea
          label={t('json.output_label')}
          value={output}
          readOnly
          autosize
          minRows={8}
          maxRows={8}
        />
      </Stack>
      <Divider mt="md" />
      <Title order={3} mt="lg">{t('json.how_to_use_title')}</Title>
      <Paper withBorder radius="md" p="md" mt="md">
        <Stack gap="xs">
          {[0, 1, 2].map((index) => (
            <Group key={index} wrap="nowrap" align="flex-start">
              <Text fw={600} c="blue" size="sm" style={{ minWidth: '8px' }}>{index + 1}.</Text>
              <Text size="sm" style={{ lineHeight: 1.6 }}>{t(`json.how_to_use_steps.${index}`)}</Text>
            </Group>
          ))}
        </Stack>
      </Paper>
      <Title order={3} mt="lg">{t('json.faq_title')}</Title>
      <Stack gap="md" mt="md">
        {[0, 1, 2].map((index) => (
          <Paper key={index} p="md" withBorder radius="md">
            <Text fw={600} size="sm" mb="xs" c="blue">
              {t(`json.faq.${index}.q`)}
            </Text>
            <Text size="sm" c="dimmed" style={{ lineHeight: 1.6 }}>
              {t(`json.faq.${index}.a`)}
            </Text>
          </Paper>
        ))}
      </Stack>
      <Title order={3} mt="lg">{t('explore_more_title')}</Title>
      <ToolsActionsGrid lng={lng} />
    </Container>
  );
};

export default JsonFormatterClient;
