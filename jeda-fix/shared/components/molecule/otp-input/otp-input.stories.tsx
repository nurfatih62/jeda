import type { Meta, StoryObj } from '@storybook/react';
import { OtpInput } from './otp-input';

const meta: Meta<typeof OtpInput> = {
  title: 'Molecule/OtpInput',
  component: OtpInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    length: 4,
    value: ['1', '5', '2', '4'],
    status: 'error',
    message: 'Kode salah, coba lagi',
  },
  argTypes: {
    length: { control: 'number', description: 'Jumlah kotak digit OTP' },
    value: { control: 'object', description: 'Nilai array setiap digit' },
    status: {
      control: 'select',
      options: ['normal', 'error', 'expired', 'locked', 'success', 'sent'],
      description: 'Status state OTP',
    },
    message: { control: 'text', description: 'Pesan helper di bawah input' },
  },
};

export default meta;

type Story = StoryObj<typeof OtpInput>;

export const KodeSalah: Story = {
  args: {
    value: ['1', '5', '2', '4'],
    status: 'error',
    message: 'Kode salah, coba lagi',
  },
};

export const KodeKadaluarsa: Story = {
  args: {
    value: ['1', '5', '2', '4'],
    status: 'expired',
    message: (
      <span>
        Kode sudah kadaluarsa.{' '}
        <a href="#kirim-ulang" className="underline hover:opacity-80 font-semibold">
          Kirim ulang
        </a>
      </span>
    ),
  },
};

export const TerlaluBanyakPercobaan: Story = {
  args: {
    value: ['1', '5', '2', '4'],
    status: 'locked',
    message: 'Terlalu banyak percobaan. Coba lagi dalam 5 menit',
  },
};

export const KodeTerverifikasi: Story = {
  args: {
    value: ['1', '5', '2', '4'],
    status: 'success',
    message: 'Kode terverifikasi, mengalihkan...',
  },
};

export const KodeBaruDikirim: Story = {
  args: {
    value: ['', '', '', ''],
    status: 'sent',
    message: 'Kode baru dikirim ke email kamu',
  },
};