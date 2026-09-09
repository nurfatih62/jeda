import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { InputPassword } from "./input-password";

const meta: Meta<typeof InputPassword> = {
  title: "📦componen/molecule/input-password",
  component: InputPassword,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["password", "confirm", "current"],
      description: "Pilihan varian input password",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// State Kosong / Varian Password Baru (Default)
export const Default: Story = {
  args: {
    variant: "password",
    label: "Password Baru",
    placeholder: "Minimal 8 karakter",
    defaultValue: "",
  },
};

// Varian Password Saat Ini (Current) dengan link lupa password
export const CurrentPassword: Story = {
  args: {
    variant: "current",
    label: "Password saat ini",
    placeholder: "Masukkan password saat ini",
    defaultValue: "",
    forgotPasswordText: "Lupa password lama?",
  },
};

// Varian Kurang dari 8 Karakter (#F08181)
export const MinLengthError: Story = {
  args: {
    variant: "password",
    label: "Password Baru",
    defaultValue: "abc",
  },
};

// Varian Password Lemah (Skor 1)
export const Weak: Story = {
  args: {
    variant: "password",
    label: "Password Baru",
    defaultValue: "password",
  },
};

// Varian Password Cukup Kuat (Skor 2)
export const Fair: Story = {
  args: {
    variant: "password",
    label: "Password Baru",
    defaultValue: "password123",
  },
};

// Varian Password Baik (Skor 3)
export const Good: Story = {
  args: {
    variant: "password",
    label: "Password Baru",
    defaultValue: "Password123!",
  },
};

// Varian Password Kuat (Skor 4)
export const Strong: Story = {
  args: {
    variant: "password",
    label: "Password Baru",
    defaultValue: "Secr3tP@ssw0rd!",
  },
};

// Varian Konfirmasi Password Baru
export const ConfirmPassword: Story = {
  args: {
    variant: "confirm",
    label: "Konfirmasi Password Baru",
    placeholder: "Ulangi password baru",
    defaultValue: "",
  },
};