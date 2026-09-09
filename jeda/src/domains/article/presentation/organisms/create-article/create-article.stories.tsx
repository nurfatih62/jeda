import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateArticle } from "./create-article";

const meta: Meta<typeof CreateArticle> = {
  title: "📦componen/organism/CreateArticle",
  component: CreateArticle,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onBack: { action: "onBack clicked" },
    onSaveDraft: { action: "onSaveDraft clicked" },
    onPublish: { action: "onPublish clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof CreateArticle>;

export const Default: Story = {
  args: {
    categories: [
      { id: "1", name: "Desain UI/UX" },
      { id: "2", name: "Teknologi" },
      { id: "3", name: "Pemrograman" },
      { id: "4", name: "Karir" },
      { id: "5", name: "Gaya Hidup" },
    ],
  },
};

export const CustomCategories: Story = {
  args: {
    categories: [
      { id: "cat-1", name: "Frontend" },
      { id: "cat-2", name: "Backend" },
      { id: "cat-3", name: "DevOps" },
      { id: "cat-4", name: "AI & Data" },
    ],
  },
};