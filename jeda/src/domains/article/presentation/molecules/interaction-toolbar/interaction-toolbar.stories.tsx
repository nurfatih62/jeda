import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InteractionToolbar } from "./interaction-toolbar";

const meta: Meta<typeof InteractionToolbar> = {
  title: "📦componen/molecule/interaction-toolbar",
  component: InteractionToolbar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    likeCount: { control: "text" },
    commentCount: { control: "text" },
    isLiked: { control: "boolean" },
    isSaved: { control: "boolean" },
    isReported: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Varian Default (Sesuai Spesifikasi Figma)
export const Default: Story = {
  args: {
    likeCount: 237,
    commentCount: 14,
    isLiked: false,
    isSaved: false,
    isReported: false,
  },
};

// Varian Interaktif (Like & Save dalam kondisi aktif/tersimpan)
export const ActiveState: Story = {
  args: {
    likeCount: 238,
    commentCount: 15,
    isLiked: true,
    isSaved: true,
    isReported: false,
  },
};