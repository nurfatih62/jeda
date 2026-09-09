import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileTemplate } from "./profile-template";

const meta: Meta<typeof ProfileTemplate> = {
  title: "📦componen/template/profile-template",
  component: ProfileTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["guest", "reader", "author"],
      description: "Varian status autentikasi pengguna",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileTemplate>;

// 1. Mode Guest (Belum Login)
export const GuestMode: Story = {
  args: {
    variant: "guest",
    profilePageProps: {
      title: "Profil",
      bannerTitle: "Bergabung untuk mendapat pengalaman lebih",
      bannerDescription:
        "Ayo bergabung untuk dapat membuat profil menyesuaikan dengan dirimu, dilihat oleh orang lain dan pengalaman lainnya",
      secondaryButtonText: "Daftar",
      primaryButtonText: "Masuk",
      onSecondaryClick: () => alert("Navigasi ke Daftar"),
      onPrimaryClick: () => alert("Navigasi ke Masuk"),
    },
  },
};

// 2. Mode Reader / User biasa (Sudah Login)
export const ReaderMode: Story = {
  args: {
    variant: "reader",
    profilePageProps: {
      title: "Profil",
      initialUsername: "Budi Santoso",
      initialDescription: "Penggemar teknologi dan pembaca setia artikel edukasi.",
      initialAvatar: "https://i.pravatar.cc/150?img=12",
      joinAuthorButtonText: "Gabung sebagai author",
      onJoinAuthor: () => alert("Proses pendaftaran Author dimulai!"),
      onEditProfileSubmit: (data) => console.log("Edit Profil:", data),
      onChangePasswordSubmit: (data) => console.log("Ubah Password:", data),
      onForgotPassword: () => alert("Lupa password diklik"),
    },
  },
};

// 3. Mode Author (Sudah Login & Menjadi Author)
export const AuthorMode: Story = {
  args: {
    variant: "author",
    profilePageProps: {
      title: "Profil",
      initialUsername: "Siti Rahma",
      initialDescription: "Penulis artikel teknologi & pengembang perangkat lunak.",
      initialAvatar: "https://i.pravatar.cc/150?img=47",
      onEditProfileSubmit: (data) => console.log("Edit Profil:", data),
      onChangePasswordSubmit: (data) => console.log("Ubah Password:", data),
      onForgotPassword: () => alert("Lupa password diklik"),
    },
  },
};