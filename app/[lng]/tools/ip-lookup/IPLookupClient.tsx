'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  Text,
  Paper,
  Group,
  Divider,
  Loader,
  Stack,
  Anchor,
} from '@mantine/core';
import { useTranslation } from '../../../i18n/client';
import ToolsActionsGrid from '@/components/ActionsGrid/ToolsActionsGrid';

interface IpLookupClientProps {
  lng: string;
}

const IpLookupClient: React.FC<IpLookupClientProps> = ({ lng }) => {
  const { t } = useTranslation(lng, 'tools');
  const [ip, setIp] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/ip')
      .then((res) => res.json())
      .then((data) => {
        setIp(data.ip);
        setLoading(false);
      })
      .catch(() => {
        setIp('Error');
        setLoading(false);
      });
  }, []);

  return (
    <Container size="md" mt="lg">
      <Title order={3} ta="center">{t('ip_lookup.title')}</Title>
      <Text ta="center" size="sm" c="dimmed" mt="xs">
        {t('ip_lookup.description')}
      </Text>

      <Stack gap="md" mt="md">
        <Paper withBorder shadow="sm" radius="md" p="lg" ta="center">
          {loading ? (
            <Loader />
          ) : (
            <Stack gap="xs">
              <Text fw={500} size="xl">
                {t('ip_lookup.your_ip')} {ip}
              </Text>
              <Anchor href={`https://ipinfo.io/${ip}`} target="_blank" rel="noopener noreferrer">
                {t('ip_lookup.view_details')}
              </Anchor>
            </Stack>
          )}
        </Paper>
      </Stack>

      <Divider mt="md" />
      <Title order={3} mt="lg">{t('explore_more_title')}</Title>
      <ToolsActionsGrid lng={lng} />
    </Container>
  );
};

export default IpLookupClient;
