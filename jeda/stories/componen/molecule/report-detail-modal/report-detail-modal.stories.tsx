import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReportDetailModal } from "./report-detail-modal";

const meta: Meta<typeof ReportDetailModal> = {
  title: "📦componen/molecule/report-detail-modal",
  component: ReportDetailModal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Artikel: Story = {
  args: {
    isOpen: true,
    infoCards: [
      {
        label: "Artikel",
        heading: "Kenapa Kita Suka Cerita Sedih",
        description: "Artikel oleh Asya mc, dipublikasikan 3 hari lalu. Views: 2.4K.",
      },
      { label: "Alasan Laporan", heading: "Informasi salah/hoaks" },
    ],
    actions: [
      { label: "Hapus konten", tone: "danger" },
      { label: "Peringatkan pengguna", tone: "warning" },
      { label: "Tolak laporan", tone: "success" },
    ],
  },
};
