import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { GoogleLoginButton } from './google-login-button';

const meta: Meta<typeof GoogleLoginButton> = {
  title: 'Molecule/GoogleLoginButton',
  component: GoogleLoginButton,
  tags: ['autodocs'],
  args: {
    variant: 'default',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary'],
      description: 'Variasi border',
    },
  },
};
export default meta;

type Story = StoryObj<typeof GoogleLoginButton>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};
