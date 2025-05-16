'use client';

import { FC } from 'react';
import { NavLink, Divider, Stack } from '@mantine/core';
import { IconHome, IconTool, IconMoodHappy, IconDice5, IconRepeat } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
import { useTranslation } from "../../app/i18n/client";
// import  UserButton  from '../UserButton/UserButton';
import classes from './NavbarNested.module.css';
// import { useAuth } from '@/lib/auth/AuthContext';

interface OriginMenuProps {
  lng: string;
}

const OriginMenu: FC<OriginMenuProps> = ({ lng }) => {
  // function OriginMenu({ lng }:OriginMenuProps) {
  const router = useRouter();
  const { t } = useTranslation(lng, ['common']);
//   const { isAuthenticated, user, setAuth, checkAuthStatus } = useAuth();
  // const { data: session, status } = useSession();

  // const { t } = useTranslation(lng, ['common']);

  // console.log('OriginMenu', lng);
  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Stack justify="space-between" h="100%">
      <nav>
        <NavLink
          component="button"
          label={t('common:home')}
          leftSection={<IconHome size="1rem" stroke={1.5} />}
          onClick={() => handleNavigation('/')}
        />
        <NavLink
          component="button"
          label={t('common:symbol_emoji')}
          leftSection={<IconMoodHappy size="1rem" stroke={1.5} />}
        //   onClick={() => handleNavigation('/records')}
        >
        <NavLink label={t('common:symbol')} onClick={() => handleNavigation('/symbols/symbol')} />
        <NavLink label={t('common:emoji')} onClick={() => handleNavigation('/symbols/emoji')} />
        </NavLink>
        <NavLink
          component="button"
          label={t('common:random')}
          leftSection={<IconDice5 size="1rem" stroke={1.5} />}
        //   onClick={() => handleNavigation('/records')}
        >
          <NavLink label={t('common:random_draw')} onClick={() => handleNavigation('/random/draw')} />
          <NavLink label={t('common:random_draw_wheel')} onClick={() => handleNavigation('/random/wheel')} />
          <NavLink label={t('common:random_sort')} onClick={() => handleNavigation('/random/sort')} />
          <NavLink label={t('common:random_group')} onClick={() => handleNavigation('/random/group')} />
          <NavLink label={t('common:random_number')} onClick={() => handleNavigation('/random/number')} />
        </NavLink>
        <NavLink
          component="button"
          label={t('common:developer_tools')}
          leftSection={<IconTool size="1rem" stroke={1.5} />}
        //   onClick={() => handleNavigation('/records')}
        >
          <NavLink label={t('common:qr_code_generator')} onClick={() => handleNavigation('/tools/qr-code-generator')} />
          <NavLink label={t('common:base64_tool')} onClick={() => handleNavigation('/tools/base64-encoder-decoder')} />
          <NavLink label={t('common:image_base64_tool')} onClick={() => handleNavigation('/tools/image-base64-converter')} />
          <NavLink label={t('common:uuid_generator')} onClick={() => handleNavigation('/tools/uuid-generator')} />
          <NavLink label={t('common:json_formatter')} onClick={() => handleNavigation('/tools/json-formatter')} />
        </NavLink>
        <NavLink
          component="button"
          label={t('common:unit_converter')}
          leftSection={<IconRepeat size="1rem" stroke={1.5} />}
        //   onClick={() => handleNavigation('/records')}
        >
          <NavLink label={t('common:length_converter_title')} onClick={() => handleNavigation('/converters/length')} />
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