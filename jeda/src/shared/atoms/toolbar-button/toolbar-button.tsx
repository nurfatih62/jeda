"use client";

import React from "react";

export interface ToolbarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Tooltip / title bawaan browser */
  title?: string;
  /** Ikon (dari lucide-react) */
  children?: React.ReactNode;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  title,
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      type="button"
      title={title}
      className={`text-[#1B4E46] hover:opacity-75 transition-opacity cursor-pointer bg-transparent border-none p-0 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

ToolbarButton.displayName = "ToolbarButton";

export default ToolbarButton;
