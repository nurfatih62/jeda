import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { JoinCallout } from './join-callout';

const meta: Meta<typeof JoinCallout> = {
  title: 'Molecule/JoinCallout',
  component: JoinCallout,
  tags: ['autodocs'],
  argTypes: {
    onRegister: { action: 'register clicked' },
    onLogin: { action: 'login clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof JoinCallout>;

export const Default: Story = {};