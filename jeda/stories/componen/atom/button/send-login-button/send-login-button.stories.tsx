import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SendLoginButton } from "./send-login-button";

const meta: Meta<typeof SendLoginButton> = {
  title: "📦componen/atom/button/send-login-button",
  component: SendLoginButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isLoading: {
      control: "boolean",
      description: "Mengaktifkan status loading (teks berubah jadi Memproses...)",
    },
    disabled: {
      control: "boolean",
      description: "Menonaktifkan tombol (opacity 50%)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Masuk",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Masuk",
  },
};