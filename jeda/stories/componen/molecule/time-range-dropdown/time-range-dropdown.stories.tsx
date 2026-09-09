import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TimeRangeDropdown } from "./time-range-dropdown";

const meta: Meta<typeof TimeRangeDropdown> = {
  title: "📦componen/molecule/time-range-dropdown",
  component: TimeRangeDropdown,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { value: "7 hari terakhir" },
};
