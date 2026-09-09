import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AdminLaporan } from "./admin-laporan";

const meta: Meta<typeof AdminLaporan> = {
  title: "📦componen/organism/admin/admin-laporan",
  component: AdminLaporan,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onTabChange: { action: "tab changed" },
  },
};

export default meta;
type Story = StoryObj<typeof AdminLaporan>;

// Tab Pending Default
export const PendingTab: Story = {
  args: {
    title: "Laporan",
    tabs: [
      { id: "pending", label: "Pending", count: 3 },
      { id: "ditindak", label: "Ditindak" },
      { id: "ditolak", label: "Ditolak" },
    ],
    reports: [
      {
        id: "1",
        jenis: "Artikel",
        dilaporkan: "Kenapa Kita Suka Cerita Sedih",
        alasan: "Informasi salah/hoaks",
        tanggal: "5 Sep 2026",
        status: "Publikasi",
      },
      {
        id: "2",
        jenis: "Komentar",
        dilaporkan: "Komentar oleh Budi R.",
        alasan: "Ujaran kebencian",
        tanggal: "4 Sep 2026",
        status: "Publikasi",
      },
      {
        id: "3",
        jenis: "Akun",
        dilaporkan: "akun @ceritakelam99",
        alasan: "Akun palsu (impersonasi)",
        tanggal: "4 Sep 2026",
        status: "Publikasi",
      },
    ],
  },
};

// Tab Ditindak (Sesuai Gambar Referensi 1)
export const DitindakTab: Story = {
  args: {
    title: "Laporan",
    tabs: [
      { id: "pending", label: "Pending", count: 3 },
      { id: "ditindak", label: "Ditindak" },
      { id: "ditolak", label: "Ditolak" },
    ],
    reports: [
      {
        id: "1",
        jenis: "Artikel",
        dilaporkan: "Kenapa Kita Suka Cerita Sedih",
        alasan: "Informasi salah/hoaks",
        tanggal: "5 Sep 2026",
        status: "Ditindak",
      },
    ],
  },
};

// Tab Ditolak (Sesuai Gambar Referensi 2)
export const DitolakTab: Story = {
  args: {
    title: "Laporan",
    tabs: [
      { id: "pending", label: "Pending", count: 3 },
      { id: "ditindak", label: "Ditindak" },
      { id: "ditolak", label: "Ditolak" },
    ],
    reports: [
      {
        id: "1",
        jenis: "Artikel",
        dilaporkan: "Kenapa Kita Suka Cerita Sedih",
        alasan: "Informasi salah/hoaks",
        tanggal: "5 Sep 2026",
        status: "Ditolak",
      },
    ],
  },
};