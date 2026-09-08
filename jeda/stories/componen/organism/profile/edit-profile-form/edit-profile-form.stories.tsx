import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditProfileForm } from "./edit-profile-form";

const meta: Meta<typeof EditProfileForm> = {
  title: "📦componen/organism/profile/edit-profile-form",
  component: EditProfileForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof EditProfileForm>;

export const Default: Story = {
  args: {
    initialUsername: "Jonuar Derma",
    initialDescription: "Chef aktif membagikan pengalaman kerja dan makanan",
    onSubmit: (data: { username: string; description: string; avatarFile?: File }) => {
      console.log("Form Disubmit:", data);
      alert(`Profil berhasil disimpan!\nUsername: ${data.username}\nDeskripsi: ${data.description}`);
    },
  },
};