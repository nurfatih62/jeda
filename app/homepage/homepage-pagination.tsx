"use client";

import React from 'react';
import { Pagination } from '../../shared/components/molecule/pagination/pagination';
import { useRouter } from 'next/navigation';

interface HomepagePaginationProps {
  currentPage: number;
  totalPages: number;
  activeTab: string;
}

export function HomepagePagination({ currentPage, totalPages, activeTab }: HomepagePaginationProps) {
  const router = useRouter();

  return (
    <div className="flex justify-center my-6 w-full">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          router.push(`/homepage?tab=${activeTab}&page=${page}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}