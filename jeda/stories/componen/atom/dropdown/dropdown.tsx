"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut } from "lucide-react";

export interface DropdownOption {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  variant?: "filter" | "profile";
  options?: DropdownOption[];
  value?: string | number;
  triggerContent?: React.ReactNode;
  onSelect?: (value: string | number) => void;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  variant = "filter",
  options,
  value,
  triggerContent,
  onSelect,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>(
    value || (variant === "filter" ? "populer" : undefined)
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  const defaultFilterOptions: DropdownOption[] = [
    { label: "Populer", value: "populer" },
    { label: "Terbaru", value: "terbaru" },
  ];

  const defaultProfileOptions: DropdownOption[] = [
    { label: "Lihat Profil", value: "profile" },
    { label: "Keluar", value: "logout", icon: <LogOut className="w-5 h-5 text-[#F08181]" /> },
  ];

  const currentOptions = options || (variant === "profile" ? defaultProfileOptions : defaultFilterOptions);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (optionValue: string | number) => {
    setSelectedValue(optionValue);
    setIsOpen(false);
    if (onSelect) {
      onSelect(optionValue);
    }
  };

  const selectedOption = currentOptions.find((opt) => opt.value === selectedValue);

  return (
    <div ref={dropdownRef} className={`relative inline-flex flex-col items-start gap-1 ${className}`}>
      {/* --- TOMBOL UTAMA / TRIGGER --- */}
      {variant === "filter" ? (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            box-border flex flex-row justify-between items-center
            py-2.5 px-2.5 pl-5 w-58.25 h-10
            bg-white border border-btn-hover rounded-lg
            cursor-pointer select-none outline-none
            transition-all duration-150
          `}
        >
          <span className="font-['Poppins'] font-medium text-sm leading-5 text-btn-hover truncate">
            {selectedOption ? selectedOption.label : "Populer"}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-btn-hover transition-transform duration-200 shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      ) : (
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer inline-block">
          {triggerContent}
        </div>
      )}

      {/* --- KONTAINER MENU DROPDOWN --- */}
      {isOpen && (
        <div
          className={`
            absolute top-full mt-1 z-50
            flex flex-col items-center right-0 origin-top-right
            transition-all duration-200 ease-out
            ${
              variant === "profile"
                ? "w-65 p-[15px_13px] gap-5.25 bg-white shadow-[2px_4px_4px_rgba(0,0,0,0.2)] rounded-md"
                : "w-58.25 p-0 gap-1 bg-transparent rounded-md overflow-hidden"
            }
          `}
        >
          {currentOptions.map((option) => {
            const isActive = selectedValue === option.value;
            const isLogout = option.value === "logout";

            if (variant === "profile") {
              return (
                <div
                  key={option.value}
                  onClick={() => handleItemClick(option.value)}
                  className={`
                    relative box-border flex flex-row items-center justify-between
                    w-58.5 h-8 px-5 py-1.5
                    border rounded-md cursor-pointer transition-all duration-150
                    ${
                      isLogout
                        ? "border-[#F08181] hover:bg-[#FCEBEB]"
                        : "border-[#198876] hover:bg-[#D6FFF8]"
                    }
                  `}
                >
                  <span
                    className={`
                      font-['Poppins'] font-medium text-sm leading-5 truncate
                      ${isLogout ? "text-[#F08181]" : "text-[#198876]"}
                    `}
                  >
                    {option.label}
                  </span>
                  {option.icon && option.icon}
                </div>
              );
            }

            // Varian Filter Item (Tanpa background abu-abu di luar, diganti transparan/gap rapat)
            return (
              <div
                key={option.value}
                onClick={() => handleItemClick(option.value)}
                className={`
                  relative box-border flex flex-row items-center
                  w-58.25 h-8 px-5 py-1.5
                  bg-white rounded-md cursor-pointer transition-all duration-150
                  filter drop-shadow-[0px_4px_6px_rgba(0,0,0,0.09)]
                  border ${isActive ? "border-[#41786F]" : "border-[#198876] hover:bg-[#F0F4F3]"}
                `}
              >
                <span
                  className={`
                    font-['Poppins'] font-medium text-sm leading-5 truncate
                    ${isActive ? "text-[#41786F]" : "text-[#146C5D]"}
                  `}
                >
                  {option.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};