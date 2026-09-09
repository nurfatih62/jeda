import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatusSegmentedControl } from "./status-segmented-control";

const meta: Meta<typeof StatusSegmentedControl> = {
  title: "📦componen/molecule/status-segmented-control",
  component: StatusSegmentedControl,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = { args: { value: true } };
export const Inactive: Story = { args: { value: false } };
