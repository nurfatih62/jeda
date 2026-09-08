"use client";

import { Login } from "@/components/molecule/login/login";

const referenceSections = [
  {
    title: "Login",
    subtitle: "Error state dengan kredensial salah",
    variant: "login" as const,
    props: {
      isError: true,
      errorMessage: "Email atau password salah",
    },
    rows: [
      { state: "Error — kredensial salah", trigger: "Email/password salah", copy: "Email atau password salah" },
      { state: "Error — akun belum diverifikasi", trigger: "Login sebelum verifikasi email", copy: "Akun belum diverifikasi. Cek email kamu (+ link Kirim ulang)" },
      { state: "Error — akun Google-only", trigger: "Login manual pakai email yang daftar via Google", copy: "Akun ini terhubung dengan Google. Login pakai Google" },
      { state: "Error — network", trigger: "Gagal koneksi", copy: "Gagal terhubung. Coba lagi" },
    ],
  },
  {
    title: "Daftar",
    subtitle: "Validasi form dan status real-time",
    note: "Checkbox persetujuan syarat dan ketentuan wajib dicentang sebelum mendaftar.",
    variant: "register" as const,
    props: {
      isError: true,
      errorMessage: "Password minimal 8 karakter",
    },
    rows: [
      { state: "Error — email invalid", trigger: "Format email salah", copy: "Masukkan email yang valid" },
      { state: "Error — email sudah terdaftar", trigger: "Email dipakai akun lain", copy: "Email sudah terdaftar. Coba login" },
      { state: "Error — password lemah", trigger: "Di bawah minimum", copy: "Password minimal 8 karakter" },
      { state: "Error — konfirmasi tidak cocok", trigger: "Real-time saat mengetik", copy: "Password belum cocok" },
      { state: "Success — konfirmasi cocok", trigger: "Real-time saat mengetik", copy: "Password cocok" },
      { state: "Loading", trigger: "Submit form", copy: "Tombol berubah jadi spinner, disabled" },
    ],
  },
  {
    title: "Verifikasi Email (OTP)",
    subtitle: "State untuk kode 4 digit",
    variant: "verification" as const,
    props: {
      isError: true,
      errorMessage: "Kode salah, coba lagi",
      emailTarget: "a*****@gmail.com",
    },
    rows: [
      { state: "Error — kode belum lengkap", trigger: "Submit sebelum 4 digit terisi", copy: "Masukkan 4 digit kode terlebih dahulu" },
      { state: "Error — kode salah", trigger: "OTP tidak cocok", copy: "Kode salah, coba lagi" },
      { state: "Error — kode kadaluarsa", trigger: "Lewat waktu expiry", copy: "Kode sudah kadaluarsa, kirim ulang" },
      { state: "Error — terlalu banyak percobaan", trigger: "Misal 5x salah", copy: "Terlalu banyak percobaan. Coba lagi dalam 5 menit" },
      { state: "Success — verifikasi berhasil", trigger: "Kode benar", copy: "Kode terverifikasi (lalu auto redirect)" },
      { state: "Success — kirim ulang", trigger: "Klik tombol resend", copy: "Kode baru dikirim ke email kamu" },
    ],
  },
  {
    title: "Preferensi (Pilih 3 Kategori)",
    subtitle: "Counter dan disabled state saat belum cukup",
    variant: "category-selection" as const,
    props: {
      // Counter tetap ditampilkan di form; tidak perlu error state
    },
    rows: [
      { state: "Info — belum cukup pilih", trigger: "Kurang dari 3 kategori dipilih", copy: "Counter \"1/3 dipilih\", tombol Lanjut tetap disabled (tanpa pesan error)" },
      { state: "Error — gagal simpan", trigger: "Network gagal saat submit", copy: "Gagal menyimpan preferensi. Coba lagi" },
    ],
  },
  {
    title: "Lupa Password",
    subtitle: "Input email untuk recovery",
    variant: "forgot-password" as const,
    props: {
      isSuccess: true,
      successMessage: "Kode telah dikirim ke emailmu",
    },
    rows: [
      { state: "Error — email tidak ditemukan", trigger: "Email tidak terdaftar", copy: "Email belum terdaftar" },
      { state: "Error — akun Google-only", trigger: "Email itu akun Google", copy: "Akun ini terhubung dengan Google. Login pakai Google" },
      { state: "Success", trigger: "Submit email valid", copy: "Kode telah dikirim ke emailmu" },
      { state: "Loading", trigger: "Submit", copy: "Tombol berubah jadi spinner" },
    ],
  },
  {
    title: "Verifikasi OTP Reset Password",
    subtitle: "Pola state sama seperti verifikasi email",
    note: "Catatan: pola state sama seperti halaman Verifikasi Email (poin 3): kode belum lengkap, kode salah, kode kadaluarsa, terlalu banyak percobaan, verifikasi berhasil, kirim ulang berhasil.",
    variant: "forgot-password-verification" as const,
    props: {
      isError: true,
      errorMessage: "Kode salah, coba lagi",
      emailTarget: "a*****@gmail.com",
    },
    rows: [
      { state: "Error — kode belum lengkap", trigger: "Submit sebelum 4 digit terisi", copy: "Masukkan 4 digit kode terlebih dahulu" },
      { state: "Error — kode salah", trigger: "OTP tidak cocok", copy: "Kode salah, coba lagi" },
      { state: "Error — kode kadaluarsa", trigger: "Lewat waktu expiry", copy: "Kode sudah kadaluarsa, kirim ulang" },
      { state: "Error — terlalu banyak percobaan", trigger: "Misal 5x salah", copy: "Terlalu banyak percobaan. Coba lagi dalam 5 menit" },
      { state: "Success — verifikasi berhasil", trigger: "Kode benar", copy: "Kode terverifikasi (lalu auto redirect)" },
      { state: "Success — kirim ulang", trigger: "Klik tombol resend", copy: "Kode baru dikirim ke email kamu" },
    ],
  },
  {
    title: "Reset Password",
    subtitle: "Ubah password baru dan validasi ulang",
    variant: "reset-password" as const,
    props: {
      isSuccess: true,
      successMessage: "Password berhasil direset",
    },
    rows: [
      { state: "Error — password lemah", trigger: "Di bawah minimum", copy: "Password minimal 8 karakter" },
      { state: "Error — konfirmasi tidak cocok", trigger: "Real-time saat mengetik", copy: "Password belum cocok" },
      { state: "Error — sama dengan password lama", trigger: "Opsional, best practice", copy: "Password baru harus berbeda dari sebelumnya" },
      { state: "Success", trigger: "Submit valid", copy: "Password berhasil direset (lalu redirect ke Login)" },
      { state: "Loading", trigger: "Submit", copy: "Tombol berubah jadi spinner" },
    ],
  },
];

export default function AuthReferencePage() {
  return (
    <main className="min-h-screen w-full bg-text-primary px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl rounded-xl bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.12)] md:p-8">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Reference</p>
          <h1 className="mt-2 text-3xl font-bold text-text-primary md:text-4xl">UI Copy & State Reference</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 md:text-base">
            Panduan copy, state, dan perilaku untuk alur login, daftar, verifikasi, preferensi, lupa password, dan reset password.
          </p>
        </header>

        <div className="grid gap-6 xl:grid-cols-2">
          {referenceSections.map((section) => (
            <section key={section.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4 md:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-text-primary">{section.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{section.subtitle}</p>
                  {section.note ? (
                    <p className="mt-1 text-xs italic text-slate-500">{section.note}</p>
                  ) : null}
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                  Preview
                </span>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <Login
                  variant={section.variant}
                  emailTarget={section.props.emailTarget ?? "a*****@gmail.com"}
                  isError={section.props.isError ?? false}
                  errorMessage={section.props.errorMessage ?? "Email atau password salah"}
                  isSuccess={section.props.isSuccess ?? false}
                  successMessage={section.props.successMessage ?? "Kode telah dikirim ke emailmu"}
                  onClose={() => undefined}
                  onSubmit={() => undefined}
                />
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-3 py-2 font-semibold">State</th>
                      <th className="px-3 py-2 font-semibold">Trigger</th>
                      <th className="px-3 py-2 font-semibold">Tulisan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row) => (
                      <tr key={`${section.title}-${row.state}`} className="border-t border-slate-200 align-top">
                        <td className="px-3 py-2 font-medium text-slate-800">{row.state}</td>
                        <td className="px-3 py-2 text-slate-600">{row.trigger}</td>
                        <td className="px-3 py-2 text-slate-700">{row.copy}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}