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
    <div className="relative inline-flex w-(--width-sort) select-none" ref={dropdownRef}>
      <span className="sr-only">{label}</span>
      
      {/* Tombol Utama Dropdown */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={label}
        className="font-nunito font-medium text-(length:--font-size-sm) leading-5 h-8 w-(--width-sort) flex items-center justify-between rounded-sm border border-sort-accent bg-background py-0 pl-gap-lg pr-3 text-sort-accent shadow-[0px_4px_6px_rgba(0,0,0,0.09)] transition-colors hover:bg-primary-overlay-hover focus:outline-none focus:ring-2 focus:ring-sort-accent"
      >
        <span>{currentValue}</span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={`text-sort-accent transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Menu Dropdown List */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-(--width-sort) overflow-hidden rounded-sm border border-sort-accent bg-background shadow-[0px_4px_6px_rgba(0,0,0,0.09)] z-50 flex flex-col">
          {options.map((opt) => {
            const isSelected = currentValue === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelect(opt)}
                className={`font-nunito font-medium text-(length:--font-size-sm) leading-5 h-8 w-full text-left px-gap-lg flex items-center transition-colors ${
                  isSelected
                    ? 'bg-sort-selected-bg text-sort-accent' 
                    : 'bg-background text-sort-accent hover:bg-primary-overlay-hover'
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