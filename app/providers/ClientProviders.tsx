'use client';

import React from 'react';
import { Notifications } from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from '../../theme';
import { CookiesProvider } from 'react-cookie';

const ClientProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CookiesProvider>
      <MantineProvider theme={theme}>
        {/* 確保 Notifications 位於 MantineProvider 內部 */}
        {children}
        <Notifications />
      </MantineProvider>
    </CookiesProvider>
  );
};

export default ClientProviders;