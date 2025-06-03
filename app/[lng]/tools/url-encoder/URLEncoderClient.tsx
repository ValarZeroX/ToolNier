'use client';

import React, { useState } from 'react';
import {
  Container,
  Title,
  Text,
  Textarea,
  Button,
  Paper,
  Group,
  Stack,
  Tabs,
  Divider,
  Table,
} from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import ToolsActionsGrid from '@/components/ActionsGrid/ToolsActionsGrid';
import { notifications } from '@mantine/notifications';
import { IconCopy } from '@tabler/icons-react';

interface URLEncoderClientProps {
  lng: string;
}

const URLEncoderClient: React.FC<URLEncoderClientProps> = ({ lng }) => {
  const { t } = useTranslation(lng, 'tools');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState<string | null>('encode');

  const handleEncode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (error) {
      setOutput(t('url_encoder.error'));
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (error) {
      setOutput(t('url_encoder.error'));
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    notifications.show({
      title: t('url_encoder.copy_success_title'),
      message: t('url_encoder.copy_success_message'),
      color: 'green',
    });
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <Container size="md" mt="lg">
      <Title order={3} ta="center">{t('url_encoder.title')}</Title>
      <Text ta="center" size="sm" c="dimmed" mt="xs">
        {t('url_encoder.description')}
      </Text>

      <Stack gap="md" mt="md">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Tab value="encode">{t('url_encoder.encode')}</Tabs.Tab>
            <Tabs.Tab value="decode">{t('url_encoder.decode')}</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="encode">
            <Stack gap="md" mt="md">
              <Textarea
                label={t('url_encoder.input_label')}
                placeholder={t('url_encoder.input_placeholder')}
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                minRows={3}
                autosize
              />
              <Group>
                <Button onClick={handleEncode}>{t('url_encoder.encode')}</Button>
                <Button variant="light" onClick={handleClear}>{t('url_encoder.clear')}</Button>
              </Group>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="decode">
            <Stack gap="md" mt="md">
              <Textarea
                label={t('url_encoder.input_label')}
                placeholder={t('url_encoder.input_placeholder')}
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                minRows={3}
                autosize
              />
              <Group>
                <Button onClick={handleDecode}>{t('url_encoder.decode')}</Button>
                <Button variant="light" onClick={handleClear}>{t('url_encoder.clear')}</Button>
              </Group>
            </Stack>
          </Tabs.Panel>
        </Tabs>

        {output && (
          <Paper withBorder shadow="sm" radius="md" p="md">
            <Stack gap="xs">
              <Text size="sm" fw={500}>{t('url_encoder.output_label')}</Text>
              <Textarea
                value={output}
                readOnly
                minRows={3}
                autosize
              />
              <Group>
                <Button variant="light" onClick={handleCopy} leftSection={<IconCopy />}>{t('url_encoder.copy')}</Button>
              </Group>
            </Stack>
          </Paper>
        )}
      </Stack>
      <Divider my="md" />
      <Title order={3} mb="md">{t('url_encoder.reference_title')}</Title>
      <Paper withBorder shadow="sm" radius="md" p="md">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>{t('url_encoder.character')}</Table.Th>
              <Table.Th>{t('url_encoder.windows1252')}</Table.Th>
              <Table.Th>{t('url_encoder.utf8')}</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>space</Table.Td>
              <Table.Td>%20</Table.Td>
              <Table.Td>%20</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>!</Table.Td>
              <Table.Td>%21</Table.Td>
              <Table.Td>%21</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>"</Table.Td>
              <Table.Td>%22</Table.Td>
              <Table.Td>%22</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>#</Table.Td>
              <Table.Td>%23</Table.Td>
              <Table.Td>%23</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>$</Table.Td>
              <Table.Td>%24</Table.Td>
              <Table.Td>%24</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>%</Table.Td>
              <Table.Td>%25</Table.Td>
              <Table.Td>%25</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>&</Table.Td>
              <Table.Td>%26</Table.Td>
              <Table.Td>%26</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>'</Table.Td>
              <Table.Td>%27</Table.Td>
              <Table.Td>%27</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>(</Table.Td>
              <Table.Td>%28</Table.Td>
              <Table.Td>%28</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>)</Table.Td>
              <Table.Td>%29</Table.Td>
              <Table.Td>%29</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>*</Table.Td>
              <Table.Td>%2A</Table.Td>
              <Table.Td>%2A</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>+</Table.Td>
              <Table.Td>%2B</Table.Td>
              <Table.Td>%2B</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>,</Table.Td>
              <Table.Td>%2C</Table.Td>
              <Table.Td>%2C</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>-</Table.Td>
              <Table.Td>%2D</Table.Td>
              <Table.Td>%2D</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>.</Table.Td>
              <Table.Td>%2E</Table.Td>
              <Table.Td>%2E</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>/</Table.Td>
              <Table.Td>%2F</Table.Td>
              <Table.Td>%2F</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>0-9</Table.Td>
              <Table.Td>%30-%39</Table.Td>
              <Table.Td>%30-%39</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>:</Table.Td>
              <Table.Td>%3A</Table.Td>
              <Table.Td>%3A</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>;</Table.Td>
              <Table.Td>%3B</Table.Td>
              <Table.Td>%3B</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>&lt;</Table.Td>
              <Table.Td>%3C</Table.Td>
              <Table.Td>%3C</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>=</Table.Td>
              <Table.Td>%3D</Table.Td>
              <Table.Td>%3D</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>&gt;</Table.Td>
              <Table.Td>%3E</Table.Td>
              <Table.Td>%3E</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>?</Table.Td>
              <Table.Td>%3F</Table.Td>
              <Table.Td>%3F</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>@</Table.Td>
              <Table.Td>%40</Table.Td>
              <Table.Td>%40</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>A-Z</Table.Td>
              <Table.Td>%41-%5A</Table.Td>
              <Table.Td>%41-%5A</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>[</Table.Td>
              <Table.Td>%5B</Table.Td>
              <Table.Td>%5B</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>\</Table.Td>
              <Table.Td>%5C</Table.Td>
              <Table.Td>%5C</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>]</Table.Td>
              <Table.Td>%5D</Table.Td>
              <Table.Td>%5D</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>^</Table.Td>
              <Table.Td>%5E</Table.Td>
              <Table.Td>%5E</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>_</Table.Td>
              <Table.Td>%5F</Table.Td>
              <Table.Td>%5F</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>`</Table.Td>
              <Table.Td>%60</Table.Td>
              <Table.Td>%60</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>a-z</Table.Td>
              <Table.Td>%61-%7A</Table.Td>
              <Table.Td>%61-%7A</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>{'{'}</Table.Td>
              <Table.Td>%7B</Table.Td>
              <Table.Td>%7B</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>{'}'}</Table.Td>
              <Table.Td>%7D</Table.Td>
              <Table.Td>%7D</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>|</Table.Td>
              <Table.Td>%7C</Table.Td>
              <Table.Td>%7C</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>~</Table.Td>
              <Table.Td>%7E</Table.Td>
              <Table.Td>%7E</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>€</Table.Td>
              <Table.Td>%80</Table.Td>
              <Table.Td>%E2%82%AC</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>‚</Table.Td>
              <Table.Td>%82</Table.Td>
              <Table.Td>%E2%80%9A</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>ƒ</Table.Td>
              <Table.Td>%83</Table.Td>
              <Table.Td>%C6%92</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>„</Table.Td>
              <Table.Td>%84</Table.Td>
              <Table.Td>%E2%80%9E</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>…</Table.Td>
              <Table.Td>%85</Table.Td>
              <Table.Td>%E2%80%A6</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>†</Table.Td>
              <Table.Td>%86</Table.Td>
              <Table.Td>%E2%80%A0</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>‡</Table.Td>
              <Table.Td>%87</Table.Td>
              <Table.Td>%E2%80%A1</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>ˆ</Table.Td>
              <Table.Td>%88</Table.Td>
              <Table.Td>%CB%86</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>‰</Table.Td>
              <Table.Td>%89</Table.Td>
              <Table.Td>%E2%80%B0</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Š</Table.Td>
              <Table.Td>%8A</Table.Td>
              <Table.Td>%C5%A0</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>‹</Table.Td>
              <Table.Td>%8B</Table.Td>
              <Table.Td>%E2%80%B9</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Œ</Table.Td>
              <Table.Td>%8C</Table.Td>
              <Table.Td>%C5%92</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Ž</Table.Td>
              <Table.Td>%8E</Table.Td>
              <Table.Td>%C5%BD</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>š</Table.Td>
              <Table.Td>%9A</Table.Td>
              <Table.Td>%C5%A1</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>›</Table.Td>
              <Table.Td>%9B</Table.Td>
              <Table.Td>%E2%80</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>œ</Table.Td>
              <Table.Td>%9C</Table.Td>
              <Table.Td>%C5%93</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>ž</Table.Td>
              <Table.Td>%9E</Table.Td>
              <Table.Td>%C5%BE</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Ÿ</Table.Td>
              <Table.Td>%9F</Table.Td>
              <Table.Td>%C5%B8</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¡</Table.Td>
              <Table.Td>%A1</Table.Td>
              <Table.Td>%C2%A1</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¢</Table.Td>
              <Table.Td>%A2</Table.Td>
              <Table.Td>%C2%A2</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>£</Table.Td>
              <Table.Td>%A3</Table.Td>
              <Table.Td>%C2%A3</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¤</Table.Td>
              <Table.Td>%A4</Table.Td>
              <Table.Td>%C2%A4</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¥</Table.Td>
              <Table.Td>%A5</Table.Td>
              <Table.Td>%C2%A5</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¦</Table.Td>
              <Table.Td>%A6</Table.Td>
              <Table.Td>%C2%A6</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>§</Table.Td>
              <Table.Td>%A7</Table.Td>
              <Table.Td>%C2%A7</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¨</Table.Td>
              <Table.Td>%A8</Table.Td>
              <Table.Td>%C2%A8</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>©</Table.Td>
              <Table.Td>%A9</Table.Td>
              <Table.Td>%C2%A9</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>ª</Table.Td>
              <Table.Td>%AA</Table.Td>
              <Table.Td>%C2%AA</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>«</Table.Td>
              <Table.Td>%AB</Table.Td>
              <Table.Td>%C2%AB</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¬</Table.Td>
              <Table.Td>%AC</Table.Td>
              <Table.Td>%C2%AC</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>®</Table.Td>
              <Table.Td>%AE</Table.Td>
              <Table.Td>%C2%AE</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¯</Table.Td>
              <Table.Td>%AF</Table.Td>
              <Table.Td>%C2%AF</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>°</Table.Td>
              <Table.Td>%B0</Table.Td>
              <Table.Td>%C2%B0</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>±</Table.Td>
              <Table.Td>%B1</Table.Td>
              <Table.Td>%C2%B1</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>²</Table.Td>
              <Table.Td>%B2</Table.Td>
              <Table.Td>%C2%B2</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>³</Table.Td>
              <Table.Td>%B3</Table.Td>
              <Table.Td>%C2%B3</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>´</Table.Td>
              <Table.Td>%B4</Table.Td>
              <Table.Td>%C2%B4</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>µ</Table.Td>
              <Table.Td>%B5</Table.Td>
              <Table.Td>%C2%B5</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¶</Table.Td>
              <Table.Td>%B6</Table.Td>
              <Table.Td>%C2%B6</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>·</Table.Td>
              <Table.Td>%B7</Table.Td>
              <Table.Td>%C2%B7</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¸</Table.Td>
              <Table.Td>%B8</Table.Td>
              <Table.Td>%C2%B8</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¹</Table.Td>
              <Table.Td>%B9</Table.Td>
              <Table.Td>%C2%B9</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>º</Table.Td>
              <Table.Td>%BA</Table.Td>
              <Table.Td>%C2%BA</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>»</Table.Td>
              <Table.Td>%BB</Table.Td>
              <Table.Td>%C2%BB</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¼</Table.Td>
              <Table.Td>%BC</Table.Td>
              <Table.Td>%C2%BC</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>½</Table.Td>
              <Table.Td>%BD</Table.Td>
              <Table.Td>%C2%BD</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¾</Table.Td>
              <Table.Td>%BE</Table.Td>
              <Table.Td>%C2%BE</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>¿</Table.Td>
              <Table.Td>%BF</Table.Td>
              <Table.Td>%C2%BF</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>À-ÿ</Table.Td>
              <Table.Td>%C0-%FF</Table.Td>
              <Table.Td>%C3%80-%C3%BF</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Paper>

      <Title order={3} mt="lg">{t('explore_more_title')}</Title>
      <ToolsActionsGrid lng={lng} />
    </Container>
  );
};

export default URLEncoderClient; 