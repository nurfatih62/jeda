import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CommentTemplate } from "./comment-template";

const meta: Meta<typeof CommentTemplate> = {
  title: "📦componen/template/comment-template",
  component: CommentTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["guest", "reader", "author"],
      description: "Varian status autentikasi pengguna",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommentTemplate>;

// 1. Mode Guest (Belum Login)
export const GuestMode: Story = {
  args: {
    variant: "guest",
  },
};

// 2. Mode Reader (Sudah Login)
export const ReaderMode: Story = {
  args: {
    variant: "reader",
  },
};

// 3. Mode Author (Sudah Login sebagai Author)
export const AuthorMode: Story = {
  args: {
    variant: "author",
  },
};
