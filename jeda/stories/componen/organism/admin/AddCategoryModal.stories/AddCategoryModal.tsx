import React, { useState } from "react";
import { CategoryNameField } from "../../../molecule/category-name-field/category-name-field";
import { StatusSegmentedControl } from "../../../molecule/status-segmented-control/status-segmented-control";

export interface AddCategoryModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (data: { name: string; isActive: boolean }) => void;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen = true,
  onClose,
  onSubmit,
}) => {
  const [categoryName, setCategoryName] = useState("");
  const [isActive, setIsActive] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ name: categoryName, isActive });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 font-['Poppins',sans-serif]">
      {/* Modal Card */}
      <div className="relative w-full max-w-[689px] rounded-[6px] bg-white p-6 shadow-[2px_4px_4px_rgba(0,0,0,0.2)] md:p-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded-full text-[#1B4E46] transition-colors hover:bg-gray-100"
            aria-label="Close Modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <h2 className="text-[24px] font-bold leading-[32px] text-[#1B4E46]">
            Tambah kategori
          </h2>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
          {/* Input Nama Kategori → molecule CategoryNameField */}
          <CategoryNameField value={categoryName} onChange={setCategoryName} />

          {/* Status Awal Selection → molecule StatusSegmentedControl */}
          <StatusSegmentedControl
            value={isActive}
            onSelectInactive={() => setIsActive(false)}
            onSelectActive={() => setIsActive(true)}
          />

          {/* Submit Button */}
          <div className="mt-4 flex flex-col items-center">
            <button
              type="submit"
              className="h-[54px] w-full max-w-[562px] rounded-[6px] bg-[#146C5D] text-[20px] font-medium text-white transition-opacity hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#146C5D] focus:ring-offset-2"
            >
              Simpan kategori
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
