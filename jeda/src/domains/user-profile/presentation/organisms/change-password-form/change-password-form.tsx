"use client";

import React, { useState } from "react";
import { InputPassword } from "@/domains/auth/presentation/molecules/input-password/input-password";
import { Button } from "@/shared/atoms/button/button/button";

export interface ChangePasswordFormProps {
  /** Handler saat link "Lupa password lama?" diklik */
  onForgotPassword?: () => void;
  /** Handler saat form disubmit */
  onSubmit?: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  onForgotPassword,
  onSubmit,
  className = "",
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ currentPassword, newPassword, confirmPassword });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex flex-col items-start w-full max-w-[1157px] gap-[24px]
        ${className}
      `}
    >
      {/* Frame 100: Judul Ubah Password (36px, Bold) */}
      <div className="flex flex-row justify-center items-center py-[10px] px-[10px]">
        <h2 className="font-['Poppins'] font-bold text-[36px] leading-[32px] text-[#1B4E46]">
          Ubah password
        </h2>
      </div>

      {/* Frame 238186: Kontainer Utama (Form di Kiri, Tombol di Kanan Bawah) */}
      <div className="flex flex-col lg:flex-row justify-between items-end w-full gap-[383px]">
        
        {/* Frame 238185 & 238184: Kumpulan Input Password (Lebar 581px) */}
        <div className="flex flex-col items-start gap-[6px] w-full max-w-[581px]">
          <div className="flex flex-col items-start gap-[8px] w-full">
            
            {/* 1. Password Saat Ini */}
            <InputPassword
              variant="current"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              onForgotPassword={onForgotPassword}
              className="w-full"
            />

            {/* 2. Password Baru (Dilengkapi Bar Kekuatan Password) */}
            <InputPassword
              variant="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full"
            />

            {/* 3. Konfirmasi Password Baru */}
            <InputPassword
              variant="confirm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
            />

          </div>
        </div>

        {/* Tombol Simpan Perubahan (Di Posisi Kanan Bawah Sesuai Frame 238186) */}
        <div className="flex shrink-0">
          <Button 
            type="submit" 
            variant="solid" 
            className="w-[190px] h-[40px] px-[16px] py-[8px] justify-center"
          >
            Simpan perubahan
          </Button>
        </div>

      </div>
    </form>
  );
};

ChangePasswordForm.displayName = "ChangePasswordForm";