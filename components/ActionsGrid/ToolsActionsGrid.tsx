'use client';

import { IconQrcode, IconCode, IconFileCode, IconId, IconPhoto, IconPencil, IconPalette, IconLock, IconMapPin, IconLink } from '@tabler/icons-react';
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
import Link from 'next/link';
interface ToolsActionsGridProps {
    lng: string;
}

const ToolsActionsGrid: FC<ToolsActionsGridProps> = ({ lng }) => {
    const { t } = useTranslation(lng, ['grid', 'tools']);

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
        {
            id: 'text-stats',
            title: t('tools:text_stats.title'),
            icon: IconPencil,
            color: 'red',
            href: `/${lng}/tools/text-stat`,
            description: t('tools:text_stats.grid_description')
        },
        {
            id: 'color-picker',
            title: t('tools:color_picker.title'),
            icon: IconPalette,
            color: 'pink',
            href: `/${lng}/tools/color-picker`,
            description: t('tools:color_picker.grid_description')
        },
        {
            id: 'color-code-chart',
            title: t('tools:color_code_chart.title'),
            icon: IconPalette,
            color: 'pink',
            href: `/${lng}/tools/color-code-chart`,
            description: t('tools:color_code_chart.grid_description')
        },
        {
            id: 'password-generator',
            title: t('tools:password_generator.title'),
            icon: IconLock,
            color: 'purple',
            href: `/${lng}/tools/password-generator`,
            description: t('tools:password_generator.grid_description')
        },
        {
            id: 'ip-lookup',
            title: t('tools:ip_lookup.title'),
            icon: IconMapPin,
            color: 'blue',
            href: `/${lng}/tools/ip-lookup`,
            description: t('tools:ip_lookup.grid_description')
        },
        {
            id: 'url-encoder',
            title: t('tools:url_encoder.title'),
            icon: IconLink,
            color: 'green',
            href: `/${lng}/tools/url-encoder`,
            description: t('tools:url_encoder.grid_description')
        }
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
