import { AppShell } from '../../shared/components/organism/app-shell/app-shell';

export default function Loading() {
  return (
    <AppShell activeSidebarKey="library">
      <main className="px-xs py-sm">
        <div className="flex flex-col items-start gap-12 w-full max-w-page min-h-192">
          
          {/* 1. Header & Filter Tabs Library */}
          <div className="flex flex-col items-start gap-gap w-full max-w-section">
            <div className="p-2.5">
              <div className="h-9 w-32 animate-pulse rounded-sm bg-card-border/40" />
            </div>

            <div className="flex flex-col items-start p-2.5 w-full">
              <div className="flex flex-row items-center gap-gap-lg overflow-x-auto w-full">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-10.5 w-38 shrink-0 animate-pulse rounded-pill bg-card-border/40"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 2. Section Ajakan Bergabung */}
          <div className="flex flex-col items-center pt-top pr-0 pb-0 pl-0 gap-3 w-full max-w-card self-stretch">
            <div className="flex flex-col items-start gap-gap-lg w-full max-w-content">
              <div className="h-9 w-full animate-pulse rounded-sm bg-card-border/40" />
              <div className="h-14 w-full animate-pulse rounded-sm bg-card-border/40" />
            </div>

            <div className="flex flex-row justify-center items-center gap-3 mt-4">
              <div className="h-10 w-20 animate-pulse rounded-sm bg-card-border/40" />
              <div className="h-10 w-20 animate-pulse rounded-sm bg-card-border/40" />
            </div>
          </div>

        </div>
      </main>
    </AppShell>
  );
}