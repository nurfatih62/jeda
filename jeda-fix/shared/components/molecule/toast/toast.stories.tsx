import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Molecule/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // Membuat posisi toast berada di tengah preview Storybook
  },
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your action was succeeded',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'success'],
      description: 'Menentukan variasi status toast (error / success)',
    },
    title: {
      control: 'text',
      description: 'Judul atau pesan utama toast (mendukung teks atau elemen HTML/ReactNode)',
    },
    description: {
      control: 'text',
      description: 'Subteks atau deskripsi tambahan di bawah judul',
    },
    className: {
      control: 'text',
      description: 'Kelas CSS tambahan untuk kustomisasi luar',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const SuccessWithSubtext: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Your action was succeeded',
  },
};

export const SuccessSimple: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: undefined,
  },
};

export const FailedWithSubtext: Story = {
  args: {
    variant: 'error',
    title: 'Failed!',
    description: 'Your action was failed. Please try again',
  },
};

export const FailedSimple: Story = {
  args: {
    variant: 'error',
    title: 'Email atau password salah',
    description: undefined,
  },
};

export const UnverifiedAccount: Story = {
  args: {
    variant: 'error',
    title: (
      <span>
        Akun belum diverifikasi. Cek email kamu &middot;{' '}
        <a href="#kirim-ulang" className="underline hover:opacity-80 font-semibold">
          Kirim ulang
        </a>
      </span>
    ),
    description: undefined,
  },
};

export const GoogleAccountLinked: Story = {
  args: {
    variant: 'error',
    title: (
      <span>
        Akun ini terhubung dengan Google.{' '}
        <a href="#login-google" className="underline hover:opacity-80 font-semibold">
          Login dengan Google
        </a>
      </span>
    ),
    description: undefined,
  },
};

export const SavePreferenceFailed: Story = {
  args: {
    variant: 'error',
    title: (
      <span>
        Gagal menyimpan preferensi.{' '}
        <a href="#coba-lagi" className="underline hover:opacity-80 font-semibold">
          Coba lagi
        </a>
      </span>
    ),
    description: undefined,
  },
};