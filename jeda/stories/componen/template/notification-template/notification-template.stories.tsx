import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationTemplate } from "./notification-template";

const meta: Meta<typeof NotificationTemplate> = {
  title: "📦componen/template/notification-template",
  component: NotificationTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["guest", "reader", "author"],
      description: "Varian status autentikasi pengguna",
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotificationTemplate>;

// 1. Mode Guest (Belum Login)
export const GuestMode: Story = {
  args: {
    variant: "guest",
  },
};

// 2. Mode Reader (Sudah Login)
export const ReaderMode: Story = {
  args: {
    variant: "reader",
  },
};

// 3. Mode Author (Sudah Login sebagai Author)
export const AuthorMode: Story = {
  args: {
    variant: "author",
  },
};
