import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RadioOption } from "./radio-option";

const meta: Meta<typeof RadioOption> = {
  title: "📦componen/atom/radio-option",
  component: RadioOption,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    selected: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = {
  args: { label: "Spam atau iklan", selected: false },
};

export const Selected: Story = {
  args: { label: "Spam atau iklan", selected: true },
};
