import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PaginationButton } from "./pagination-button";

const meta: Meta<typeof PaginationButton> = {
  title: "📦componen/atom/button/pagination-button",
  component: PaginationButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Teks label pada tombol pagination",
    },
    direction: {
      control: { type: "select" },
      options: ["prev", "next"],
      description: "Arah tombol (prev untuk panah kiri, next untuk panah kanan)",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Status nonaktif tombol (opacity 50%)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Sebelumnya: Story = {
  args: {
    direction: "prev",
    disabled: false,
  },
};

export const Berikutnya: Story = {
  args: {
    direction: "next",
    disabled: false,
  },
};

export const SebelumnyaDisabled: Story = {
  args: {
    direction: "prev",
    disabled: true,
  },
};

export const BerikutnyaDisabled: Story = {
  args: {
    direction: "next",
    disabled: true,
  },
};