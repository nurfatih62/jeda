"use client";

import React from "react";
import { Bell } from "lucide-react";

export interface NotificationIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Jumlah notifikasi (jika diisi, badge indikator akan muncul) */
  count?: number | string;
}

export const NotificationIconButton: React.FC<NotificationIconButtonProps> = ({
  count,
  className = "",
  ...props
}) => {
  const hasNotification = count !== undefined && count !== null && count !== 0 && count !== "";

  return (
    <button
      type="button"
      aria-label="Notifications"
      className={`
        group
        relative
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-md
        p-2
        bg-transparent
        border-none
        outline-none
        transition-all
        duration-150
        cursor-pointer
        hover:scale-105
        active:scale-95
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-icon-default
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        select-none
        ${className}
      `}
      {...props}
    >
      {/* Ikon Notifikasi (Bell) disamakan ukurannya dengan IconButton (size: 24, strokeWidth: 2) */}
      <Bell 
        size={24}
        strokeWidth={2}
        className="transition-colors duration-150 stroke-icon-default fill-transparent group-hover:stroke-icon-default/50 shrink-0" 
      />

      {/* Badge Angka Notifikasi */}
      {hasNotification && (
        <span
          className={`
            absolute top-1 right-1 -translate-y-1/4 translate-x-1/4
            box-border flex items-center justify-center
            px-0.5 min-w-3.5 h-3.5
            bg-[#F08181] border border-white rounded-[100px]
            font-['Poppins'] font-normal text-[10px] leading-3
            text-white text-center
          `}
        >
          {count}
        </span>
      )}
    </button>
  );
};