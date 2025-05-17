'use client';

import { Text, Title, Container, SimpleGrid, Card, Group, rem, UnstyledButton } from '@mantine/core';
import { IconWand, IconTools, IconDeviceLaptop, IconRocket } from '@tabler/icons-react';
import classes from './Welcome.module.css';
import { useTranslation } from '@/app/i18n/client';
import { useRouter } from 'next/navigation';

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
                <div className={classes.iconWrapper}>
                    {icon}
                </div>
                <div>
                    <Text fw={500} size="lg" mb={5}>
                        {title}
                    </Text>
                    <Text size="sm" c="dimmed">
                        {description}
                    </Text>
                </div>
            </Group>
        </Card>
    );
}

interface WelcomeProps {
    lng: string;
}

export function Welcome({ lng }: WelcomeProps) {
    const { t } = useTranslation(lng, 'welcome');
    const router = useRouter();

    const handleNavigation = (href: string) => {
        router.push(href);
    };

    const features = [
        {
            icon: <IconWand size={24} stroke={1.5} />,
            title: t('features.easy_to_use.title'),
            description: t('features.easy_to_use.description'),
        },
        {
            icon: <IconTools size={24} stroke={1.5} />,
            title: t('features.various_tools.title'),
            description: t('features.various_tools.description'),
        },
        {
            icon: <IconDeviceLaptop size={24} stroke={1.5} />,
            title: t('features.accessible.title'),
            description: t('features.accessible.description'),
        },
        {
            icon: <IconRocket size={24} stroke={1.5} />,
            title: t('features.fast.title'),
            description: t('features.fast.description'),
        },
    ];

    return (
        <Container size="lg" py="xl">
            <Title className={classes.title} ta="center" mt={50}>
                {t('title')}{' '}
                <Text inherit variant="gradient" component="span" gradient={{ from: 'blue', to: 'cyan' }}>
                    ToolNier
                </Text>
            </Title>

            <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
                {t('description')}
            </Text>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mt={50}>
                {features.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </SimpleGrid>

            <Text ta="center" mt={50} size="sm" c="dimmed">
                {t('footer')}{' '}
                <UnstyledButton onClick={() => handleNavigation(`/${lng}/all`)}>
                    <Text size="sm" c="blue" component="span">
                        {t('explore_tools')}
                    </Text>
                </UnstyledButton>
            </Text>
        </Container>
    );
}
