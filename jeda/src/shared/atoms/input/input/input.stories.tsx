import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "📦componen/atom/input/input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    error: {
      control: "boolean",
      description: "Status error pada input",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/** Tampilan default Input dengan label dan helper text */
export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Jonuar Derma",
    helperText: "3-20 karakter. Gunakan huruf, angka, atau underscore",
  },
};

/** Tampilan Input ketika terjadi kesalahan (Error State) */
export const WithError: Story = {
  args: {
    label: "Username",
    defaultValue: "Jonuar!",
    error: true,
    errorMessage: "Format username tidak valid",
  },
};