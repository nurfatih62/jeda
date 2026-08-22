"use client";

import React from "react";
import { LoaderCircle, MoveLeft, MoveRight } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  colorState?: "default" | "success" | "danger";
  arrow?: "none" | "left" | "right";
  loading?: boolean;
}

type Variant = NonNullable<ButtonProps["variant"]>;
type ColorState = NonNullable<ButtonProps["colorState"]>;
type InteractionState = "idle" | "loading";

const colorStyles: Record<
  ColorState,
  Record<Variant, Record<InteractionState, string>>
> = {
  default: {
    primary: {
      idle: "bg-(--primary) text-white hover:bg-(--primary-hover) active:bg-(--primary-clicked)",
      loading: "bg-(--primary) text-white",
    },
    outline: {
      idle:
        "border border-(--primary) bg-transparent text-(--primary) hover:border-(--primary-hover) hover:text-(--primary-hover) active:border-(--primary-clicked) active:text-(--primary-clicked)",
      loading: "border border-(--primary) bg-transparent text-(--primary)",
    },
    ghost: {
      idle:
        "bg-transparent text-(--primary) hover:text-(--primary-hover) active:text-(--primary-clicked)",
      loading: "bg-transparent text-(--primary)",
    },
  },

  success: {
    primary: {
      idle:
        "bg-(--success) text-white hover:bg-(--success-hover) active:bg-(--success-clicked)",
      loading: "bg-(--success) text-white",
    },
    outline: {
      idle:
        "border border-(--success) bg-transparent text-(--success) hover:border-(--success-hover) hover:text-(--success-hover) active:border-(--success-clicked) active:text-(--success-clicked)",
      loading: "border border-(--success) bg-transparent text-(--success)",
    },
    ghost: {
      idle:
        "bg-transparent text-(--success) hover:text-(--success-hover) active:text-(--success-clicked)",
      loading: "bg-transparent text-(--success)",
    },
  },

  danger: {
    primary: {
      idle:
        "bg-(--danger) text-white hover:bg-(--danger-hover) active:bg-(--danger-clicked)",
      loading: "bg-(--danger) text-white",
    },
    outline: {
      idle:
        "border border-(--danger) bg-transparent text-(--danger) hover:border-(--danger-hover) hover:text-(--danger-hover) active:border-(--danger-clicked) active:text-(--danger-clicked)",
      loading: "border border-(--danger) bg-transparent text-(--danger)",
    },
    ghost: {
      idle:
        "bg-transparent text-(--danger) hover:text-(--danger-hover) active:text-(--danger-clicked)",
      loading: "bg-transparent text-(--danger)",
    },
  },
};

export function Button({
  variant = "primary",
  colorState = "default",
  arrow = "none",
  loading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const hasArrow = arrow === "left" || arrow === "right";
  const isDisabled = loading || props.disabled;

  const interaction: InteractionState = loading ? "loading" : "idle";
  const buttonColorStyle = colorStyles[colorState][variant][interaction];

  return (
    <button
      {...props}
      disabled={isDisabled}
      aria-busy={loading}
      aria-disabled={isDisabled || undefined}
      className={`
        inline-flex
        min-w-[105px]
        h-10
        items-center
        justify-center
        gap-2.5
        rounded-md
        px-4
        py-2
        text-[16px]
        font-medium
        leading-6
        cursor-pointer

        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-(--primary)

        disabled:cursor-not-allowed

        ${loading ? "opacity-50 cursor-not-allowed" : ""}

        ${buttonColorStyle}

        ${className ?? ""}
      `}
    >
      {/* Loading Icon */}
      {loading && (
        <LoaderCircle
          size={16}
          strokeWidth={1.33}
          className="shrink-0 animate-spin"
          aria-hidden="true"
        />
      )}

      {/* Left Arrow */}
      {!loading && arrow === "left" && (
        <MoveLeft
          size={16}
          strokeWidth={1.33}
          className="shrink-0"
          aria-hidden="true"
        />
      )}

      {/* Button Text */}
      <span className={hasArrow || loading ? "whitespace-nowrap" : ""}>
        {children}
      </span>

      {/* Right Arrow */}
      {!loading && arrow === "right" && (
        <MoveRight
          size={16}
          strokeWidth={1.33}
          className="shrink-0"
          aria-hidden="true"
        />
      )}
    </button>
  );
}
