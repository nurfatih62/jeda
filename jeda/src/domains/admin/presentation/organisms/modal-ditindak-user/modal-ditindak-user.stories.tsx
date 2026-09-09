import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ModalDitindakUser } from "./modal-ditindak-user";

const meta: Meta<typeof ModalDitindakUser> = {
  title: "📦componen/organism/admin/modal-ditindak-user",
  component: ModalDitindakUser,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "modal closed" },
    onSuspendUser: { action: "suspend user clicked" },
    onWarnUser: { action: "warn user clicked" },
    onRejectReport: { action: "reject report clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ModalDitindakUser>;

export const Default: Story = {
  args: {
    isOpen: true,
    accountType: "Akun",
    username: "akun @ceritakelam99",
    accountMeta: "Akun terdaftar 2 hari lalu, menggunakan nama dan foto mirip Author lain.",
    reportReason: "Akun palsu (impersonasi)",
  },
};