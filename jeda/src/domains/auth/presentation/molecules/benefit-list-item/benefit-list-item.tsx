"use client";

import React from "react";

export interface BenefitListItemProps {
  /** Ikon di kiri (dari lucide-react) */
  icon: React.ReactNode;
  /** Teks manfaat */
  text: string;
  /** Perataan vertikal: "start" (ikon di atas, untuk teks 2 baris) atau "center" */
  align?: "start" | "center";
  className?: string;
}

export const BenefitListItem: React.FC<BenefitListItemProps> = ({
  icon,
  text,
  align = "center",
  className = "",
}) => {
  if (align === "start") {
    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <span className="text-[#1B4E46] shrink-0 mt-1">{icon}</span>
        <span className="text-lg font-medium text-[#1B4E46]">{text}</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-[#1B4E46] shrink-0">{icon}</span>
      <span className="text-lg font-medium text-[#1B4E46]">{text}</span>
    </div>
  );
};

BenefitListItem.displayName = "BenefitListItem";

export default BenefitListItem;
