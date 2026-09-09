import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PasswordStrengthBar } from "./password-strength-bar";

const meta: Meta<typeof PasswordStrengthBar> = {
  title: "📦componen/atom/password-strength-bar",
  component: PasswordStrengthBar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: { score: 0, text: "Kekuatan password", color: "#CCCCCC" },
};

export const Weak: Story = {
  args: { score: 1, text: "Password lemah", color: "#F08181" },
};

export const Strong: Story = {
  args: { score: 4, text: "Password kuat", color: "#1B4E46" },
};
