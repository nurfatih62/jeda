"use client";

import React from "react";

export interface LogoProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Teks logo (default: "JEDA") */
  text?: string;
}

export const Logo: React.FC<LogoProps> = ({
  text = "JEDA",
  className = "",
  ...props
}) => {
  return (
    <h1
      className={`
        font-['IBM_Plex_Serif'] font-bold text-[40px] leading-7 text-center text-btn-hover
        ${className}
      `}
      {...props}
    >
      {text}
    </h1>
  );
};