import type { Meta, StoryObj } from '@storybook/react';
import { Login } from './login';

const meta: Meta<typeof Login> = {
  title: 'Molecule/Login',
  component: Login,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'login',
        'register',
        'verification',
        'category-selection',
        'forgot-password',
        'forgot-password-verification',
        'reset-password',
        'terms',
      ],
      description: 'Menentukan varian tampilan komponen Login',
    },
    emailTarget: { control: 'text', description: 'Target email untuk pengiriman kode OTP' },
    isError: { control: 'boolean', description: 'Menampilkan status error' },
    errorMessage: { control: 'text', description: 'Teks pesan error' },
    isSuccess: { control: 'boolean', description: 'Menampilkan status sukses' },
    successMessage: { control: 'text', description: 'Teks pesan sukses' },
  },
};

export default meta;

type Story = StoryObj<typeof Login>;

// 1. Tampilan Login Utama
export const DefaultLogin: Story = {
  args: {
    variant: 'login',
  },
};

// 2. Tampilan Login dengan Error
export const LoginError: Story = {
  args: {
    variant: 'login',
    isError: true,
    errorMessage: 'Email atau password yang kamu masukkan salah.',
  },
};

// 3. Tampilan Register / Pendaftaran Akun
export const Register: Story = {
  args: {
    variant: 'register',
    onTermsClick: () => window.alert('Navigasi ke halaman syarat dan ketentuan'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Menampilkan checkbox persetujuan syarat dan ketentuan. Checkbox harus dicentang sebelum tombol Daftar aktif.',
      },
    },
  },
};

// 4. Tampilan Verifikasi Email (OTP setelah Register)
export const Verification: Story = {
  args: {
    variant: 'verification',
    emailTarget: 'jeda.fix@gmail.com',
  },
};

// 5. Tampilan Pemilihan Kategori Favorit
export const CategorySelection: Story = {
  args: {
    variant: 'category-selection',
  },
};

// 6. Tampilan Lupa Password (Input Email)
export const ForgotPassword: Story = {
  args: {
    variant: 'forgot-password',
  },
};

// 7. Tampilan Verifikasi Lupa Password (OTP)
export const ForgotPasswordVerification: Story = {
  args: {
    variant: 'forgot-password-verification',
    emailTarget: 'jeda.fix@gmail.com',
    isError: true,
    errorMessage: 'Kode salah, coba lagi',
  },
};

// 8. Tampilan Reset Password Baru
export const ResetPassword: Story = {
  args: {
    variant: 'reset-password',
  },
};

// 9. Tampilan Syarat dan Ketentuan
export const Terms: Story = {
  args: {
    variant: 'terms',
    onBack: () => undefined,
  },
};