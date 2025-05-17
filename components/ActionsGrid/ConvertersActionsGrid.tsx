'use client';

import { IconRuler, IconScale, IconTemperature, IconClock, IconCurrency } from '@tabler/icons-react';
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

interface ConvertersActionsGridProps {
    lng: string;
}

const ConvertersActionsGrid: FC<ConvertersActionsGridProps> = ({ lng }) => {
    const { t } = useTranslation(lng, ['grid']);
    const router = useRouter();

    const converters = [
        {
            id: 'length',
            title: t('converters.length.title'),
            icon: IconRuler,
            color: 'blue',
            href: `/${lng}/converters/length`,
            description: t('converters.length.description')
        },
        {
            id: 'weight',
            title: t('converters.weight.title'),
            icon: IconScale,
            color: 'green',
            href: `/${lng}/converters/weight`,
            description: t('converters.weight.description')
        }
        // {
        //     id: 'temperature',
        //     title: t('converters.temperature.title'),
        //     icon: IconTemperature,
        //     color: 'red',
        //     href: `/${lng}/converters/temperature`,
        //     description: t('converters.temperature.description')
        // },
        // {
        //     id: 'time',
        //     title: t('converters.time.title'),
        //     icon: IconClock,
        //     color: 'violet',
        //     href: `/${lng}/converters/time`,
        //     description: t('converters.time.description')
        // },
        // {
        //     id: 'currency',
        //     title: t('converters.currency.title'),
        //     icon: IconCurrency,
        //     color: 'yellow',
        //     href: `/${lng}/converters/currency`,
        //     description: t('converters.currency.description')
        // }
    ];

    const handleNavigation = (href: string) => {
        router.push(href);
    };

    return (
        <Container size="lg">
            <Title order={1} size="h2" mt="xl" ta="center">
                {t('converters.title')}
            </Title>

            <Text ta="center" c="dimmed" mt="sm" mb="lg" size="sm">
                {t('converters.description')}
            </Text>

            <Card withBorder radius="md" className={classes.card}>
                <Group justify="space-between">
                    <Text className={classes.title}>
                    {t('fast_functions')}
                    </Text>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt="md">
                    {converters.map((item) => (
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

export default ConvertersActionsGrid;
