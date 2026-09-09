"use client";

import React from "react";

export type TypographyVariant = "title" | "subtitle";

/** Status autentikasi / peran pengguna untuk teks default */
export type AuthStatus = "guest" | "logged-in" | "author";

export interface TypographyProps {
  /** Varian tipografi: "title" (36px) atau "subtitle" (24px) */
  variant?: TypographyVariant;
  /** Status login/peran untuk menentukan teks default otomatis */
  authStatus?: AuthStatus;
  /** Isi teks tipografi kustom */
  children?: React.ReactNode;
  /** Tag HTML kustom (opsional) */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "title",
  authStatus = "guest",
  children,
  as,
  className = "",
}) => {
  // Menentukan teks default berdasarkan varian dan status login/author
  const getDefaultText = () => {
    if (variant === "title") {
      switch (authStatus) {
        case "author":
          return "Ambil JEDA dan mulai menulis";
        case "logged-in":
          return "Ambil JEDA dan mulai membaca";
        case "guest":
        default:
          return "Ambil JEDA dan mulai membaca";
      }
    } else {
      // Subtitle
      switch (authStatus) {
        case "author":
          return "Temukan bacaan yang sesuai dengan dirimu dan tulis bacaanmu";
        case "logged-in":
          return "Temukan bacaan yang sesuai dengan dirimu";
        case "guest":
        default:
          return "Ayo bergabung untuk mendapatkan pengalaman lebih lengkap dengan JEDA dan mulai bacaanmu";
      }
    }
  };

  const content = children || getDefaultText();

  // Style dasar masing-masing varian
  const variantStyles = {
    title: `
      font-['Poppins'] font-bold text-[36px] leading-[36px] 
      text-center text-[#1B4E46] flex flex-wrap justify-center items-center gap-x-2
    `,
    subtitle: `
      font-['Poppins'] font-medium text-[24px] leading-[28px] 
      text-center text-[rgba(27,78,70,0.75)] flex flex-wrap justify-center items-center gap-x-1.5
    `,
  };

  const Component = as || (variant === "title" ? "h1" : "p");

  // Fungsi untuk memformat kata "JEDA" berdasarkan variannya & authStatus
  const renderFormattedText = (text: React.ReactNode) => {
    if (typeof text !== "string") return text;

    const parts = text.split(/(JEDA)/g);

    return parts.map((part, index) => {
      if (part === "JEDA") {
        if (variant === "title") {
          // Jika status sudah login atau author, teks JEDA menggunakan warna #198876
          const isAuthTitle = authStatus === "logged-in" || authStatus === "author";
          return (
            <span
              key={index}
              style={{ fontFamily: '"IBM Plex Serif", serif' }}
              className={`text-[40px] font-bold inline-block ${
                isAuthTitle ? "text-[#198876]" : ""
              }`}
            >
              JEDA
            </span>
          );
        } else {
          // Subtitle: Tetap font Poppins, warna khusus #198876
          return (
            <span
              key={index}
              className="text-[#198876] font-medium inline-block"
            >
              JEDA
            </span>
          );
        }
      }
      return part;
    });
  };

  return (
    <Component
      className={`
        w-full max-w-[1036px] m-0 
        ${variantStyles[variant]} 
        ${className}
      `}
    >
      {renderFormattedText(content)}
    </Component>
  );
};