"use client";

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { RefreshCw } from 'lucide-react';

/**
 * Refresh data tanpa full page reload — router.refresh() bikin Next.js
 * re-jalanin Server Component (page.tsx) di server, dapat data faker baru.
 * isPending dari useTransition otomatis jadi indikator loading (icon spin).
 */
export function RefreshButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRefresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleRefresh}
      disabled={isPending}
      aria-label="Segarkan data"
      className="font-sans mb-6 flex items-center gap-1.5 text-sm font-medium text-primary hover:underline disabled:pointer-events-none disabled:opacity-50"
    >
      <RefreshCw size={16} strokeWidth={2} className={isPending ? 'animate-spin' : ''} />
      Refresh
    </button>
  );
}
