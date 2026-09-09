import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DocSectionBlock } from "./doc-section-block";

const meta: Meta<typeof DocSectionBlock> = {
  title: "📦componen/molecule/doc-section-block",
  component: DocSectionBlock,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: "1. Definisi",
    children:
      "Pengguna terdiri dari Reader (membaca, menyukai, mengomentari, menandai artikel) dan Author (menulis dan mempublikasikan artikel).",
  },
};
