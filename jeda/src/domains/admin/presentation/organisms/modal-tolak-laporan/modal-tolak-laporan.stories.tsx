import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ModalTolakLaporan } from "./modal-tolak-laporan";

const meta: Meta<typeof ModalTolakLaporan> = {
  title: "📦componen/organism/admin/modal-tolak-laporan",
  component: ModalTolakLaporan,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onCancel: { action: "cancel clicked" },
    onConfirm: { action: "confirm clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ModalTolakLaporan>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Tolak laporan ini?",
    description:
      'Laporan akan ditandai tidak melanggar ketentuan dan dipindahkan ke tab "Ditolak".',
    confirmLabel: "Konfirmasi",
    cancelLabel: "Batal",
  },
};