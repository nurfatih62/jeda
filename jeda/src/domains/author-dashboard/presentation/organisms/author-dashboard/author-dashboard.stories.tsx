import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthorDashboard } from "./author-dashboard";

const meta: Meta<typeof AuthorDashboard> = {
  title: "📦componen/organism/AuthorDashboard",
  component: AuthorDashboard,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onEditArticle: { action: "onEditArticle clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof AuthorDashboard>;

export const Default: Story = {};

export const CustomData: Story = {
  args: {
    stats: [
      {
        label: "Total views",
        value: "15.2K",
        change: "24%",
        isPositive: true,
      },
      {
        label: "Total likes",
        value: "3.4K",
        change: "15%",
        isPositive: true,
      },
      {
        label: "Total komentar",
        value: "420",
        change: "2%",
        isPositive: false,
      },
      {
        label: "Total publikasi artikel",
        value: "8",
        subtitle: "2 draft aktif",
      },
    ],
    articles: [
      {
        id: "1",
        title: "Panduan Lengkap Next.js 14 App Router",
        status: "Publikasi",
        views: "5.1K",
        likes: "820",
        comments: "102",
      },
      {
        id: "2",
        title: "Eksplorasi Warna Tailwind CSS",
        status: "Publikasi",
        views: "3.2K",
        likes: "410",
        comments: "55",
      },
      {
        id: "3",
        title: "Masa Depan AI dalam Pengembangan Web",
        status: "Draft",
        views: "-",
        likes: "-",
        comments: "-",
      },
    ],
  },
};