import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ConfirmationModal } from "./confirmation-modal";

const meta: Meta<typeof ConfirmationModal> = {
  title: "📦componen/molecule/confirmation-modal",
  component: ConfirmationModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ConfirmationModal>;

// Varian 1: Modal Ubah Profil
export const UbahProfil: Story = {
  args: {
    variant: "profile",
    isOpen: true,
    onClose: () => alert("Tombol batal / kembali diklik"),
    onConfirm: () => alert("Perubahan profil disimpan!"),
  },
};

// Varian 2: Modal Ubah Password
export const UbahPassword: Story = {
  args: {
    variant: "password",
    isOpen: true,
    onClose: () => alert("Tombol batal / kembali diklik"),
    onConfirm: () => alert("Password berhasil diubah!"),
  },
};

// Varian 3: Kustom Teks Bebas
export const CustomModal: Story = {
  args: {
    variant: "custom",
    isOpen: true,
    title: "Yakin ingin menghapus akun?",
    description: "Semua data Anda akan hilang secara permanen dan tidak dapat dipulihkan.",
    cancelText: "Tidak",
    confirmText: "Ya, hapus",
    onClose: () => alert("Aksi dibatalkan"),
    onConfirm: () => alert("Akun dihapus"),
  },
};