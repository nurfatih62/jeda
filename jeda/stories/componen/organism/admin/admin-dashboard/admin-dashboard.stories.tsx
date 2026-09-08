import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AdminDashboard } from "./admin-dashboard";

const meta: Meta<typeof AdminDashboard> = {
  title: "📦componen/organism/admin/admin-dashboard",
  component: AdminDashboard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onViewAllClick: { action: "view all clicked" },
    onTimeRangeChange: { action: "time range changed" },
  },
};

export default meta;
type Story = StoryObj<typeof AdminDashboard>;

export const Default: Story = {
  args: {
    title: "Dashboard Admin",
  },
};