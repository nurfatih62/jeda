"use client";

import React, { useState } from "react";
import { IconButton } from "@/shared/atoms/icon/icon button/icon";
import { InputEmail } from "@/domains/auth/presentation/molecules/input-email/input-email";
import { InputPassword } from "@/domains/auth/presentation/molecules/input-password/input-password";
import { SendLoginButton } from "@/domains/auth/presentation/atoms/send-login-button/send-login-button";
import { GoogleLoginButton } from "@/domains/auth/presentation/atoms/google-login-button/google-login-button";
import { Toast, ToastVariant } from "@/shared/atoms/toast/toast";

export interface LoginModalProps {
  isOpen?: boolean;
  isLoading?: boolean;
  /** Status pesan error untuk menampilkan Toast, misal "error-email-password" */
  errorMessageVariant?: ToastVariant | null;
  /** Callback untuk menutup modal */
  onClose?: () => void;
  /** Callback saat form disubmit */
  onSubmit?: (data: { email: string; password: string }) => void;
  /** Callback saat tombol Google diklik */
  onGoogleLogin?: () => void;
  /** Callback saat tombol Daftar diklik */
  onRegisterClick?: () => void;
  /** Callback saat tombol Lupa Password diklik */
  onForgotPasswordClick?: () => void;
  /** Action click khusus pada Toast (misal: "Kirim ulang") */
  onToastActionClick?: () => void;
  className?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen = true,
  isLoading = false,
  errorMessageVariant = null,
  onClose,
  onSubmit,
  onGoogleLogin,
  onRegisterClick,
  onForgotPasswordClick,
  onToastActionClick,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  // Form validasi: tombol diset aktif hanya bila kedua input terisi
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && onSubmit) {
      onSubmit({ email, password });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {/* Container Modal Utama */}
      <div
        className={`
          relative w-full max-w-[832px] bg-white rounded-[6px]
          p-8 sm:p-12 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]
          flex flex-col items-center gap-6 box-border
          ${className}
        `}
      >
        {/* Tombol Close */}
        <div className="absolute left-[30px] top-[30px]">
          <IconButton
            variant="close"
            onClick={onClose}
            ariaLabel="Tutup modal"
          />
        </div>

        {/* 1. Tombol Google Login */}
        <div className="w-full flex justify-center mt-4">
          <GoogleLoginButton onClick={onGoogleLogin} />
        </div>

        {/* 2. Pembatas "Atau" */}
        <span className="font-['Poppins'] font-normal text-base text-[#1B4E46] text-center">
          Atau
        </span>

        {/* 3. Header Text */}
        <div className="flex flex-col items-center text-center gap-2 max-w-[641px]">
          <h2 className="font-['Poppins'] font-bold text-[36px] leading-[40px] text-[#1B4E46] m-0">
            Gabung untuk melanjutkan
          </h2>
          <p className="font-['Poppins'] font-medium text-[24px] leading-[32px] text-[#1B4E46]/75 m-0">
            Masuk untuk melanjutkan aktivitasmu dan nikmati pengalaman lainnya
          </p>
        </div>

        {/* 4. Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[576px] flex flex-col gap-4 mt-2"
        >
          {/* Input Email */}
          <InputEmail
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="w-full"
          />

          {/* Input Password */}
          <InputPassword
            variant="current"
            label="Password"
            placeholder="Input"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="w-full"
          />

          {/* Toast Notification */}
          {errorMessageVariant && (
            <div className="w-full">
              <Toast
                variant={errorMessageVariant}
                onActionClick={onToastActionClick}
                className="w-full max-w-full"
              />
            </div>
          )}

          {/* Lupa Password */}
          <div className="w-full flex justify-end">
            <button
              type="button"
              onClick={onForgotPasswordClick}
              className="font-['Poppins'] font-medium text-xs text-[#1B4E46] bg-transparent border-none p-0 cursor-pointer hover:underline"
            >
              Lupa password?
            </button>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col items-center gap-3 mt-2">
            <SendLoginButton
              isLoading={isLoading}
              disabled={!isFormValid || isLoading}
              type="submit"
              className="w-full h-[54px]"
            >
              Masuk
            </SendLoginButton>

            <p className="font-['Poppins'] font-normal text-base text-[#1B4E46] m-0 text-center">
              Tidak punya akun?{" "}
              <button
                type="button"
                onClick={onRegisterClick}
                className="font-semibold text-[#10564A] underline bg-transparent border-none p-0 cursor-pointer hover:opacity-80"
              >
                Daftar
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

LoginModal.displayName = "LoginModal";