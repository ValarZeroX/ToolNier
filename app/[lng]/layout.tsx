// import React from 'react';

// type LocaleLayoutProps = {
//   children: React.ReactNode;
//   params: { lng: string };
// };

// export async function generateStaticParams() {
//   return ['en', 'ja', 'zh-Hans', 'zh-Hant'].map((lng) => ({ lng }));
// }

// export const metadata = {
//   title: 'ToolNier',
//   description: 'ToolNier',
// };

// export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
//   return <>{children}</>;
// }



import '@mantine/core/styles.css';
import React from 'react';
import { ColorSchemeScript } from '@mantine/core';
import ClientProviders from '@/app/providers/ClientProviders';
import { languages } from '@/app/i18n/settings';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

// ✅ 型別正確
export async function generateMetadata({ params }: { params: { lng: string } }): Promise<Metadata> {
  return {
    title: `ToolNier`,
    description: `ToolNier 多語系工具集合網站`,
  };
}

type RootLayoutProps  = {
  children: React.ReactNode;
  params: { lng: string };
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lng } = await params;
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
