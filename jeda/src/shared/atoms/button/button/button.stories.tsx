import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "📦componen/atom/button/button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["solid", "outline"],
    },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Varian Solid (Default dengan warna #10564A, hover #13574C, active #0B3F37)
export const Solid: Story = {
  args: {
    variant: "solid",
    children: "Daftar",
  },
};

// 2. Varian Outline (Transparan dengan border & teks #146C5D)
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Jelajahi dulu",
  },
};

// 3. Varian Outline dengan Teks Panjang (Menguji fleksibilitas lebar tombol)
export const OutlineLongText: Story = {
  args: {
    variant: "outline",
    children: "Jelajahi dulu dengan pengalaman baru yang menarik",
  },
};