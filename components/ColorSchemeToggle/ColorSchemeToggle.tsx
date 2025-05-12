'use client';

import { useState, useEffect } from 'react';
import { Button, Group, useMantineColorScheme, ActionIcon } from '@mantine/core';
import { IconBrightnessDown, IconMoon } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [Icon, setIcon] = useState(() => IconMoon); // 初始為 IconMoon

  // 僅在客戶端進行圖標選擇
  useEffect(() => {
    setIcon(colorScheme === 'dark' ? IconBrightnessDown : IconMoon);
  }, [colorScheme]);

  return (
    <ActionIcon
      variant="default"
      aria-label="Toggle theme"
      size="lg"
      onClick={() => toggleColorScheme()}
    >
      <Icon style={{ width: '80%', height: '80%' }} stroke={1.5} />
    </ActionIcon>
  );
}