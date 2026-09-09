import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import EksplorTopikTemplate from "./eksplor-topik-template";

const meta: Meta<typeof EksplorTopikTemplate> = {
  title: "📦componen/template/eksplor-topik-template",
  component: EksplorTopikTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    authStatus: {
      control: { type: "select" },
      options: ["guest", "logged-in", "author"],
      description: "Status autentikasi / peran pengguna",
    },
  },
};

export default meta;
type Story = StoryObj<typeof EksplorTopikTemplate>;

const defaultEksplorProps = {
  title: "Eksplor topik",
  tags: [
    { label: "Semua", defaultActive: true },
    { label: "Teknologi", defaultActive: false },
    { label: "Wisata", defaultActive: false },
    { label: "Makanan", defaultActive: false },
    { label: "Perkerjaan", defaultActive: false },
    { label: "Pengembangan diri", defaultActive: false },
    { label: "Kehidupan", defaultActive: false },
  ],
  dropdownValue: "populer",
  articles: [
    {
      badgeVariant: "none" as const,
      authorName: "Asya mc",
      date: "15 Agustus 2026",
      title: "Pengaruh nikotin",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      likesCount: 237,
      commentsCount: 12,
      thumbnailUrl:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
    },
    {
      badgeVariant: "none" as const,
      authorName: "Asya mc",
      date: "15 Agustus 2026",
      title: "Tips olahraga di pagi hari",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
      likesCount: 237,
      commentsCount: 12,
      thumbnailUrl:
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=500&auto=format&fit=crop",
    },
  ],
};

/**
 * **1. Varian Guest (Belum Login)**
 * Menampilkan tombol "Masuk" di Header dan sidebar standar.
 */
export const Guest: Story = {
  args: {
    authStatus: "guest",
    eksplorTopikProps: defaultEksplorProps,
  },
};

/**
 * **2. Varian Logged In (Pengguna Sudah Login)**
 * Menampilkan notifikasi dan avatar profil di Header.
 */
export const LoggedIn: Story = {
  args: {
    authStatus: "logged-in",
    eksplorTopikProps: defaultEksplorProps,
  },
};

/**
 * **3. Varian Author (Penulis)**
 * Menampilkan tombol tulis (pensil), notifikasi, avatar profil di Header, serta menu "Dashboard" di Sidebar.
 */
export const Author: Story = {
  args: {
    authStatus: "author",
    eksplorTopikProps: defaultEksplorProps,
  },
};