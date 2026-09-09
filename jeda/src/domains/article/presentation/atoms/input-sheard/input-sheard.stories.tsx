import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputSheard } from "./input-sheard";

const meta: Meta<typeof InputSheard> = {
  title: "📦componen/atom/input/input-sheard",
  component: InputSheard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Cari",
  },
};