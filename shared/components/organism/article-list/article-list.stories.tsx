import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleList } from "./article-list";

const meta: Meta<typeof ArticleList> = {
  title: "Organism/ArticleList",
  component: ArticleList,
  tags: ["autodocs"],

  args: {
    articles: [
      {
        id: "1",
        author: "Nuf",
        date: "15 Agustus 2026",
        title: "Lorem ipsum dolor sit amet",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        likes: 237,
        comments: 12,
        avatarUrl:
          "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
        imageUrl:
          "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
      },
      {
        id: "2",
        author: "Asya mc",
        date: "14 Agustus 2026",
        title: "Artikel kedua",
        description:
          "Contoh artikel kedua untuk melihat tampilan ArticleList.",
        likes: 120,
        comments: 8,
        avatarUrl:
          "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
        imageUrl:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&h=400&fit=crop",
      },
      {
        id: "3",
        author: "Budi",
        date: "13 Agustus 2026",
        title: "Artikel ketiga",
        description: "Contoh artikel ketiga.",
        likes: 89,
        comments: 4,
        avatarUrl:
          "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
        imageUrl:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
      },
    ],
  },

  argTypes: {
    articles: {
      control: "object",
      description: "Daftar artikel yang ditampilkan",
    },

    onShare: {
      action: "share",
    },

    onReport: {
      action: "report",
    },
  },

  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof ArticleList>;

export const Default: Story = {};