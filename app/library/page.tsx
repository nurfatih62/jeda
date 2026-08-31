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
      <div className="flex flex-col items-start px-3 py-3 gap-12 w-full max-w-326 min-h-192">
        
        {/* Frame 101: Header & Filter Tags */}
        <div className="flex flex-col items-start gap-gap w-full max-w-214">
          
          {/* Frame 100: Judul Library */}
          <div className="flex flex-row justify-center items-center p-2.5 gap-2.5">
            <h1 className="font-sans font-bold text-4xl leading-8 text-text-primary">
              Library
            </h1>
          </div>

          {/* Frame 100 & 99: Tags Filter */}
          <div className="flex flex-col items-start p-2.5 gap-2.5 w-full">
            <div className="flex flex-row items-center gap-gap-lg overflow-x-auto scrollbar-hide w-full">
              {FILTER_TABS.map((filterName) => {
                const isActive = activeTab === filterName;
                return (
                  <button
                    key={filterName}
                    className={`box-border flex flex-row justify-center items-center px-10 py-2 gap-2.5 rounded-3xl cursor-pointer whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-primary border border-primary text-white'
                        : 'bg-transparent border border-primary text-primary hover:bg-primary-overlay-hover'
                    }`}
                  >
                    <span className="font-sans font-medium text-base leading-6 text-center">
                      {filterName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Frame 42: Section Kartu Ajakan Bergabung */}
        <div className="flex flex-col items-center pt-9 pr-0 pb-0 pl-0 gap-3 w-full max-w-7xl opacity-80 self-stretch">
          
          {/* Frame 13: Teks Informasi */}
          <div className="flex flex-col items-start gap-gap-lg w-full max-w-259">
            <h2 className="font-sans font-bold text-4xl leading-8 text-center text-text-primary w-full">
              Bergabung untuk mendapat pengalaman lebih
            </h2>
            <p className="font-sans font-medium text-2xl leading-7 text-center text-text-muted w-full">
              Ayo bergabung untuk dapat menyimpan riwayat baca, simpan artikel, suka dan komentar
            </p>
          </div>

          {/* Frame 50: Tombol Aksi (Daftar & Masuk) */}
          <div className="flex flex-row justify-center items-center gap-3 mt-4">
            {/* Tombol Daftar (Outline) */}
            <div className="flex flex-row items-center gap-2.5">
              <button className="box-border flex flex-row justify-center items-center px-4 py-2 gap-2.5 h-10 border border-primary rounded-md bg-transparent cursor-pointer hover:bg-primary-overlay-hover transition-colors">
                <span className="font-sans font-medium text-base leading-6 text-primary">
                  Daftar
                </span>
              </button>
            </div>

            {/* Tombol Masuk (Solid Primary) */}
            <button className="flex flex-row justify-center items-center px-5 py-2 h-10 bg-primary rounded-md border-none cursor-pointer hover:bg-primary-hover transition-colors">
              <span className="font-sans font-medium text-base leading-6 text-white">
                Masuk
              </span>
            </button>
          </div>

        </div>

      </div>
    </AppShell>
  );
}