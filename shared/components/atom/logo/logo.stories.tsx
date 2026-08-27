import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Logo } from './logo';

const meta: Meta<typeof Logo> = {
  title: 'Atom/Logo',
  component: Logo,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number', description: 'Ukuran font logo (px)' },
  },
};
export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = { args: { size: 24 } };
export const Large: Story = { args: { size: 36 } };
