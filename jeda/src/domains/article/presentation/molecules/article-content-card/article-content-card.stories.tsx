import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleContentCard } from "./article-content-card";

const meta: Meta<typeof ArticleContentCard> = {
  title: "📦componen/molecule/article-content-card",
  component: ArticleContentCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "Judul artikel",
    },
    description: {
      control: "text",
      description: "Deskripsi / ringkasan isi artikel",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
  },
};