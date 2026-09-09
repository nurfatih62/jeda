"use client";

import React from "react";

export type ToastVariant =
  | "failed-with-subtext"
  | "failed"
  | "success-with-subtext"
  | "success"
  | "error-email-password"
  | "error-unverified"
  | "error-google-linked"
  | "error-connection"
  | "error-preference"
  | "custom"; // Varian bebas untuk kustomisasi total

export interface ToastProps {
  /** Varian tampilan toast (preset) */
  variant?: ToastVariant;
  /** Kustomisasi judul utama (opsional, akan menimpa preset jika diisi) */
  title?: string;
  /** Kustomisasi subteks deskripsi (opsional) */
  subtext?: string;
  /** Teks tautan interaktif kustom di dalam judul (misal: "Kirim ulang", "Coba lagi") */
  actionText?: string;
  /** Tipe warna teks aksi: "primary" (hijau tua/biru) atau "underline-only" (merah/warna teks biasa) */
  actionType?: "primary" | "underline-only";
  /** Handler ketika teks tautan interaktif diklik */
  onActionClick?: () => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  variant = "failed-with-subtext",
  title,
  subtext,
  actionText,
  actionType,
  onActionClick,
  className = "",
}) => {
  const isSuccess = variant.includes("success");

  // Tentukan preset bawaan berdasarkan varian
  let presetTitle = isSuccess ? "Success!" : "Failed!";
  let presetSubtext = isSuccess ? "Your action was succeeded" : "Your action was failed. Please try again";
  let presetActionText: string | undefined = undefined;
  let presetActionType: "primary" | "underline-only" = "primary";

  switch (variant) {
    case "error-email-password":
      presetTitle = "Email atau password salah";
      break;
    case "error-unverified":
      presetTitle = "Akun belum diverifikasi. Cek email kamu · ";
      presetActionText = "Kirim ulang";
      presetActionType = "primary";
      break;
    case "error-google-linked":
      presetTitle = "Akun ini terhubung dengan Google. ";
      presetActionText = "Login dengan Google";
      presetActionType = "primary";
      break;
    case "error-connection":
      presetTitle = "Gagal terhubung. Coba lagi";
      break;
    case "error-preference":
      presetTitle = "Gagal menyimpan preferensi. ";
      presetActionText = "Coba lagi";
      presetActionType = "underline-only";
      break;
    default:
      break;
  }

  // Prioritas: Props kustom -> Preset varian -> Default umum
  const displayTitle = title !== undefined ? title : presetTitle;
  const finalActionText = actionText !== undefined ? actionText : presetActionText;
  const finalActionType = actionType || presetActionType;
  
  // Tentukan apakah subteks harus ditampilkan
  const hasSubtext = variant.includes("with-subtext") || subtext !== undefined;
  const displaySubtext = subtext !== undefined ? subtext : presetSubtext;

  // Tema Warna (Merah vs Hijau)
  const themeClasses = isSuccess
    ? {
        bg: "bg-[#ECFDF3]",
        border: "border-[#CEFBDA]",
      }
    : {
        bg: "bg-[#FDECEC]",
        border: "border-[#FBCECE]",
      };

  return (
    <div
      className={`
        flex flex-col items-start p-4 gap-2 
        w-full max-w-[566px] min-w-[353px] 
        shadow-[0px_4px_6px_rgba(0,0,0,0.09)] 
        rounded-[6px] border ${themeClasses.bg} ${themeClasses.border}
        ${className}
      `}
    >
      <div className="flex flex-row items-center gap-4 w-full">
        {/* Ikon SVG (Circle Alert / Circle Check) */}
        <div className="flex items-center justify-center shrink-0 w-4 h-4 relative">
          {isSuccess ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <circle cx="8" cy="8" r="7.333" stroke="#408836" strokeWidth="1.33" />
              <path
                d="M5 8L7 10L11 6"
                stroke="#408836"
                strokeWidth="1.33"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
            >
              <circle cx="8" cy="8" r="7.333" stroke="#D02A11" strokeWidth="1.33" />
              <path
                d="M8 5V8.66667"
                stroke="#D02A11"
                strokeWidth="1.33"
                strokeLinecap="round"
              />
              <circle cx="8" cy="11" r="0.666" fill="#D02A11" />
            </svg>
          )}
        </div>

        {/* Konten Teks */}
        <div className="flex flex-col items-start gap-2 w-full">
          <span
            className="font-['Poppins'] font-medium text-[16px] leading-[24px]"
            style={{ color: isSuccess ? "#408836" : "#D02A11" }}
          >
            {displayTitle}
            {finalActionText && (
              <button
                type="button"
                onClick={onActionClick}
                className={`ml-1 underline cursor-pointer bg-transparent border-none p-0 font-['Poppins'] font-medium text-[16px] ${
                  finalActionType === "primary" ? "text-[#1B4E46]" : "text-[#D02A11]"
                }`}
              >
                {finalActionText}
              </button>
            )}
          </span>

          {hasSubtext && (
            <span
              className="font-['Nunito'] font-normal text-[14px] leading-[19px]"
              style={{ color: isSuccess ? "#408836" : "#D02A11" }}
            >
              {displaySubtext}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

Toast.displayName = "Toast";