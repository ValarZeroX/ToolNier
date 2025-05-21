'use client';

import React, { useState } from 'react';
import {
  Container,
  Title,
  Stack,
  Text,
  Button,
  Paper,
  Divider
} from '@mantine/core';
import { DatePickerInput, DateValue } from '@mantine/dates';
import { useTranslation } from '../../../i18n/client';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import 'dayjs/locale/ja';
import duration from 'dayjs/plugin/duration';
import '@mantine/dates/styles.css';
dayjs.extend(duration);
import CalculatorActionsGrid from '@/components/ActionsGrid/CalculatorActionsGrid';

function calculateDateDifference(startDate: Date, endDate: Date) {
  // 確保 startDate 在 endDate 之前
  if (startDate > endDate) {
    const temp = startDate;
    startDate = endDate;
    endDate = temp;
  }

  // 計算總天數
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  // 計算年數、月數和天數
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const previousMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // 計算月數和天數
  let monthsDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
  if (endDate.getDate() < startDate.getDate()) {
    monthsDiff--;
  }
  let remainingDaysForMonths = endDate.getDate() - startDate.getDate();
  if (remainingDaysForMonths < 0) {
    const previousMonth = new Date(endDate.getFullYear(), endDate.getMonth() - 1, startDate.getDate());
    remainingDaysForMonths = Math.ceil((endDate.getTime() - previousMonth.getTime()) / (1000 * 3600 * 24));
  }

  // 計算周數和天數
  const weeks = Math.floor(totalDays / 7);
  const remainingDaysForWeeks = totalDays % 7;

  return {
    totalDays,
    weeks,
    remainingDaysForWeeks,
    monthsDiff,
    remainingDaysForMonths,
    years,
    months,
    days
  };
}

interface DaysBetweenDatesCalculatorProps {
  lng: string;
}

export default function DaysBetweenDatesCalculator({ lng }: DaysBetweenDatesCalculatorProps) {
  const { t } = useTranslation(lng, 'calculator');
  const [startDate, setStartDate] = useState<DateValue>('2000-01-01');
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [results, setResults] = useState<null | ReturnType<typeof calculateDateDifference>>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;
    const res = calculateDateDifference(new Date(startDate), new Date(endDate));
    setResults(res);
  };

  return (
    <Container size="sm">
      <Title ta="center" order={2}>{t('days_between_dates.days_between_dates_calculator')}</Title>
      <Text ta="center" c="dimmed" size="sm" my="sm">
        {t('days_between_dates.days_between_dates_description')}
      </Text>

      <Stack>
        <DatePickerInput
          locale={lng === 'ja' ? 'ja' : lng === 'zh-Hant' ? 'zh-TW' : lng === 'zh-Hans' ? 'zh-CN' : 'en'}
          label={t('days_between_dates.start_date')}
          placeholder={t('days_between_dates.pick_date')}
          value={startDate}
          onChange={setStartDate}
        />

        <DatePickerInput
          locale={lng === 'ja' ? 'ja' : lng === 'zh-Hant' ? 'zh-TW' : lng === 'zh-Hans' ? 'zh-CN' : 'en'}
          label={t('days_between_dates.end_date')}
          placeholder={t('days_between_dates.pick_date')}
          value={endDate}
          onChange={setEndDate}
        />

        <Button fullWidth onClick={calculate}>{t('calculate')}</Button>

        {results && (
          <Paper withBorder shadow="sm" radius="md" p="md">
            <Text fw={700} size="lg">
              {t('days_between_dates.total_days')}: {results.totalDays} {t('days')}
            </Text>
            <Text fw={700} size="lg">
              {t('days_between_dates.weeks_and_days')}: {results.weeks} {t('weeks')} {results.remainingDaysForWeeks} {t('days')}
            </Text>
            <Text fw={700} size="lg">
              {t('days_between_dates.months_and_days')}: {results.monthsDiff} {t('months')} {results.remainingDaysForMonths} {t('days')}
            </Text>
            <Text fw={700} size="lg">
              {t('days_between_dates.years_months_days')}: {results.years} {t('years')} {results.months} {t('months')} {results.days} {t('days')}
            </Text>
          </Paper>
        )}
      </Stack>
      <Divider mt="md" />
      <Title order={3} mt="lg">{t('explore_more_title')}</Title>
      <CalculatorActionsGrid lng={lng} />
    </Container>
  );
}
