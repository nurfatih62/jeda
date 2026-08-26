import React from "react";

export interface LogoProps {
  text?: string;
  className?: string;
}

export const Logo = ({
  text = "JEDA",
  className = "",
}: LogoProps) => {
  return (
    <span
      className={`
        font-serif
        text-2xl
        font-bold
        leading-7
        text-(--primary)
        ${className}
      `}
    >
      {text}
    </span>
  );
};