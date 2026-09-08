import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckOption } from "./check-option";

const meta: Meta<typeof CheckOption> = {
  title: "📦componen/atom/check-option",
  component: CheckOption,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "Teks label opsi",
    },
    checked: {
      control: { type: "boolean" },
      description: "Status centang pada komponen",
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm"],
      description: "Varian ukuran komponen",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story Mode Default (Ukuran Normal)
export const Default: Story = {
  args: {
    label: "Spam atau iklan",
    checked: false,
    size: "default",
  },
};

// Story Mode Default Tercentang
export const Checked: Story = {
  args: {
    label: "Spam atau iklan",
    checked: true,
    size: "default",
  },
};

// Story Mode Kecil (Variant 6)
export const Small: Story = {
  args: {
    label: "Spam atau iklan",
    checked: false,
    size: "sm",
  },
};

// Story Mode Kecil Tercentang
export const SmallChecked: Story = {
  args: {
    label: "Spam atau iklan",
    checked: true,
    size: "sm",
  },
};