import { AppShell } from '../../shared/components/organism/app-shell/app-shell';

export default async function ProfilePage() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return (
    <AppShell activeSidebarKey="profile">
      <div className="flex flex-col items-start px-3 py-3 gap-12 w-full max-w-326 min-h-192">
        
        {/* Frame 101: Header Profil */}
        <div className="flex flex-col items-start gap-gap w-full max-w-214">
          
          {/* Frame 100: Judul Profil */}
          <div className="flex flex-row justify-center items-center p-2.5 gap-2.5">
            <h1 className="font-sans font-bold text-4xl leading-8 text-text-primary">
              Profil
            </h1>
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
              Ayo bergabung untuk dapat membuat profil menyesuaikan dengan dirimu, dilihat oleh orang lain dan pengalaman lainnya
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