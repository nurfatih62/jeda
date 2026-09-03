import Link from 'next/link';
import { AppShell } from '../../shared/components/organism/app-shell/app-shell';
import { LibraryContent } from './library-content';

interface LibraryPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  const { tab } = await searchParams;

  return (
    <AppShell activeSidebarKey="library">
      <div className="flex flex-col w-full max-w-page px-xs py-sm gap-banner">
        <div className="flex flex-col items-start gap-gap max-w-section w-full">
          <div className="flex items-center px-2.5 py-2.5 h-13">
            <h1 className="font-sans font-bold text-title leading-[32px] text-text-primary">
              Library
            </h1>
          </div>
          <LibraryContent initialTab={tab} />
        </div>
      </div>
    </AppShell>
  );
}