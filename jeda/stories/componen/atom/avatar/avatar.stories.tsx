import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "📦componen/atom/avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "lg"],
      description: "Ukuran avatar (sm: 40px, lg: 124px)",
    },
    initials: {
      control: "text",
      description: "Teks inisial (misal: JD)",
    },
    src: {
      control: "text",
      description: "URL gambar avatar",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallInitial: Story = {
  args: {
    size: "sm",
    initials: "JD",
  },
};

export const SmallImage: Story = {
  args: {
    size: "sm",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
};

export const ProfileInitial: Story = {
  args: {
    size: "lg",
    initials: "JD",
  },
};

export const ProfileImage: Story = {
  args: {
    size: "lg",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  },
};