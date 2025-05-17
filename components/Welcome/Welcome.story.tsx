import type { Meta, StoryObj } from '@storybook/react';
import { Welcome } from './Welcome';

const meta: Meta<typeof Welcome> = {
  title: 'Welcome',
  component: Welcome,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Welcome>;

export const Usage: Story = {
  args: {
    lng: 'zh-Hant'
  }
};
