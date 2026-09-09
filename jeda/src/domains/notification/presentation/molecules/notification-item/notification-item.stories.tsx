import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationItem } from "./notification-item";

const meta: Meta<typeof NotificationItem> = {
  title: "📦componen/molecule/notification-item",
  component: NotificationItem,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UnreadLike: Story = {
  args: {
    item: {
      id: "1",
      type: "like",
      message: 'Sinta W. menyukai komentarmu di "Kenapa Kita Suka Cerita Sedih"',
      timestamp: "2 jam lalu",
      isUnread: true,
    },
  },
};

export const ReadFollow: Story = {
  args: {
    item: {
      id: "2",
      type: "follow",
      message: "Andi S. mulai mengikuti tulisanmu",
      timestamp: "1 hari lalu",
      isUnread: false,
    },
  },
};
