'use client';

import React, { useState } from 'react';
import {
    Container,
    Title,
    Stack,
    TextInput,
    Button,
    Group,
    Text,
    Paper,
    SegmentedControl,
    Select,
    Radio,
    RadioGroup,
    Table,
    List,
    Divider
} from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { IconEqual } from '@tabler/icons-react';
import CalculatorActionsGrid from '@/components/ActionsGrid/CalculatorActionsGrid';

interface TdeeCalculatorProps {
    lng: string;
}

export default function TdeeCalculator({ lng }: TdeeCalculatorProps) {
    const { t } = useTranslation(lng, 'calculator');
    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [age, setAge] = useState('25');
    const [height, setHeight] = useState('170');
    const [weight, setWeight] = useState('60');
    const [foot, setFoot] = useState('5');
    const [inch, setInch] = useState('8');
    const [pound, setPound] = useState('150');
    const [bodyFat, setBodyFat] = useState('');
    const [equation, setEquation] = useState('1');
    const [activity, setActivity] = useState('1');
    const [bmr, setBmr] = useState<string | null>(null);
    const [tdee, setTdee] = useState<string | null>(null);

    const calculateTDEE = () => {
        const ageVal = parseFloat(age);
        const isMale = gender === 'male';

        let heightCm = 0;
        let weightKg = 0;

        if (unit === 'metric') {
            heightCm = parseFloat(height);
            weightKg = parseFloat(weight);
        } else {
            const ft = parseFloat(foot);
            const inc = parseFloat(inch);
            const lb = parseFloat(pound);
            const totalInches = ft * 12 + inc;
            heightCm = totalInches * 2.54;
            weightKg = lb * 0.45359237;
        }

        if (isNaN(ageVal) || isNaN(heightCm) || isNaN(weightKg)) return;

        let result = 0;

        if (equation === '1') {
            result = isMale
                ? 10 * weightKg + 6.25 * heightCm - 5 * ageVal + 5
                : 10 * weightKg + 6.25 * heightCm - 5 * ageVal - 161;
        } else if (equation === '2') {
            result = isMale
                ? 13.397 * weightKg + 4.799 * heightCm - 5.677 * ageVal + 88.362
                : 9.247 * weightKg + 3.098 * heightCm - 4.33 * ageVal + 447.593;
        } else if (equation === '3') {
            const bf = parseFloat(bodyFat);
            if (isNaN(bf)) return;
            result = 370 + 21.6 * (1 - bf / 100) * weightKg;
        }

        const levelMultiplier: Record<string, number> = {
            '1': 1.2,
            '2': 1.375,
            '3': 1.55,
            '4': 1.725,
            '5': 1.9,
            '6': 2.4,
        };

        const tdeeVal = result * levelMultiplier[activity];

        setBmr(result.toFixed(2));
        setTdee(tdeeVal.toFixed(2));
    };

    return (
        <Container size="sm">
            <Title ta="center" order={2}>{t('tdee.tdee_calculator')}</Title>
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

                <TextInput label={t('age')} value={age} onChange={(e) => setAge(e.currentTarget.value)} placeholder="25" />

                {unit === 'metric' ? (
                    <Group grow>
                        <TextInput label={t('height')} value={height} onChange={(e) => setHeight(e.currentTarget.value)} rightSection={<Text>cm</Text>} />
                        <TextInput label={t('weight')} value={weight} onChange={(e) => setWeight(e.currentTarget.value)} rightSection={<Text>kg</Text>} />
                    </Group>
                ) : (
                    <>
                        <Group grow>
                            <TextInput label={t('height')} value={foot} onChange={(e) => setFoot(e.currentTarget.value)} rightSection={<Text>ft</Text>} />
                            <TextInput label=" " value={inch} onChange={(e) => setInch(e.currentTarget.value)} rightSection={<Text>in</Text>} />
                        </Group>
                        <TextInput label={t('weight')} value={pound} onChange={(e) => setPound(e.currentTarget.value)} rightSection={<Text>lb</Text>} />
                    </>
                )}

                <Select
                    label={t('equation')}
                    data={[
                        { value: '1', label: 'Mifflin-St Jeor' },
                        { value: '2', label: 'Harris-Benedict' },
                        { value: '3', label: 'Katch-McArdle' },
                    ]}
                    value={equation}
                    onChange={(val) => setEquation(val || '1')}
                />

                {equation === '3' && (
                    <TextInput label={t('body_fat')} value={bodyFat} onChange={(e) => setBodyFat(e.currentTarget.value)} rightSection={<Text>%</Text>} />
                )}

                <Select
                    label={t('tdee.activity')}
                    data={['1', '2', '3', '4', '5', '6'].map((v) => ({ value: v, label: t(`tdee.tdee_level_${v}`) }))}
                    value={activity}
                    onChange={(val) => setActivity(val || '1')}
                />

                <Button fullWidth onClick={calculateTDEE}>{t('calculate')}</Button>

                <Paper withBorder shadow="sm" radius="md" p="md">
                    <Stack gap="md">
                        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-blue-0)">
                            <Stack gap={4} align="center">
                                <Text size="sm" c="dimmed" fw={500}>BMR (基礎代謝率)</Text>
                                <Group gap="xs" align="center">
                                    <Text size="2rem" fw={700} c="blue.7">{bmr}</Text>
                                    <Text size="sm" c="dimmed">kcal/day</Text>
                                </Group>
                            </Stack>
                        </Paper>

                        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-green-0)">
                            <Stack gap={4} align="center">
                                <Text size="sm" c="dimmed" fw={500}>TDEE (每日總能量消耗)</Text>
                                <Group gap="xs" align="center">
                                    <Text size="2rem" fw={700} c="green.7">{tdee}</Text>
                                    <Text size="sm" c="dimmed">kcal/day</Text>
                                </Group>
                            </Stack>
                        </Paper>
                    </Stack>
                </Paper>

                <Text size="sm" my="sm">{t('tdee.tdee_1')}</Text>

                <Table striped withColumnBorders highlightOnHover mt="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t('tdee.activity')}</Table.Th>
                            <Table.Th>{t('tdee.tdee_formula')}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {[1, 2, 3, 4, 5, 6].map((v) => (
                            <Table.Tr key={v}>
                                <Table.Td>{t(`tdee.tdee_level_${v}`)}</Table.Td>
                                <Table.Td>BMR × {['1.2', '1.375', '1.55', '1.725', '1.9', '2.4'][v - 1]}</Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>

                <Title order={3} mt="lg">{t('tdee.tdee_2')}</Title>
                <List spacing="xs" size="sm">
                    {[3, 4, 5, 6].map((v) => (
                        <List.Item key={v}>
                            <Text fw={600}>{t(`tdee.tdee_${v}`)}:</Text>
                            <Text>{t(`tdee.tdee_${v + 4}`)}</Text>
                        </List.Item>
                    ))}
                </List>
            </Stack>
            <Divider mt="md" />
            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <CalculatorActionsGrid lng={lng} />
        </Container>
    );
}
