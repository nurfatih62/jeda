import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationSection, NotificationItem } from "./notification-section";

const meta: Meta<typeof NotificationSection> = {
  title: "📦componen/organism/notification-section",
  component: NotificationSection,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onMarkAllAsRead: { action: "marked all as read" },
    onItemClick: { action: "notification item clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationSection>;

// Variant 1: Default
export const Default: Story = {};

// Variant 2: Semua Sudah Dibaca (Tidak ada yang unread)
const allReadNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "like",
    message: 'Sinta W. menyukai komentarmu di "Kenapa Kita Suka Cerita Sedih"',
    timestamp: "2 jam lalu",
    timeGroup: "Hari ini",
    isUnread: false,
  },
  {
    id: "2",
    type: "follow",
    message: "Andi S. mulai mengikuti tulisanmu",
    timestamp: "1 hari lalu",
    timeGroup: "Kemarin",
    isUnread: false,
  },
];

export const AllRead: Story = {
  args: {
    notifications: allReadNotifications,
  },
};

// Variant 3: Tidak Ada Notifikasi Sama Sekali (Empty State)
export const Empty: Story = {
  args: {
    notifications: [],
  },
};