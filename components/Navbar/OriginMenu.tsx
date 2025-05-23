'use client';

import { FC } from 'react';
import { NavLink, Divider, Stack } from '@mantine/core';
import { IconHome, IconTool, IconMoodHappy, IconDice5, IconRepeat, IconCalculator } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
import { useTranslation } from "../../app/i18n/client";
// import  UserButton  from '../UserButton/UserButton';
import classes from './NavbarNested.module.css';
// import { useAuth } from '@/lib/auth/AuthContext';
import Link from 'next/link';

interface OriginMenuProps {
  lng: string;
}

const OriginMenu: FC<OriginMenuProps> = ({ lng }) => {
  // function OriginMenu({ lng }:OriginMenuProps) {
  // const router = useRouter();
  const { t } = useTranslation(lng, ['common']);
  //   const { isAuthenticated, user, setAuth, checkAuthStatus } = useAuth();
  // const { data: session, status } = useSession();

  // const { t } = useTranslation(lng, ['common']);

  // console.log('OriginMenu', lng);
  // const handleNavigation = (path: string) => {
  //   router.push(path);
  // };

  return (
    <Stack justify="space-between" h="100%">
      <nav>
        <NavLink
          // component="button"
          label={t('common:home')}
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          component={Link}
          href="/"
        />
        <NavLink
          component="button"
          label={t('common:random')}
          leftSection={<IconDice5 size="1rem" stroke={1.5} />}
        //   onClick={() => handleNavigation('/records')}
        >
          <NavLink label={t('common:random_draw')} component={Link} href="/random/draw" />
          <NavLink label={t('common:random_draw_wheel')} component={Link} href="/random/wheel" />
          <NavLink label={t('common:random_sort')} component={Link} href="/random/sort" />
          <NavLink label={t('common:random_group')} component={Link} href="/random/group" />
          <NavLink label={t('common:random_number')} component={Link} href="/random/number" />
        </NavLink>
        <NavLink
          component="button"
          label={t('common:developer_tools')}
          leftSection={<IconTool size="1rem" stroke={1.5} />}
        //   onClick={() => handleNavigation('/records')}
        >
          <NavLink label={t('common:qr_code_generator')} component={Link} href="/tools/qr-code-generator" />
          <NavLink label={t('common:base64_tool')} component={Link} href="/tools/base64-encoder-decoder" />
          <NavLink label={t('common:image_base64_tool')} component={Link} href="/tools/image-base64-converter" />
          <NavLink label={t('common:uuid_generator')} component={Link} href="/tools/uuid-generator" />
          <NavLink label={t('common:json_formatter')} component={Link} href="/tools/json-formatter" />
          <NavLink label={t('common:text_stats_title')} component={Link} href="/tools/text-stat" />
        </NavLink>
        <NavLink
          component="button"
          label={t('common:unit_converter')}
          leftSection={<IconRepeat size="1rem" stroke={1.5} />}
        //   onClick={() => handleNavigation('/records')}
        >
          <NavLink label={t('common:length_converter_title')} component={Link} href="/converters/length" />
          <NavLink label={t('common:weight_converter_title')} component={Link} href="/converters/weight" />
          <NavLink label={t('common:temperature_converter_title')} component={Link} href="/converters/temperature" />
          <NavLink label={t('common:time_converter_title')} component={Link} href="/converters/time" />
          <NavLink label={t('common:timestamp_converter_title')} component={Link} href="/converters/timestamp" />
        </NavLink>
        <NavLink
          component="button"
          label={t('common:calculator')}
          leftSection={<IconCalculator size="1rem" stroke={1.5} />}
        //   onClick={() => handleNavigation('/records')}
        >
          <NavLink label={t('common:bmr_calculator_title')} component={Link} href="/calculator/bmr" />
          <NavLink label={t('common:bmi_calculator_title')} component={Link} href="/calculator/bmi" />
          <NavLink label={t('common:body_fat_calculator_title')} component={Link} href="/calculator/body-fat" />
          <NavLink label={t('common:tdee_calculator_title')} component={Link} href="/calculator/tdee" />
          <NavLink label={t('common:age_calculator_title')} component={Link} href="/calculator/age" />
          <NavLink label={t('common:days_between_dates_calculator_title')} component={Link} href="/calculator/days-between-dates" />
        </NavLink>
        <NavLink
          component="button"
          label={t('common:symbol_emoji')}
          leftSection={<IconMoodHappy size="1rem" stroke={1.5} />}
        //   onClick={() => handleNavigation('/records')}
        >
          <NavLink label={t('common:symbol')} component={Link} href="/symbols/symbol" />
          <NavLink label={t('common:emoji')} component={Link} href="/symbols/emoji" />
        </NavLink>
      </nav>
      {/* {isAuthenticated && (
        <div className={classes.footer} >
          <UserButton />
        </div>
      )} */}
      {/* {session && (
        <div className={classes.footer} onClick={() => handleNavigation('/user')}>
          <UserButton />
        </div>
      )} */}
    </Stack>
  );
}

export default OriginMenu;