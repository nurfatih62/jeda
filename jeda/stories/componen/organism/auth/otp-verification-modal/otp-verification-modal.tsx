"use client";

import React, { useState, useRef } from "react";
import { InputVerifikasi } from "../../../atom/input/input-verifikasi/input-verifikasi";
import { ButtonVerifikasi } from "../../../atom/button/button-verifikasi/button-verifikasi";

export interface OtpVerificationModalProps {
  /** Status apakah modal sedang terbuka */
  isOpen?: boolean;
  /** Email atau teks tujuan pengiriman kode */
  email?: string;
  /** Panjang kode OTP (default: 4 kotak input) */
  length?: number;
  /** Status error jika kode salah */
  isError?: boolean;
  /** Pesan error kustom */
  errorMessage?: string;
  /** Callback ketika tombol verifikasi diklik dengan membawa nilai OTP */
  onVerify?: (otpCode: string) => void;
  /** Callback ketika teks "kirim ulang" diklik */
  onResend?: () => void;
  /** Callback untuk menutup modal */
  onClose?: () => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  isOpen = true,
  email = "a*****@gmail.com",
  length = 4,
  isError = false,
  errorMessage = "Kode salah, coba lagi",
  onVerify,
  onResend,
  className = "",
}) => {
  const [otpValues, setOtpValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (!isOpen) return null;

  // Handle perubahan input per kotak dan auto-focus ke sebelah kanan
  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otpValues];
    newOtp[index] = digit;
    setOtpValues(newOtp);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle tombol backspace untuk pindah mundur
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const combinedOtp = otpValues.join("");
  const isComplete = combinedOtp.length === length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className={`
          relative box-border flex flex-col items-center
          w-full max-w-[832px] h-[516px] bg-white
          shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-[6px]
          p-8 sm:p-12
          ${className}
        `}
      >
        {/* Frame 51: Judul & Subteks */}
        <div className="flex flex-col items-center text-center gap-[29px] w-full max-w-[641px] mt-[65px]">
          <h2 className="font-['Poppins'] font-bold text-[36px] leading-[32px] text-[#1B4E46] m-0">
            Masukkan kode verifikasi
          </h2>
          <p className="font-['Poppins'] font-medium text-[24px] leading-[28px] text-[#1B4E46]/75 m-0">
            Kode dikirim ke {email}
          </p>
        </div>

        {/* Kotak-kotak Input OTP & Pesan Error */}
        <div className="flex flex-col items-center mt-[45px]">
          <div className="flex flex-row justify-center items-center gap-[21px]">
            {otpValues.map((val, idx) => (
              <InputVerifikasi
                key={idx}
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[idx] = el;
                }}
                value={val}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(idx, e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(idx, e)}
              />
            ))}
          </div>
          {isError && (
            <span className="font-['Poppins'] font-normal text-[14px] leading-[20px] text-[#FF4040] mt-[10px]">
              {errorMessage}
            </span>
          )}
        </div>

        {/* Frame 238111: Tombol Verifikasi & Teks Kirim Ulang */}
        <div className="flex flex-col items-center gap-[10px] w-full max-w-[562px] mt-[30px]">
          <ButtonVerifikasi
            isOn={isComplete}
            onClick={() => onVerify && onVerify(combinedOtp)}
          >
            Verifikasi
          </ButtonVerifikasi>

          <button
            type="button"
            onClick={onResend}
            className="font-['Poppins'] font-normal text-[16px] leading-[24px] text-[#1B4E46] bg-transparent border-none cursor-pointer hover:underline p-0"
          >
            Belum mendapat kode? <span className="font-medium">kirim ulang</span>
          </button>
        </div>
      </div>
    </div>
  );
};

OtpVerificationModal.displayName = "OtpVerificationModal";

export default OtpVerificationModal;