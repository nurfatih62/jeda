import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HeaderGuest } from "./header-guest";

const meta: Meta<typeof HeaderGuest> = {
  title: "📦componen/organism/guest/header-guest",
  component: HeaderGuest,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["guest", "reader", "author", "admin"],
      description: "Varian peran header",
    },
    onLoginClick: { action: "login clicked" },
    onSearchChange: { action: "search changed" },
    onNotificationClick: { action: "notification clicked" },
    onAuthorWriteClick: { action: "author write clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof HeaderGuest>;

// 1. Mode Guest (Belum Login — dengan tombol Masuk)
export const Guest: Story = {
  args: {
    variant: "guest",
  },
};

// 2. Mode Reader (Sudah Login)
export const Reader: Story = {
  args: {
    variant: "reader",
    notificationCount: 3,
  },
};

// 3. Mode Author (Sudah Login sebagai Author — dengan tombol tulis)
export const Author: Story = {
  args: {
    variant: "author",
    notificationCount: 1,
  },
};

// 4. Mode Admin (Tanpa input pencarian & notifikasi, hanya Logo dan Profil Avatar)
export const Admin: Story = {
  args: {
    variant: "admin",
  },
};