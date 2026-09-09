import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatusBadge } from "./status-badge";

const meta: Meta<typeof StatusBadge> = {
  title: "📦componen/atom/status-badge",
  component: StatusBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: { type: "select" },
      options: [
        "teal-solid",
        "muted",
        "amber",
        "teal-soft",
        "neutral",
        "red-soft",
        "blue-soft",
        "gray-soft",
      ],
    },
    label: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Publikasi: Story = { args: { label: "Publikasi", tone: "teal-solid" } };
export const Draft: Story = { args: { label: "Draft", tone: "muted" } };
export const Pending: Story = { args: { label: "Pending", tone: "amber" } };
export const Ditindak: Story = { args: { label: "Ditindak", tone: "teal-soft" } };
export const Ditolak: Story = { args: { label: "Ditolak", tone: "neutral" } };
export const Aktif: Story = { args: { label: "Aktif", tone: "teal-soft" } };
export const Disuspend: Story = { args: { label: "Disuspend", tone: "red-soft" } };
export const Author: Story = { args: { label: "Author", tone: "blue-soft" } };
export const Reader: Story = { args: { label: "Reader", tone: "gray-soft" } };
export const GayaAdmin: Story = {
  args: {
    label: "Publikasi",
    tone: "amber",
    className: "font-['Poppins'] text-[14px] leading-[26px] rounded-[16px]",
  },
};
