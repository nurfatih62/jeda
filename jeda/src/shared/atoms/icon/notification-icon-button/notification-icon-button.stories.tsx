import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationIconButton } from "./notification-icon-button";

const meta: Meta<typeof NotificationIconButton> = {
  title: "📦componen/atom/icon/notification-icon-button",
  component: NotificationIconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    count: {
      control: { type: "number" },
      description: "Jumlah notifikasi pada badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story saat ada notifikasi (ditampilkan angka 1)
export const WithNotification: Story = {
  args: {
    count: 1,
  },
};

// Story saat tidak ada notifikasi (badge otomatis tersembunyi)
export const WithoutNotification: Story = {
  args: {
    count: undefined,
  },
};