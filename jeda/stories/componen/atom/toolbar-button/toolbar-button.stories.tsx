import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Bold, Italic } from "lucide-react";
import { ToolbarButton } from "./toolbar-button";

const meta: Meta<typeof ToolbarButton> = {
  title: "📦componen/atom/toolbar-button",
  component: ToolbarButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BoldButton: Story = {
  args: { title: "Cetak Tebal", children: <Bold className="w-5 h-5" /> },
};

export const ItalicButton: Story = {
  args: { title: "Cetak Miring", children: <Italic className="w-5 h-5" /> },
};
