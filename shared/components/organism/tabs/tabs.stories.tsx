import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs } from './tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Organism/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    defaultActiveKey: {
      control: 'select',
      options: ['populer', 'terbaru'],
      description: 'Tab yang aktif di awal',
    },
    onChange: { action: 'tab-change' },
  },
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};
export const TerbaruActive: Story = { args: { defaultActiveKey: 'terbaru' } };
