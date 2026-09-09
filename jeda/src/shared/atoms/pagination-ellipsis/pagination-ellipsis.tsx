"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoreHorizontal } from "lucide-react";

export interface PaginationEllipsisProps {
  /** Callback yang dipanggil saat user memasukkan nomor halaman dan menekan Enter */
  onJump?: (page: number) => void;
  /** Kelas CSS tambahan */
  className?: string;
}

export const PaginationEllipsis: React.FC<PaginationEllipsisProps> = ({
  onJump,
  className = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Fokus otomatis ke input saat mode edit aktif
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const num = parseInt(value, 10);
      if (!isNaN(num) && onJump) {
        onJump(num);
      }
      setIsEditing(false);
      setValue("");
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setValue("");
    }
  };

  const handleBlur = () => {
    if (value.trim() === "") {
      setIsEditing(false);
    }
  };

  return (
    <div
      onClick={() => {
        if (!isEditing) setIsEditing(true);
      }}
      className={`
        box-border flex items-center justify-center
        w-10 h-10
        p-2
        rounded-md
        border border-[#146C5D]
        bg-transparent
        cursor-pointer
        transition-all duration-150 select-none
        ${isEditing ? "bg-white" : "hover:bg-[#146C5D]/10"}
        ${className}
      `}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, 3))} // Hanya angka, maks 3 digit
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder=""
          aria-label="Loncat ke halaman"
          className="
            w-auto max-w-6 text-center bg-transparent 
            text-[#146C5D] text-[14px] font-medium 
            outline-none p-0 leading-none
          "
        />
      ) : (
        <MoreHorizontal size={24} className="text-[#146C5D] stroke-[2.2]" />
      )}
    </div>
  );
};