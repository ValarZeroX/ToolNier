'use client';
import React, { useState } from 'react';
import { Container, Title, Textarea, Button, Text, Paper, Stack, Grid, Group } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useTranslation } from "../../../i18n/client";

interface RandomDrawClientProps {
  lng: string;
}

const RandomDrawClient: React.FC<RandomDrawClientProps> = ({ lng }) => {
  const [inputValue, setInputValue] = useState('A\nB\nC\nD\nE\nF\nG\nH');
  const [options, setOptions] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const { t } = useTranslation(lng, 'common');

  
  const handleStartDraw = () => {
    const entries = inputValue
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (entries.length > 0) {
      setOptions(entries);
      const randomIndex = Math.floor(Math.random() * entries.length);
      setResult(entries[randomIndex]);
      setHistory(prev => [...prev, entries[randomIndex]]);
    }
  };

  const handleRemove = () => {
    if (!result) return;

    // 從 options 移除
    setOptions(prev => prev.filter(item => item !== result));

    // 從 inputValue 移除
    setInputValue(prev =>
      prev
        .split('\n')
        .filter(item => item.trim() !== result)
        .join('\n')
    );

    // 清空當前 result
    setResult(null);
  };

  const handleReset = () => {
    setInputValue('');
    setOptions([]);
    setResult(null);
  };

  return (
    <Container size="xs" mt="lg">
      <Title order={3} ta="center">{t('random_draw_page.title')}</Title>
      <Text size="sm" c="dimmed" mt="md">
        {t('random_draw_page.intro_2')}
    </Text>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 12, md: 8 }}>
          <Stack gap="md" mt="md">
              <Button fullWidth color="red" variant="outline" leftSection={<IconX size={14} />} onClick={handleReset}>
                {t('random_draw_page.clear_options')}
              </Button>
            <Textarea
              label={t('random_draw_page.input_label')}
              value={inputValue}
              onChange={(event) => setInputValue(event.currentTarget.value)}
              autosize
              minRows={5}
              maxRows={10}
            />
            <Group justify="center">
              <Button color="blue" onClick={handleStartDraw} disabled={!inputValue.trim()}>
                {t('random_draw_page.start')}
              </Button>
              <Button variant="outline" color="red" onClick={handleRemove} disabled={!result}>{t('random_draw_page.remove')}</Button>
            </Group>

            {result && (
              <Paper shadow="md" p="md" radius="md" withBorder>
                <Text ta="center" size="xl">{t('random_draw_page.result_prefix')}{result}{t('random_draw_page.result_suffix')}</Text>
              </Paper>
            )}


          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
          <Stack gap="md" mt="md">
              <>
                <Button color="red" variant="outline" leftSection={<IconX size={14} />} onClick={() => setHistory([])} >
                  {t('random_draw_page.clear_history')}
                </Button>
                {history.length > 0 && (
                <Paper shadow="md" p="md" radius="md" withBorder>
                  {history.map((item, index) => (
                    <Text key={index}>{t('random_draw_page.history_item', { number: index + 1, result: item })}</Text>
                  ))}
                </Paper>
                )} 
              </>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default RandomDrawClient;
