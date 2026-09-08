import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "📦componen/atom/input/textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "boolean",
      description: "Status error pada textarea",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/** Tampilan default Textarea dengan label dan helper text */
export const Default: Story = {
  args: {
    label: "Deskripsi",
    placeholder: "Chef aktif membagikan pengalaman kerja dan makanan",
    helperText: "Ceritakan sedikit tentang dirimu. Maksimal 160 karakter.",
    rows: 4,
  },
};

/** Tampilan Textarea ketika terjadi kesalahan (Error State) */
export const WithError: Story = {
  args: {
    label: "Deskripsi",
    defaultValue: "Teks deskripsi terlalu panjang melebihi batas ketentuan sistem...",
    error: true,
    errorMessage: "Karakter melebihi batas maksimal 160 karakter",
    rows: 4,
  },
};