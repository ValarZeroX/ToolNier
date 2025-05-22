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

            <Paper p="md" shadow="sm" mt="md">
                <Title order={4}>{t('timestamp_converter.current_timestamp')}</Title>
                <Text size="sm">{t('timestamp_converter.seconds')}：{Math.floor(now / 1000)}</Text>
                <Text size="sm">{t('timestamp_converter.milliseconds')}：{now}</Text>
            </Paper>

            <Paper p="md" shadow="sm" mt="md">
                <Title order={4}>{t('timestamp_converter.timestamp_to_date')}</Title>
                <SegmentedControl
                    fullWidth
                    value={timestampUnit}
                    onChange={(val) => setTimestampUnit(val as 'seconds' | 'milliseconds')}
                    data={[
                        { label: t('timestamp_converter.seconds'), value: 'seconds' },
                        { label: t('timestamp_converter.milliseconds'), value: 'milliseconds' },
                    ]}
                    mt="sm"
                />
                <TextInput
                    label={t('timestamp_converter.input_timestamp')}
                    value={timestampInput}
                    onChange={(e) => setTimestampInput(e.currentTarget.value)}
                    mt="sm"
                />
                <Button fullWidth mt="sm" onClick={handleConvertTimestamp}>{t('timestamp_converter.convert_to_date')}</Button>
                {convertedDate && (
                    <Group mt="sm">
                        <Text>{convertedDate}</Text>
                        <CopyButton value={convertedDate}>{({ copy, copied }) => (
                            <Button leftSection={<IconCopy size={16} />} onClick={copy} size="xs" variant="outline">{copied ? t('timestamp_converter.copied') : t('timestamp_converter.copy')}</Button>
                        )}</CopyButton>
                    </Group>
                )}
            </Paper>

            <Paper p="md" shadow="sm" mt="md">
                <Title order={4}>{t('timestamp_converter.date_to_timestamp')}</Title>
                <DateTimePicker
                    label={t('timestamp_converter.input_datetime')}
                    value={dateInput ? dayjs(dateInput).toDate() : null}
                    onChange={(date) => setDateInput(date ? dayjs(date).format('YYYY-MM-DDTHH:mm:ss') : '')}
                    valueFormat="YYYY-MM-DD HH:mm:ss"
                    withSeconds
                    mt="sm"
                />
                <SegmentedControl
                    fullWidth
                    value={outputUnit}
                    onChange={(val) => setOutputUnit(val as 'seconds' | 'milliseconds')}
                    data={[
                        { label: t('timestamp_converter.output_seconds'), value: 'seconds' },
                        { label: t('timestamp_converter.output_milliseconds'), value: 'milliseconds' },
                    ]}
                    mt="sm"
                />
                <Button fullWidth mt="sm" onClick={handleConvertDate}>{t('timestamp_converter.convert_to_timestamp')}</Button>
                {convertedTimestamp && (
                    <Group mt="sm">
                        <Text>{convertedTimestamp}</Text>
                        <CopyButton value={convertedTimestamp}>{({ copy, copied }) => (
                            <Button  leftSection={<IconCopy size={16} />} onClick={copy} size="xs" variant="outline">{copied ? t('timestamp_converter.copied') : t('timestamp_converter.copy')}</Button>
                        )}</CopyButton>
                    </Group>
                )}
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
