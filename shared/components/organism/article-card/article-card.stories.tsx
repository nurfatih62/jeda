import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleCard } from "./article-card";

const meta = {
  title: "Components/Organism/Article Card",
  component: ArticleCard,

  tags: ["autodocs"],

  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ArticleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    author: "nufa",
    date: "24 Agustus 2026",
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    likes: 237,
    comments: 12,
    avatar:
      "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
  },
};

export const WithoutImage: Story = {
  args: {
    author: "nufa",
    date: "24 Agustus 2026",
    title: "Artikel tanpa gambar",
    description:
      "Ini adalah contoh artikel yang tidak mempunyai gambar.",
    likes: 100,
    comments: 5,
    avatar:
      "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
  },
};
