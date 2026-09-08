"use client";

import React from 'react';
// Pastikan jalur impor ini mengarah dengan benar ke folder shared/components tempat Pagination kamu berada
import { Pagination } from '../../../shared/components/molecule/pagination/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

interface ArticlePaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ArticlePagination({ currentPage, totalPages }: ArticlePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex justify-center my-4 w-full">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page: number) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set('page', page.toString());
          router.push(`?${params.toString()}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}