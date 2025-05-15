'use client';
import React, { useState, useEffect } from 'react';
import { Container, Title, Textarea, Button, Stack, Paper, Text, Center, Group, Tabs, Grid } from '@mantine/core';
import { IconList, IconHistory, IconX } from '@tabler/icons-react';
import classes from './WheelDrawClient.module.css';
import SpinWheel from '@/components/Random/SpinWheelComponent'; // ✅ 新子組件
import { useTranslation } from '../../../i18n/client';
interface WheelDrawClientProps {
    lng: string;
}

const wheelColors = [
    "#F22B35",
    "#F99533",
    "#24CA69",
    "#514E50",
    "#46AEFF",
    "#9145B7"
];

const WheelDrawClient: React.FC<WheelDrawClientProps> = ({ lng }) => {
    const [inputValue, setInputValue] = useState('A\nB\nC\nD\nE\nF\nG\nH');
    const [data, setData] = useState<{ option: string }[]>([]);
    const [startSpinSignal, setStartSpinSignal] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [hasRemoved, setHasRemoved] = useState(false);
    const { t } = useTranslation(lng, 'common');

    useEffect(() => {
        const entries = inputValue
            .split('\n')
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
        setData(entries.map(item => ({ option: item })));
    }, [inputValue]);

    const handleStartDraw = () => {
        if (startSpinSignal) return;
        if (data.length < 2) {
            alert('請至少輸入兩個選項！');
            return;
        }
        setStartSpinSignal(true);
        setResult(null);
        setHasRemoved(false);
    };

    const handleRemove = () => {
        if (!result) return;
        setData(prevData => prevData.filter(item => item.option !== result));
        setInputValue(prevValue =>
            prevValue
                .split('\n')
                .filter((line) => line.trim() !== result)
                .join('\n')
        );
        setHasRemoved(true);
    };

    const handleReset = () => {
        setInputValue('');
        setData([]);
        setStartSpinSignal(false);
        setResult(null);
        setHistory([]);
    };

    return (
        <Container size="sm" mt="lg">
            <Title order={3} ta="center">{t('random_draw_page.wheel_title')}</Title>
            <Grid>
                <Grid.Col span={{ base: 12, sm: 12, md: 8 }}>
                    <Stack gap="md" mt="md">
                        {data.length > 0 && (
                            <Center onClick={handleStartDraw} className={classes.hmocIu}>
                                <SpinWheel
                                    data={data}
                                    startSpinSignal={startSpinSignal}
                                    setStartSpinSignal={setStartSpinSignal}
                                    onResult={(picked) => {
                                        setResult(picked);
                                        setHistory(prev => [...prev, picked]);
                                    }}
                                    wheelColors={wheelColors}
                                />
                            </Center>
                        )}
                        <Group justify="center">
                            <Button variant="outline" onClick={handleStartDraw}>{t('random_draw_page.start')}</Button>
                            <Button variant="outline" color="red" onClick={handleRemove} disabled={!result || hasRemoved}>{t('random_draw_page.remove')}</Button>
                        </Group>
                        {result && (
                            <Paper shadow="xs" p="md" radius="md" withBorder>
                                <Text ta="center" size="xl">{result}</Text>
                            </Paper>
                        )}
                    </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
                    <Tabs defaultValue="item">
                        <Tabs.List>
                            <Tabs.Tab value="item" leftSection={<IconList size={12} />}>{t('random_draw_page.wheel_options')}</Tabs.Tab>
                            <Tabs.Tab value="history" leftSection={<IconHistory size={12} />}>{t('random_draw_page.wheel_history')}</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="item">
                            <Stack gap="md" mt="md">
                                {data.length > 0 && (
                                    <Button color="red" variant="outline" onClick={handleReset} leftSection={<IconX size={14} />} disabled={startSpinSignal}>
                                        {t('random_draw_page.clear_options')}
                                    </Button>
                                )}
                                <Textarea
                                    label={t('random_draw_page.input_label')}
                                    value={inputValue}
                                    onChange={(event) => setInputValue(event.currentTarget.value)}
                                    autosize
                                    minRows={5}
                                    disabled={startSpinSignal}
                                />
                            </Stack>
                        </Tabs.Panel>

                        <Tabs.Panel value="history">
                            <Stack gap="md" mt="md">
                                {history.length > 0 && (
                                    <>
                                        <Button color="red" variant="outline" leftSection={<IconX size={14} />} onClick={() => setHistory([])} disabled={startSpinSignal}>
                                            {t('random_draw_page.clear_history')}
                                        </Button>
                                        <Paper shadow="md" p="md" radius="md" withBorder>
                                            {history.map((item, index) => (
                                                <Text key={index}>{t('random_draw_page.history_item', { number: index + 1, result: item })}</Text>
                                            ))}
                                        </Paper>
                                    </>
                                )}
                            </Stack>
                        </Tabs.Panel>
                    </Tabs>
                </Grid.Col>
            </Grid>
        </Container>
    );
};

export default WheelDrawClient;
