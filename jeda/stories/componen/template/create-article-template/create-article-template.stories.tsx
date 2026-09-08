import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateArticleTemplate } from "./create-article-template";

const meta: Meta<typeof CreateArticleTemplate> = {
  title: "📦componen/template/create-article-template",
  component: CreateArticleTemplate,
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
    guestTitle: { control: "text", description: "Judul banner ajakan login (guest)" },
    guestDescription: { control: "text", description: "Deskripsi banner ajakan login (guest)" },
    onLoginClick: { action: "login clicked" },
    onRegisterClick: { action: "register clicked" },
    createArticleProps: {
      control: "object",
      description: "Props untuk editor (categories, onBack, onSaveDraft, onPublish)",
    },
    mainLayoutProps: {
      control: "object",
      description: "Props layout (sidebarProps, headerProps)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CreateArticleTemplate>;

// 1. Mode Guest — banner ajakan login (editor disembunyikan)
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

// 3. Mode Author (Halaman tulis artikel — sesuai Figma)
export const AuthorMode: Story = {
  args: {
    variant: "author",
  },
};

// 4. Author dengan kategori kustom + aksi editor
export const AuthorWithCustomCategories: Story = {
  args: {
    variant: "author",
    createArticleProps: {
      categories: [
        { id: "1", name: "Teknologi" },
        { id: "2", name: "Kehidupan" },
        { id: "3", name: "Wisata" },
        { id: "4", name: "Makanan" },
      ],
    },
  },
};
