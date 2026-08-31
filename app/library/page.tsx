import Link from 'next/link';
import { AppShell } from '../../shared/components/organism/app-shell/app-shell';

const FILTER_TABS = ['Terakhir dibaca', 'Artikel disimpan', 'Riwayat suka', 'Komentar'];

interface LibraryPageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const { tab } = await searchParams;
  const activeTab = tab ?? 'Terakhir dibaca';

  return (
    <AppShell activeSidebarKey="library">
      {/* Sesuai Frame 102 */}
      <div className="flex flex-col w-full max-w-326.25 px-xs py-sm gap-banner">
        
        {/* Sesuai Frame 101 */}
        <div className="flex flex-col items-start gap-gap max-w-214.5 w-full">
          
          {/* Frame 100 (Judul Library) */}
          <div className="flex items-center px-2.5 py-2.5 h-13">
            <h1 className="font-sans font-bold text-[36px] leading-[32px] text-text-primary">
              Library
            </h1>
          </div>

          {/* Frame 100 & Frame 99 (Filter Tags Container) */}
          <div className="flex flex-col items-start px-2.5 py-2.5 w-full">
            <div className="flex flex-row items-center gap-gap-lg overflow-x-auto scrollbar-hide w-full">
              {FILTER_TABS.map((filterName, index) => {
                const isActive = activeTab === filterName;
                
                return (
                  <Link
                    key={filterName}
                    href={`/library?tab=${encodeURIComponent(filterName)}`}
                    className={`flex flex-row justify-center items-center rounded-[24px] cursor-pointer whitespace-nowrap transition-all no-underline ${
                      isActive
                        ? 'bg-[#198876] text-white'
                        : 'bg-transparent border border-[#198876] text-[#198876]'
                    }`}
                    style={{
                      padding: '8px 39px',
                      height: index === 0 ? '40px' : '42px',
                    }}
                  >
                    <span className="font-sans font-medium text-[16px] leading-[24px] text-center">
                      {filterName}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Frame 42 (Section Ajakan Bergabung) */}
        <div className="flex flex-col items-center pt-top pb-0 gap-3 max-w-320.75 w-full opacity-80">
          
          {/* Frame 13 */}
          <div className="flex flex-col items-start gap-gap-lg max-w-259 w-full">
            <h2 className="font-sans font-bold text-[36px] leading-[32px] text-center w-full text-text-primary">
              Bergabung untuk mendapat pengalaman lebih
            </h2>
            <p className="font-sans font-medium text-[24px] leading-[28px] text-center w-full text-text-muted">
              Ayo bergabung untuk dapat menyimpan riwayat baca, simpan artikel, suka dan komentar
            </p>
          </div>

          {/* Frame 50 (Button Container) */}
          <div className="flex flex-row justify-center items-center gap-3 w-50 h-17.5">
            
            {/* Frame 41 (Tombol Daftar - Outline) */}
            <div className="flex flex-row items-center">
              <button 
                className="flex flex-row justify-center items-center h-[40px] border border-[#146C5D] rounded-[6px] bg-transparent cursor-pointer hover:bg-[#146C5D]/10 transition-all"
                style={{ padding: '8px 16px' }}
              >
                <span className="font-sans font-medium text-[16px] leading-[24px] text-[#146C5D]">
                  Daftar
                </span>
              </button>
            </div>

            {/* Tombol Masuk (Solid Primary) */}
            <button 
              className="flex flex-row justify-center items-center h-[40px] bg-[#146C5D] rounded-[6px] border-none cursor-pointer hover:bg-[#115a4e] transition-all shadow-sm"
              style={{ width: '105px', padding: '8px 16px' }}
            >
              <span className="font-sans font-medium text-[16px] leading-[24px] text-white">
                Masuk
              </span>
            </button>

          </div>

        </div>

      </div>
    </AppShell>
  );
}