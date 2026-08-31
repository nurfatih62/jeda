"use client";

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

export interface SortSelectProps {
  options: string[];
  /** Nama query param di URL, default "sort" */
  paramName?: string;
  defaultValue?: string;
  /** Label buat screen reader (input butuh label, bukan cuma visual) */
  label?: string;
}

/**
 * Dropdown sort URL-driven — ganti pilihan = navigasi ?sort=... baru,
 * server re-render dengan data sesuai urutan yang dipilih. Konsisten
 * sama pola Tabs/TopicTags yang lain (semuanya lewat query param, bukan
 * client state), jadi bisa di-bookmark & tombol back/forward jalan normal.
 */
export function SortSelect({
  options,
  paramName = 'sort',
  defaultValue = options[0],
  label = 'Urutkan artikel',
}: SortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams.get(paramName) ?? defaultValue;

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramName, e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <label className="relative inline-flex w-58 items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={handleChange}
        className="font-nunito h-10 w-full appearance-none rounded-md border border-text-primary bg-background py-2 pl-5 pr-10 text-sm text-text-primary transition-colors hover:bg-primary-overlay-hover focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={20}
        strokeWidth={2}
        className="pointer-events-none absolute right-2.5 text-primary"
      />
    </label>
  );
}
