import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TermsModal } from "./terms-modal";

const meta: Meta<typeof TermsModal> = {
  title: "📦componen/organism/auth/terms-modal",
  component: TermsModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Menentukan apakah modal ditampilkan",
    },
    defaultTab: {
      control: "radio",
      options: ["terms", "privacy"],
      description: "Tab aktif default saat modal pertama kali dibuka",
    },
    lastUpdated: {
      control: "text",
      description: "Teks tanggal pembaruan dokumen",
    },
    onBack: { action: "onBack clicked" },
    onUnderstand: { action: "onUnderstand clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof TermsModal>;

export const KebijakanPrivasiTab: Story = {
  args: {
    isOpen: true,
    defaultTab: "privacy",
    lastUpdated: "03 September 2026",
  },
};

export const SyaratKetentuanTab: Story = {
  args: {
    isOpen: true,
    defaultTab: "terms",
    lastUpdated: "03 September 2026",
  },
};