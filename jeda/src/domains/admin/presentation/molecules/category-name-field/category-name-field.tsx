"use client";

import React from "react";

export interface CategoryNameFieldProps {
  /** Label di atas input */
  label?: string;
  /** Nilai input (controlled) */
  value?: string;
  /** Handler perubahan */
  onChange?: (value: string) => void;
  /** Placeholder input */
  placeholder?: string;
  /** ID input untuk asosiasi label */
  id?: string;
  className?: string;
}

export const CategoryNameField: React.FC<CategoryNameFieldProps> = ({
  label = "Nama Kategori",
  value = "",
  onChange,
  placeholder = "Masukkan nama kategori",
  id = "categoryName",
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-[16px] font-medium text-[#1B4E46]">
        {label}
      </label>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-[6px] border border-[#146C5D]/30 px-4 py-2.5 text-[16px] text-gray-800 outline-none transition-all focus:border-[#146C5D] focus:ring-1 focus:ring-[#146C5D]"
        required
      />
    </div>
  );
};

CategoryNameField.displayName = "CategoryNameField";

export default CategoryNameField;
