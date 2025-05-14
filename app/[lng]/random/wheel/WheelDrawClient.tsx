'use client';
import React, { useState, useEffect } from 'react';
import { Container, Title, Textarea, Button, Stack, Paper, Text, Center, Modal, Group, Tabs, Grid } from '@mantine/core';
import { Wheel } from 'react-custom-roulette';
import { IconList, IconHistory, IconX } from '@tabler/icons-react';
import classes from './WheelDrawClient.module.css';

interface WheelDrawClientProps {
    lng: string;
}

const wheelColors = [
    '#FF5733', '#FFBD33', '#DBFF33', '#75FF33', '#33FF57',
    '#33FFBD', '#33DBFF', '#3375FF', '#8E33FF', '#FF33A8'
];

const WheelDrawClient: React.FC<WheelDrawClientProps> = ({ lng }) => {
    const [inputValue, setInputValue] = useState('選項A\n選項B\n選項C');
    const [data, setData] = useState<{ option: string }[]>([]);
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [result, setResult] = useState<string | null>(null);
    const [history, setHistory] = useState<string[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const entries = inputValue
            .split('\n')
            .map((item) => item.trim())
            .filter((item) => item.length > 0);
        setData(entries.map(item => ({ option: item })));
    }, [inputValue]);

    const handleStartDraw = () => {
        if (data.length < 2) {
            alert('請至少輸入兩個選項！');
            return;
        }
        // const randomIndex = Math.floor(Math.random() * data.length);
        const randomIndex = Math.floor(Math.random() * data.length);
    const offset = Math.round(data.length * 0.25); // ➡️ 加入右側偏移
    setPrizeNumber((randomIndex + offset) % data.length);
        setPrizeNumber(randomIndex);
        setMustSpin(true);
        setResult(null);
    };

    const handleReset = () => {
        setInputValue('');
        setData([]);
        setMustSpin(false);
        setResult(null);
        setHistory([]);
    };

    const handleRemove = () => {
        setData(prevData => prevData.filter((_, index) => index !== prizeNumber));
        setInputValue(prevValue =>
            prevValue
                .split('\n')
                .filter((_, index) => index !== prizeNumber)
                .join('\n')
        );
        setIsDialogOpen(false);
    };

    return (
        <Container size="sm" mt="lg">
            <Title order={3} ta="center">轉盤抽籤</Title>
            <Grid>
                <Grid.Col span={{ base: 12, sm: 12, md: 8 }}>
                    <Stack gap="md" mt="md">
                        {data.length > 0 && (
                            <Center onClick={handleStartDraw}
                            className={classes.hmocIu}
                            >
                                <Wheel
                                    mustStartSpinning={mustSpin}
                                    prizeNumber={prizeNumber}
                                    data={data}
                                    backgroundColors={Array.from({ length: data.length }, (_, i) => wheelColors[i % wheelColors.length])}
                                    textColors={['#333']}
                                    outerBorderWidth={2}
                                    radiusLineWidth={2}
                                    innerRadius={20}
                                    innerBorderWidth={2}
                                    pointerProps={{
                                        style: {
                                            width: '5%',
                                            marginTop: '10%',
                                            marginRight: '10%',
                                        },
                                    }}
                                    onStopSpinning={() => {
                                        const picked = data[prizeNumber].option;
                                        setResult(picked);
                                        setHistory(prev => [...prev, picked]);
                                        setMustSpin(false);
                                        setIsDialogOpen(true); // ✅ 彈窗開啟
                                    }}
                                />
                            </Center>
                        )}
                        {/* <Button fullWidth color="blue" onClick={handleStartDraw} disabled={!inputValue.trim()}>
                            開始轉動
                        </Button> */}
                        {result && (
                            <Paper shadow="md" p="md" radius="md" withBorder>
                                <Text ta="center" size="xl">抽中：{result}</Text>
                            </Paper>
                        )}
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 12, md: 4 }}>
                    <Tabs defaultValue="item">
                        <Tabs.List>
                            <Tabs.Tab value="item" leftSection={<IconList size={12} />}>
                                選項
                            </Tabs.Tab>
                            <Tabs.Tab value="history" leftSection={<IconHistory size={12} />}>
                                歷史紀錄
                            </Tabs.Tab>
                        </Tabs.List>
                        <Tabs.Panel value="item">
                            <Stack gap="md" mt="md">
                                <Textarea
                                    label="請輸入選項（每行一個）"
                                    // placeholder="例如：\n選項A\n選項B\n選項C"
                                    value={inputValue}
                                    onChange={(event) => setInputValue(event.currentTarget.value)}
                                    autosize
                                    minRows={5}
                                />
                                {data.length > 0 && (
                                    <Button color="red" variant="outline" onClick={handleReset} leftSection={<IconX size={14} />}>
                                        清空
                                    </Button>
                                )}
                            </Stack>
                        </Tabs.Panel>
                        <Tabs.Panel value="history">
                            <Stack gap="md" mt="md">
                                {history.length > 0 && (
                                    <>
                                        <Button color="red" variant="outline" leftSection={<IconX size={14} />} onClick={() => setHistory([])}>
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

            <Modal
                opened={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                title="是否移除該選項？"
                centered
            >
                <Text ta="center" mb="md">抽中：{result}</Text>
                <Group ta="center" mt="md">
                    <Button color="red" onClick={handleRemove}>移除</Button>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>關閉</Button>
                </Group>
            </Modal>
        </Container>
    );
};

export default WheelDrawClient;
