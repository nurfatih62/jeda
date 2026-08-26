import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleList } from "./article-list";

const meta = {
  title: "Components/Organism/Article List",
  component: ArticleList,

  tags: ["autodocs"],

  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ArticleList>;

export default meta;

type Story = StoryObj<typeof meta>;

const articles = [
  {
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
  {
    author: "nufa",
    date: "23 Agustus 2026",
    title: "Artikel kedua",
    description:
      "Contoh artikel kedua untuk melihat tampilan list.",
    likes: 120,
    comments: 8,
    avatar:
      "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&h=400&fit=crop",
  },
  {
    author: "nufa",
    date: "22 Agustus 2026",
    title: "Artikel ketiga",
    description:
      "Contoh artikel ketiga.",
    likes: 89,
    comments: 4,
    avatar:
      "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
  },
];

export const Default: Story = {
  args: {
    articles,
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
