"use client";

import React, { useState } from "react";
import { InputEmail } from "../../../molecule/input-email/input-email";
import { SendLoginButton } from "../../../atom/button/send-login-button/send-login-button";
import { IconButton } from "../../../atom/icon/icon button/icon";

interface ForgotPasswordModalProps {
  /** Varian tampilan: default, success (kode terkirim), error (email tidak terdaftar) */
  variant?: "default" | "success" | "error";
  /** Custom pesan error jika varian error */
  errorMessage?: string;
  /** Callback saat tombol kirim kode diklik */
  onSubmit?: (email: string) => void;
  /** Callback saat tombol kembali ke login diklik */
  onBackToLogin?: () => void;
  /** Callback saat tombol panah kembali diklik */
  onBack?: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  variant = "default",
  errorMessage = "Email tidak terdaftar",
  onSubmit,
  onBackToLogin,
  onBack,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email);
    }
  };

  return (
    <div className="relative w-208 h-122.5 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-md box-border p-8 mx-auto flex flex-col justify-between">
      {/* Back Icon Button */}
      <button
        type="button"
        onClick={onBack}
        className="absolute left-11.5 top-7.5 w-6 h-6 flex items-center justify-center cursor-pointer bg-transparent border-none p-0"
        aria-label="Kembali"
      >
        <IconButton variant="arrowLeft" disabled={true} ariaLabel="back" />
      </button>

      {/* Header Section */}
      <div className="flex flex-col items-center gap-7.25 max-w-160.25 mx-auto mt-12 w-full">
        <h1 className="font-poppins font-bold text-[36px] leading-8 text-center text-btn-hover m-0">
          Lupa password?
        </h1>
        <p className="font-poppins font-medium text-[24px] leading-7 text-center text-[rgba(27,78,70,0.75)] m-0">
          Masukkan email kamu, kami akan kirim kode untuk reset password
        </p>
      </div>

      {/* Form / Input Section */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full my-auto">
        <div className="w-xl flex justify-center">
          <InputEmail
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant={variant}
            message={variant === "error" ? errorMessage : undefined}
            className="w-xl"
          />
        </div>
      </form>

      {/* Footer Section */}
      <div className="flex flex-col items-center gap-2.5 max-w-140.5 mx-auto w-full mb-2">
        <SendLoginButton
          onClick={handleSubmit}
          className="w-full h-13.5 bg-[rgba(20,108,93,0.5)] hover:bg-[rgba(20,108,93,0.8)] text-white font-medium text-[20px] rounded-md flex items-center justify-center"
        >
          Kirim kode
        </SendLoginButton>

        <button
          type="button"
          onClick={onBackToLogin}
          className="w-full bg-transparent border-none font-poppins font-normal text-[16px] leading-6 text-center text-btn-hover cursor-pointer hover:underline p-0"
        >
          Ingat password?<span className="font-medium">Kembali ke login</span>
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;