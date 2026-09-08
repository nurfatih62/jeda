"use client";

import React, { useState, forwardRef } from "react";

export interface InputVerifikasiProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Nilai awal jika menggunakan uncontrolled component */
  defaultValue?: string | number;
}

export const InputVerifikasi = forwardRef<HTMLInputElement, InputVerifikasiProps>(({
  value,
  defaultValue = "",
  onChange,
  className = "",
  maxLength = 1,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState<string | number>(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isControlled) {
      setInternalValue(val);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <input
      ref={ref}
      type="text"
      maxLength={maxLength}
      value={currentValue}
      onChange={handleChange}
      className={`
        box-border w-18 h-20.25
        bg-sidebar-text-hover rounded-md
        font-['Poppins'] font-bold text-[28px] text-center
        outline-none transition-all duration-150
        border border-[#C2C7D0] hover:border-btn-hover focus:border-btn-hover
        text-btn-hover
        ${className}
      `}
      {...props}
    />
  );
});

InputVerifikasi.displayName = "InputVerifikasi";