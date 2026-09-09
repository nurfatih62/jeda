"use client";

import React from "react";
import { PenTool } from "lucide-react";
import { Button } from "@/shared/atoms/button/button/button";
import { ArticleBadge } from "@/domains/article/presentation/atoms/article-badge/article-badge";

export interface AuthorDraftWritingCardProps {
  /** Varian kartu: "draft" (ada artikel) atau "empty" (belum ada tulisan) */
  variant?: "draft" | "empty";
  /** Label atau teks status badge (default: "Draft") */
  badgeLabel?: string;
  /** Judul artikel atau tulisan */
  title?: string;
  /** Ringkasan atau potongan teks isi tulisan */
  description?: string;
  /** Keterangan waktu edit terakhir */
  lastEdited?: string;
  /** Nilai angka persentase untuk progress bar & teks (0 - 100) */
  progressPercentage?: number;
  /** Teks pada tombol aksi */
  buttonText?: string;
  /** URL gambar thumbnail di sebelah kanan */
  imageUrl?: string;
  /** Callback ketika tombol aksi diklik */
  onResumeWriting?: () => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const AuthorDraftWritingCard: React.FC<AuthorDraftWritingCardProps> = ({
  variant = "draft",
  badgeLabel = "Draft",
  title,
  description,
  lastEdited = "Terakhir diedit 2 jam lalu",
  progressPercentage = 60,
  buttonText,
  imageUrl = "",
  onResumeWriting,
  className = "",
}) => {
  const isEmpty = variant === "empty";

  // Penentuan teks default secara otomatis berdasarkan varian
  const displayTitle =
    title ??
    (isEmpty
      ? "Belum ada tulisan? Yuk mulai."
      : "Kenapa Aku Berhenti Menulis Diary");

  const displayDescription =
    description ??
    (isEmpty
      ? "Artikel pertamamu nggak harus sempurna. Cukup mulai, dan JEDA akan menyimpan progresmu secara otomatis."
      : "Ada banyak alasan kenapa orang berhenti menulis diary, salah satunya karena merasa tidak ada yang membaca...");

  const displayButtonText =
    buttonText ?? (isEmpty ? "Tulis artikel pertama" : "Lanjutkan menulis");

  // Membatasi nilai persentase agar selalu berada di rentang 0 hingga 100
  const clampedProgress = Math.min(Math.max(progressPercentage, 0), 100);

  return (
    <div
      className={`
        box-border flex flex-row items-center justify-between
        w-full max-w-[1091px] min-h-[260px]
        bg-[#FBF8F2] border border-[rgba(27,78,70,0.52)] rounded-[8px]
        px-[32px] py-[30px] isolate
        ${className}
      `}
    >
      {/* Frame Teks, Progress, & Tombol */}
      <div className="flex flex-col items-start justify-between gap-[20px] max-w-[760px] w-full">
        <div className="flex flex-col items-start gap-[9px] w-full">
          {/* Badge (Hanya tampil di varian draft) */}
          {!isEmpty && <ArticleBadge variant="draft" label={badgeLabel} />}

          {/* Judul & Deskripsi */}
          <div className="flex flex-col items-start gap-[6px] w-full">
            <h2 className="font-['Poppins'] font-bold text-[24px] leading-[32px] text-[#1B4E46] m-0">
              {displayTitle}
            </h2>
            <p className="font-['Poppins'] font-medium text-[16px] leading-[24px] text-[rgba(27,78,70,0.75)] m-0">
              {displayDescription}
            </p>
          </div>
        </div>

        {/* Informasi Status & Progress Bar (Hanya tampil di varian draft) */}
        {!isEmpty && (
          <div className="flex flex-col items-start gap-[10px] w-full">
            <div className="flex flex-row items-center gap-[8px]">
              <span className="font-['Poppins'] font-bold text-[14px] leading-[28px] text-[rgba(27,78,70,0.75)]">
                {lastEdited}
              </span>
              <div className="w-[4px] h-[4px] rounded-full bg-[#198876]" />
              <span className="font-['Poppins'] font-medium text-[14px] leading-[28px] text-[rgba(27,78,70,0.75)]">
                {clampedProgress}% selesai
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-[342px] h-[10px] bg-[rgba(16,29,19,0.16)] overflow-hidden rounded-full">
              <div
                className="h-full bg-[#146C5D] transition-all duration-300"
                style={{ width: `${clampedProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Tombol Aksi */}
        <Button
          variant="solid"
          onClick={onResumeWriting}
          className="px-[20px] h-[40px] bg-[#146C5D] text-white hover:opacity-90 transition-opacity rounded-[6px]"
        >
          {displayButtonText}
        </Button>
      </div>

      {/* Thumbnail Gambar / Placeholder Kanan */}
      {imageUrl ? (
        <div
          className="w-[253px] h-[165px] rounded-[8px] bg-cover bg-center shrink-0 ml-[12px]"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ) : (
        <div className="w-[253px] h-[165px] rounded-[8px] bg-[#D8D8D3]/60 shrink-0 ml-[12px] flex items-center justify-center text-[#1B4E46]">
          <PenTool className="w-8 h-8 opacity-70" />
        </div>
      )}
    </div>
  );
};

AuthorDraftWritingCard.displayName = "AuthorDraftWritingCard";

export default AuthorDraftWritingCard;