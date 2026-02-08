'use client';

import React from 'react';
import { Breadcrumbs, Anchor, Text } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';

const BASE_URL = 'https://toolnier.com';

// Mapping of URL path segments to i18n keys in 'common' namespace
const pathSegmentToKey: Record<string, string> = {
  // Categories
  tools: 'developer_tools',
  calculator: 'calculator',
  random: 'random',
  converters: 'unit_converter',
  symbols: 'symbol_emoji',
  all: 'all_tools',
  privacy: 'privacy_page',
  disclaimer: 'disclaimer_page',

  // Tools
  'qr-code-generator': 'qr_code_generator',
  'base64-encoder-decoder': 'base64_tool',
  'image-base64-converter': 'image_base64_tool',
  'uuid-generator': 'uuid_generator',
  'json-formatter': 'json_formatter',
  'text-stat': 'text_stats_title',
  'color-picker': 'color_picker_title',
  'color-code-chart': 'color_code_chart_title',
  'password-generator': 'password_generator_title',
  'ip-lookup': 'ip_lookup_title',
  'url-encoder': 'url_encoder_title',

  // Calculators
  bmi: 'bmi_calculator_title',
  bmr: 'bmr_calculator_title',
  'body-fat': 'body_fat_calculator_title',
  tdee: 'tdee_calculator_title',
  age: 'age_calculator_title',
  'days-between-dates': 'days_between_dates_calculator_title',

  // Converters
  length: 'length_converter_title',
  weight: 'weight_converter_title',
  temperature: 'temperature_converter_title',
  time: 'time_converter_title',
  timestamp: 'timestamp_converter_title',

  // Random
  draw: 'random_draw',
  wheel: 'random_draw_wheel',
  sort: 'random_sort',
  group: 'random_group',
  number: 'random_number',

  // Symbols
  symbol: 'symbol',
  emoji: 'emoji',
};

export default function BreadcrumbNav({ lng }: { lng: string }) {
  const pathname = usePathname();
  const { t } = useTranslation(lng, 'common');

  // Parse path segments (remove language prefix)
  const segments = pathname.split('/').filter(Boolean);
  const pathSegments = segments.slice(1); // remove lng prefix

  // Don't show breadcrumb on homepage
  if (pathSegments.length === 0) return null;

  const items = [
    { label: t('home'), href: `/${lng}` },
    ...pathSegments.map((segment, index) => {
      const href = `/${lng}/${pathSegments.slice(0, index + 1).join('/')}`;
      const key = pathSegmentToKey[segment];
      const label = key ? t(key) : segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      const isLast = index === pathSegments.length - 1;
      return { label, href: isLast ? undefined : href };
    }),
  ];

  // JSON-LD BreadcrumbList schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${BASE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs mb="md" style={{ flexWrap: 'wrap' }}>
        {items.map((item, index) =>
          item.href ? (
            <Anchor component={Link} href={item.href} key={index} size="sm">
              {item.label}
            </Anchor>
          ) : (
            <Text size="sm" key={index}>
              {item.label}
            </Text>
          )
        )}
      </Breadcrumbs>
    </>
  );
}
