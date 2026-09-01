"use client";

import React from 'react';
import { Button } from '@/components/atom/button/button';

export interface PaginationProps {
  /** Halaman saat ini */
  currentPage: number;
  /** Total halaman */
  totalPages: number;
  /** Callback saat tombol halaman atau navigasi diklik */
  onPageChange: (page: number) => void;
  /** Kelas tambahan opsional */
  className?: string;
}

// Fungsi helper untuk menghasilkan daftar halaman dengan elipsis (...)
function getPaginationPages(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total];
  }

  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, '...', current - 1, current, current + 1, '...', total];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex items-center justify-center gap-2 md:gap-3 flex-wrap ${className}`}
    >
      {/* Tombol Sebelumnya */}
      <Button
        variant="primary"
        colorState="default"
        arrow="left"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Sebelumnya
      </Button>

      {/* Daftar Nomor Halaman & Elipsis */}
      <div className="flex items-center gap-1.5 md:gap-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-text-muted font-medium select-none"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Button
              key={pageNum}
              variant={isActive ? 'primary' : 'outline'}
              colorState="default"
              onClick={() => onPageChange(pageNum)}
              className="w-10 px-0"
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      {/* Tombol Berikutnya */}
      <Button
        variant="primary"
        colorState="default"
        arrow="right"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Berikutnya
      </Button>
    </nav>
  );
}