import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Typography } from "./typography";

const meta: Meta<typeof Typography> = {
  title: "📦componen/atom/typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["title", "subtitle"],
    },
    authStatus: {
      control: { type: "select" },
      options: ["guest", "logged-in", "author"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Varian Title - Tamu (Belum Login)
export const TitleGuest: Story = {
  args: {
    variant: "title",
    authStatus: "guest",
  },
};

// 2. Varian Title - Author (Penulis)
export const TitleAuthor: Story = {
  args: {
    variant: "title",
    authStatus: "author",
  },
};

// 3. Varian Subtitle - Tamu (Belum Login)
export const SubtitleGuest: Story = {
  args: {
    variant: "subtitle",
    authStatus: "guest",
  },
};

// 4. Varian Subtitle - Sudah Login (Reader)
export const SubtitleLoggedIn: Story = {
  args: {
    variant: "subtitle",
    authStatus: "logged-in",
  },
};

// 5. Varian Subtitle - Author (Penulis)
export const SubtitleAuthor: Story = {
  args: {
    variant: "subtitle",
    authStatus: "author",
  },
};