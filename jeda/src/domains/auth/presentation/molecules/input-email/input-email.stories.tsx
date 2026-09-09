import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputEmail } from "./input-email";

const meta: Meta<typeof InputEmail> = {
  title: "📦componen/molecule/input-email",
  component: InputEmail,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "error", "success"],
      description: "Pilih 3 varian status input email",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story Interaktif: Anda bisa mengubah-ubah varian ("default", "error", "success") langsung dari panel Controls di Storybook
export const Interactive: Story = {
  args: {
    label: "Email",
    placeholder: "nama@gmail.com",
    variant: "default",
    defaultValue: "",
  },
};