"use client";

import React, { useState } from "react";
import { ButtonTags } from "../../../atom/button/button-tags/button-tags";
import { SendLoginButton } from "../../../atom/button/send-login-button/send-login-button";

interface CategorySelectionModalProps {
  categories?: string[];
  maxSelection?: number;
  onSubmit?: (selectedCategories: string[]) => void;
}

export const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  categories = [
    "Teknologi",
    "Kehidupan",
    "Wisata",
    "Pekerjaan",
    "Pengembangan diri",
    "Makanan",
  ],
  maxSelection = 3,
  onSubmit,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (category: string) => {
    if (selected.includes(category)) {
      setSelected(selected.filter((item) => item !== category));
    } else {
      if (selected.length < maxSelection) {
        setSelected([...selected, category]);
      }
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(selected);
    }
  };

  return (
    <div className="relative w-208 h-133.5 bg-white shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-md box-border p-8 mx-auto flex flex-col items-center justify-between">
      {/* Header Section */}
      <div className="flex flex-col items-center gap-7.25 max-w-160.25 mt-11.25 w-full">
        <h1 className="font-poppins font-bold text-[36px] leading-8 text-center text-[#1B4E46] m-0">
          Pilih 3 kategori favoritmu
        </h1>
        <p className="font-poppins font-medium text-[24px] leading-7 text-center text-[rgba(27,78,70,0.75)] m-0">
          Buat rekomendasi bacaan lebih sesuai seleramu
        </p>
      </div>

      {/* Tags Container */}
      <div className="flex flex-wrap justify-center gap-3 max-w-170 my-4">
        {categories.map((category) => {
          const isSelected = selected.includes(category);
          const isDisabled = !isSelected && selected.length >= maxSelection;

          return (
            <ButtonTags
              key={category}
              label={category}
              active={isSelected}
              disabled={isDisabled}
              onClick={() => handleToggle(category)}
            />
          );
        })}
      </div>

      {/* Footer Section */}
      <div className="flex flex-col items-center gap-2.5 max-w-140.5 mb-7.5 w-full">
        <div className="w-full text-left font-poppins font-normal text-[16px] leading-6 text-[#1B4E46]">
          {selected.length}/{maxSelection} dipilih
        </div>
        <SendLoginButton
          disabled={selected.length === 0}
          onClick={handleSubmit}
          className="w-full h-13.5 bg-[rgba(20,108,93,0.5)] hover:bg-[rgba(20,108,93,0.8)] text-white font-medium text-[20px] rounded-md"
        >
          Masuk
        </SendLoginButton>
      </div>
    </div>
  );
};

export default CategorySelectionModal;