import React from "react";
import {
  LoaderCircle,
  MoveLeft,
  MoveRight,
} from "lucide-react";

export interface ButtonProps {
  children: React.ReactNode;
  arrow?: "none" | "left" | "right";
  variant?: "primary" | "outline" | "ghost";
  colorState?: "default" | "success" | "danger";
  loading?: boolean;
}

export function Button({
  children,
  arrow,
  variant = "primary",
  colorState = "default",
  loading = false,
}: ButtonProps) {
  const hasArrow = arrow === "left" || arrow === "right";

    const colorClasses =
    colorState === "success"
        ? variant === "primary"
        ? "bg-(--success) text-white"
        : variant === "outline"
            ? "border border-(--success) bg-transparent text-(--success)"
            : "bg-(--white) text-(--success)"
        : colorState === "danger"
        ? variant === "primary"
            ? "bg-(--danger) text-white"
            : variant === "outline"
            ? "border border-(--danger) bg-transparent text-(--danger)"
            : "bg-(--white) text-(--danger)"
        : variant === "primary"
            ? "bg-(--primary) text-white hover:bg-(--primary-hover) active:bg-(--primary-clicked)"
            : variant === "outline"
            ? "border border-(--primary) bg-transparent text-(--primary)"
            : "bg-(--white) text-(--primary)";

    return (
  <button
    className={`
      flex
      items-center
      justify-center
      h-10
      rounded-md
      text-[16px]
      font-medium
      leading-6
      cursor-pointer
      ${colorClasses}
        ${
        hasArrow || loading
            ? "px-4 py-2 gap-2.5"
            : "w-26.25"
        }
    `}
  >
    {loading && (
    <LoaderCircle
        size={16}
        strokeWidth={1.33}
        className="animate-spin"
    />
    )}

    {!loading && arrow === "left" && (
    <MoveLeft
        size={16}
        strokeWidth={1.33}
    />
    )}

    <span>{children}</span>

    {!loading && arrow === "right" && (
    <MoveRight
        size={16}
        strokeWidth={1.33}
    />
    )}
  </button>
);
}