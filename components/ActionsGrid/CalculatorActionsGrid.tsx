'use client';

import { IconHealthRecognition } from '@tabler/icons-react';
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

interface ToolsActionsGridProps {
    lng: string;
}

const ToolsActionsGrid: FC<ToolsActionsGridProps> = ({ lng }) => {
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

export default ToolsActionsGrid;
