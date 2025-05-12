import '@mantine/core/styles.css';
import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import ClientProviders from './providers/ClientProviders';
import { languages } from "./i18n/settings";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata = {
  title: 'ToolNier',
  description: 'ToolNier',
};

type RootLayoutProps = {
  children: React.ReactNode;
  params?: { lng?: string };
};

export default function RootLayout({ children, params }: RootLayoutProps) {
  const lng = params?.lng || 'en'; // 預設語言為英文

  return (
    <html lang={lng} suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </head>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}