import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PaginationNumberButton } from "./pagination-number-button";

const meta: Meta<typeof PaginationNumberButton> = {
  title: "📦componen/atom/button/pagination-number-button",
  component: PaginationNumberButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    page: {
      control: { type: "number" },
      description: "Nomor halaman pada tombol",
    },
    active: {
      control: { type: "boolean" },
      description: "Status aktif halaman saat ini",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Status nonaktif tombol (opacity 50%)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Varian Tidak Aktif (Tanpa BG, Pakai Border)
export const Inactive: Story = {
  args: {
    page: 1,
    active: false,
    disabled: false,
  },
};

// Varian Aktif (Dengan Background Gradien)
export const Active: Story = {
  args: {
    page: 2,
    active: true,
    disabled: false,
  },
};

// Varian Nonaktif (Disabled)
export const Disabled: Story = {
  args: {
    page: 3,
    active: false,
    disabled: true,
  },
};