"use client";

import React from "react";

export interface DocSectionBlockProps {
  /** Judul bernomor, mis. "1. Definisi" */
  heading: string;
  /** Isi paragraf (bisa mengandung link) */
  children: React.ReactNode;
  className?: string;
}

export const DocSectionBlock: React.FC<DocSectionBlockProps> = ({
  heading,
  children,
  className = "",
}) => {
  return (
    <div className={className}>
      <h4 className="font-semibold text-[#101D13] m-0 mb-1">{heading}</h4>
      <p className="m-0">{children}</p>
    </div>
  );
};

DocSectionBlock.displayName = "DocSectionBlock";

export default DocSectionBlock;
