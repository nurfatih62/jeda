import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputVerifikasi } from "./input-verifikasi";

const meta: Meta<typeof InputVerifikasi> = {
  title: "📦componen/atom/input/input-verifikasi",
  component: InputVerifikasi,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// State Default (Border abu-abu #C2C7D0)
export const Default: Story = {
  args: {
    defaultValue: "",
  },
};

// State Terisi / Fokus (Border hijau secondary #1B4E46)
export const FilledOrActive: Story = {
  args: {
    defaultValue: "5",
  },
};