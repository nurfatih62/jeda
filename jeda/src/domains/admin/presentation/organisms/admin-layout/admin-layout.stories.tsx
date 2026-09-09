import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AdminLayout } from "./admin-layout";

const meta: Meta<typeof AdminLayout> = {
  title: "📦componen/organism/admin/admin-layout",
  component: AdminLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AdminLayout>;

// 1. Default — menu Dashboard aktif
export const Default: Story = {
  args: {
    children: (
      <div className="font-['Poppins'] text-[#1B4E46]">
        <h1 className="font-bold text-[36px] m-0">Dashboard Admin</h1>
        <p className="text-[#1B4E46]/75">Konten halaman admin tampil di sini.</p>
      </div>
    ),
  },
};

// 2. Menu Laporan aktif
export const MenuLaporan: Story = {
  args: {
    sidebarProps: {
      role: "admin",
      activeVariant: "report",
    },
  },
};

// 3. Menu Pengguna aktif
export const MenuPengguna: Story = {
  args: {
    sidebarProps: {
      role: "admin",
      activeVariant: "users",
    },
  },
};

// 4. Menu Kategori aktif
export const MenuKategori: Story = {
  args: {
    sidebarProps: {
      role: "admin",
      activeVariant: "tags",
    },
  },
};

// 5. Menu Profil aktif
export const MenuProfil: Story = {
  args: {
    sidebarProps: {
      role: "admin",
      activeVariant: "profile",
    },
  },
};
