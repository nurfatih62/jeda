import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WarningModal } from "./warning-modal";

const meta = {
  title: "📦componen/organism/warning-modal",
  component: WarningModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onConfirm: { action: "confirmed" },
  },
} satisfies Meta<typeof WarningModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Kamu menerima peringatan",
    articleTitle: "Belajar Menulis Tiap Hari",
    reason: "Pelecehan atau bullying",
    buttonText: "Saya mengerti",
  },
};

export const CustomReason: Story = {
  args: {
    title: "Kamu menerima peringatan",
    articleTitle: "Tips Coding Clean Code",
    reason: "Spam atau konten promosi berlebihan",
    buttonText: "Pahami & Tutup",
  },
};