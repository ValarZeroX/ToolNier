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
    const [birthDate, setBirthDate] = useState<string>('2000-01-01');
    const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString().split('T')[0]);
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
                    <Paper shadow="sm" p="md" withBorder>
                        <Text>{t('age')}: {result.years} {t('age_page.years')} {result.months} {t('age_page.months')} {result.days} {t('age_page.days')}</Text>
                        <Text>{t('age_page.total_months')}: {result.totalMonths} {t('age_page.months')} {result.days} {t('age_page.days')}</Text>
                        <Text>{t('age_page.total_weeks')}: {result.totalWeeks} {t('age_page.weeks')} {result.remainingDays} {t('age_page.days')}</Text>
                        <Text>{t('age_page.total_days')}: {result.totalDays} {t('age_page.days')}</Text>
                        <Text>{t('age_page.total_hours')}: {result.totalHours} {t('age_page.hours')}</Text>
                        <Text>{t('age_page.total_minutes')}: {result.totalMinutes} {t('age_page.minutes')}</Text>
                        <Text>{t('age_page.total_seconds')}: {result.totalSeconds} {t('age_page.seconds')}</Text>
                    </Paper>
                )}
            </Stack>
            <Divider mt="md" />
            <Title order={3} mt="lg">{t('explore_more_title')}</Title>
            <CalculatorActionsGrid lng={lng} />
        </Container>
    );
}
