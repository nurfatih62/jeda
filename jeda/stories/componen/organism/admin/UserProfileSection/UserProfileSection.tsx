"use client";

import React, { useState } from "react";
import { AvatarUploader } from "../../../molecule/avatar-uploader/avatar-uploader";
import { Input } from "../../../atom/input/input/input";
import { Button } from "../../../atom/button/button/button";
import { ChangePasswordForm } from "../../profile/change-password-form/change-password-form";

export interface UserProfileSectionProps {
  initialUsername?: string;
  initialEmail?: string;
  initialAvatar?: string;
  onProfileSubmit?: (data: { username: string; email: string; avatarFile?: File }) => void;
  onPasswordSubmit?: (data: { currentPassword: string; newPassword: string; confirmPassword: string }) => void;
  onForgotPassword?: () => void;
  className?: string;
}

export const UserProfileSection: React.FC<UserProfileSectionProps> = ({
  initialUsername = "Andita mupa",
  initialEmail = "andita@gmail.com",
  initialAvatar,
  onProfileSubmit,
  onPasswordSubmit,
  onForgotPassword,
  className = "",
}) => {
  const [username, setUsername] = useState(initialUsername);
  const [email, setEmail] = useState(initialEmail);
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onProfileSubmit) {
      onProfileSubmit({ username, email, avatarFile });
    }
  };
  return (
    <section
      className={`
        flex flex-col items-center w-full max-w-[1183px] gap-[63px] p-4 md:p-6
        font-['Poppins',sans-serif] ${className}
      `}
    >
      {/* 1. SECTION PROFIL */}
      <div className="flex flex-col items-start w-full gap-[24px]">
        {/* Frame 101: Judul Profil */}
        <div className="flex flex-row justify-center items-center py-[10px] px-[10px]">
          <h1 className="font-bold text-[36px] leading-[32px] text-[#1B4E46]">
            Profil
          </h1>
        </div>

        {/* Form Edit Profil */}
        <form
          onSubmit={handleProfileSubmit}
          className="flex flex-col items-center w-full max-w-[1063px] gap-[24px]"
        >
          <div className="flex flex-col items-end w-full gap-[19px]">
            {/* Baris Utama: Avatar & Input */}
            <div className="flex flex-col md:flex-row items-center gap-[8px] w-full">
              {/* Kolom Kiri: Avatar */}
              <div className="flex flex-col items-start gap-[12px] w-full md:w-[282px] shrink-0">
                <AvatarUploader
                  src={initialAvatar}
                  initials={(username || "A").slice(0, 2).toUpperCase()}
                  helperText="JPG, PNG, atau WebP. Maks. 5 MB."
                  onImageChange={(file: File) => setAvatarFile(file)}
                />
              </div>

              {/* Kolom Kanan: Username & Email */}
              <div className="flex flex-col items-start gap-[2px] w-full md:w-[773px] grow">
                <Input
                  label="Username"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                  }
                  helperText="3–20 karakter. Gunakan huruf, angka, atau underscore"
                  maxLength={20}
                />
                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  placeholder="nama@gmail.com"
                />
              </div>
            </div>

            {/* Tombol Simpan */}
            <div className="flex flex-col items-end w-full">
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
      </div>

      {/* Line Separator (Frame 238182 Divider) */}
      <div className="w-full max-w-[959px] border-t border-[#1B4E46]" />

      {/* 2. SECTION UBAH PASSWORD */}
      <div className="flex flex-col items-start w-full gap-[24px]">
        <ChangePasswordForm
          onForgotPassword={onForgotPassword}
          onSubmit={onPasswordSubmit}
        />
      </div>
    </section>
  );
};

UserProfileSection.displayName = "UserProfileSection";
export default UserProfileSection;