import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ButtonVerifikasi } from "./button-verifikasi";

const meta: Meta<typeof ButtonVerifikasi> = {
  title: "📦componen/atom/button/button-verifikasi",
  component: ButtonVerifikasi,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isOn: {
      control: "boolean",
      description: "Status aktif (warna normal) atau nonaktif (redup)",
    },
    children: {
      control: "text",
      description: "Teks di dalam tombol",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonVerifikasi>;

// Varian saat tombol Aktif (On)
export const On: Story = {
  args: {
    isOn: true,
    children: "Verifikasi",
  },
};

// Varian saat tombol Nonaktif (Off / Redup)
export const Off: Story = {
  args: {
    isOn: false,
    children: "Verifikasi",
  },
};