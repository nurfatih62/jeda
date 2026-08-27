"use client";

import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "ghost";

export type ButtonColorState =
  | "default"
  | "success"
  | "danger";

export type ButtonArrow =
  | "none"
  | "left"
  | "right";

export interface ButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children"
  > {
  children: ReactNode;
  variant?: ButtonVariant;
  colorState?: ButtonColorState;
  arrow?: ButtonArrow;
  loading?: boolean;
  disabled?: boolean;
}

const baseClass =
  "font-sans inline-flex h-10 items-center justify-center gap-2.5 rounded-md px-4 text-base font-medium leading-6 transition-colors";

const colorClass: Record<
  ButtonVariant,
  Record<ButtonColorState, string>
> = {
  primary: {
    default:
      "bg-primary text-white hover:bg-primary-hover active:bg-primary-active",

    success:
      "bg-success text-white hover:bg-success-hover active:bg-success-active",

    danger:
      "bg-danger text-white hover:bg-danger-hover active:bg-danger-active",
  },

  outline: {
    default:
      "border border-primary bg-transparent text-primary hover:bg-primary-overlay-hover active:bg-primary-overlay-active",

    success:
      "border border-success bg-transparent text-success hover:bg-success-overlay-hover active:bg-success-overlay-active",

    danger:
      "border border-danger bg-transparent text-danger hover:bg-danger-overlay-hover active:bg-danger-overlay-active",
  },

  ghost: {
    default:
      "bg-transparent text-primary hover:bg-primary-overlay-hover active:bg-primary-overlay-active",

    success:
      "bg-transparent text-success hover:bg-success-overlay-hover active:bg-success-overlay-active",

    danger:
      "bg-transparent text-danger hover:bg-danger-overlay-hover active:bg-danger-overlay-active",
  },
};

export function Button({
  children,
  variant = "primary",
  colorState = "default",
  arrow = "none",
  loading = false,
  disabled = false,
  className = "",
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      disabled={isDisabled}
      className={`${baseClass} ${
        colorClass[variant][colorState]
      } ${
        isDisabled
          ? "pointer-events-none cursor-not-allowed opacity-50"
          : ""
      } ${className}`}
      {...rest}
    >
      {loading && (
        <LoaderCircle
          size={16}
          strokeWidth={2}
          className="animate-spin"
        />
      )}

      {!loading && arrow === "left" && (
        <ArrowLeft
          size={16}
          strokeWidth={2}
        />
      )}

      <span>{children}</span>

      {!loading && arrow === "right" && (
        <ArrowRight
          size={16}
          strokeWidth={2}
        />
      )}
    </button>
  );
}