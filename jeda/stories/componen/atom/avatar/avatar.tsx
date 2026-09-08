import React from "react";

export interface AvatarProps {
  /** URL gambar avatar (jika kosong, akan menampilkan inisial teks) */
  src?: string;
  /** Teks inisial yang ditampilkan, contoh: "JD" */
  initials?: string;
  /** Ukuran avatar: 'sm' (40px) atau 'lg' (124px) */
  size?: "sm" | "lg";
  /** Teks alternatif untuk gambar */
  alt?: string;
  /** Kelas CSS tambahan */
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  initials = "JD",
  size = "sm",
  alt = "Avatar",
  className = "",
}) => {
  const isLarge = size === "lg";

  // Ditambahkan 'shrink-0' agar ukurannya tidak bisa dipipihkan oleh flexbox
  const containerStyles = isLarge
    ? "w-31 h-31 rounded-full shrink-0"
    : "w-10 h-10 rounded-full shrink-0";

  // Ukuran teks & line-height sesuai spesifikasi Figma
  const textStyles = isLarge
    ? "text-[64px] font-semibold leading-24"
    : "text-[12px] font-semibold leading-4.5";

  // Jika ada URL gambar, tampilkan gambar
  if (src) {
    return (
      <div
        className={`relative overflow-hidden bg-gray-100 ${containerStyles} ${className}`}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover rounded-full"
        />
      </div>
    );
  }

  // Jika tidak ada gambar, tampilkan versi Inisial dengan latar belakang warna #0FA6C1 (opacity 15%)
  return (
    <div
      className={`
        box-border flex flex-col justify-center items-center p-3
        bg-[#0FA6C1]/15 text-[#0FA6C1] select-none
        ${containerStyles}
        ${className}
      `}
    >
      <span
        className={`font-['Poppins'] text-center flex items-center justify-center ${textStyles}`}
      >
        {initials}
      </span>
    </div>
  );
};