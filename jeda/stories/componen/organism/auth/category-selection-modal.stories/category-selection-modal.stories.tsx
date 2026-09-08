import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CategorySelectionModal } from "@/stories/componen/organism/auth/category-selection-modal/category-selection-modal";

const meta: Meta<typeof CategorySelectionModal> = {
  title: "📦componen/organism/auth/category-selection-modal-legacy",
  component: CategorySelectionModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    maxSelection: { control: "number" },
    onSubmit: { action: "submitted" },
  },
};

export default meta;
type Story = StoryObj<typeof CategorySelectionModal>;

export const Default: Story = {
  args: {
    categories: [
      "Teknologi",
      "Kehidupan",
      "Wisata",
      "Pekerjaan",
      "Pengembangan diri",
      "Makanan",
    ],
    maxSelection: 3,
  },
};