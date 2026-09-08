"use client";

import React, { useState } from "react";
import { InputLogin } from "../../atom/input/input-login/input-login";

export type InputPasswordVariant = "password" | "confirm" | "current";

export interface InputPasswordProps {
  /** Varian password: 'password', 'confirm', atau 'current' */
  variant?: InputPasswordVariant;
  /** Label untuk input */
  label?: string;
  /** Nilai input jika controlled */
  value?: string;
  /** Nilai awal jika uncontrolled */
  defaultValue?: string;
  /** Placeholder input */
  placeholder?: string;
  /** Handler saat link lupa password diklik */
  onForgotPassword?: () => void;
  /** Teks link lupa password */
  forgotPasswordText?: string;
  /** Handler saat nilai berubah */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Tambahan kelas CSS opsional */
  className?: string;
}

export const InputPassword: React.FC<InputPasswordProps> = ({
  variant = "password",
  label,
  value,
  defaultValue = "",
  placeholder,
  onForgotPassword,
  forgotPasswordText = "Lupa password lama?",
  onChange,
  className = "",
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<string>(String(defaultValue));

  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value) : internalValue;

  const isConfirm = variant === "confirm";
  const isCurrent = variant === "current";

  let defaultLabel = "Password Baru";
  let defaultPlaceholder = "Minimal 8 karakter";

  if (isConfirm) {
    defaultLabel = "Konfirmasi Password Baru";
    defaultPlaceholder = "Ulangi password baru";
  } else if (isCurrent) {
    defaultLabel = "Password saat ini";
    defaultPlaceholder = "Masukkan password saat ini";
  }

  const currentLabel = label || defaultLabel;
  const currentPlaceholder = placeholder || defaultPlaceholder;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, text: "Kekuatan password", color: "#CCCCCC" };

    if (pwd.length < 8) {
      return { score: 1, text: "Password minimal 8 karakter", color: "#F08181" };
    }

    let score = 1;
    if (pwd.length >= 10) score++;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    
    if (score > 4) score = 4;
    if (score === 1 && pwd.length >= 8) score = 2;

    switch (score) {
      case 1:
        return { score: 1, text: "Password lemah", color: "#F08181" };
      case 2:
        return { score: 2, text: "Password cukup kuat", color: "#FCBA33" };
      case 3:
        return { score: 3, text: "Password baik", color: "#75BF85" };
      case 4:
      default:
        return { score: 4, text: "Password kuat", color: "#1B4E46" };
    }
  };

  const strength = getPasswordStrength(currentValue);

  return (
    <div
      className={`
        flex flex-col items-start w-141.5
        ${className}
      `}
      {...props}
    >
      <label className="w-full h-10 font-['Poppins'] font-medium text-[16px] leading-10 text-btn-hover">
        {currentLabel}
      </label>

      <div className="mt-2.5 w-full">
        <InputLogin
          type="password"
          value={value}
          defaultValue={defaultValue}
          placeholder={currentPlaceholder}
          onChange={handleChange}
        />
      </div>

      {isCurrent && (
        <button
          type="button"
          onClick={onForgotPassword}
          className="mt-1.5 font-['Poppins'] font-normal text-[14px] leading-6 text-btn-hover underline bg-transparent border-none p-0 cursor-pointer text-left hover:opacity-80 transition-opacity"
        >
          {forgotPasswordText}
        </button>
      )}

      {variant === "password" && (
        <>
          <div className="flex gap-3.25 w-141.5 mt-1.25">
            {[1, 2, 3, 4].map((index) => {
              const isActive = index <= strength.score;
              const barColor = isActive ? strength.color : "rgba(204, 204, 204, 0.8)";
              return (
                <div
                  key={index}
                  className="h-1.75 w-32 rounded-xs transition-colors duration-200"
                  style={{ backgroundColor: barColor }}
                />
              );
            })}
          </div>

          <span
            className="mt-1 font-['Poppins'] font-normal text-[14px] leading-6 text-left transition-colors duration-200"
            style={{ color: currentValue.length === 0 ? "#1B4E46" : strength.color }}
          >
            {strength.text}
          </span>
        </>
      )}
    </div>
  );
};