import React from 'react';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { lng: string };
};

export async function generateStaticParams() {
  return ['en', 'zh-Hans', 'zh-Hant'].map((lng) => ({ lng }));
}

export const metadata = {
  title: 'ToolNier',
  description: 'ToolNier',
};

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  return <>{children}</>;
}