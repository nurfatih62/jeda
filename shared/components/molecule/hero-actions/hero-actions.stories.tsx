import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroActions } from './hero-actions';

const meta: Meta<typeof HeroActions> = {
  title: 'Molecule/HeroActions',
  component: HeroActions,
  tags: ['autodocs'],
  args: {
    exploreLabel: 'Jelajahi dulu',
    registerLabel: 'Daftar',
  },
  argTypes: {
    exploreLabel: { control: 'text', description: 'Label tombol outline' },
    registerLabel: { control: 'text', description: 'Label tombol primary' },
    onExplore: { action: 'explore' },
    onRegister: { action: 'register' },
  },
};
export default meta;

type Story = StoryObj<typeof HeroActions>;

export const Default: Story = {};
