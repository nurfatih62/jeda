import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatCard } from "./stat-card";

const meta: Meta<typeof StatCard> = {
  title: "📦componen/molecule/stat-card",
  component: StatCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AuthorPositive: Story = {
  args: { variant: "author", label: "Total views", value: "8.4K", change: "12%", isPositive: true },
};

export const AuthorNegative: Story = {
  args: { variant: "author", label: "Total komentar", value: "156", change: "3%", isPositive: false },
};

export const AuthorSubtitle: Story = {
  args: { variant: "author", label: "Total publikasi artikel", value: "2", subtitle: "1 draft aktif" },
};

export const Admin: Story = {
  args: { variant: "admin", label: "Total Pengguna", value: "1.201" },
};
