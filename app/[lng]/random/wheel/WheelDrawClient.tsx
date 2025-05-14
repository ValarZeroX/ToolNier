'use client';
import React, { useState, useEffect } from 'react';
import { Container, Title, Textarea, Button, Stack, Paper, Text, Center, Group, Tabs, Grid } from '@mantine/core';
import { IconList, IconHistory, IconX } from '@tabler/icons-react';
import classes from './WheelDrawClient.module.css';
import SpinWheel from '@/components/Random/SpinWheelComponent'; // ✅ 新子組件

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
    const [inputValue, setInputValue] = useState('選項A\n選項B\n選項C\n選項D\n選項E\n選項F\n選項G\n選項H');
    const [data, setData] = useState<{ option: string }[]>([]);
    const [startSpinSignal, setStartSpinSignal] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [hasRemoved, setHasRemoved] = useState(false);

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
            <Title order={3} ta="center">轉盤抽籤</Title>
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
                            <Button variant="outline" onClick={handleStartDraw}>開始</Button>
                            <Button variant="outline" color="red" onClick={handleRemove} disabled={!result || hasRemoved}>移除</Button>
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
                            <Tabs.Tab value="item" leftSection={<IconList size={12} />}>選項</Tabs.Tab>
                            <Tabs.Tab value="history" leftSection={<IconHistory size={12} />}>歷史紀錄</Tabs.Tab>
                        </Tabs.List>

                        <Tabs.Panel value="item">
                            <Stack gap="md" mt="md">
                                {data.length > 0 && (
                                    <Button color="red" variant="outline" onClick={handleReset} leftSection={<IconX size={14} />} disabled={startSpinSignal}>
                                        清空選項
                                    </Button>
                                )}
                                <Textarea
                                    label="請輸入選項（每行一個）"
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
                                            清空紀錄
                                        </Button>
                                        <Paper shadow="md" p="md" radius="md" withBorder>
                                            {history.map((item, index) => (
                                                <Text key={index}>第 {index + 1} 次：{item}</Text>
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
