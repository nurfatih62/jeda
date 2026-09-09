import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RichTextToolbar } from "./rich-text-toolbar";

const meta: Meta<typeof RichTextToolbar> = {
  title: "📦componen/molecule/rich-text-toolbar",
  component: RichTextToolbar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onFormat: (prefix, suffix) => alert(`Format: ${prefix}${suffix ?? ""}`),
  },
};
