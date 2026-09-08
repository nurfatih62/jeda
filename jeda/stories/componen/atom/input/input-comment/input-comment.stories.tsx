import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputComment } from "./input-comment";

const meta: Meta<typeof InputComment> = {
  title: "📦componen/atom/input/input-comment",
  component: InputComment,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// State Default (Kosong / Placeholder abu-abu)
export const Default: Story = {
  args: {
    placeholder: "Tulis komentar...",
    defaultValue: "",
  },
};

// State Pressed / Terisi (Teks & border warna #1B4E46)
export const Pressed: Story = {
  args: {
    defaultValue: "Ini adalah contoh teks komentar yang dimasukkan oleh pengguna.",
  },
};