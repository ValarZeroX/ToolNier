'use client';

import { IconMoodSmile, IconSignature, IconCurrency, IconLanguage } from '@tabler/icons-react';
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
interface SymbolsActionsGridProps {
    lng: string;
}

const SymbolsActionsGrid: FC<SymbolsActionsGridProps> = ({ lng }) => {
    const { t } = useTranslation(lng, ['grid']);
    // const router = useRouter();

    const symbols = [
        {
            id: 'emoji',
            title: t('symbols.emoji.title'),
            icon: IconMoodSmile,
            color: 'red',
            href: `/${lng}/symbols/emoji`,
            description: t('symbols.emoji.description')
        },
        {
            id: 'symbol',
            title: t('symbols.symbol.title'),
            icon: IconSignature,
            color: 'blue',
            href: `/${lng}/symbols/symbol`,
            description: t('symbols.symbol.description')
        },
        // {
        //     id: 'currency',
        //     title: t('symbols.currency.title'),
        //     icon: IconCurrency,
        //     color: 'green',
        //     href: `/${lng}/symbols/currency`,
        //     description: t('symbols.currency.description')
        // },
        // {
        //     id: 'language',
        //     title: t('symbols.language.title'),
        //     icon: IconLanguage,
        //     color: 'violet',
        //     href: `/${lng}/symbols/language`,
        //     description: t('symbols.language.description')
        // }
    ];

    // const handleNavigation = (href: string) => {
    //     router.push(href);
    // };

    return (
        <Container size="lg">
            <Title order={1} size="h2" mt="xl" ta="center">
                {t('symbols.title')}
            </Title>

            <Text ta="center" c="dimmed" mt="sm" mb="lg" size="sm">
                {t('symbols.description')}
            </Text>

            <Card withBorder radius="md" className={classes.card}>
                <Group justify="space-between">
                    <Text className={classes.title}>
                        {t('fast_functions')}
                    </Text>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt="md">
                    {symbols.map((item) => (
                        <UnstyledButton key={item.id} className={classes.item} component={Link} href={item.href}>
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

export default SymbolsActionsGrid;
