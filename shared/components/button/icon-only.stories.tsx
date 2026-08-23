import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import {
  Menu,
  Search,
  Settings,
  User,
  Heart,
  Plus,
  Trash2,
} from "lucide-react";

import { IconButton } from "./icon-button";

const icons = {
  Menu: <Menu size={24} strokeWidth={2} />,
  Search: <Search size={24} strokeWidth={2} />,
  Settings: <Settings size={24} strokeWidth={2} />,
  User: <User size={24} strokeWidth={2} />,
  Heart: <Heart size={24} strokeWidth={2} />,
  Plus: <Plus size={24} strokeWidth={2} />,
  Trash: <Trash2 size={24} strokeWidth={2} />,
};

const meta = {
  title: "Components/Button/Icon Only",
  component: IconButton,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "ghost"],
      description: "Gaya tampilan tombol",
    },

    colorState: {
      control: "select",
      options: ["default", "danger"],
      description: "Warna tombol",
    },

    icon: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
      description: "Icon tombol",
    },

    disabled: {
      control: "boolean",
      description: "Menonaktifkan tombol",
    },

    "aria-label": {
      control: "text",
      description: "Nama aksesibel tombol",
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Custom: Story = {
  args: {
    variant: "primary",
    colorState: "default",
    icon: icons.Menu,
    disabled: false,
    "aria-label": "Menu",
  },
};

export const AllButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-8">

      {/* DEFAULT */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">
          DEFAULT
        </h3>

        <div className="flex items-center gap-4">
          <IconButton
            variant="primary"
            colorState="default"
            icon={icons.Menu}
            aria-label="Menu"
          />

          <IconButton
            variant="outline"
            colorState="default"
            icon={icons.Menu}
            aria-label="Menu"
          />

          <IconButton
            variant="ghost"
            colorState="default"
            icon={icons.Menu}
            aria-label="Menu"
          />
        </div>
      </div>

      {/* DANGER */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">
          DANGER
        </h3>

        <div className="flex items-center gap-4">
          <IconButton
            variant="primary"
            colorState="danger"
            icon={icons.Menu}
            aria-label="Menu"
          />

          <IconButton
            variant="outline"
            colorState="danger"
            icon={icons.Menu}
            aria-label="Menu"
          />

          <IconButton
            variant="ghost"
            colorState="danger"
            icon={icons.Menu}
            aria-label="Menu"
          />
        </div>
      </div>

      {/* DISABLED */}
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-semibold">
          DISABLED
        </h3>

        <div className="flex items-center gap-4">
          <IconButton
            variant="primary"
            colorState="default"
            icon={icons.Menu}
            disabled
            aria-label="Menu"
          />

          <IconButton
            variant="outline"
            colorState="default"
            icon={icons.Menu}
            disabled
            aria-label="Menu"
          />

          <IconButton
            variant="ghost"
            colorState="default"
            icon={icons.Menu}
            disabled
            aria-label="Menu"
          />
        </div>
      </div>

    </div>
  ),
};