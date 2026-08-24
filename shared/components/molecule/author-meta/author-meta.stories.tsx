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

    avatar: {
      control: "text",
      description: "URL avatar penulis",
    },
  },
} satisfies Meta<typeof AuthorMeta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Custom: Story = {
  args: {
    author: "Nufa",
    date: "15 Agustus 2026",
    avatar:
      "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
  },
};

export const AllAuthorMeta: Story = {
  args: {
    author: "Nufa",
    date: "15 Agustus 2026",
    avatar:
      "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
  },

  render: () => (
    <div className="flex flex-col gap-8">

      {/* DEFAULT */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] font-semibold">
          DEFAULT
        </h2>

        <AuthorMeta
          author="Nufa"
          date="15 Agustus 2026"
          avatar="https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg"
        />
      </div>

      {/* DIFFERENT AUTHOR */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] font-semibold">
          DIFFERENT AUTHOR
        </h2>

        <AuthorMeta
          author="Nur Fatih"
          date="24 Agustus 2026"
          avatar="https://i.pravatar.cc/80?img=12"
        />
      </div>

      {/* NO IMAGE */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] font-semibold">
          NO IMAGE
        </h2>

        <AuthorMeta
          author="JEDA"
          date="24 Agustus 2026"
        />
      </div>

    </div>
  ),
};