import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./logo";

const meta = {
  title: "Components/Atom/Logo",
  component: Logo,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    text: {
      control: "text",
      description: "Teks yang ditampilkan pada logo",
    },

    className: {
      control: "text",
      description: "Class tambahan untuk mengatur tampilan logo",
    },
  },

  args: {
    text: "JEDA",
  },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomText: Story = {
  args: {
    text: "JEDA BLOG",
  },
};

export const Large: Story = {
  args: {
    text: "JEDA",
    className: "text-4xl",
  },
};