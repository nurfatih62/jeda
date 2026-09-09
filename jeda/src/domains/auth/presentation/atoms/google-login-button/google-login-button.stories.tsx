import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GoogleLoginButton } from "./google-login-button";

const meta: Meta<typeof GoogleLoginButton> = {
  title: "📦componen/atom/button/google-login-button",
  component: GoogleLoginButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "Teks label di dalam tombol",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Status nonaktif tombol (opacity 50%)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story Mode Default (Tanpa border, border muncul saat di-hover)
export const Default: Story = {
  args: {
    children: "Masuk dengan Google",
  },
};

// Story Mode Disabled
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Masuk dengan Google",
  },
};