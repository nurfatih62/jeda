import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArticleTemplate } from "./article-template";

const meta: Meta<typeof ArticleTemplate> = {
  title: "📦componen/template/article-template",
  component: ArticleTemplate,
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
type Story = StoryObj<typeof ArticleTemplate>;

// 1. Mode Guest (Belum Login — tanpa rekomendasi artikel)
export const GuestMode: Story = {
  args: {
    variant: "guest",
  },
};

// 2. Mode Reader (Sudah Login — dengan rekomendasi artikel)
export const ReaderMode: Story = {
  args: {
    variant: "reader",
  },
};

// 3. Mode Author (Sudah Login sebagai Author — dengan rekomendasi artikel)
export const AuthorMode: Story = {
  args: {
    variant: "author",
  },
};
