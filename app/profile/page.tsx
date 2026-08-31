import { AppShell } from '../../shared/components/organism/app-shell/app-shell';

export default async function ProfilePage() {
  // Simulasi jeda jaringan
  await new Promise((resolve) => setTimeout(resolve, 300));

  return (
    <AppShell activeSidebarKey="profile">
      {/* Menggunakan kelas kanonik untuk padding */}
      <div className="bg-background w-full px-17.5 pt-top pb-12.5">
        
        {/* Container utama profil */}
        <div className="flex max-w-288.75 flex-col items-start gap-banner p-xs">
          
          {/* Header Profil */}
          <div className="flex w-full flex-col gap-gap">
            <h1 className="font-['Poppins'] text-[36px] font-bold leading-[32px] text-text-primary m-0 p-0">
              Profil
            </h1>
          </div>

          {/* Section Informasi / Status Belum Masuk (Guest State) */}
          <div className="flex flex-col items-center pt-top pb-0 gap-3 w-full opacity-80">
            
            <div className="flex flex-col items-start gap-gap-lg max-w-259 w-full">
              <h2 className="font-sans font-bold text-[36px] leading-[32px] text-center w-full text-text-primary">
                Masuk untuk melihat profil Anda
              </h2>
              <p className="font-sans font-medium text-[24px] leading-[28px] text-center w-full text-text-primary/75 max-w-259">
                Ayo masuk untuk melihat informasi akun, artikel yang disimpan, dan pengaturan lainnya.
              </p>
            </div>

            {/* Container Tombol Aksi */}
            <div className="flex flex-row justify-center items-center gap-3 w-50 h-17.5">
              
              {/* Tombol Daftar (Outline) */}
              <div className="flex flex-row items-center">
                <button 
                  className="flex flex-row justify-center items-center h-[40px] w-20.75 border border-[#146C5D] rounded-[6px] bg-transparent cursor-pointer hover:bg-[#146C5D]/10 transition-all px-4 py-2"
                >
                  <span className="font-sans font-medium text-[16px] leading-[24px] text-[#146C5D]">
                    Daftar
                  </span>
                </button>
              </div>

              {/* Tombol Masuk (Solid Primary) */}
              <button 
                className="flex flex-row justify-center items-center h-[40px] w-26.25 bg-[#146C5D] rounded-[6px] border-none cursor-pointer hover:bg-[#115a4e] transition-all shadow-sm px-4 py-2"
              >
                <span className="font-sans font-medium text-[16px] leading-[24px] text-white">
                  Masuk
                </span>
              </button>

            </div>

          </div>

        </div>
      </div>
    </AppShell>
  );
}