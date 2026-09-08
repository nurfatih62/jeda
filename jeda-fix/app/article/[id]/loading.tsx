import { AppShell } from '../../../shared/components/organism/app-shell/app-shell';

export default function Loading() {
  return (
    <AppShell activeSidebarKey="home">
      <main className="bg-background w-full px-17-5 pt-top pb-12-5 text-text-primary">
        <div className="flex max-w-288.75 flex-col items-start gap-banner p-xs mx-auto">
          
          {/* 1. Tombol Kembali skeleton */}
          <div className="h-10 w-10 animate-pulse rounded-md bg-card-border/40" />

          {/* 2. Header Artikel (Avatar & Author Meta) skeleton */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-card-border/40" />
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 animate-pulse rounded bg-card-border/40" />
                <div className="h-3 w-20 animate-pulse rounded bg-card-border/40" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {/* Judul Artikel skeleton */}
              <div className="h-10 w-full animate-pulse rounded-md bg-card-border/40" />
              <div className="h-10 w-3/4 animate-pulse rounded-md bg-card-border/40" />
              {/* Deskripsi skeleton */}
              <div className="h-5 w-full animate-pulse rounded bg-card-border/40 mt-1" />
              <div className="h-5 w-5/6 animate-pulse rounded bg-card-border/40" />
            </div>
          </div>

          {/* 3. Gambar Artikel skeleton */}
          <div className="h-96 w-full animate-pulse rounded-xl bg-card-border/40" />

          {/* 4. Paragraf Isi Artikel skeleton (Dibuat 4 baris) */}
          <div className="flex flex-col gap-4 w-full pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="h-4 w-full animate-pulse rounded bg-card-border/40" />
                <div className="h-4 w-full animate-pulse rounded bg-card-border/40" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-card-border/40" />
              </div>
            ))}
          </div>

          {/* 5. Pagination skeleton */}
          <div className="flex justify-center my-6 w-full">
            <div className="h-10 w-48 animate-pulse rounded-md bg-card-border/40" />
          </div>

          {/* 6. Join Callout & Footer skeleton */}
          <div className="h-32 w-full animate-pulse rounded-xl bg-card-border/40" />
          <div className="h-12 w-full animate-pulse rounded-md bg-card-border/40 my-4" />

          {/* 7. Komentar skeleton */}
          <div className="flex flex-col gap-4 w-full mt-4">
            <div className="h-6 w-36 animate-pulse rounded bg-card-border/40" />
            <div className="h-24 w-full animate-pulse rounded-xl bg-card-border/40" />
            <div className="h-24 w-full animate-pulse rounded-xl bg-card-border/40" />
          </div>

        </div>
      </main>
    </AppShell>
  );
}