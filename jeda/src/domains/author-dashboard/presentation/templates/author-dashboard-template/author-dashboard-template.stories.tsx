import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthorDashboardTemplate } from "./author-dashboard-template";

const meta: Meta<typeof AuthorDashboardTemplate> = {
  title: "📦componen/template/author-dashboard-template",
  component: AuthorDashboardTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    authorDashboardProps: {
      control: "object",
      description: "Props untuk dashboard (stats, articles, onEditArticle)",
    },
    mainLayoutProps: {
      control: "object",
      description: "Props layout (sidebarProps, headerProps)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AuthorDashboardTemplate>;

// 1. Default — statistik + daftar artikel bawaan
export const Default: Story = {
  args: {},
};

// 2. Kosong — belum ada artikel sama sekali
export const Empty: Story = {
  args: {
    authorDashboardProps: {
      stats: [
        { label: "Total views", value: "0" },
        { label: "Total likes", value: "0" },
        { label: "Total komentar", value: "0" },
        { label: "Total publikasi artikel", value: "0", subtitle: "0 draft aktif" },
      ],
      articles: [],
    },
  },
};

// 3. Hanya draft — author baru yang belum publikasi
export const DraftOnly: Story = {
  args: {
    authorDashboardProps: {
      articles: [
        {
          id: "1",
          title: "Catatan dari Kota Tanpa Nama",
          status: "Draft",
          views: "-",
          likes: "-",
          comments: "-",
        },
      ],
    },
  },
};
