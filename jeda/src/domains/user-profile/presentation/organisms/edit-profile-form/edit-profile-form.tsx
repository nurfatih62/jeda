"use client";

import React, { useState } from "react";
import { AvatarUploader } from "@/domains/user-profile/presentation/molecules/avatar-uploader/avatar-uploader";
import { Input } from "@/shared/atoms/input/input/input";
import { Textarea } from "@/shared/atoms/input/textarea/textarea";
import { Button } from "@/shared/atoms/button/button/button";

export interface EditProfileFormProps {
  /** Nama awal / username saat ini */
  initialUsername?: string;
  /** Deskripsi / bio awal saat ini */
  initialDescription?: string;
  /** URL avatar saat ini */
  initialAvatar?: string;
  /** Handler saat form disubmit */
  onSubmit?: (data: { username: string; description: string; avatarFile?: File }) => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  initialUsername = "Jonuar Derma",
  initialDescription = "Chef aktif membagikan pengalaman kerja dan makanan",
  initialAvatar,
  onSubmit,
  className = "",
}) => {
  const [username, setUsername] = useState(initialUsername);
  const [description, setDescription] = useState(initialDescription);
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ username, description, avatarFile });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        flex flex-col items-center w-full max-w-[1063px] gap-[24px]
        ${className}
      `}
    >
      {/* Frame 238179: Container dalam dengan gap 19px */}
      <div className="flex flex-col items-end w-full gap-[19px]">
        
        {/* Frame 238178: Baris Utama (Avatar & Form) dengan align-items: center */}
        <div className="flex flex-col md:flex-row items-center gap-[8px] w-full">
          
          {/* Frame 238176: Kolom Kiri Avatar Uploader (Lebar: 282px) */}
          <div className="flex flex-col items-start gap-[12px] w-full md:w-[282px] shrink-0">
            <AvatarUploader
              src={initialAvatar}
              initials="JD"
              helperText="JPG, PNG, atau WebP. Maks. 5 MB."
              onImageChange={(file: File) => setAvatarFile(file)}
            />
          </div>

          {/* Frame 238177: Kolom Kanan Input & Textarea (Lebar: 773px, gap: 2px) */}
          <div className="flex flex-col items-start gap-[2px] w-full md:w-[773px] grow">
            <Input
              label="Username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              helperText="3–20 karakter. Gunakan huruf, angka, atau underscore"
              maxLength={20}
            />

            <Textarea
              label="Deskripsi"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              helperText="Ceritakan sedikit tentang dirimu. Maksimal 160 karakter."
              maxLength={160}
            />
          </div>
        </div>

        {/* Frame 238179: Tombol Simpan (Lebar: 190px, Tinggi: 40px di Pojok Kanan) */}
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
  );
};

EditProfileForm.displayName = "EditProfileForm";