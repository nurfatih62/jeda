import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PasswordInput } from './password-input';

const meta: Meta<typeof PasswordInput> = {
  title: 'Molecule/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Input',
    variant: 'default',
  },
  argTypes: {
    label: { control: 'text', description: 'Label input' },
    placeholder: { control: 'text', description: 'Placeholder input' },
    variant: {
      control: 'select',
      options: ['default', 'secondary'],
      description: 'Variasi border',
    },
    strength: {
      control: { type: 'range', min: 0, max: 4, step: 1 },
      description: 'Kekuatan password (0-4)',
    },
    errorText: { 
      control: 'text', 
      description: 'Pesan error di bawah indikator kekuatan password' 
    },
    matchStatus: {
      control: 'select',
      options: ['match', 'mismatch'],
      description: 'Status kecocokan password (match / mismatch)',
    },
  },
};
export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    label: 'Password',
    placeholder: 'Input',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Password',
    placeholder: 'Input',
    variant: 'secondary',
  },
};

export const WithStrength: Story = {
  args: {
    label: 'Password',
    placeholder: 'Input',
    variant: 'secondary',
    strength: 3,
  },
};

export const StrongPassword: Story = {
  args: {
    label: 'Password',
    placeholder: 'Input',
    variant: 'secondary',
    strength: 4,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Dokja',
    variant: 'secondary',
    strength: 1,
    errorText: 'Password minimal 8 karakter',
  },
};

export const PasswordMismatch: Story = {
  args: {
    label: 'Konfirmasi password',
    placeholder: 'Dokjahebat123',
    variant: 'secondary',
    matchStatus: 'mismatch',
  },
};

export const PasswordMatch: Story = {
  args: {
    label: 'Konfirmasi password',
    placeholder: 'Dokjahebat123',
    variant: 'secondary',
    matchStatus: 'match',
  },
};