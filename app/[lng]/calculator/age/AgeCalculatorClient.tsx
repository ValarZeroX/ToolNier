'use client';

import { useState } from 'react';
import {
    Container,
    Title,
    Stack,
    Text,
    TextInput,
    Button,
    Paper,
    Group,
    Divider
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useTranslation } from '../../../i18n/client';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/ja';
import duration from 'dayjs/plugin/duration';
import '@mantine/dates/styles.css';
import { IconCalendar } from '@tabler/icons-react';
import CalculatorActionsGrid from '@/components/ActionsGrid/CalculatorActionsGrid';
dayjs.extend(duration);

interface AgeCalculatorProps {
    lng: string;
}

export default function AgeCalculator({ lng }: AgeCalculatorProps) {
    const { t } = useTranslation(lng, 'calculator');
    const [birthDate, setBirthDate] = useState<string | null>('2000-01-01');
    const [currentDate, setCurrentDate] = useState<string | null>(new Date().toISOString().split('T')[0]);
    const [result, setResult] = useState<any | null>(null);

    const calculateAge = () => {
        if (!birthDate || !currentDate) return;

        const start = dayjs(birthDate);
        const end = dayjs(currentDate);

        const years = end.diff(start, 'year');
        const months = end.diff(start.add(years, 'year'), 'month');
        const days = end.diff(start.add(years, 'year').add(months, 'month'), 'day');

        const totalDays = end.diff(start, 'day');
        const totalWeeks = Math.floor(totalDays / 7);
        const remainingDays = totalDays % 7;
        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;
        const totalSeconds = totalMinutes * 60;

        setResult({
            years,
            months,
            days,
            totalMonths: years * 12 + months,
            totalWeeks,
            remainingDays,
            totalDays,
            totalHours,
            totalMinutes,
            totalSeconds,
        });
    };

    return (
        <Container size="sm">
            <Title ta="center" order={2}>{t('age_page.age_calculator')}</Title>
            <Text ta="center" c="dimmed" size="sm" my="sm">{t('age_page.age_description')}</Text>

            <Stack>
                <DatePickerInput
                    locale={lng === 'ja' ? 'ja' : lng === 'zh-Hant' ? 'zh-TW' : lng === 'zh-Hans' ? 'zh-CN' : 'en'}
                    leftSection={<IconCalendar size={18} stroke={1.5} />}
                    label={t('age_page.birth_date')}
                    value={birthDate}
                    onChange={setBirthDate}
                />
                <DatePickerInput
                    locale={lng === 'ja' ? 'ja' : lng === 'zh-Hant' ? 'zh-TW' : lng === 'zh-Hans' ? 'zh-CN' : 'en'}
                    leftSection={<IconCalendar size={18} stroke={1.5} />}
                    label={t('age_page.current_date')}
                    value={currentDate}
                    onChange={setCurrentDate}
                />
                <Button fullWidth onClick={calculateAge}>{t('calculate')}</Button>

                {result && (
                    <Paper withBorder shadow="sm" radius="md" p="md">
                        <Stack gap="md">
                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-blue-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('age')}</Text>
                                    <Text size="2rem" fw={700} c="blue.7">
                                        {result.years} {t('age_page.years')} {result.months} {t('age_page.months')} {result.days} {t('age_page.days')}
                                    </Text>
                                </Stack>
                            </Paper>

                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-green-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('age_page.total_months')}</Text>
                                    <Text size="2rem" fw={700} c="green.7">
                                        {result.totalMonths} {t('age_page.months')} {result.days} {t('age_page.days')}
                                    </Text>
                                </Stack>
                            </Paper>

                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-violet-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('age_page.total_weeks')}</Text>
                                    <Text size="2rem" fw={700} c="violet.7">
                                        {result.totalWeeks} {t('age_page.weeks')} {result.remainingDays} {t('age_page.days')}
                                    </Text>
                                </Stack>
                            </Paper>

                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('age_page.total_days')}</Text>
                                    <Text size="2rem" fw={700} c="gray.7">
                                        {result.totalDays} {t('age_page.days')}
                                    </Text>
                                </Stack>
                            </Paper>

                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('age_page.total_hours')}</Text>
                                    <Text size="2rem" fw={700} c="gray.7">
                                        {result.totalHours} {t('age_page.hours')}
                                    </Text>
                                </Stack>
                            </Paper>

                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('age_page.total_minutes')}</Text>
                                    <Text size="2rem" fw={700} c="gray.7">
                                        {result.totalMinutes} {t('age_page.minutes')}
                                    </Text>
                                </Stack>
                            </Paper>

                            <Paper withBorder p="md" radius="md" bg="var(--mantine-color-gray-0)">
                                <Stack gap={4} align="center">
                                    <Text size="sm" c="dimmed" fw={500}>{t('age_page.total_seconds')}</Text>
                                    <Text size="2rem" fw={700} c="gray.7">
                                        {result.totalSeconds} {t('age_page.seconds')}
                                    </Text>
                                </Stack>
                            </Paper>
                        </Stack>
                    </Paper>
                )}
            </Stack>
            <Divider mt="md" />
            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <CalculatorActionsGrid lng={lng} />
        </Container>
    );
}
