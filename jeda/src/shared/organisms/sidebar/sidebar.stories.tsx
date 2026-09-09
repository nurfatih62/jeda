import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sidebar } from "./sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "📦componen/organism/guest/sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    role: {
      control: "select",
      options: ["reader", "author", "admin"],
      description: "Peran pengguna yang menentukan opsi menu navigasi",
    },
    collapsed: {
      control: "boolean",
      description: "Status tampilan sidebar (ciut/kecil atau melebar)",
    },
    activeVariant: {
      control: "select",
      options: [
        "home",
        "explore",
        "library",
        "profile",
        "dashboard",
        "report",
        "users",
        "tags",
      ],
      description: "Varian menu yang sedang aktif",
    },
    onSelect: { action: "menu selected" },
    onToggleCollapse: { action: "collapse toggled" },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

/* ==================== ADMIN STORIES ==================== */

export const AdminCollapsed: Story = {
  args: {
    role: "admin",
    collapsed: true,
    activeVariant: "dashboard",
  },
};

export const AdminExpanded: Story = {
  args: {
    role: "admin",
    collapsed: false,
    activeVariant: "dashboard",
  },
};

export const AdminReportActive: Story = {
  args: {
    role: "admin",
    collapsed: true,
    activeVariant: "report",
  },
};

/* ==================== AUTHOR STORIES ==================== */

export const AuthorCollapsed: Story = {
  args: {
    role: "author",
    collapsed: true,
    activeVariant: "home",
  },
};

export const AuthorExpanded: Story = {
  args: {
    role: "author",
    collapsed: false,
    activeVariant: "home",
  },
};

/* ==================== READER STORIES ==================== */

export const ReaderCollapsed: Story = {
  args: {
    role: "reader",
    collapsed: true,
    activeVariant: "home",
  },
};

export const ReaderExpanded: Story = {
  args: {
    role: "reader",
    collapsed: false,
    activeVariant: "home",
  },
};