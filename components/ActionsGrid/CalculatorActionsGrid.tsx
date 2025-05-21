'use client';

import { IconHealthRecognition, IconCalendar } from '@tabler/icons-react';
import {
    Title,
    Card,
    Group,
    SimpleGrid,
    Text,
    UnstyledButton,
    Container,
} from '@mantine/core';
import classes from './ActionsGrid.module.css';
import { FC } from 'react';
import { useTranslation } from "../../app/i18n/client";
import { useRouter } from 'next/navigation';

interface CalculatorActionsGridProps {
    lng: string;
}

const CalculatorActionsGrid: FC<CalculatorActionsGridProps> = ({ lng }) => {
    const { t } = useTranslation(lng, ['grid', 'calculator']);
    const router = useRouter();

    const tools = [
        {
            id: 'bmi',
            title: t('calculator:bmi.bmi_calculator'),
            icon: IconHealthRecognition,
            color: 'violet',
            href: `/${lng}/calculator/bmi`,
            description: t('calculator:bmi.description')
        },
        {
            id: 'bmr',
            title: t('calculator:bmr.bmr_calculator'),
            icon: IconHealthRecognition,
            color: 'violet',
            href: `/${lng}/calculator/bmr`,
            description: t('calculator:bmr.description')
        },
        {
            id: 'body-fat',
            title: t('calculator:body_fat.body_fat_calculator'),
            icon: IconHealthRecognition,
            color: 'violet',
            href: `/${lng}/calculator/body-fat`,
            description: t('calculator:body_fat.description')
        },
        {
            id: 'tdee',
            title: t('calculator:tdee.tdee_calculator'),
            icon: IconHealthRecognition,
            color: 'violet',
            href: `/${lng}/calculator/tdee`,
            description: t('calculator:tdee.grid_description')
        },
        {
            id: 'age',
            title: t('calculator:age_page.age_calculator'),
            icon: IconCalendar,
            color: 'blue',
            href: `/${lng}/calculator/age`,
            description: t('calculator:age_page.grid_description')
        },
        {
            id: 'days-between-dates',
            title: t('calculator:days_between_dates.days_between_dates_calculator'),
            icon: IconCalendar,
            color: 'blue',
            href: `/${lng}/calculator/days-between-dates`,
            description: t('calculator:days_between_dates.grid_description')
        }
    ];

    const handleNavigation = (href: string) => {
        router.push(href);
    };

    return (
        <Container size="lg">
            <Title order={1} size="h2" mt="xl" ta="center">
                {t('calculator:title')}
            </Title>

            <Text ta="center" c="dimmed" mt="sm" mb="lg" size="sm">
                {t('calculator:description')}
            </Text>

            <Card withBorder radius="md" className={classes.card}>
                <Group justify="space-between">
                    <Text className={classes.title}>
                        {t('fast_functions')}
                    </Text>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt="md">
                    {tools.map((item) => (
                        <UnstyledButton key={item.id} className={classes.item} onClick={() => handleNavigation(item.href)}>
                            <item.icon size={32} color={item.color} />
                            <Text size="xs" mt={7}>
                                {item.title}
                            </Text>
                            <Text size="xxs" c="dimmed" style={{ fontSize: 10 }}>
                                {item.description}
                            </Text>
                        </UnstyledButton>
                    ))}
                </SimpleGrid>
            </Card>
        </Container>
    );
}

export default CalculatorActionsGrid;
