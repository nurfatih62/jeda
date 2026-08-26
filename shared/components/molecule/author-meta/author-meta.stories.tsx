import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AuthorMeta } from "./author-meta";

const meta = {
  title: "Components/Molecule/Author Meta",
  component: AuthorMeta,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    author: {
      control: "text",
      description: "Nama penulis artikel",
    },

    date: {
      control: "text",
      description: "Tanggal artikel",
    },

    showAvatar: {
      control: "boolean",
      description: "Menampilkan foto profil",
    },

    avatar: {
      control: "text",
      description: "URL foto profil",
    },
  },
} satisfies Meta<typeof AuthorMeta>;

// CUKUP DI SINI
export default meta;

type Story = StoryObj<typeof meta>;

export const Custom: Story = {
  args: {
    author: "Nufa",
    date: "24 Agustus 2026",
    showAvatar: false,
  },
};

export const WithAvatar: Story = {
  args: {
    author: "Nufa",
    date: "24 Agustus 2026",
    showAvatar: true,
    avatar:
      "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
  },
};

export const AllAuthorMeta: Story = {
  args: {
    author: "Nufa",
    date: "24 Agustus 2026",
  },

  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">
          WITHOUT AVATAR
        </h2>

        <AuthorMeta
          author="Nufa"
          date="24 Agustus 2026"
          showAvatar={false}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">
          WITH AVATAR
        </h2>

        <AuthorMeta
          author="Nufa"
          date="24 Agustus 2026"
          showAvatar={true}
          avatar="https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg"
        />
      </div>
    </div>
  ),
};