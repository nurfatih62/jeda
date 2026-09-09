import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CategoryManagementSection } from "./CategoryManagementSection";

const meta = {
  title: "📦componen/organism/admin/category-management-section",
  component: CategoryManagementSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onToggleCategory: { action: "toggled" },
  },
} satisfies Meta<typeof CategoryManagementSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Kategori",
    categoryListTitle: "Kategori artikel",
    popularTagsTitle: "Tag terpopuler",
  },
};

export const CustomData: Story = {
  args: {
    title: "Manajemen Kategori",
    categoryListTitle: "Daftar Kategori",
    popularTagsTitle: "Top Tags",
    categories: [
      { id: "1", name: "Edukasi", articleCount: 120, isActive: true },
      { id: "2", name: "Finansial", articleCount: 85, isActive: false },
      { id: "3", name: "Kesehatan", articleCount: 210, isActive: true },
    ],
    popularTags: [
      { id: "1", name: "Kesehatan", count: 210 },
      { id: "2", name: "Edukasi", count: 120 },
      { id: "3", name: "Finansial", count: 85 },
    ],
  },
};