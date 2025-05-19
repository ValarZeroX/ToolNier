// app/[lng]/tools/uuid-generator/UUIDGeneratorClient.tsx

'use client';
import React, { useState } from 'react';
import { Container, Title, Button, Textarea, Stack, NumberInput, Group, Text, Tooltip } from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { IconCopy, IconX, IconDownload } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';
import { useClipboard } from '@mantine/hooks';

interface UUIDGeneratorClientProps {
    lng: string;
}

const UUIDGeneratorClient: React.FC<UUIDGeneratorClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'tools');
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState<number>(1);
    const clipboard = useClipboard({ timeout: 1000 });

    const handleGenerate = () => {
        const newUuids = Array.from({ length: count }, () => uuidv4());
        setUuids(newUuids);
    };

    const handleClear = () => {
        setUuids([]);
    };

    const handleDownloadTxt = () => {
        if (uuids.length === 0) return;

        const blob = new Blob([uuids.join('\n')], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'uuids.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url); // ✅ 釋放資源
    };

    return (
        <Container size="xs" mt="lg">
            <Title order={3} ta="center">{t('uuid.title')}</Title>
            <Text ta="center" size="sm" c="dimmed" mt="xs">
                {t('uuid.description')}
            </Text>

            <Stack gap="md" mt="md">
                <NumberInput
                    label={t('uuid.count_label')}
                    value={count}
                    onChange={(value) => setCount(Number(value) || 1)}
                    min={1}
                    max={100}
                />

                <Group justify="center">
                    <Button onClick={handleGenerate}>{t('uuid.generate')}</Button>
                    <Button color="red" variant="outline" onClick={handleClear} leftSection={<IconX size={14} />} disabled={uuids.length === 0}>
                        {t('uuid.clear')}
                    </Button>

                    <Tooltip label={clipboard.copied ? t('copied') : t('copy')} withArrow>
                        <Button
                            variant="outline"
                            onClick={() => clipboard.copy(uuids.join('\n'))}
                            leftSection={<IconCopy size={16} />}
                            disabled={uuids.length === 0}
                        >
                            {t('copy')}
                        </Button>
                    </Tooltip>
                    <Button variant="outline" onClick={handleDownloadTxt} leftSection={<IconDownload size={14} />} disabled={uuids.length === 0}>
                        {t('uuid.download_txt')}
                    </Button>
                </Group>

                {uuids.length > 0 && (
                    <Textarea
                        label={t('uuid.output_label')}
                        value={uuids.join('\n')}
                        readOnly
                        autosize
                        minRows={5}
                        maxRows={10}
                    />
                )}
            </Stack>
        </Container>
    );
};

export default UUIDGeneratorClient;
