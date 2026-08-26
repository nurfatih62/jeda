import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Header } from "./header";

const meta = {
  title: "Components/Organism/Header",
  component: Header,

  tags: ["autodocs"],

  parameters: {
    layout: "fullscreen",
  },

  argTypes: {
    logo: {
      control: "text",
      description: "Logo website",
    },

    onMenuClick: {
      action: "menu clicked",
      description: "Aksi ketika menu diklik",
    },

    onLoginClick: {
      action: "login clicked",
      description: "Aksi ketika tombol masuk diklik",
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLogo: Story = {
  args: {
    logo: "JEDA",
  },
};
