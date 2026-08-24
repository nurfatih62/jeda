import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography } from "./typography";

const meta = {
  title: "Components/Atom/Typography",
  component: Typography,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    variant: {
      control: "select",
      options: [
        "heading1",
        "heading2",
        "body",
        "bodySmall",
        "caption",
        "button",
        "badge",
      ],
      description: "Gaya typography",
    },

    children: {
      control: "text",
      description: "Teks yang ditampilkan",
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

/* =========================
   CUSTOM
========================= */

export const Custom: Story = {
  args: {
    variant: "heading1",
    children: "Ambil JEDA dan mulai membaca",
  },
};

/* =========================
   ALL TYPOGRAPHY
========================= */

export const AllTypography: Story = {
  args: {
    variant: "body",
    children: "",
  },

  render: () => (
    <div className="flex w-150 flex-col gap-8">

      {/* HEADING 1 */}
      <div className="flex flex-col gap-2">
        <p className="text-[16px] font-semibold">
          HEADING 1
        </p>

        <Typography variant="heading1">
          Ambil JEDA dan mulai membaca
        </Typography>
      </div>

      {/* HEADING 2 */}
      <div className="flex flex-col gap-2">
        <p className="text-[16px] font-semibold">
          HEADING 2
        </p>

        <Typography variant="heading2">
          Lorem ipsum dolor sit amet
        </Typography>
      </div>

      {/* BODY REGULAR */}
      <div className="flex flex-col gap-2">
        <p className="text-[16px] font-semibold">
          BODY REGULAR
        </p>

        <Typography variant="body">
          Ayo bergabung untuk mendapatkan pengalaman membaca
          yang lebih nyaman bersama JEDA.
        </Typography>
      </div>

      {/* BODY SMALL */}
      <div className="flex flex-col gap-2">
        <p className="text-[16px] font-semibold">
          BODY SMALL
        </p>

        <Typography variant="bodySmall">
          Ringkasan isi artikel yang ditampilkan di dalam kartu
          konten JEDA.
        </Typography>
      </div>

      {/* CAPTION / LABEL */}
      <div className="flex flex-col gap-2">
        <p className="text-[16px] font-semibold">
          CAPTION / LABEL
        </p>

        <Typography variant="caption">
          Asya mc · 15 Agustus 2026
        </Typography>
      </div>

      {/* BUTTON TEXT */}
      <div className="flex flex-col gap-2">
        <p className="text-[16px] font-semibold">
          BUTTON TEXT
        </p>

        <Typography variant="button">
          Jelajahi dulu
        </Typography>
      </div>

      {/* BADGE / TAG TEXT */}
      <div className="flex flex-col gap-2">
        <p className="text-[16px] font-semibold">
          BADGE / TAG TEXT
        </p>

        <Typography variant="badge">
          Paling banyak dibaca
        </Typography>
      </div>

    </div>
  ),
};