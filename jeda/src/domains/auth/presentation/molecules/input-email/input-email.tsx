"use client";

import React from "react";
import { InputLogin } from "@/domains/auth/presentation/atoms/input-login/input-login";

export interface InputEmailProps {
  /** Label untuk input (default: "Email") */
  label?: string;
  /** Nilai input jika controlled */
  value?: string;
  /** Nilai awal jika uncontrolled */
  defaultValue?: string;
  /** Placeholder input */
  placeholder?: string;
  /** Varian status input untuk mempermudah perpindahan state */
  variant?: "default" | "error" | "success";
  /** Pesan kustom di bawah input */
  message?: string;
  /** Handler saat nilai berubah */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const InputEmail: React.FC<InputEmailProps> = ({
  label = "Email",
  value,
  defaultValue = "",
  placeholder = "nama@gmail.com",
  variant = "default",
  message,
  onChange,
  className = "",
  ...props
}) => {
  // Menentukan pesan otomatis berdasarkan varian jika message tidak diisi manual
  let currentMessage = message;
  if (!message) {
    if (variant === "error") {
      currentMessage = "Masukkan email yang valid";
    } else if (variant === "success") {
      currentMessage = "Kode telah dikirim ke emailmu";
    }
  }

  return (
    <div
      className={`
        flex flex-col items-start w-145.75
        ${className}
      `}
      {...props}
    >
      {/* Label Email (Tinggi 40px, top: 0px) */}
      <label className="w-full h-10 font-['Poppins'] font-medium text-[16px] leading-10 text-btn-hover">
        {label}
      </label>

      {/* Komponen Atom InputLogin (Top: 50px -> berjarak 10px dari label) */}
      <div className="mt-2.5 w-full">
        <InputLogin
          type="email"
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>

      {/* Pesan Keterangan / Validasi berdasarkan varian */}
      {currentMessage && (
        <span
          className={`
            mt-0.5 font-['Poppins'] font-normal text-[12px] leading-6 pl-0.5
            ${variant === "success" ? "text-[#408836]" : variant === "error" ? "text-[#FF4040]" : "hidden"}
          `}
        >
          {currentMessage}
        </span>
      )}
    </div>
  );
};