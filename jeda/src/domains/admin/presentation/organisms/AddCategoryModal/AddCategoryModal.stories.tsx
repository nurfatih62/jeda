import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AddCategoryModal } from "./AddCategoryModal";

const meta = {
  title: "📦componen/organism/admin/add-category-modal",
  component: AddCategoryModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "closed" },
    onSubmit: { action: "submitted" },
  },
} satisfies Meta<typeof AddCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};