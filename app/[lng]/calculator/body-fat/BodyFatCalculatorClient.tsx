'use client';

import React, { useState } from 'react';
import {
    Container,
    Title,
    Stack,
    TextInput,
    Group,
    Text,
    Paper,
    SegmentedControl,
    RadioGroup,
    Radio,
    Button,
    Table,
    List,
    Divider
} from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { IconEqual } from '@tabler/icons-react';
import CalculatorActionsGrid from '@/components/ActionsGrid/CalculatorActionsGrid';

interface BodyFatCalculatorProps {
    lng: string;
}

export default function BodyFatCalculator({ lng }: BodyFatCalculatorProps) {
    const { t } = useTranslation(lng, 'calculator');

    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [age, setAge] = useState('25');
    const [height, setHeight] = useState('170');
    const [weight, setWeight] = useState('60');

    const [neck, setNeck] = useState('');
    const [waist, setWaist] = useState('');
    const [hip, setHip] = useState('');

    const [foot, setFoot] = useState('5');
    const [inch, setInch] = useState('8');
    const [pound, setPound] = useState('150');

    const [neckImperial, setNeckImperial] = useState('');
    const [waistImperial, setWaistImperial] = useState('');
    const [hipImperial, setHipImperial] = useState('');

    const [bodyFat, setBodyFat] = useState<string | null>(null);
    const [bodyFatCategory, setBodyFatCategory] = useState('');

    const calculateBodyFat = () => {
        const h = parseFloat(height);
        const w = parseFloat(weight);
        const n = parseFloat(neck);
        const wa = parseFloat(waist);
        const hi = parseFloat(hip);
        const ageVal = parseFloat(age);

        const ft = parseFloat(foot);
        const inc = parseFloat(inch);
        const lb = parseFloat(pound);

        const neckIn = parseFloat(neckImperial);
        const waistIn = parseFloat(waistImperial);
        const hipIn = parseFloat(hipImperial);

        let result = 0;

        if (unit === 'metric') {
            if (isNaN(h) || isNaN(n) || isNaN(wa)) return;
            const logHeight = Math.log10(h);
            const logValue =
                gender === 'male'
                    ? Math.log10(wa - n)
                    : Math.log10(wa + hi - n);
            result =
                gender === 'male'
                    ? 495 / (1.0324 - 0.19077 * logValue + 0.15456 * logHeight) - 450
                    : 495 / (1.29579 - 0.35004 * logValue + 0.22100 * logHeight) - 450;
        } else {
            const totalInches = ft * 12 + inc;
            const logHeight = Math.log10(totalInches);
            const logValue =
                gender === 'male'
                    ? Math.log10(waistIn - neckIn)
                    : Math.log10(waistIn + hipIn - neckIn);
            result =
                gender === 'male'
                    ? 86.010 * logValue - 70.041 * logHeight + 36.76
                    : 163.205 * logValue - 97.684 * logHeight - 78.387;
        }

        const roundBodyFat = Number(result.toFixed(2));
        setBodyFat(roundBodyFat.toString());

        // 获取体脂率分类
        let category = '';
        if (gender === 'male') {
            // 美国体脂率分类标准
            if (roundBodyFat >= 2 && roundBodyFat <= 5) {
                category = t('body_fat.essential_fat');
            } else if (roundBodyFat > 5 && roundBodyFat <= 13) {
                category = t('body_fat.athletes');
            } else if (roundBodyFat > 13 && roundBodyFat <= 17) {
                category = t('body_fat.fitness');
            } else if (roundBodyFat > 17 && roundBodyFat <= 24) {
                category = t('body_fat.average');
            } else if (ageVal <= 39) {
                if (roundBodyFat <= 10) {
                    category = t('body_fat.underfat');
                } else if (roundBodyFat > 10 && roundBodyFat <= 21) {
                    category = t('body_fat.healthy');
                } else if (roundBodyFat > 21 && roundBodyFat <= 26) {
                    category = t('body_fat.overfat');
                } else {
                    category = t('body_fat.obese');
                }
            } else if (ageVal > 39 && ageVal <= 59) {
                if (roundBodyFat <= 11) {
                    category = t('body_fat.underfat');
                } else if (roundBodyFat > 11 && roundBodyFat <= 22) {
                    category = t('body_fat.healthy');
                } else if (roundBodyFat > 22 && roundBodyFat <= 27) {
                    category = t('body_fat.overfat');
                } else {
                    category = t('body_fat.obese');
                }
            } else {
                if (roundBodyFat <= 13) {
                    category = t('body_fat.underfat');
                } else if (roundBodyFat > 13 && roundBodyFat <= 24) {
                    category = t('body_fat.healthy');
                } else if (roundBodyFat > 24 && roundBodyFat <= 29) {
                    category = t('body_fat.overfat');
                } else {
                    category = t('body_fat.obese');
                }
            }
        } else {
            // 美国体脂率分类标准
            if (roundBodyFat >= 10 && roundBodyFat <= 13) {
                category = t('body_fat.essential_fat');
            } else if (roundBodyFat > 13 && roundBodyFat <= 20) {
                category = t('body_fat.athletes');
            } else if (roundBodyFat > 20 && roundBodyFat <= 24) {
                category = t('body_fat.fitness');
            } else if (roundBodyFat > 24 && roundBodyFat <= 31) {
                category = t('body_fat.average');
            } else if (ageVal <= 39) {
                if (roundBodyFat <= 20) {
                    category = t('body_fat.underfat');
                } else if (roundBodyFat > 21 && roundBodyFat <= 34) {
                    category = t('body_fat.healthy');
                } else if (roundBodyFat > 34 && roundBodyFat <= 39) {
                    category = t('body_fat.overfat');
                } else {
                    category = t('body_fat.obese');
                }
            } else if (ageVal > 39 && ageVal <= 59) {
                if (roundBodyFat <= 21) {
                    category = t('body_fat.underfat');
                } else if (roundBodyFat > 21 && roundBodyFat <= 35) {
                    category = t('body_fat.healthy');
                } else if (roundBodyFat > 35 && roundBodyFat <= 40) {
                    category = t('body_fat.overfat');
                } else {
                    category = t('body_fat.obese');
                }
            } else {
                if (roundBodyFat <= 22) {
                    category = t('body_fat.underfat');
                } else if (roundBodyFat > 22 && roundBodyFat <= 29) {
                    category = t('body_fat.healthy');
                } else if (roundBodyFat > 29 && roundBodyFat <= 36) {
                    category = t('body_fat.overfat');
                } else {
                    category = t('body_fat.obese');
                }
            }
        }

        // 更新分类显示
        setBodyFatCategory(category);
    };

    return (
        <Container size="sm">
            <Title ta="center" order={2}>{t('body_fat.body_fat_calculator')}</Title>
            <SegmentedControl
                fullWidth
                value={unit}
                onChange={(val) => setUnit(val as 'metric' | 'imperial')}
                data={[
                    { label: t('metric_units'), value: 'metric' },
                    { label: t('imperial_units'), value: 'imperial' },
                ]}
                mt="md"
            />

            <Stack mt="md">
                <RadioGroup value={gender} onChange={(val) => setGender(val as 'male' | 'female')}>
                    <Group mt="xs">
                        <Radio value="male" label={t('male')} />
                        <Radio value="female" label={t('female')} />
                    </Group>
                </RadioGroup>

                <TextInput
                    label={t('age')}
                    value={age}
                    onChange={(e) => setAge(e.currentTarget.value)}
                />

                {unit === 'metric' ? (
                    <>
                        <Group grow>
                            <TextInput label={t('height')} value={height} onChange={(e) => setHeight(e.currentTarget.value)} rightSection={<Text>cm</Text>} />
                            <TextInput label={t('weight')} value={weight} onChange={(e) => setWeight(e.currentTarget.value)} rightSection={<Text>kg</Text>} />
                        </Group>
                        <Group grow>
                            <TextInput label={t('neck')} value={neck} onChange={(e) => setNeck(e.currentTarget.value)} rightSection={<Text>cm</Text>} />
                            <TextInput label={t('waist')} value={waist} onChange={(e) => setWaist(e.currentTarget.value)} rightSection={<Text>cm</Text>} />
                            {gender === 'female' && <TextInput label={t('hip')} value={hip} onChange={(e) => setHip(e.currentTarget.value)} rightSection={<Text>cm</Text>} />}
                        </Group>
                    </>
                ) : (
                    <>
                        <Group grow>
                            <TextInput label={t('height')} value={foot} onChange={(e) => setFoot(e.currentTarget.value)} rightSection={<Text>ft</Text>} />
                            <TextInput label={' '} value={inch} onChange={(e) => setInch(e.currentTarget.value)} rightSection={<Text>in</Text>} />
                        </Group>
                        <TextInput label={t('weight')} value={pound} onChange={(e) => setPound(e.currentTarget.value)} rightSection={<Text>lb</Text>} />
                        <Group grow>
                            <TextInput label={t('neck')} value={neckImperial} onChange={(e) => setNeckImperial(e.currentTarget.value)} rightSection={<Text>in</Text>} />
                            <TextInput label={t('waist')} value={waistImperial} onChange={(e) => setWaistImperial(e.currentTarget.value)} rightSection={<Text>in</Text>} />
                            {gender === 'female' && <TextInput label={t('hip')} value={hipImperial} onChange={(e) => setHipImperial(e.currentTarget.value)} rightSection={<Text>in</Text>} />}
                        </Group>
                    </>
                )}

                <Button fullWidth onClick={calculateBodyFat}>{t('calculate')}</Button>

                <Paper withBorder shadow="sm" radius="md" p="md" ta="center" mt="md">
                    <Group justify="center" mt="xs" gap="xs">
                        <Text fw={700} size="xl">{t('body_fat.body_fat')}</Text>
                        <IconEqual size={18} />
                        <Text size="xl" fw={700}>
                            {bodyFat}
                        </Text>
                    </Group>
                    <Group justify="center" mt="xs" gap="xs">
                        <Text fw={700} size="xl">{t('body_fat.body_fat_category')}</Text>
                        <IconEqual size={18} />
                        <Text size="xl" fw={700}>
                            {bodyFatCategory}
                        </Text>
                    </Group>
                </Paper>

                <Text size="sm" my="sm">{t('body_fat.body_fat_1')}</Text>
                <Text size="sm" my="sm">{t('body_fat.body_fat_2')}</Text>
                <Text size="sm" my="sm">{t('body_fat.body_fat_3')}</Text>
                <Title order={3} mt="xl">{t('body_fat.healthy_body_fat_ranges_for_adults')}</Title>
                <Text size="sm" my="sm">{t('body_fat.body_fat_23')}</Text>
                <Title order={4} mt="xl">{t('body_fat.men')}</Title>
                <Table striped withColumnBorders highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t('age')}</Table.Th>
                            <Table.Th>18 - 39</Table.Th>
                            <Table.Th>40 - 59</Table.Th>
                            <Table.Th>60+   </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.underfat')}</Table.Td>
                            <Table.Td>0 - 10%</Table.Td>
                            <Table.Td>0 - 11%</Table.Td>
                            <Table.Td>0 - 13%</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.healthy')}</Table.Td>
                            <Table.Td>11 - 21%</Table.Td>
                            <Table.Td>12 - 22%</Table.Td>
                            <Table.Td>14 - 24%</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.overfat')}</Table.Td>
                            <Table.Td>22 - 26%</Table.Td>
                            <Table.Td>23 - 27%</Table.Td>
                            <Table.Td>25 - 29%</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.obese')}</Table.Td>
                            <Table.Td>27 - 45%+</Table.Td>
                            <Table.Td>28 - 45%+</Table.Td>
                            <Table.Td>30 - 45%+</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
                <Title order={4} mt="xl">{t('body_fat.women')}</Title>
                <Table striped withColumnBorders highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t('age')}</Table.Th>
                            <Table.Th>18 - 39</Table.Th>
                            <Table.Th>40 - 59</Table.Th>
                            <Table.Th>60+   </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.underfat')}</Table.Td>
                            <Table.Td>0 - 20%</Table.Td>
                            <Table.Td>0 - 21%</Table.Td>
                            <Table.Td>0 - 22%</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.healthy')}</Table.Td>
                            <Table.Td>21 - 34%</Table.Td>
                            <Table.Td>22 - 35%</Table.Td>
                            <Table.Td>23 - 29%</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.overfat')}</Table.Td>
                            <Table.Td>35 - 39%</Table.Td>
                            <Table.Td>36 - 40%</Table.Td>
                            <Table.Td>30 - 36%</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.obese')}</Table.Td>
                            <Table.Td>40 - 45%+</Table.Td>
                            <Table.Td>41 - 45%+</Table.Td>
                            <Table.Td>37 - 45%+</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
                <Title order={3} mt="xl">{t('body_fat.american_body_fat_categorization')}</Title>
                <Table striped withColumnBorders highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t('body_fat.description_text')}</Table.Th>
                            <Table.Th>{t('body_fat.women')}</Table.Th>
                            <Table.Th>{t('body_fat.men')}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.essential_fat')}</Table.Td>
                            <Table.Td>10 - 13%</Table.Td>
                            <Table.Td>2 - 5%</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.athletes')}</Table.Td>
                            <Table.Td>14 - 20%</Table.Td>
                            <Table.Td>6 - 13%</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.fitness')}</Table.Td>
                            <Table.Td>21 - 24%</Table.Td>
                            <Table.Td>14 - 17%</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.average')}</Table.Td>
                            <Table.Td>25 - 31%</Table.Td>
                            <Table.Td>18 - 24%</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('body_fat.obese')}</Table.Td>
                            <Table.Td>32%+</Table.Td>
                            <Table.Td>25%+</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
                <Title order={3} mt="xl">{t('body_fat.body_fat_5')}</Title>
                <List>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_6')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_7')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_8')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_9')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_10')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_11')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_12')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_13')}</Text></List.Item>
                </List>
                <Title order={3} mt="xl">{t('body_fat.body_fat_14')}</Title>
                <List>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_15')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_16')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_17')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_18')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_19')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_20')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_21')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('body_fat.body_fat_22')}</Text></List.Item>
                </List>
            </Stack>
            <Divider mt="md" />
            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <CalculatorActionsGrid lng={lng} />
        </Container>
    );
}
