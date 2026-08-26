import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Hero } from "./hero";

const meta = {
  title: "Components/Organism/Hero",
  component: Hero,

  tags: ["autodocs"],

  parameters: {
    layout: "fullscreen",
  },

  argTypes: {
    title: {
      control: "text",
      description: "Judul hero",
    },

    description: {
      control: "text",
      description: "Deskripsi hero",
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Custom: Story = {
  args: {
    title: "Ambil JEDA dan mulai membaca",
    description:
      "Ayo bergabung untuk mendapatkan pengalaman lebih lengkap dengan JEDA dan mulai bacaanmu",
  },
};
