import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Check, PenLine } from "lucide-react";
import { BenefitListItem } from "./benefit-list-item";

const meta: Meta<typeof BenefitListItem> = {
  title: "📦componen/molecule/benefit-list-item",
  component: BenefitListItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AlignStart: Story = {
  args: {
    align: "start",
    icon: <Check size={20} />,
    text: "Membaca, menyukai, komentar, dan bookmark tetap jalan seperti biasa",
  },
};

export const AlignCenter: Story = {
  args: {
    align: "center",
    icon: <PenLine size={22} />,
    text: "Tulis artikel dengan editor kaya fitur",
  },
};
