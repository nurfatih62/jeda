import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ArticleCard } from "./article-card";

const meta: Meta<typeof ArticleCard> = {
  title: "Organism/ArticleCard",
  component: ArticleCard,

  tags: ["autodocs"],

  args: {
    article: {
      id: "1",
      author: "Nuf",
      date: "15 Agustus 2026",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",

      likes: 237,
      comments: 12,

      avatarUrl:
        "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",

      imageUrl:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
    },
  },

  argTypes: {
    article: {
      control: "object",
      description:
        "Data artikel seperti author, title, description, likes, comments, avatar, dan image.",
    },

    onShare: {
      action: "share",
      description: "Event ketika tombol share ditekan.",
    },

    onReport: {
      action: "report",
      description: "Event ketika tombol report ditekan.",
    },
  },

  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof ArticleCard>;

export const Default: Story = {
  render: (args) => (
    <div className="w-288.5 max-w-full">
      <ArticleCard {...args} />
    </div>
  ),
};