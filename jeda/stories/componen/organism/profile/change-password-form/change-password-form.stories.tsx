import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ChangePasswordForm } from "./change-password-form";

const meta: Meta<typeof ChangePasswordForm> = {
  title: "📦componen/organism/profile/change-password-form",
  component: ChangePasswordForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ChangePasswordForm>;

export const Default: Story = {
  args: {
    onForgotPassword: () => {
      alert("Navigasi ke halaman pemulihan / lupa password diklik!");
    },
    onSubmit: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
      console.log("Data Ubah Password:", data);
      alert(`Password berhasil diperbarui!\nPassword Lama: ${data.currentPassword}\nPassword Baru: ${data.newPassword}`);
    },
  },
};