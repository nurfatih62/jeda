import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ManajemenPengguna } from "./manajemen-pengguna";

const meta: Meta<typeof ManajemenPengguna> = {
  title: "📦componen/organism/admin/manajemen-pengguna",
  component: ManajemenPengguna,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    onSuspend: { action: "suspend clicked" },
    onActivate: { action: "activate clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof ManajemenPengguna>;

export const Default: Story = {
  args: {
    title: "Manajemen pengguna",
    users: [
      {
        id: "1",
        nama: "Sinta W.",
        email: "sinta.w@email.com",
        peran: "Reader",
        bergabung: "12 Jan 2026",
        status: "Aktif",
      },
      {
        id: "2",
        nama: "Asya mc",
        email: "asya.mc@email.com",
        peran: "Author",
        bergabung: "12 Jan 2026",
        status: "Aktif",
      },
      {
        id: "3",
        nama: "Budi R.",
        email: "budi.r@email.com",
        peran: "Reader",
        bergabung: "12 Jan 2026",
        status: "Disuspend",
      },
    ],
  },
};