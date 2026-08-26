import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs } from "./tabs";

const meta = {
  title: "Components/Organism/Tabs",
  component: Tabs,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    items: {
      control: "object",
      description: "Daftar tab yang ditampilkan",
    },

    activeTab: {
      control: "text",
      description: "ID tab yang sedang aktif",
    },

    defaultTab: {
      control: "text",
      description: "Tab aktif secara default",
    },

    onChange: {
      action: "tab changed",
      description: "Dipanggil ketika tab berubah",
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const tabs = [
  {
    id: "populer",
    label: "Populer",
  },
  {
    id: "terbaru",
    label: "Terbaru",
  },
];

export const Default: Story = {
  args: {
    items: tabs,
    defaultTab: "populer",
  },
};

export const Terbaru: Story = {
  args: {
    items: tabs,
    defaultTab: "terbaru",
  },
};

export const Custom: Story = {
  args: {
    items: [
      {
        id: "populer",
        label: "Populer",
      },
      {
        id: "terbaru",
        label: "Terbaru",
      },
      {
        id: "rekomendasi",
        label: "Rekomendasi",
      },
    ],
    defaultTab: "populer",
  },
};