"use client";

import React from "react";
import { Menu } from "lucide-react";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  colorState?: "default" | "danger";
  icon?: React.ReactNode;
}

type Variant = NonNullable<IconButtonProps["variant"]>;
type ColorState = NonNullable<IconButtonProps["colorState"]>;

const colorStyles: Record<ColorState, Record<Variant, string>> = {
  default: {
    primary:
      "bg-(--primary) text-white hover:bg-(--primary-hover) active:bg-(--primary-clicked)",

    outline:
      "border border-(--primary) bg-transparent text-(--primary) hover:bg-(--primary-hover-bg) hover:border-(--primary-hover) hover:text-(--primary-hover) active:bg-(--primary-clicked-bg) active:border-(--primary-clicked) active:text-(--primary-clicked)",

    ghost:
      "bg-transparent text-(--primary) hover:bg-(--primary-hover-bg) hover:text-(--primary-hover) active:bg-(--primary-clicked-bg) active:text-(--primary-clicked)",
  },

  danger: {
    primary:
      "bg-(--danger) text-white hover:bg-(--danger-hover) active:bg-(--danger-clicked)",

    outline:
      "border border-(--danger) bg-transparent text-(--danger) hover:bg-(--danger-hover-bg) hover:border-(--danger-hover) hover:text-(--danger-hover) active:bg-(--danger-clicked-bg) active:border-(--danger-clicked) active:text-(--danger-clicked)",

    ghost:
      "bg-transparent text-(--danger) hover:bg-(--danger-hover-bg) hover:text-(--danger-hover) active:bg-(--danger-clicked-bg) active:text-(--danger-clicked)",
  },
};

export function IconButton({
  variant = "primary",
  colorState = "default",
  icon = <Menu size={24} strokeWidth={2} />,
  className,
  disabled = false,
  "aria-label": ariaLabel,
  ...props
}: IconButtonProps) {
  const buttonColorStyle = colorStyles[colorState][variant];

  const focusColor =
    colorState === "danger" ? "--danger" : "--primary";

  return (
    <button
      {...props}
      disabled={disabled}
      aria-label={ariaLabel}
      style={
        {
          "--button-focus-color": `var(${focusColor})`,
        } as React.CSSProperties
      }
      className={`
        inline-flex
        w-10
        h-10
        items-center
        justify-center
        p-2
        rounded-md

        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-(--button-focus-color)

        disabled:cursor-not-allowed

        ${disabled ? "opacity-50 cursor-not-allowed" : ""}

        ${buttonColorStyle}

        ${className ?? ""}
      `}
    >
      {icon}
    </button>
  );
}