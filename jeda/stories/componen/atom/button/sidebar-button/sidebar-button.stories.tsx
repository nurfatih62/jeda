import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SidebarButton } from "./sidebar-button";

const meta: Meta<typeof SidebarButton> = {
  title: "📦componen/atom/button/sidebar-button",
  component: SidebarButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["home", "explore", "library", "profile", "dashboard", "report", "users", "tags"],
      description: "Pilihan jenis menu (mengganti ikon dan teks secara otomatis)",
    },
    label: {
      control: { type: "text" },
      description: "Override teks label (opsional)",
    },
    active: {
      control: { type: "boolean" },
      description: "Status aktif tombol (Background #10564A jika true)",
    },
    collapsed: {
      control: { type: "boolean" },
      description: "Mode kolaps (hanya menampilkan ikon)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story Mode Default (Tidak Aktif)
export const Default: Story = {
  args: {
    variant: "home",
    active: false,
    collapsed: false,
  },
};

// Story Mode Active (Background berubah menjadi #10564A dan teks putih)
export const Active: Story = {
  args: {
    variant: "home",
    active: true,
    collapsed: false,
  },
};

// Story Mode Collapsed (Hanya Menampilkan Ikon)
export const Collapsed: Story = {
  args: {
    variant: "home",
    active: false,
    collapsed: true,
  },
};

// Story Ikon Admin: Dashboard
export const AdminDashboard: Story = {
  args: {
    variant: "dashboard",
    active: false,
    collapsed: false,
  },
};

// Story Ikon Admin: Laporan
export const AdminLaporan: Story = {
  args: {
    variant: "report",
    active: false,
    collapsed: false,
  },
};

// Story Ikon Admin: Pengguna
export const AdminPengguna: Story = {
  args: {
    variant: "users",
    active: false,
    collapsed: false,
  },
};

// Story Ikon Admin: Kategori
export const AdminKategori: Story = {
  args: {
    variant: "tags",
    active: false,
    collapsed: false,
  },
};