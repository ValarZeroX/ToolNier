'use client';

import { IconQrcode, IconCode, IconFileCode, IconId, IconPhoto } from '@tabler/icons-react';
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
interface ToolsActionsGridProps {
    lng: string;
}

const ToolsActionsGrid: FC<ToolsActionsGridProps> = ({ lng }) => {
    const { t } = useTranslation(lng, ['grid', 'tools']);
    // const router = useRouter();

    const tools = [
        {
            id: 'qr-code',
            title: t('tools:qr_code.title'),
            icon: IconQrcode,
            color: 'violet',
            href: `/${lng}/tools/qr-code-generator`,
            description: t('tools:qr_code.grid_description')
        },
        {
            id: 'base64',
            title: t('tools:base64.title'),
            icon: IconCode,
            color: 'indigo',
            href: `/${lng}/tools/base64-encoder-decoder`,
            description: t('tools:base64.grid_description')
        },
        {
            id: 'image-base64',
            title: t('tools:image_base64.title'),
            icon: IconPhoto,
            color: 'blue',
            href: `/${lng}/tools/image-base64-converter`,
            description: t('tools:image_base64.grid_description')
        },
        {
            id: 'uuid',
            title: t('tools:uuid.title'),
            icon: IconId,
            color: 'green',
            href: `/${lng}/tools/uuid-generator`,
            description: t('tools:uuid.grid_description')
        },
        {
            id: 'json',
            title: t('tools:json.title'),
            icon: IconFileCode,
            color: 'teal',
            href: `/${lng}/tools/json-formatter`,
            description: t('tools:json.grid_description')
        },
    ];

    // const handleNavigation = (href: string) => {
    //     router.push(href);
    // };

    return (
        <Container size="lg">
            <Title order={1} size="h2" mt="xl" ta="center">
                {t('tools:title')}
            </Title>

            <Text ta="center" c="dimmed" mt="sm" mb="lg" size="sm">
                {t('tools:description')}
            </Text>

            <Card withBorder radius="md" className={classes.card}>
                <Group justify="space-between">
                    <Text className={classes.title}>
                        {t('fast_functions')}
                    </Text>
                </Group>

                <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt="md">
                    {tools.map((item) => (
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

export default ToolsActionsGrid;
