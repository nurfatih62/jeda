import React from "react";

export type TypographyVariant =
  | "heading1"
  | "heading2"
  | "body"
  | "bodySmall"
  | "caption"
  | "button"
  | "badge";

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  children: React.ReactNode;
}

const variantStyles: Record<TypographyVariant, string> = {
  heading1:
    "text-[48px] leading-[56px] font-bold text-(--black)",

  heading2:
    "text-[28px] leading-[36px] font-semibold text-(--black)",

  body:
    "text-[16px] leading-[24px] font-normal text-(--black)",

  bodySmall:
    "text-[14px] leading-[20px] font-normal text-(--black)",

  caption:
    "text-[12px] leading-[16px] font-normal text-(--text-secondary)",

  button:
    "text-[16px] leading-[24px] font-medium text-(--black)",

  badge:
    "text-[12px] leading-[16px] font-semibold text-(--black)",
};

const defaultElements: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
  heading1: "h1",
  heading2: "h2",
  body: "p",
  bodySmall: "p",
  caption: "span",
  button: "span",
  badge: "span",
};

export function Typography({
  variant = "body",
  children,
  className = "",
  ...props
}: TypographyProps) {
  const Component = defaultElements[variant];

  return React.createElement(
    Component,
    {
      ...props,
      className: `${variantStyles[variant]} ${className}`,
    },
    children,
  );
}