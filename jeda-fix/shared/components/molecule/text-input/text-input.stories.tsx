import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TextInput } from './text-input';

const meta: Meta<typeof TextInput> = {
  title: 'Molecule/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'nama@gmail.com',
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
    helperText: {
      control: 'text',
      description: 'Pesan helper atau error di bawah input',
    },
    helperType: {
      control: 'select',
      options: ['error', 'success'],
      description: 'Tipe status helper text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'nama@gmail.com',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Email',
    placeholder: 'nama@gmail.com',
    variant: 'secondary',
  },
};

export const Click: Story = {
  args: {
    label: 'Password',
    placeholder: 'Ella gaby',
    variant: 'secondary',
  },
};

export const InvalidEmail: Story = {
  args: {
    label: 'Email',
    placeholder: 'nama@gmail.com',
    variant: 'secondary',
    helperText: 'Masukkan email yang valid',
    helperType: 'error',
  },
};

export const EmailAlreadyRegistered: Story = {
  args: {
    label: 'Email',
    placeholder: 'nama@gmail.com',
    variant: 'secondary',
    helperText: (
      <span>
        Email sudah terdaftar.{' '}
        <a href="#login" className="underline hover:opacity-80">
          Coba login
        </a>
      </span>
    ),
    helperType: 'error',
  },
};

export const EmailCodeSent: Story = {
  args: {
    label: 'Email',
    placeholder: 'nama@gmail.com',
    variant: 'secondary',
    helperText: 'Kode telah dikirim ke emailmu',
    helperType: 'success',
  },
};

export const EmailNotFound: Story = {
  args: {
    label: 'Email',
    placeholder: 'nama@gmail.com',
    variant: 'secondary',
    helperText: 'Email tidak terdaftar',
    helperType: 'error',
  },
};