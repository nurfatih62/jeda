import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleBadge } from "./article-badge";

const meta: Meta<typeof ArticleBadge> = {
  title: "📦componen/atom/article-badge",
  component: ArticleBadge,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "paling-banyak-dibaca",
        "trending",
        "cocok-denganmu",
        "terbaru",
        "lanjutkan-membaca",
        "draft",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Paling Banyak Dibaca
export const PalingBanyakDibaca: Story = {
  args: {
    variant: "paling-banyak-dibaca",
  },
};

// 2. Trending
export const Trending: Story = {
  args: {
    variant: "trending",
  },
};

// 3. Cocok Denganmu
export const CocokDenganmu: Story = {
  args: {
    variant: "cocok-denganmu",
  },
};

// 4. Terbaru
export const Terbaru: Story = {
  args: {
    variant: "terbaru",
  },
};

// 5. Lanjutkan Membaca
export const LanjutkanMembaca: Story = {
  args: {
    variant: "lanjutkan-membaca",
  },
};

// 6. Draft
export const Draft: Story = {
  args: {
    variant: "draft",
  },
};