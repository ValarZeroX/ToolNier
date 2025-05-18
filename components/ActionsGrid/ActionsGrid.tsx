'use client';

import { IconHome, IconTool, IconMoodHappy, IconDice5, IconRepeat } from '@tabler/icons-react';
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


interface ActionsGridProps {
    lng: string;
}

const ActionsGrid: FC<ActionsGridProps> = ({ lng }) => {

    const { t } = useTranslation(lng, ['grid']);
    const router = useRouter();
    // const theme = useMantineTheme();

    const tools = [
        { 
            title: t('tools.emoji.title'),
            icon: IconMoodHappy,
            color: 'violet',
            href: `/${lng}/symbols`,
            description: t('tools.emoji.description')
        },
        { 
            title: t('tools.random.title'),
            icon: IconDice5,
            color: 'indigo',
            href: `/${lng}/random`,
            description: t('tools.random.description')
        },
        { 
            title: t('tools.developer.title'),
            icon: IconTool,
            color: 'blue',
            href: `/${lng}/tools`,
            description: t('tools.developer.description')
        },
        { 
            title: t('tools.converter.title'),
            icon: IconRepeat,
            color: 'green',
            href: `/${lng}/converters`,
            description: t('tools.converter.description')
        },
    ];

    const handleNavigation = (href: string) => {
        router.push(href);
    };

    // const items = mockdata.map((item) => (
    //     <UnstyledButton key={item.title} className={classes.item} onClick={() => handleNavigation(item.href)}>
    //         <item.icon size={32} color={item.color} />
    //         <Text size="xs" mt={7}>
    //             {item.title}
    //         </Text>
    //     </UnstyledButton>
    // ));

    return (
        <Container size="lg">
          <Title order={1} size="h2" mt="xl" ta="center">
            {t('home.tools_title')}
          </Title>
      
          <Text ta="center" c="dimmed" mt="sm" mb="lg" size="sm">
             {t('home.tools_description')}
          </Text>
      
          <Card withBorder radius="md" className={classes.card}>
            <Group justify="space-between">
              <Text className={classes.title}>
                {t('home.services_section_title')}
              </Text>
            </Group>
      
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt="md">
              {tools.map((item) => (
                <UnstyledButton key={item.title} className={classes.item} onClick={() => handleNavigation(item.href)}>
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

export default ActionsGrid;