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
    Table,
    Divider,
} from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import { IconEqual } from '@tabler/icons-react';
import CalculatorActionsGrid from '@/components/ActionsGrid/CalculatorActionsGrid';

interface BmiCalculatorProps {
    lng: string;
}

export default function BmiCalculator({ lng }: BmiCalculatorProps) {
    const { t } = useTranslation(lng, 'calculator');

    const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
    const [height, setHeight] = useState('170');
    const [weight, setWeight] = useState('60');
    const [foot, setFoot] = useState('5');
    const [inch, setInch] = useState('8');
    const [pound, setPound] = useState('150');
    const [bmi, setBmi] = useState<string | null>(null);
    const [prime, setPrime] = useState<string | null>(null);

    const calculateBMI = () => {
        if (unit === 'metric') {
            const h = parseFloat(height);
            const w = parseFloat(weight);
            if (isNaN(h) || isNaN(w)) return;
            const bmiVal = w / ((h / 100) * (h / 100));
            setBmi(bmiVal.toFixed(2));
            setPrime((bmiVal / 25).toFixed(2));
        } else {
            const ft = parseFloat(foot);
            const inc = parseFloat(inch);
            const lb = parseFloat(pound);
            if (isNaN(ft) || isNaN(inc) || isNaN(lb)) return;
            const totalInches = ft * 12 + inc;
            const m = totalInches * 0.0254;
            const kg = lb * 0.453592;
            const bmiVal = kg / (m * m);
            setBmi(bmiVal.toFixed(2));
            setPrime((bmiVal / 25).toFixed(2));
        }
    };

    return (
        <Container size="sm">
            <Title ta="center" order={2}>{t('bmi.bmi_calculator')}</Title>
            <Text size="sm" my="sm">{t('bmi.bmi_1')}</Text>
            <SegmentedControl
                fullWidth
                value={unit}
                onChange={(val) => setUnit(val as 'metric' | 'imperial')}
                data={[
                    { label: t('metric_units'), value: 'metric' },
                    { label: t('imperial_units'), value: 'imperial' },
                ]}
            />

            <Stack mt="md">
                {unit === 'metric' ? (
                    <Group grow>
                        <TextInput
                            label={t('height')}
                            placeholder="170"
                            value={height}
                            onChange={(e) => setHeight(e.currentTarget.value)}
                            rightSection={<Text>cm</Text>}
                        />
                        <TextInput
                            label={t('weight')}
                            placeholder="60"
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
                                placeholder="5"
                                value={foot}
                                onChange={(e) => setFoot(e.currentTarget.value)}
                                rightSection={<Text>ft</Text>}
                            />
                            <TextInput
                                label={' '}
                                placeholder="8"
                                value={inch}
                                onChange={(e) => setInch(e.currentTarget.value)}
                                rightSection={<Text>in</Text>}
                            />
                        </Group>
                        <TextInput
                            label={t('weight')}
                            placeholder="150"
                            value={pound}
                            onChange={(e) => setPound(e.currentTarget.value)}
                            rightSection={<Text>lb</Text>}
                        />
                    </>
                )}
                <Button fullWidth onClick={calculateBMI}>{t('calculate')}</Button>

                <Paper withBorder shadow="sm" radius="md" p="md" ta="center" mt="md">
                    <Group justify="center" mt="xs" gap="xs">
                        <Text size="lg" fw={700}>BMI</Text>
                        <IconEqual size={18} />
                        <Text size="lg" fw={700}>
                            {bmi}
                        </Text>
                    </Group>
                    <Group justify="center" mt="xs" gap="xs">
                        <Text size="lg" fw={700}>{t('bmi.bmi_prime')}</Text>
                        <IconEqual size={18} />
                        <Text size="lg" fw={700}>
                            {prime}
                        </Text>
                    </Group>
                </Paper>
                <Title order={3}>{t('bmi.adult_bmi')}</Title>
                <Text size="sm" my="sm">{t('bmi.bmi_2')}</Text>

                <Table striped withColumnBorders highlightOnHover mt="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>{t('bmi.status')}</Table.Th>
                            <Table.Th>BMI (kg/m²)</Table.Th>
                            <Table.Th>{t('bmi.bmi_prime')}</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <Table.Tr>
                            <Table.Td>{t('bmi.severe_thinness')}</Table.Td>
                            <Table.Td>&lt;15</Table.Td>
                            <Table.Td>&lt;0.6</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('bmi.moderate_thinness')}</Table.Td>
                            <Table.Td>15 - 16</Table.Td>
                            <Table.Td>0.6 - 0.64</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('bmi.mild_thinness')}</Table.Td>
                            <Table.Td>16 - 18.5</Table.Td>
                            <Table.Td>0.64 - 0.74</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('bmi.normal')}</Table.Td>
                            <Table.Td>18.5 - 25</Table.Td>
                            <Table.Td>0.74 - 1.0</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('bmi.overweight')}</Table.Td>
                            <Table.Td>25 - 30</Table.Td>
                            <Table.Td>1.0 - 1.2</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('bmi.obese_class_i')}</Table.Td>
                            <Table.Td>30 - 35</Table.Td>
                            <Table.Td>1.2 - 1.4</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('bmi.obese_class_ii')}</Table.Td>
                            <Table.Td>35 - 40</Table.Td>
                            <Table.Td>1.4 - 1.6</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>{t('bmi.obese_class_iii')}</Table.Td>
                            <Table.Td>&gt;40</Table.Td>
                            <Table.Td>&gt;1.6</Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>

                <Title order={3} mt="lg">{t('bmi.limitations_of_bmi')}</Title>
                <Text size="sm" my="sm">{t('bmi.bmi_3')}</Text>
                <Text size="sm" my="sm">{t('bmi.bmi_4')}</Text>
            </Stack>
            <Divider mt="md" />
            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <CalculatorActionsGrid lng={lng} />
        </Container>
    );
}
