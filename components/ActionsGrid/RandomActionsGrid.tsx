'use client';

import { IconDice5, IconWheel, IconSortAscending, IconUsers, IconNumber } from '@tabler/icons-react';
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
import Link from 'next/link';

interface RandomActionsGridProps {
    lng: string;
}

const RandomActionsGrid: FC<RandomActionsGridProps> = ({ lng }) => {
    const { t } = useTranslation(lng, ['grid', 'random']);
    // const router = useRouter();

    const tools = [
        {
            title: t('random:random_draw_page.title'),
            icon: IconDice5,
            color: 'violet',
            href: `/${lng}/random/draw`,
            description: t('random:random_draw_page.grid_description')
        },
        {
            title: t('random:random_draw_wheel.title'),
            icon: IconWheel,
            color: 'indigo',
            href: `/${lng}/random/wheel`,
            description: t('random:random_draw_wheel.description')
        },
        {
            title: t('random:random_sort.title'),
            icon: IconSortAscending,
            color: 'blue',
            href: `/${lng}/random/sort`,
            description: t('random:random_sort.description')
        },
        {
            title: t('random:random_group.title'),
            icon: IconUsers,
            color: 'green',
            href: `/${lng}/random/group`,
            description: t('random:random_group.grid_description')
        },
        {
            title: t('random:random_number.title'),
            icon: IconNumber,
            color: 'teal',
            href: `/${lng}/random/number`,
            description: t('random:random_number.description')
        },
    ];

    // const handleNavigation = (href: string) => {
    //     router.push(href);
    // };

    return (
        <Container size="lg">
            <Title order={1} size="h2" mt="xl" ta="center">
                {t('random:title')}
            </Title>

            <Text ta="center" c="dimmed" mt="sm" mb="lg" size="sm">
                {t('random:description')}
            </Text>

            <Card withBorder radius="md" className={classes.card}>
                <Group justify="space-between">
                    <Text className={classes.title}>
                        {t('fast_functions')}
                    </Text>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt="md">
                    {tools.map((item) => (
                        <UnstyledButton key={item.title} className={classes.item} component={Link} href={item.href}>
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

export default RandomActionsGrid;