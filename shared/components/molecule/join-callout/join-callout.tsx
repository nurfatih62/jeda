"use client";

import React from 'react';
import { Button } from '../../atom/button/button';
import { Typography } from '../../typography/typography';

export interface JoinCalloutProps {
  /** Callback saat tombol Daftar diklik */
  onRegister?: () => void;
  /** Callback saat tombol Masuk diklik */
  onLogin?: () => void;
  /** Kelas tambahan opsional */
  className?: string;
}

export function JoinCallout({ onRegister, onLogin, className = '' }: JoinCalloutProps) {
  return (
    <div className={`relative flex flex-col items-center w-full pt-12 ${className}`}>
      {/* Garis Pembatas Atas (Line 5) */}
      <hr className="absolute top-0 left-14 right-14 border-t border-text-primary m-0" />

      {/* Konten Utama (Frame 42) */}
      <div className="flex flex-col items-center px-1.75 gap-3 w-full opacity-80">
        
        {/* Frame 13: Judul & Deskripsi */}
        <div className="flex flex-col justify-center items-center gap-3 w-full text-center">
          <Typography variant="heading" className="text-[32px] leading-8 font-bold text-text-primary">
            Bergabung untuk mendapat pengalaman lebih
          </Typography>

          <Typography variant="subheading" className="text-[20px] leading-7 font-medium text-text-muted">
            Bergabung untuk mendapat artikel terkait lainnya dan interaksi dengan artikel
          </Typography>
        </div>

        {/* Frame 50: Baris Tombol Aksi */}
        <div className="flex flex-row justify-center items-center gap-3 mt-3">
          <Button
            variant="outline"
            colorState="default"
            onClick={onRegister}
            className="w-register-btn"
          >
            Daftar
          </Button>
          <Button
            variant="primary"
            colorState="default"
            onClick={onLogin}
            className="w-btn-login"
          >
            Masuk
          </Button>
        </div>

      </div>
    </div>
  );
}