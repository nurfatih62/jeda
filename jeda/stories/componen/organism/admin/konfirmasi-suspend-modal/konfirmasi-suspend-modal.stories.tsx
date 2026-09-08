import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { KonfirmasiSuspendModal } from "./konfirmasi-suspend-modal";

const meta: Meta<typeof KonfirmasiSuspendModal> = {
  title: "📦componen/organism/admin/konfirmasi-suspend-modal",
  component: KonfirmasiSuspendModal,
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
type Story = StoryObj<typeof KonfirmasiSuspendModal>;

export const Default: Story = {
  args: {
    isOpen: true,
    userName: "Sinta W.",
  },
};

export const CustomUser: Story = {
  args: {
    isOpen: true,
    userName: "Asya mc",
  },
};