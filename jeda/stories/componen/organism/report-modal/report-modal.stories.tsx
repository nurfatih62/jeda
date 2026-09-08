import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReportModal } from "./report-modal";

const meta: Meta<typeof ReportModal> = {
  title: "📦componen/organism/report-modal",
  component: ReportModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    onClose: { action: "modal closed" },
    onSubmitReport: { action: "report submitted" },
  },
};

export default meta;
type Story = StoryObj<typeof ReportModal>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
};