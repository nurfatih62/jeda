"use client";

import React, { useState } from "react";
import { IconButton } from "../../../atom/icon/icon button/icon";
import { InputEmail } from "../../../molecule/input-email/input-email";
import { InputPassword } from "../../../molecule/input-password/input-password";
import { CheckOption } from "../../../atom/check-option/check-option";
import { SendLoginButton } from "../../../atom/button/send-login-button/send-login-button";
import { GoogleLoginButton } from "../../../atom/button/google-login-button/google-login-button";
import { Toast, ToastVariant } from "../../../atom/toast/toast";

export interface RegisterModalProps {
  /** Controller status keterbukaan modal */
  isOpen?: boolean;
  /** Status ketika proses registrasi sedang berjalan */
  isLoading?: boolean;
  /** Status pesan error untuk menampilkan Toast */
  errorMessageVariant?: ToastVariant | null;
  /** Callback ketika tombol close (X) diklik */
  onClose?: () => void;
  /** Callback saat form registrasi disubmit */
  onSubmit?: (data: { email: string; password: string; confirmPassword: string }) => void;
  /** Callback saat tombol 'Daftar dengan Google' diklik */
  onGoogleRegister?: () => void;
  /** Callback saat tautan 'Masuk' diklik */
  onLoginClick?: () => void;
  /** Callback saat tautan 'syarat dan ketentuan' diklik */
  onTermsClick?: () => void;
  /** Callback untuk aksi di dalam Toast */
  onToastActionClick?: () => void;
  /** Tambahan kelas CSS */
  className?: string;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen = true,
  isLoading = false,
  errorMessageVariant = null,
  onClose,
  onSubmit,
  onGoogleRegister,
  onLoginClick,
  onTermsClick,
  onToastActionClick,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);

  if (!isOpen) return null;

  // Form validasi: Email, Password, Confirm Password wajib diisi, Password cocok, dan Checkbox disetujui
  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword &&
    isAgreed;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid && onSubmit) {
      onSubmit({ email, password, confirmPassword });
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
        {/* Tombol Close di Pojok Kiri Atas */}
        <div className="absolute left-[30px] top-[30px]">
          <IconButton
            variant="close"
            onClick={onClose}
            ariaLabel="Tutup modal"
          />
        </div>

        {/* 1. Tombol Google Register */}
        <div className="w-full flex justify-center mt-4">
          <GoogleLoginButton onClick={onGoogleRegister}>
            Daftar dengan Google
          </GoogleLoginButton>
        </div>

        {/* 2. Pembatas "Atau" */}
        <span className="font-['Poppins'] font-normal text-base text-[#1B4E46] text-center">
          Atau
        </span>

        {/* 3. Header Text */}
        <div className="flex flex-col items-center text-center gap-2 max-w-[641px]">
          <h2 className="font-['Poppins'] font-bold text-[36px] leading-[40px] text-[#1B4E46] m-0">
            Daftar untuk memulai
          </h2>
          <p className="font-['Poppins'] font-medium text-[24px] leading-[32px] text-[#1B4E46]/75 m-0">
            Gabung untuk memulai pengalaman dengan fitur terbaik kami
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

          {/* Input Password Utama (dengan Strength Indicator) */}
          <InputPassword
            variant="password"
            label="Password"
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="w-full"
          />

          {/* Input Konfirmasi Password */}
          <InputPassword
            variant="confirm"
            label="Konfirmasi password"
            placeholder="Minimal 8 karakter"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full"
          />

          {/* Toast Notification (jika ada error) */}
          {errorMessageVariant && (
            <div className="w-full">
              <Toast
                variant={errorMessageVariant}
                onActionClick={onToastActionClick}
                className="w-full max-w-full"
              />
            </div>
          )}

          {/* Checkbox Syarat dan Ketentuan */}
          <div className="w-full flex items-center gap-2 py-1">
            <CheckOption
              size="sm"
              checked={isAgreed}
              onClick={() => setIsAgreed(!isAgreed)}
              label=""
              className="!w-auto !h-auto !p-0 !gap-0"
            />
            <span className="font-['Poppins'] font-normal text-base text-[#1B4E46]">
              Saya setuju dengan{" "}
              <button
                type="button"
                onClick={onTermsClick}
                className="font-semibold text-[#10564A] underline bg-transparent border-none p-0 cursor-pointer hover:opacity-80"
              >
                syarat dan ketentuan
              </button>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col items-center gap-3 mt-2">
            <SendLoginButton
              isLoading={isLoading}
              disabled={!isFormValid || isLoading}
              type="submit"
              className="w-full h-[54px]"
            >
              Daftar
            </SendLoginButton>

            <p className="font-['Poppins'] font-normal text-base text-[#1B4E46] m-0 text-center">
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={onLoginClick}
                className="font-semibold text-[#10564A] underline bg-transparent border-none p-0 cursor-pointer hover:opacity-80"
              >
                Masuk
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

RegisterModal.displayName = "RegisterModal";