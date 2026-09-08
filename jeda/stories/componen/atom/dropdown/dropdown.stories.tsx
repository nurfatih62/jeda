import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Dropdown } from "./dropdown";
// Asumsi komponen Avatar sudah ada di path yang sesuai
import { Avatar } from "../avatar/avatar"; 

const meta: Meta<typeof Dropdown> = {
  title: "📦componen/atom/dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filter", "profile"],
      description: "Varian dropdown: filter atau profile",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story Varian 1: Filter (Populer, Terbaru)
export const FilterDropdown: Story = {
  args: {
    variant: "filter",
    value: "populer",
  },
};

// Story Varian 2: Profile (Trigger menggunakan Avatar)
export const ProfileDropdown: Story = {
  args: {
    variant: "profile",
    triggerContent: (
      <Avatar
        initials="JD"
        size="sm"
        src="https://i.pinimg.com/736x/18/72/aa/1872aae8cae656b7adf0cb5c419ebe42.jpg"
      />
    ),
  },
};