import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Image } from "./image";

const meta = {
  title: "Components/Atom/Image",
  component: Image,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    src: {
      control: "text",
      description: "URL gambar",
    },

    alt: {
      control: "text",
      description: "Deskripsi gambar untuk accessibility",
    },

    className: {
      control: "text",
      description: "Class tambahan untuk mengatur ukuran dan tampilan gambar",
    },
  },

  args: {
    src: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
    alt: "Contoh gambar artikel",
    className: "h-40 w-72 rounded-lg",
  },
} satisfies Meta<typeof Image>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Square: Story = {
  args: {
    className: "h-40 w-40 rounded-lg",
  },
};

export const Rounded: Story = {
  args: {
    className: "h-40 w-72 rounded-2xl",
  },
};

export const FullWidth: Story = {
  args: {
    className: "h-48 w-full max-w-lg rounded-lg",
  },
};