import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./logo";

const meta: Meta<typeof Logo> = {
  title: "📦componen/atom/logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Tampilan Default Logo Jeda
export const Default: Story = {
  args: {
    text: "JEDA",
  },
};