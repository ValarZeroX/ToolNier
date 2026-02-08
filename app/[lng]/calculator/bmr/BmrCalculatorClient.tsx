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
    Table,
    Radio,
    RadioGroup,
    List,
    Divider,
} from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { IconEqual } from '@tabler/icons-react';
import CalculatorActionsGrid from '@/components/ActionsGrid/CalculatorActionsGrid';
interface BmrCalculatorProps {
    lng: string;
}

export default function BmrCalculator({ lng }: BmrCalculatorProps) {
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
    const [bmr, setBmr] = useState<string | null>(null);

    const calculateBMR = () => {
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
            // Mifflin-St Jeor
            result = isMale
                ? 10 * weightKg + 6.25 * heightCm - 5 * ageVal + 5
                : 10 * weightKg + 6.25 * heightCm - 5 * ageVal - 161;
        } else if (equation === '2') {
            // Harris-Benedict
            result = isMale
                ? 13.397 * weightKg + 4.799 * heightCm - 5.677 * ageVal + 88.362
                : 9.247 * weightKg + 3.098 * heightCm - 4.33 * ageVal + 447.593;
        } else if (equation === '3') {
            const bf = parseFloat(bodyFat);
            if (isNaN(bf)) return;
            result = 370 + 21.6 * (1 - bf / 100) * weightKg;
        }

        setBmr(result.toFixed(2));
    };

    return (
        <Container size="sm">
            <Title ta="center" order={2}>{t('bmr.bmr_calculator')}</Title>
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
                    placeholder="25"
                />

                {unit === 'metric' ? (
                    <Group grow>
                        <TextInput
                            label={t('height')}
                            value={height}
                            onChange={(e) => setHeight(e.currentTarget.value)}
                            rightSection={<Text>cm</Text>}
                        />
                        <TextInput
                            label={t('weight')}
                            value={weight}
                            onChange={(e) => setWeight(e.currentTarget.value)}
                            rightSection={<Text>kg</Text>}
                        />
                    </Group>
                ) : (
                    <>
                        <Group grow>
                            <TextInput
                                label={t('height')}
                                value={foot}
                                onChange={(e) => setFoot(e.currentTarget.value)}
                                rightSection={<Text>ft</Text>}
                            />
                            <TextInput
                                label=" "
                                value={inch}
                                onChange={(e) => setInch(e.currentTarget.value)}
                                rightSection={<Text>in</Text>}
                            />
                        </Group>
                        <TextInput
                            label={t('weight')}
                            value={pound}
                            onChange={(e) => setPound(e.currentTarget.value)}
                            rightSection={<Text>lb</Text>}
                        />
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
                    <TextInput
                        label={t('body_fat')}
                        value={bodyFat}
                        onChange={(e) => setBodyFat(e.currentTarget.value)}
                        rightSection={<Text>%</Text>}
                    />
                )}

                <Button fullWidth onClick={calculateBMR}>{t('calculate')}</Button>

                <Paper withBorder shadow="sm" radius="md" p="md">
                    <Stack gap="md">
                        <Paper withBorder p="md" radius="md" bg="var(--mantine-color-blue-0)">
                            <Stack gap={4} align="center">
                                <Text size="sm" c="dimmed" fw={500}>{t('bmr.bmr_label')}</Text>
                                <Group gap="xs" align="center">
                                    <Text size="2rem" fw={700} c="blue.7">{bmr}</Text>
                                    <Text size="sm" c="dimmed">kcal/day</Text>
                                </Group>
                            </Stack>
                        </Paper>
                    </Stack>
                </Paper>

                <Text size="sm" my="sm">{t('bmr.bmr_1')}</Text>
                <Text size="sm" my="sm">{t('bmr.bmr_2')}</Text>
                <Text size="sm" my="sm">{t('bmr.bmr_3')}</Text>
                <Text size="sm" my="sm">{t('bmr.bmr_4')}</Text>

                <Title order={3} mt="xl">{t('bmr.bmr_5')}</Title>
                <Table striped withColumnBorders highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t('age')}</Table.Th>
                            <Table.Th>{t('female')}</Table.Th>
                            <Table.Th>{t('male')}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>18 - 20</Table.Td>
                            <Table.Td>23.6 {t('bmr.calories_kg_day')}</Table.Td>
                            <Table.Td>24 {t('bmr.calories_kg_day')}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>30 - 49</Table.Td>
                            <Table.Td>21.7 {t('bmr.calories_kg_day')}</Table.Td>
                            <Table.Td>22.3 {t('bmr.calories_kg_day')}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>50+</Table.Td>
                            <Table.Td>20.7 {t('bmr.calories_kg_day')}</Table.Td>
                            <Table.Td>21.5 {t('bmr.calories_kg_day')}</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>

                <Title order={3} mt="xl">{t('bmr.increase_bmr')}</Title>
                <List>
                    <List.Item><Text size="sm" my="sm">{t('bmr.bmr_6')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('bmr.bmr_7')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('bmr.bmr_8')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('bmr.bmr_9')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('bmr.bmr_10')}</Text></List.Item>
                </List>

                <Title order={3} mt="xl">{t('bmr.decreased_bmr')}</Title>
                <List>
                    <List.Item><Text size="sm" my="sm">{t('bmr.bmr_11')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('bmr.bmr_12')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('bmr.bmr_13')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('bmr.bmr_14')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('bmr.bmr_15')}</Text></List.Item>
                    <List.Item><Text size="sm" my="sm">{t('bmr.bmr_16')}</Text></List.Item>
                </List>
            </Stack>
            <Divider mt="md" />
            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <CalculatorActionsGrid lng={lng} />
        </Container>
    );
}
