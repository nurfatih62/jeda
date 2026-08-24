import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ColorToken } from "./color-token";

const meta = {
  title: "Components/Atom/Color Token",
  component: ColorToken,

  tags: ["autodocs"],

  parameters: {
    layout: "centered",
  },

  argTypes: {
    name: {
      control: "text",
      description: "Nama color token",
    },

    variable: {
      control: "text",
      description: "CSS variable color token",
    },

    value: {
      control: "text",
      description: "Nilai warna",
    },
  },
} satisfies Meta<typeof ColorToken>;

export default meta;

type Story = StoryObj<typeof meta>;

/* =========================
   COLOR TOKENS
========================= */

const colors = {
  /* BRAND & CORE */
  primary: {
    name: "PRIMARY",
    variable: "--primary",
    value: "#198876",
  },

  primaryHover: {
    name: "PRIMARY HOVER",
    variable: "--primary-hover",
    value: "#187364",
  },

  primaryClicked: {
    name: "PRIMARY CLICKED",
    variable: "--primary-clicked",
    value: "#18584D",
  },

  secondary: {
    name: "SECONDARY",
    variable: "--secondary",
    value: "#5EBAA5",
  },

  accent: {
    name: "ACCENT",
    variable: "--accent",
    value: "#FCBA33",
  },

  green: {
    name: "GREEN",
    variable: "--green",
    value: "#75BF85",
  },

  /* TYPOGRAPHY & TEXT */
  textPrimary: {
    name: "PRIMARY TEXT",
    variable: "--text-primary",
    value: "#1B4E46",
  },

  textSecondary: {
    name: "SECONDARY TEXT",
    variable: "--text-secondary",
    value: "#1B4E46BF",
  },

  black: {
    name: "BLACK",
    variable: "--black",
    value: "#555555",
  },

  white: {
    name: "WHITE",
    variable: "--white",
    value: "#FFFFFF",
  },

  /* BACKGROUND & SURFACE */
  inputBg: {
    name: "INPUT BG",
    variable: "--input-bg",
    value: "#F3F8FA",
  },

  cardBg: {
    name: "CARD BG",
    variable: "--card-bg",
    value: "#1988760A",
  },

  backgroundDisabled: {
    name: "BACKGROUND DISABLED",
    variable: "--background-disabled",
    value: "#F3F4F6",
  },

  /* UI & UTILITY */
  border: {
    name: "BORDER",
    variable: "--border",
    value: "#D1D5DB",
  },

  blueBorder: {
    name: "BLUE BORDER",
    variable: "--blue-border",
    value: "#19887680",
  },

  iconLine: {
    name: "ICON LINE",
    variable: "--icon-line",
    value: "#374151",
  },

  red: {
    name: "RED",
    variable: "--red",
    value: "#F08181",
  },

  /* SUCCESS */
  success: {
    name: "SUCCESS",
    variable: "--success",
    value: "#10845E",
  },

  successHover: {
    name: "SUCCESS HOVER",
    variable: "--success-hover",
    value: "#0C6F4F",
  },

  successClicked: {
    name: "SUCCESS CLICKED",
    variable: "--success-clicked",
    value: "#0E5E43",
  },

  /* DANGER */
  danger: {
    name: "DANGER",
    variable: "--danger",
    value: "#C62828",
  },

  dangerHover: {
    name: "DANGER HOVER",
    variable: "--danger-hover",
    value: "#B71C1C",
  },

  dangerClicked: {
    name: "DANGER CLICKED",
    variable: "--danger-clicked",
    value: "#991B1B",
  },
};

/* =========================
   CUSTOM
========================= */

export const Custom: Story = {
  args: {
    name: "PRIMARY",
    variable: "--primary",
    value: "#198876",
  },
};

/* =========================
   ALL COLORS
========================= */

export const AllColors: Story = {
  args: {
    name: "PRIMARY",
    variable: "--primary",
    value: "#198876",
  },

  render: () => (
    <div className="flex w-200 flex-col gap-8">

      {/* BRAND & CORE */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[18px] font-semibold">
          BRAND & CORE
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <ColorToken {...colors.primary} />
          <ColorToken {...colors.primaryHover} />
          <ColorToken {...colors.primaryClicked} />
          <ColorToken {...colors.secondary} />
          <ColorToken {...colors.accent} />
          <ColorToken {...colors.green} />
        </div>
      </section>

      {/* TYPOGRAPHY & TEXT */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[18px] font-semibold">
          TYPOGRAPHY & TEXT
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <ColorToken {...colors.textPrimary} />
          <ColorToken {...colors.textSecondary} />
          <ColorToken {...colors.black} />
          <ColorToken {...colors.white} />
        </div>
      </section>

      {/* BACKGROUND & SURFACE */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[18px] font-semibold">
          BACKGROUND & SURFACE
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <ColorToken {...colors.inputBg} />
          <ColorToken {...colors.cardBg} />
          <ColorToken {...colors.backgroundDisabled} />
        </div>
      </section>

      {/* UI & UTILITY */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[18px] font-semibold">
          UI & UTILITY
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <ColorToken {...colors.border} />
          <ColorToken {...colors.blueBorder} />
          <ColorToken {...colors.iconLine} />
          <ColorToken {...colors.red} />
        </div>
      </section>

      {/* SUCCESS */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[18px] font-semibold">
          SUCCESS
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <ColorToken {...colors.success} />
          <ColorToken {...colors.successHover} />
          <ColorToken {...colors.successClicked} />
        </div>
      </section>

      {/* DANGER */}
      <section className="flex flex-col gap-4">
        <h2 className="text-[18px] font-semibold">
          DANGER
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <ColorToken {...colors.danger} />
          <ColorToken {...colors.dangerHover} />
          <ColorToken {...colors.dangerClicked} />
        </div>
      </section>

    </div>
  ),
};