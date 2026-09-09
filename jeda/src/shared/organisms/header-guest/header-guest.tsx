"use client";

import React, { useState } from "react";
import { Logo } from "@/shared/atoms/logo/logo";
import { InputSheard } from "@/domains/article/presentation/atoms/input-sheard/input-sheard";
import { Button } from "@/shared/atoms/button/button/button";
import { NotificationIconButton } from "@/shared/atoms/icon/notification-icon-button/notification-icon-button";
// DIPERBAIKI: Mengarahkan ke path folder icon button yang sesuai
import { IconButton } from "@/shared/atoms/icon/icon button/icon"; 
import { Dropdown } from "@/shared/atoms/dropdown/dropdown";
import { Avatar } from "@/shared/atoms/avatar/avatar";

export interface HeaderGuestProps extends React.HTMLAttributes<HTMLElement> {
  /** Nilai atau teks pada input pencarian */
  searchValue?: string;
  /** Handler ketika nilai input pencarian berubah */
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler ketika tombol "Masuk" diklik (mode guest) */
  onLoginClick?: () => void;
  /** Varian peran header: 'guest', 'reader', 'author', atau 'admin' */
  variant?: "guest" | "reader" | "author" | "admin";
  /** Jumlah badge notifikasi pada ikon lonceng */
  notificationCount?: number;
  /** Handler ketika ikon notifikasi diklik */
  onNotificationClick?: () => void;
  /** Handler ketika tombol tulis/pensil diklik (mode author) */
  onAuthorWriteClick?: () => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const HeaderGuest: React.FC<HeaderGuestProps> = ({
  searchValue: controlledSearchValue,
  onSearchChange,
  onLoginClick,
  variant = "guest",
  notificationCount = 1,
  onNotificationClick,
  onAuthorWriteClick,
  className = "",
  ...props
}) => {
  const [internalSearch, setInternalSearch] = useState("");

  const isControlled = controlledSearchValue !== undefined;
  const searchValue = isControlled ? controlledSearchValue : internalSearch;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalSearch(e.target.value);
    }
    onSearchChange?.(e);
  };

  return (
    <header
      className={`
        box-border flex flex-row items-center justify-between
        w-full h-22 px-5 py-5.75 gap-7.5
        bg-[#F2F4ED] border-b border-btn-hover
        relative overflow-visible
        ${className}
      `}
      {...props}
    >
      {/* Logo JEDA */}
      <div className="flex items-center shrink-0">
        <Logo />
      </div>

      {/* Input Pencarian (Tidak tampil untuk varian admin) */}
      {variant !== "admin" && (
        <div className="flex-1 min-w-0 max-w-244.75">
          <InputSheard 
            value={searchValue}
            onChange={handleChange}
            className="w-full!"
          />
        </div>
      )}

      {/* Bagian Kanan: Berubah tergantung varian (guest, reader, author, admin) */}
      <div className="flex items-center shrink-0 gap-4">
        {variant === "author" && (
          /* Tombol Pensil untuk Author */
          <IconButton
            ariaLabel="author"
            variant="pencil"
            onClick={onAuthorWriteClick}
          />
        )}

        {(variant === "reader" || variant === "author") && (
          /* Tombol Notifikasi (muncul untuk reader & author) */
          <NotificationIconButton 
            count={notificationCount} 
            onClick={onNotificationClick} 
          />
        )}

        {variant !== "guest" ? (
          /* Dropdown Profil dengan Avatar (untuk reader, author, & admin) */
          <Dropdown
            triggerContent={
              <Avatar 
                initials="JD" 
                size="sm" 
                src="https://i.pinimg.com/736x/18/72/aa/1872aae8cae656b7adf0cb5c419ebe42.jpg" 
              />
            }
            variant="profile"
          />
        ) : (
          /* Tombol Masuk untuk Guest */
          <Button onClick={onLoginClick}>
            Masuk
          </Button>
        )}
      </div>
    </header>
  );
};