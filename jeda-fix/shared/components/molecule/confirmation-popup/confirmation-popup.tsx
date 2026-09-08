"use client";

import { ArrowLeft } from "lucide-react";

export interface ConfirmationPopupProps {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmationPopup({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: ConfirmationPopupProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4" role="dialog" aria-modal="true">
      <div className="relative flex min-h-[520px] w-full max-w-300 flex-col items-center rounded-lg bg-background px-6 py-12 shadow-xl md:px-24">
        <button
          type="button"
          aria-label="Kembali"
          onClick={onCancel}
          className="absolute left-8 top-8 text-primary"
        >
          <ArrowLeft size={32} strokeWidth={2} />
        </button>
        <div className="flex max-w-220 flex-1 flex-col items-center justify-center text-center">
          <h2 className="text-4xl font-bold leading-tight text-text-primary">{title}</h2>
          <p className="mt-8 max-w-200 text-2xl font-medium leading-tight text-text-muted">{description}</p>
          <div className="mt-36 flex items-center gap-24">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border-2 border-primary px-6 py-3 text-xl font-medium text-primary"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="rounded-lg bg-primary px-7 py-3 text-xl font-medium text-white"
            >
              Ya, simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
