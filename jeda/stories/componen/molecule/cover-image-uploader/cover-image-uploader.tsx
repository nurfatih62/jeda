"use client";

import React, { useRef, ChangeEvent } from "react";
import { ImagePlus, X } from "lucide-react";

export interface CoverImageUploaderProps {
  /** URL preview (object URL / remote). Null = belum ada gambar */
  previewUrl?: string | null;
  /** Dipanggil saat file dipilih */
  onFileSelect?: (file: File) => void;
  /** Dipanggil saat gambar dihapus */
  onRemove?: () => void;
  /** Teks tombol placeholder */
  placeholderText?: string;
  /** Teks hint di bawah uploader */
  hintText?: string;
  /** Batas ukuran file dalam MB */
  maxSizeMB?: number;
  className?: string;
}

export const CoverImageUploader: React.FC<CoverImageUploaderProps> = ({
  previewUrl = null,
  onFileSelect,
  onRemove,
  placeholderText = "Tambah gambar sampul (16:9)",
  hintText = "JPG, PNG, atau WebP. Maks. 5 MB.",
  maxSizeMB = 5,
  className = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`Ukuran berkas melebihi ${maxSizeMB} MB.`);
      return;
    }
    onFileSelect?.(file);
  };

  return (
    <div className={`w-full flex flex-col gap-1 ${className}`}>
      <div className="w-full h-[525px] rounded-md bg-[rgba(16,29,19,0.16)] flex flex-col items-center justify-center relative overflow-hidden group">
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Sampul Artikel"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-colors"
              title="Hapus gambar"
            >
              <X className="w-5 h-5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-4 cursor-pointer w-full h-full"
          >
            <ImagePlus className="w-[91px] h-[91px] text-[#1B4E46]" />
            <span className="font-['Nunito'] text-2xl font-medium text-[#1B4E46]">
              {placeholderText}
            </span>
          </button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          className="hidden"
        />
      </div>
      <span className="text-sm font-medium text-[#1B4E46]/75">{hintText}</span>
    </div>
  );
};

CoverImageUploader.displayName = "CoverImageUploader";

export default CoverImageUploader;
