import { AppShell } from '../../shared/components/organism/app-shell/app-shell';

export default function Loading() {
  return (
    <AppShell activeSidebarKey="profile">
      <main className="px-3 py-3">
        <div className="flex flex-col items-start gap-12 w-full max-w-326 min-h-192">
          
          {/* 1. Header Profil */}
          <div className="flex flex-col items-start gap-gap w-full max-w-214">
            <div className="p-2.5">
              <div className="h-9 w-28 animate-pulse rounded-md bg-card-border/40" />
            </div>
          </div>

          {/* 2. Section Ajakan Bergabung */}
          <div className="flex flex-col items-center pt-9 pr-0 pb-0 pl-0 gap-3 w-full max-w-7xl self-stretch">
            <div className="flex flex-col items-start gap-gap-lg w-full max-w-259">
              <div className="h-9 w-full animate-pulse rounded-md bg-card-border/40" />
              <div className="h-14 w-full animate-pulse rounded-md bg-card-border/40" />
            </div>

            <div className="flex flex-row justify-center items-center gap-3 mt-4">
              <div className="h-10 w-20 animate-pulse rounded-md bg-card-border/40" />
              <div className="h-10 w-20 animate-pulse rounded-md bg-card-border/40" />
            </div>
          </div>

        </div>
      </main>
    </AppShell>
  );
}