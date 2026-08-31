"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

export interface SortSelectProps {
  options: string[];
  paramName?: string;
  defaultValue?: string;
  label?: string;
}

export function SortSelect({
  options,
  paramName = 'sort',
  defaultValue = options[0],
  label = 'Urutkan artikel',
}: SortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(paramName) ?? defaultValue;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown jika pengguna klik di luar komponen
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, option);
    router.push(`${pathname}?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-flex w-58.25 select-none" ref={dropdownRef}>
      <span className="sr-only">{label}</span>
      
      {/* Tombol Utama Dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={label}
        className="font-nunito font-medium text-[14px] leading-5 h-8 w-58.25 flex items-center justify-between rounded-[6px] border border-[#198876] bg-white py-0 pl-gap-lg pr-3 text-[#198876] shadow-[0px_4px_6px_rgba(0,0,0,0.09)] transition-colors hover:bg-primary-overlay-hover focus:outline-none focus:ring-2 focus:ring-[#198876]"
      >
        <span>{currentValue}</span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`text-[#198876] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Menu Dropdown List (100% kustom, bersih dari warna abu-abu browser) */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-58.25 overflow-hidden rounded-[6px] border border-[#198876] bg-white shadow-[0px_4px_6px_rgba(0,0,0,0.09)] z-50 flex flex-col">
          {options.map((opt) => {
            const isSelected = currentValue === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`font-nunito font-medium text-[14px] leading-5 h-8 w-full text-left px-gap-lg flex items-center transition-colors ${
                  isSelected
                    ? 'bg-[#E6F4F1] text-[#198876]' 
                    : 'bg-white text-[#198876] hover:bg-primary-overlay-hover'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}