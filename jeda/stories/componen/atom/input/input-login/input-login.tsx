"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputLoginProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Nilai awal jika menggunakan uncontrolled component */
  defaultValue?: string | number;
  /** Tipe input (text, password, dll) */
  type?: "text" | "password" | "email";
}

export const InputLogin: React.FC<InputLoginProps> = ({
  value,
  defaultValue = "",
  onChange,
  placeholder = "nama@gmail.com",
  className = "",
  type = "text",
  ...props
}) => {
  const [internalValue, setInternalValue] = useState<string | number>(defaultValue);
  const [showPassword, setShowPassword] = useState(false);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Cek apakah input memiliki isi
  const hasValue = String(currentValue).length > 0;
  const isPasswordType = type === "password";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Tentukan tipe input aktual berdasarkan status showPassword
  const inputType = isPasswordType ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`relative inline-flex items-center w-141.5 h-10 ${className}`}>
      <input
        type={inputType}
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`
          box-border w-full h-full px-4 py-2.5
          bg-sidebar-text-hover rounded-lg font-['Poppins'] font-medium text-[14px] leading-5
          outline-none transition-all duration-150
          placeholder:text-[#CCCCCC]
          /* Menyembunyikan ikon mata dan tombol clear bawaan browser (Edge/IE/Chrome) */
          [&::-ms-reveal]:hidden [&::-ms-clear]:hidden
          ${isPasswordType ? "pr-12" : ""}
          ${
            hasValue
              ? "border border-btn-hover text-btn-hover"
              : "border border-[#C2C7D0] text-btn-hover"
          }
        `}
        {...props}
      />

      {/* Tombol Toggle Ikon Password (Hanya milik atom InputLogin) */}
      {isPasswordType && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#CCCCCC] hover:text-btn-hover transition-colors focus:outline-none"
          aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
        >
          {showPassword ? (
            <Eye className="w-5 h-3.25" />
          ) : (
            <EyeOff className="w-5 h-3.25" />
          )}
        </button>
      )}
    </div>
  );
};