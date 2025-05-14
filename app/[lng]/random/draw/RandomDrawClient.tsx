'use client';
import React, { useState } from 'react';
import { Container, Title, Textarea, Button, Text, Paper, Stack } from '@mantine/core';

interface RandomDrawClientProps {
  lng: string;
}

const RandomDrawClient: React.FC<RandomDrawClientProps> = ({ lng }) => {
  const [inputValue, setInputValue] = useState('選項A\n選項B\n選項C');
  const [options, setOptions] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleStartDraw = () => {
    const entries = inputValue
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    if (entries.length > 0) {
      setOptions(entries);
      const randomIndex = Math.floor(Math.random() * entries.length);
      setResult(entries[randomIndex]);
    }
  };

  const handleReset = () => {
    setInputValue('');
    setOptions([]);
    setResult(null);
  };

  return (
    <Container size="xs" mt="lg">
      <Title order={3} ta="center">隨機抽籤</Title>

      <Stack gap="md" mt="md">
        <Textarea
          label="請輸入選項（每行一個）"
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          autosize
          minRows={5}
        />

        <Button fullWidth color="blue" onClick={handleStartDraw} disabled={!inputValue.trim()}>
          開始抽籤
        </Button>

        {result && (
          <Paper shadow="md" p="md" radius="md" withBorder>
            <Text ta="center" size="xl">🎉 抽中：{result} 🎉</Text>
          </Paper>
        )}

        {options.length > 0 && (
          <Button fullWidth color="red" variant="outline" onClick={handleReset}>
            清空
          </Button>
        )}
      </Stack>
    </Container>
  );
};

export default RandomDrawClient;
