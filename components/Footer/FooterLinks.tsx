'use client';

import { FC } from 'react';
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube, IconTools } from '@tabler/icons-react';
import { ActionIcon, Container, Group, Text, rem } from '@mantine/core';
import Link from 'next/link';
import classes from './FooterLinks.module.css';
import { useTranslation } from '@/app/i18n/client';

const data = [
    {
        title: 'about.title',
        links: [
            { label: 'about.links.disclaimer', link: '/disclaimer' },
            { label: 'about.links.privacy', link: '/privacy' },
        ],
    }
    // {
    //     title: 'Project',
    //     links: [
    //         { label: 'Contribute', link: '#' },
    //         { label: 'Media assets', link: '#' },
    //         { label: 'Changelog', link: '#' },
    //         { label: 'Releases', link: '#' },
    //     ],
    // },
    // {
    //     title: 'Community',
    //     links: [
    //         { label: 'Join Discord', link: '#' },
    //         { label: 'Follow on Twitter', link: '#' },
    //         { label: 'Email newsletter', link: '#' },
    //         { label: 'GitHub discussions', link: '#' },
    //     ],
    // },
];

interface FooterLinksProps {
    lng: string;
}

const FooterLinks: FC<FooterLinksProps> = ({ lng }) => {
    const { t } = useTranslation(lng, 'footer');

    const groups = data.map((group) => {
        const links = group.links.map((link, index) => (
            <Text
                key={index}
                className={classes.link}
                component={Link}
                href={`/${lng}${link.link}`}
            >
                {t(link.label)}
            </Text>
        ));

        return (
            <div className={classes.wrapper} key={group.title}>
                <Text className={classes.title}>{t(group.title)}</Text>
                {links}
            </div>
        );
    });

    return (
        <footer className={classes.footer}>
            <Container className={classes.inner}>
                <div className={classes.logo}>
                    <Group>
                        <IconTools
                            style={{ width: rem(36), height: rem(36) }}
                            stroke={1.5}
                            color="var(--mantine-color-blue-filled)"
                        />
                        <div>ToolNier</div>
                    </Group>
                    <Text size="xs" c="dimmed" className={classes.description}>
                        {t('description')}
                    </Text>
                </div>
                <div className={classes.groups}>{groups}</div>
            </Container>
            <Container className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    {t('copyright')}
                </Text>

                <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandTwitter size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandYoutube size={18} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" color="gray" variant="subtle">
                        <IconBrandInstagram size={18} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
}

export default FooterLinks;