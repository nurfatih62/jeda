import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PaginationEllipsis } from "./pagination-ellipsis";

const meta: Meta<typeof PaginationEllipsis> = {
  title: "📦componen/atom/pagination-ellipsis",
  component: PaginationEllipsis,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onJump: {
      action: "jumpedToPage",
      description: "Fungsi yang dijalankan saat menekan Enter pada input halaman",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onJump: (page) => alert(`Loncat ke halaman: ${page}`),
  },
};