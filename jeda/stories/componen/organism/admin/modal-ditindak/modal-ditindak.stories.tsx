import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ModalDitindak } from "./modal-ditindak";

const meta: Meta<typeof ModalDitindak> = {
  title: "📦componen/organism/admin/modal-ditindak",
  component: ModalDitindak,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "modal closed" },
    onDeleteContent: { action: "delete content clicked" },
    onWarnUser: { action: "warn user clicked" },
    onRejectReport: { action: "reject report clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ModalDitindak>;

export const Default: Story = {
  args: {
    isOpen: true,
    contentType: "Artikel",
    contentTitle: "Kenapa Kita Suka Cerita Sedih",
    contentMeta: "Artikel oleh Asya mc, dipublikasikan 3 hari lalu. Views: 2.4K.",
    reportReason: "Informasi salah/hoaks",
  },
};