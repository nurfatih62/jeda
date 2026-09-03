import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  title: 'Organism/Header',
  component: Header,
  tags: ['autodocs'],
  args: {
    showLogo: true,
  },
  argTypes: {
    isLoggedIn: { 
      control: 'boolean', 
      description: 'Mengubah state header antara sebelum/sesudah login' 
    },
    userName: { 
      control: 'text', 
      description: 'Nama pengguna (digunakan untuk fallback inisial avatar)' 
    },
    userAvatar: { 
      control: 'text', 
      description: 'URL foto profil (kosongkan jika ingin menampilkan inisial)' 
    },
  },
};
export default meta;

type Story = StoryObj<typeof Header>;

/** Tampilan Header sebelum login (menampilkan tombol Masuk) */
export const Default: Story = {
  args: {
    isLoggedIn: false,
  },
};

/** Tampilan Header setelah login (menampilkan teks JEDA, icon button, dan avatar inisial JD) */
export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    userName: 'John Doe', // Otomatis merender inisial "JD" jika userAvatar kosong
    userAvatar: undefined,
  },
};