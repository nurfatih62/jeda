"use client";

import React, { useState } from "react";
import { InputPassword } from "@/domains/auth/presentation/molecules/input-password/input-password";
import { SendLoginButton } from "@/domains/auth/presentation/atoms/send-login-button/send-login-button";
import { IconButton } from "@/shared/atoms/icon/icon button/icon";

interface CreateNewPasswordModalProps {
  /** Callback saat tombol reset password diklik dengan membawa password baru */
  onSubmit?: (password: string) => void;
  /** Callback saat tombol panah kembali diklik */
  onBack?: () => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const CreateNewPasswordModal: React.FC<CreateNewPasswordModalProps> = ({
  onSubmit,
  onBack,
  className = "",
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(password);
    }
  };

  return (
    <div
      className={`
        relative box-border flex flex-col justify-between
        w-208 h-144 bg-white
        shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[6px]
        p-8 mx-auto
        ${className}
      `}
    >
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
      <div className="flex flex-col items-center gap-[29px] max-w-[641px] mx-auto mt-12 w-full">
        <h1 className="font-poppins font-bold text-[36px] leading-[32px] text-center text-btn-hover m-0">
          Buat password baru
        </h1>
        <p className="font-poppins font-medium text-[24px] leading-[28px] text-center text-[rgba(27,78,70,0.75)] m-0">
          Pastikan password barumu berbeda dari sebelumnya.
        </p>
      </div>

      {/* Form / Inputs Section */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full my-auto gap-6">
        <InputPassword
          variant="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-xl"
        />
        <InputPassword
          variant="confirm"
          label="Konfirmasi password baru"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-xl"
        />
      </form>

      {/* Footer Section / Submit Button */}
      <div className="flex flex-col items-center max-w-[562px] mx-auto w-full mb-2">
        <SendLoginButton
          onClick={handleSubmit}
          className="w-full h-13.5 bg-[rgba(20,108,93,0.5)] hover:bg-[rgba(20,108,93,0.8)] text-white font-medium text-[20px] rounded-md flex items-center justify-center"
        >
          Reset password
        </SendLoginButton>
      </div>
    </div>
  );
};

export default CreateNewPasswordModal;