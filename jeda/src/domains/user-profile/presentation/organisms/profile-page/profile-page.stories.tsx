import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfilePage } from "./profile-page";

const meta: Meta<typeof ProfilePage> = {
  title: "📦componen/organism/profile/profile-page",
  component: ProfilePage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ProfilePage>;

// Varian 1: Guest (Belum Login)
export const Guest: Story = {
  args: {
    variant: "guest",
    onSecondaryClick: () => alert("Tombol Daftar diklik!"),
    onPrimaryClick: () => alert("Tombol Masuk diklik!"),
  },
};

// Varian 2: User (Sudah login biasa, ada tombol "Gabung sebagai author")
export const LoggedInUser: Story = {
  args: {
    variant: "user",
    initialUsername: "Jonuar Derma",
    initialDescription: "Chef aktif membagikan pengalaman kerja dan makanan",
    onJoinAuthor: () => alert("Tombol 'Gabung sebagai author' diklik!"),
    onEditProfileSubmit: (data) => console.log("Edit Profile Data:", data),
    onChangePasswordSubmit: (data) => console.log("Change Password Data:", data),
  },
};

// Varian 3: Author (Sudah login sebagai author, tanpa tombol gabung di atas)
export const LoggedInAuthor: Story = {
  args: {
    variant: "author",
    initialUsername: "Chef Jonuar",
    initialDescription: "Verified Chef & Content Author",
    onEditProfileSubmit: (data) => console.log("Edit Profile Data (Author):", data),
    onChangePasswordSubmit: (data) => console.log("Change Password Data (Author):", data),
  },
};