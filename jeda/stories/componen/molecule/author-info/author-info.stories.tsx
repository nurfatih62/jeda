import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthorInfo } from "./author-info";

const meta: Meta<typeof AuthorInfo> = {
  title: "📦componen/molecule/author-info",
  component: AuthorInfo,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    authorName: { control: "text" },
    date: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Default (Sesuai Spesifikasi Figma)
export const Default: Story = {
  args: {
    authorName: "Asya mc",
    date: "15 Agustus 2026",
  },
};

// 2. Varian dengan Nama Panjang
export const LongName: Story = {
  args: {
    authorName: "Nur Fatih Aprilando",
    date: "18 Agustus 2026",
  },
};