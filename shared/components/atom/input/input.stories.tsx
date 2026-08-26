import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Input } from "./input";

const meta = {
  title: "Components/Atom/Input",
  component: Input,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    label: {
      control: "text",
      description: "Label input",
    },

    placeholder: {
      control: "text",
      description: "Teks yang ditampilkan sebelum input diisi",
    },

    type: {
      control: "select",
      options: ["text", "search", "email", "password"],
      description: "Jenis input",
    },

    disabled: {
      control: "boolean",
      description: "Menonaktifkan input",
    },

    error: {
      control: "boolean",
      description: "Menampilkan state error",
    },

    errorMessage: {
      control: "text",
      description: "Pesan error",
    },

    value: {
      control: "text",
      description: "Nilai input",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/* =========================
   CUSTOM
========================= */

export const Custom: Story = {
  args: {
    label: "Pencarian",
    type: "text",
    placeholder: "Cari artikel...",
    disabled: false,
    error: false,
    errorMessage: "",
    value: "",
  },
};

/* =========================
   ALL INPUT
========================= */

export const AllInput: Story = {
  render: () => (
    <div className="flex w-100 flex-col gap-8">

      {/* DEFAULT */}
      <div className="flex flex-col gap-3">
        <p className="text-[16px] font-semibold">
          DEFAULT
        </p>

        <Input placeholder="Cari artikel..." />
      </div>

      {/* HOVER */}
      <div className="flex flex-col gap-3">
        <p className="text-[16px] font-semibold">
          HOVER
        </p>

        <Input
          placeholder="Cari artikel..."
          className="border-(--primary-hover)"
        />
      </div>

      {/* FOCUS */}
      <div className="flex flex-col gap-3">
        <p className="text-[16px] font-semibold">
          FOCUS
        </p>

        <Input
          label="Pencarian"
          placeholder="Cari artikel..."
          autoFocus
        />
      </div>

      {/* FILLED */}
      <div className="flex flex-col gap-3">
        <p className="text-[16px] font-semibold">
          FILLED
        </p>

        <Input
          label="Judul artikel"
          value="Artikel JEDA"
          readOnly
        />
      </div>

      {/* DISABLED */}
      <div className="flex flex-col gap-3">
        <p className="text-[16px] font-semibold">
          DISABLED
        </p>

        <Input
          label="Pencarian"
          placeholder="Input tidak tersedia"
          disabled
        />
      </div>

      {/* ERROR */}
      <div className="flex flex-col gap-3">
        <p className="text-[16px] font-semibold">
          ERROR
        </p>

        <Input
          label="Email"
          placeholder="Masukkan email..."
          error
          errorMessage="Email tidak valid"
        />
      </div>

    </div>
  ),
};