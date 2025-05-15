// app/[lng]/tools/uuid-generator/UUIDGeneratorClient.tsx

'use client';
import React, { useState } from 'react';
import { Container, Title, Button, Textarea, Stack, NumberInput, Group, Text, Tooltip } from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { IconCopy, IconX } from '@tabler/icons-react';
import { v4 as uuidv4 } from 'uuid';
import { useClipboard } from '@mantine/hooks';

interface UUIDGeneratorClientProps {
    lng: string;
}

const UUIDGeneratorClient: React.FC<UUIDGeneratorClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'common');
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
                    <Button color="red" variant="outline" onClick={handleClear} leftSection={<IconX size={14} />}>
                        {t('uuid.clear')}
                    </Button>
                    {uuids.length > 0 && (
                        <Tooltip label={clipboard.copied ? t('copied') : t('copy')} withArrow>
                            <Button
                                variant="outline"
                                onClick={() => clipboard.copy(uuids.join('\n'))}
                                leftSection={<IconCopy size={16} />}
                            >
                                {t('copy')}
                            </Button>
                        </Tooltip>
                    )}
                </Group>

                {uuids.length > 0 && (
                    <Textarea
                        label={t('uuid.output_label')}
                        value={uuids.join('\n')}
                        readOnly
                        autosize
                        minRows={5}
                    />
                )}
            </Stack>
        </Container>
    );
};

export default UUIDGeneratorClient;
