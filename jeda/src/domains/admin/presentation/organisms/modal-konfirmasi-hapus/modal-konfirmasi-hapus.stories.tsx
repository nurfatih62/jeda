import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ModalKonfirmasiHapus } from "./modal-konfirmasi-hapus";

const meta: Meta<typeof ModalKonfirmasiHapus> = {
  title: "📦componen/organism/admin/modal-konfirmasi-hapus",
  component: ModalKonfirmasiHapus,
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
type Story = StoryObj<typeof ModalKonfirmasiHapus>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Hapus konten ini?",
    description:
      'Konten akan dihapus permanen dari platform. Tindakan ini akan tercatat sebagai "Ditindak".',
    confirmLabel: "Konfirmasi",
    cancelLabel: "Batal",
  },
};