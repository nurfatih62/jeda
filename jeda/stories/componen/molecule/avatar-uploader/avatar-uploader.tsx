"use client";

import React, { useRef, useState } from "react";
import { Avatar } from "../../atom/avatar/avatar";
import { IconButton } from "../../atom/icon/icon button/icon";

export interface AvatarUploaderProps {
  /** URL gambar avatar saat ini */
  src?: string;
  /** Inisial teks jika gambar belum ada (contoh: "JD") */
  initials?: string;
  /** Teks bantuan panduan file di bawah avatar */
  helperText?: string;
  /** Handler saat file gambar berhasil dipilih */
  onImageChange?: (file: File, previewUrl: string) => void;
  /** Status nonaktif */
  disabled?: boolean;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  src,
  initials = "JD",
  helperText = "JPG, PNG, atau WebP. Maks. 5 MB.",
  onImageChange,
  disabled = false,
  className = "",
}) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(src);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle klik tombol edit / avatar untuk memicu input file
  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  // Handle perubahan file dari input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi ukuran maks 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran file terlalu besar. Maksimal 5 MB.");
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      if (onImageChange) {
        onImageChange(file, previewUrl);
      }
    }
  };

  return (
    <div
      className={`
        flex flex-col items-start gap-[12px] w-[282px] h-[221px]
        ${className}
      `}
    >
      {/* Frame 238176 Container Avatar & Tombol Edit */}
      <div className="relative w-[186px] h-[186px] group shrink-0">
        <Avatar
          src={imagePreview}
          initials={initials}
          size="lg"
          alt="Avatar Profil"
          className="w-[186px] h-[186px] rounded-[100px]"
        />

        {/* Tombol Edit (Button icon) dengan posisi absolut presisi sesuai Figma baru */}
        {!disabled && (
          <div
            onClick={handleClick}
            style={{
              left: "67.2%",
              top: "81.45%",
            }}
            className="
              absolute
              box-border flex flex-row justify-center items-center p-2 gap-[10px]
              w-10 h-10 bg-white rounded-[6px] shadow-md border border-gray-200
              text-btn-hover hover:bg-gray-50 
              transition-transform hover:scale-105 active:scale-95
              cursor-pointer
            "
            role="button"
            aria-label="Ubah foto profil"
          >
            <IconButton variant="pencil" ariaLabel="Edit foto" />
          </div>
        )}

        {/* Input file tersembunyi */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>

      {/* Teks Bantuan / Informasi File */}
      <span
        className="
          w-[282px] h-[23px] font-['Poppins'] font-medium text-[14px] leading-6
          text-[#1B4E46]/75 select-none
        "
      >
        {helperText}
      </span>
    </div>
  );
};