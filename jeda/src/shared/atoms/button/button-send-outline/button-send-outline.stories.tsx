import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ButtonSendOutline } from "./button-send-outline";

const meta: Meta<typeof ButtonSendOutline> = {
  title: "📦componen/atom/button/button-send-outline",
  component: ButtonSendOutline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "Teks label tombol",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Status nonaktif tombol",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story Mode Default
export const Default: Story = {
  args: {
    children: "Saya mengerti",
  },
};

// Story Mode Disabled
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Saya mengerti",
  },
};