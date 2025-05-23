'use client';

import React, { useEffect, useState } from 'react';
import {
    Container,
    Title,
    TextInput,
    Button,
    Group,
    Paper,
    SegmentedControl,
    CopyButton,
    Text,
    Divider,
    Stack,
} from '@mantine/core';
import dayjs from 'dayjs';
import { useClipboard } from '@mantine/hooks';
import { DateTimePicker } from '@mantine/dates';
import '@mantine/dates/styles.css';
import { useTranslation } from '../../../i18n/client';
import ConvertersActionsGrid from '@/components/ActionsGrid/ConvertersActionsGrid';
import { IconCopy } from '@tabler/icons-react';

interface TimestampConverterClientProps {
    lng: string;
}

const TimestampConverterClient: React.FC<TimestampConverterClientProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'converters');
    const [now, setNow] = useState<number>(0);
    const [timestampInput, setTimestampInput] = useState('');
    const [timestampUnit, setTimestampUnit] = useState<'seconds' | 'milliseconds'>('seconds');
    const [convertedDate, setConvertedDate] = useState('');

    const [dateInput, setDateInput] = useState('');
    const [outputUnit, setOutputUnit] = useState<'seconds' | 'milliseconds'>('seconds');
    const [convertedTimestamp, setConvertedTimestamp] = useState('');
    const clipboard = useClipboard({ timeout: 1000 });

    useEffect(() => {
        // 初始化時間戳和日期
        setNow(Date.now());
        setDateInput(dayjs().format('YYYY-MM-DDTHH:mm:ss'));

        // 每秒更新時間戳
        const timer = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleConvertTimestamp = () => {
        let ts = parseInt(timestampInput.trim());
        if (timestampUnit === 'seconds') ts *= 1000;
        if (!isNaN(ts)) {
            setConvertedDate(dayjs(ts).format('YYYY-MM-DD HH:mm:ss'));
        } else {
            setConvertedDate(t('timestamp_converter.invalid_timestamp'));
        }
    };

    const handleConvertDate = () => {
        const d = dayjs(dateInput);
        if (d.isValid()) {
            const ts = d.valueOf();
            setConvertedTimestamp(outputUnit === 'seconds' ? Math.floor(ts / 1000).toString() : ts.toString());
        } else {
            setConvertedTimestamp(t('timestamp_converter.invalid_date'));
        }
    };

    return (
        <Container size="sm" mt="lg">
            <Title order={2} ta="center">{t('timestamp_converter.title')}</Title>

            <Paper withBorder shadow="sm" radius="md" p="md">
                <Stack gap="md">
                    <Title order={4}>{t('timestamp_converter.current_timestamp')}</Title>
                    <Paper withBorder p="md" radius="md" bg="var(--mantine-color-blue-0)">
                        <Stack gap={4}>
                            <Group gap="xs" align="center">
                                <Text size="sm" c="dimmed">{t('timestamp_converter.seconds')}</Text>
                                <Text size="1.5rem" fw={700} c="blue.7">{Math.floor(now / 1000)}</Text>
                            </Group>
                            <Group gap="xs" align="center">
                                <Text size="sm" c="dimmed">{t('timestamp_converter.milliseconds')}</Text>
                                <Text size="1.5rem" fw={700} c="blue.7">{now}</Text>
                            </Group>
                        </Stack>
                    </Paper>
                </Stack>
            </Paper>

            <Paper withBorder shadow="sm" radius="md" p="md" mt="md">
                <Stack gap="md">
                    <Title order={4}>{t('timestamp_converter.timestamp_to_date')}</Title>
                    <SegmentedControl
                        fullWidth
                        value={timestampUnit}
                        onChange={(val) => setTimestampUnit(val as 'seconds' | 'milliseconds')}
                        data={[
                            { label: t('timestamp_converter.seconds'), value: 'seconds' },
                            { label: t('timestamp_converter.milliseconds'), value: 'milliseconds' },
                        ]}
                    />
                    <TextInput
                        label={t('timestamp_converter.input_timestamp')}
                        value={timestampInput}
                        onChange={(e) => setTimestampInput(e.currentTarget.value)}
                    />
                    <Button fullWidth onClick={handleConvertTimestamp}>{t('timestamp_converter.convert_to_date')}</Button>
                    {convertedDate && (
                        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-green-0)">
                            <Group justify="space-between" align="center">
                                <Text size="1.5rem" fw={700} c="green.7">{convertedDate}</Text>
                                <CopyButton value={convertedDate}>{({ copy, copied }) => (
                                    <Button leftSection={<IconCopy size={16} />} onClick={copy} size="xs" variant="outline" color={copied ? 'green' : 'blue'}>
                                        {copied ? t('timestamp_converter.copied') : t('timestamp_converter.copy')}
                                    </Button>
                                )}</CopyButton>
                            </Group>
                        </Paper>
                    )}
                </Stack>
            </Paper>

            <Paper withBorder shadow="sm" radius="md" p="md" mt="md">
                <Stack gap="md">
                    <Title order={4}>{t('timestamp_converter.date_to_timestamp')}</Title>
                    <DateTimePicker
                        label={t('timestamp_converter.input_datetime')}
                        value={dateInput ? dayjs(dateInput).toDate() : null}
                        onChange={(date) => setDateInput(date ? dayjs(date).format('YYYY-MM-DDTHH:mm:ss') : '')}
                        valueFormat="YYYY-MM-DD HH:mm:ss"
                        withSeconds
                    />
                    <SegmentedControl
                        fullWidth
                        value={outputUnit}
                        onChange={(val) => setOutputUnit(val as 'seconds' | 'milliseconds')}
                        data={[
                            { label: t('timestamp_converter.output_seconds'), value: 'seconds' },
                            { label: t('timestamp_converter.output_milliseconds'), value: 'milliseconds' },
                        ]}
                    />
                    <Button fullWidth onClick={handleConvertDate}>{t('timestamp_converter.convert_to_timestamp')}</Button>
                    {convertedTimestamp && (
                        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-green-0)">
                            <Group justify="space-between" align="center">
                                <Text size="1.5rem" fw={700} c="green.7">{convertedTimestamp}</Text>
                                <CopyButton value={convertedTimestamp}>{({ copy, copied }) => (
                                    <Button leftSection={<IconCopy size={16} />} onClick={copy} size="xs" variant="outline" color={copied ? 'green' : 'blue'}>
                                        {copied ? t('timestamp_converter.copied') : t('timestamp_converter.copy')}
                                    </Button>
                                )}</CopyButton>
                            </Group>
                        </Paper>
                    )}
                </Stack>
            </Paper>
            <Divider mt="md" />
            <Title order={3} mt="lg">{t('timestamp_converter.features_title')}</Title>
            <Text size="sm" mt="md" c="dimmed">{t('timestamp_converter.description')}</Text>
            <Paper withBorder radius="md" p="md" mt="md">
                <Stack gap="xs">
                    {[0, 1, 2, 3].map((index) => (
                        <Group key={index} wrap="nowrap" align="flex-start">
                            <Text fw={600} c="blue" size="sm" style={{ minWidth: '8px' }}>{index + 1}.</Text>
                            <Text size="sm" style={{ lineHeight: 1.6 }}>{t(`timestamp_converter.features.${index}`)}</Text>
                        </Group>
                    ))}
                </Stack>
            </Paper>
            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <ConvertersActionsGrid lng={lng} />
        </Container>
    );
}

export default TimestampConverterClient;
