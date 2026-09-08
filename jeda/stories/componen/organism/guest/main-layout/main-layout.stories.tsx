import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MainLayout } from "./main-layout";

const meta: Meta<typeof MainLayout> = {
  title: "📦componen/organism/guest/main-layout",
  component: MainLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

// 1. Default MainLayout (Guest Mode)
export const Default: Story = {
  args: {
    headerProps: {
      variant: "guest",
    },
  },
};

// 2. MainLayout untuk Mode Reader / User Login
export const ReaderLoggedIn: Story = {
  args: {
    headerProps: {
      variant: "reader",
    },
    sidebarProps: {
      activeVariant: "home",
    },
  },
};

// 3. MainLayout untuk Mode Author
export const AuthorLoggedIn: Story = {
  args: {
    headerProps: {
      variant: "author",
    },
    sidebarProps: {
      activeVariant: "dashboard",
    },
  },
};

// 4. MainLayout untuk Mode Admin
export const AdminLoggedIn: Story = {
  args: {
    headerProps: {
      variant: "admin",
    },
    sidebarProps: {
      role: "admin",
      activeVariant: "dashboard",
    },
  },
};