import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AdminConfirmModal } from "./admin-confirm-modal";

const meta: Meta<typeof AdminConfirmModal> = {
  title: "📦componen/molecule/admin-confirm-modal",
  component: AdminConfirmModal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Warning: Story = {
  args: {
    isOpen: true,
    title: "Kirim peringatan ke pengguna?",
    confirmTone: "warning",
  },
};

export const Danger: Story = {
  args: {
    isOpen: true,
    title: "Hapus konten ini?",
    confirmTone: "danger",
  },
};

export const Primary: Story = {
  args: {
    isOpen: true,
    title: "Tolak laporan ini?",
    confirmTone: "primary",
  },
};
