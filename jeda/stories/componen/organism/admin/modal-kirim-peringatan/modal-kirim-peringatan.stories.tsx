import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ModalKirimPeringatan } from "./modal-kirim-peringatan";

const meta: Meta<typeof ModalKirimPeringatan> = {
  title: "📦componen/organism/admin/modal-kirim-peringatan",
  component: ModalKirimPeringatan,
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
type Story = StoryObj<typeof ModalKirimPeringatan>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Kirim peringatan ke pengguna?",
    description:
      'Pengguna akan menerima notifikasi peringatan. Konten tetap ada, laporan akan tercatat sebagai "Ditindak".',
    confirmLabel: "Konfirmasi",
    cancelLabel: "Batal",
  },
};