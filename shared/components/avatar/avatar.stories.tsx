import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { User } from "lucide-react";

import { Avatar } from "./avatar";

const fallbacks = {
  Initial: "AM",
  Icon: <User size={20} strokeWidth={2} />,
};

const meta = {
  title: "Components/Atom/Avatar",
  component: Avatar,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    src: {
      control: "text",
      description: "URL gambar avatar",
    },

    alt: {
      control: "text",
      description: "Deskripsi gambar",
    },

    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Ukuran avatar",
    },

    fallback: {
      control: "select",
      options: Object.keys(fallbacks),
      mapping: fallbacks,
      description: "Tampilan ketika gambar tidak tersedia",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

/* =========================
   CUSTOM
========================= */

export const Custom: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=12",
    alt: "Avatar user",
    size: "md",
    fallback: fallbacks.Initial,
  },
};

/* =========================
   ALL AVATAR
========================= */

export const AllAvatar: Story = {
  render: () => (
    <div className="flex flex-col gap-8">

      {/* DEFAULT */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">
          DEFAULT
        </h3>

        <div className="flex items-center gap-4">
          <Avatar
            src="https://i.pravatar.cc/150?img=12"
            alt="Avatar user"
            size="md"
            fallback="U"
          />
        </div>
      </div>

      {/* SIZE */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">
          SIZE
        </h3>

        <div className="flex items-center gap-4">
          <Avatar
            src="https://i.pravatar.cc/150?img=12"
            alt="Avatar user"
            size="sm"
            fallback="U"
          />

          <Avatar
            src="https://i.pravatar.cc/150?img=12"
            alt="Avatar user"
            size="md"
            fallback="U"
          />

          <Avatar
            src="https://i.pravatar.cc/150?img=12"
            alt="Avatar user"
            size="lg"
            fallback="U"
          />
        </div>
      </div>

      {/* WITH INITIAL */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">
          WITH INITIAL
        </h3>

        <div className="flex items-center gap-4">
          <Avatar
            size="md"
            fallback={fallbacks.Initial}
          />
        </div>
      </div>

      {/* WITH ICON */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">
          WITH ICON
        </h3>

        <div className="flex items-center gap-4">
          <Avatar
            size="md"
            fallback={fallbacks.Icon}
          />
        </div>
      </div>

      {/* NO IMAGE */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">
          NO IMAGE
        </h3>

        <div className="flex items-center gap-4">
          <Avatar
            size="md"
            fallback="AM"
          />
        </div>
      </div>

      {/* BROKEN IMAGE */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">
          BROKEN IMAGE
        </h3>

        <div className="flex items-center gap-4">
          <Avatar
            src="/image-not-found.jpg"
            alt="Broken avatar"
            size="md"
            fallback="AM"
          />
        </div>
      </div>

    </div>
  ),
};