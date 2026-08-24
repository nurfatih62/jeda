import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchBar } from "./search-bar";

const meta = {
  title: "Components/Molecule/Search Bar",
  component: SearchBar,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    placeholder: {
      control: "text",
      description: "Teks placeholder search bar",
    },

    value: {
      control: "text",
      description: "Isi search bar",
    },

    disabled: {
      control: "boolean",
      description: "Menonaktifkan search bar",
    },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Custom: Story = {
  args: {
    placeholder: "Cari",
    value: "",
    disabled: false,
  },
};

export const AllSearchBar: Story = {
  args: {
    placeholder: "Cari",
    value: "",
    disabled: false,
  },

  render: () => (
    <div className="flex flex-col gap-8">
      {/* DEFAULT */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] font-semibold">
          DEFAULT
        </h2>

        <div className="w-100">
          <SearchBar placeholder="Cari" />
        </div>
      </div>

      {/* FILLED */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] font-semibold">
          FILLED
        </h2>

        <div className="w-100">
          <SearchBar
            placeholder="Cari"
            value="Artikel JEDA"
          />
        </div>
      </div>

      {/* DISABLED */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] font-semibold">
          DISABLED
        </h2>

        <div className="w-100">
          <SearchBar
            placeholder="Cari"
            disabled
          />
        </div>
      </div>
    </div>
  ),
};