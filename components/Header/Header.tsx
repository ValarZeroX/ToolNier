'use client';

import { FC } from 'react';
import { Group, Burger, rem, ActionIcon, Loader, Menu, Text } from '@mantine/core';
import { IconMoneybag, IconLogin, IconTools, IconLanguage } from '@tabler/icons-react';
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import classes from './Header.module.css';
import { useRouter, usePathname } from 'next/navigation';
// import { useSession, signOut } from 'next-auth/react';
import { languages } from '../../app/i18n/settings';
import { useTranslation } from "../../app/i18n/client";
// import { useTranslation } from 'next-i18next';
// import { useAuth } from '@/lib/auth/AuthContext';
// import axios from 'axios';
// import { getCookie } from '@/lib/auth/cookie'; 
// import {initializeCsrf} from '@/lib/auth/csrf';
// import { showNotification } from "@mantine/notifications";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
  desktopOpened: boolean;
  toggleDesktop: () => void;
  lng: string
}

const Header: FC<HeaderProps> = ({ opened, toggle, desktopOpened, toggleDesktop, lng }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation(lng, ['common']);

  // 語言切換函式
  const changeLanguage = (newLng: string) => {
    if (newLng === lng) return; // 已選擇的語言，不執行任何操作

    const segments = pathname.split('/');
    // 檢查路徑是否已包含語言代碼
    if (languages.includes(segments[1])) {
      segments[1] = newLng; // 替換現有的語言代碼
    } else {
      segments.splice(1, 0, newLng); // 插入新的語言代碼
    }
    const newPath = segments.join('/') || '/';
    router.push(newPath); // 導航到新的語言路徑
    // i18n.changeLanguage(lng);
    // localStorage.setItem('i18nextLng', lng); // 將語言保存到 localStorage
  };

  return (
    <div className={classes.inner}>
      <Group h="100%" px="md">
        {/* <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" /> */}
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
        <IconTools
          style={{ width: rem(36), height: rem(36) }}
          stroke={1.5}
          color="var(--mantine-color-blue-filled)"
        />
        <div>ToolNier</div>
      </Group>
      <div className={classes.actionIcon}>
        <Group>
          <ColorSchemeToggle />
          <Menu withArrow>
            <Menu.Target>
              <ActionIcon variant="default" size="lg" aria-label="Language">
                <IconLanguage />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>{t('common:language_selection')}</Menu.Label>
              <Menu.Item onClick={() => changeLanguage('en')}>
                <Text>English</Text>
              </Menu.Item>
              <Menu.Item onClick={() => changeLanguage('zh-Hans')}>
                <Text>简体中文</Text>
              </Menu.Item>
              <Menu.Item onClick={() => changeLanguage('zh-Hant')}>
                <Text>繁體中文</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          {/* {isAuthenticated === null ? (
            <ActionIcon variant="default" size="lg" aria-label="Loading">
              <Loader color="blue" />
            </ActionIcon>
          ) : isAuthenticated ? (
            <ActionIcon variant="default" size="lg" aria-label="Logout" onClick={handleLogout}>
              <IconLogout />
            </ActionIcon>
          ) : (
            <ActionIcon variant="default" size="lg" aria-label="Login" onClick={() => handleNavigation('/login')}>
              <IconLogin />
            </ActionIcon>
          )} */}
        </Group>
      </div>
    </div>
  );
};

export default Header;