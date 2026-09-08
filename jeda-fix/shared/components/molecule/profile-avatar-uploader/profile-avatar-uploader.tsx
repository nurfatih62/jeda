"use client";

import { Camera } from "lucide-react";
import { Avatar } from "../../atom/avatar/avatar";

interface ProfileAvatarUploaderProps {
  src?: string;
  name: string;
  editable?: boolean;
  onSelect: (file: File) => void;
}

export function ProfileAvatarUploader({ src, name, editable = false, onSelect }: ProfileAvatarUploaderProps) {
  return (
    <div className="group relative">
      <Avatar src={src} alt={name} size="profile" />
      {editable && (
        <label
          aria-label="Ubah foto profil"
          className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-background p-1 text-primary shadow"
        >
          <Camera size={18} />
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onSelect(file);
            }}
          />
        </label>
      )}
    </div>
  );
}
