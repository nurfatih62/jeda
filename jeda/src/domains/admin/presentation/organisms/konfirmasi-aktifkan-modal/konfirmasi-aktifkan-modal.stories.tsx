import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { KonfirmasiAktifkanModal } from "./konfirmasi-aktifkan-modal";

const meta: Meta<typeof KonfirmasiAktifkanModal> = {
  title: "📦componen/organism/admin/konfirmasi-aktifkan-modal",
  component: KonfirmasiAktifkanModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: { control: "boolean" },
    userName: { control: "text" },
    onClose: { action: "onClose clicked" },
    onConfirm: { action: "onConfirm clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof KonfirmasiAktifkanModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    userName: "Budi R.",
  },
};

export const CustomUser: Story = {
  args: {
    isOpen: true,
    userName: "Sinta W.",
  },
};