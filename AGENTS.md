# AGENTS.md — jeda-fix (Platform Artikel & Blog)

## Tentang Proyek

Aplikasi web untuk membaca, menulis, dan mengelola artikel/blog. Tiga peran
pengguna: **Reader**, **Author**, **Admin**. Satu akun bisa punya peran ganda
(reader yang jadi author tetap punya semua akses reader) — status author
bersifat **additive** (flag `is_author`), bukan menggantikan peran reader.
Admin adalah akun **eksklusif**, terpisah dari akun reader/author (tidak
merangkap, untuk menghindari conflict of interest saat moderasi).

Pendaftaran menjadi Author bersifat **self-service**, tanpa alur
approval/pengajuan ke admin. Fitur "Editorial Pick" dan "Pengajuan Author
(approval)" **tidak** dipakai di versi ini.

Dokumen sumber kebenaran (source of truth) untuk requirement produk:
`docs/PRD-Platform-Artikel.docx` (atau versi markdown-nya jika sudah
dikonversi). Jika ada perbedaan antara kode dan PRD, tanyakan ke user alih-alih
menebak.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript 5
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/postcss`)
- **Package manager:** pnpm (`pnpm@11.21.0`) — jangan pakai npm/yarn
- **Komponen & dokumentasi UI:** Storybook 10 (`@storybook/nextjs-vite`)
- **Testing:** Vitest (+ `@vitest/browser-playwright`, `@vitest/coverage-v8`),
  Playwright untuk browser testing, `@storybook/addon-vitest` untuk story
  testing, `@storybook/addon-a11y` untuk accessibility check
- **Linting:** ESLint 9 (`eslint-config-next`)

## Perintah Penting

```bash
pnpm dev              # jalankan dev server
pnpm build             # production build
pnpm start             # jalankan production build
pnpm lint              # jalankan ESLint
pnpm storybook          # jalankan Storybook di :6006
pnpm build-storybook     # build Storybook statis
```

Selalu jalankan `pnpm lint` setelah mengubah kode sebelum menganggap task
selesai. Jika mengubah/menambah komponen UI, cek juga apakah perlu story baru
di Storybook (project ini eksplisit pakai Storybook untuk mendokumentasikan
komponen & state-nya — lihat bagian Design System di bawah).

## Struktur Peran & Akses

| Peran  | Deskripsi | Akses utama |
|--------|-----------|--------------|
| Reader | Membaca, menyukai, berkomentar, menyimpan artikel | Homepage, detail artikel, profil, bookmark/library |
| Author | Reader yang juga menulis artikel (self-service) | Semua akses reader + dashboard author |
| Admin  | Mengelola pengguna, moderasi konten, kategori | Dashboard admin (akun terpisah/eksklusif) |

## Fitur Inti per Peran

**Reader:** homepage personalized (login) / umum (guest), baca artikel penuh
tanpa login, like & komentar (butuh login), artikel terkait, bookmark, riwayat
baca + "lanjutkan membaca", search, report artikel/komentar, profil publik
author.

**Author:** tulis artikel (judul, cover, isi, ringkasan, kategori, tag),
draft/publish dengan auto-save, edit & unpublish, dashboard performa
(views/likes/komentar), statistik detail per artikel (grafik, traffic,
komentar terbaru), kelola komentar masuk.

**Admin:** dashboard ringkasan platform, manajemen pengguna (search, filter
role, suspend/aktifkan), moderasi laporan (hapus/peringatkan/tolak), riwayat
laporan (Ditindak/Ditolak dengan siapa & kapan), kelola kategori & tag.

## Logika Rekomendasi "Artikel Terkait"

- Login + sudah punya histori like → **personalized** (berdasar kategori/tag
  artikel yang pernah disukai)
- Login + belum ada histori like → **content-based** (kategori/tag artikel
  yang sedang dibaca)
- Belum login → content-based, fallback ke artikel populer

Tampilkan **3–4 artikel** per halaman detail (sengaja dibatasi untuk
menghindari paradox of choice).

## Alur Kunci

- **Setelah baca artikel** → like/komentar → tampil "Artikel Terkait" →
  scroll lebih jauh → "Artikel Populer" / tombol "Lihat Semua Artikel" →
  masuk ke halaman **Explore** (bukan homepage), dengan filter kategori
  otomatis sesuai artikel terakhir dibaca. Homepage hanya dicapai lewat
  navigasi utama, tidak ada redirect paksa.
- **Publikasi artikel** → draft (auto-save) atau publish langsung → artikel
  baru masuk feed "Terbaru" (by waktu). Status "Populer" bersifat **earned**
  (butuh engagement tertentu dalam periode tertentu), bukan otomatis saat
  publish.
- **Reader belum login** → artikel tetap bisa dibaca penuh; like/komentar
  tampil non-aktif dengan ajakan login; tidak ada modal paksa saat buka
  artikel — ajakan login hanya muncul di titik interaksi.
- **Moderasi laporan** → Reader lapor → masuk antrian "Pending" → Admin pilih
  aksi (Hapus / Peringatkan / Tolak) → pindah ke tab "Ditindak" atau
  "Ditolak" dengan catatan siapa & kapan.

## Aturan Bisnis Penting (jangan dilanggar tanpa konfirmasi)

- Status Author **tidak pernah** menghapus akses/riwayat Reader di akun yang
  sama.
- Admin **tidak bisa** dibuat lewat self-service; pemberian akses admin
  dilakukan manual/internal, di luar alur produk.
- Kategori/tag artikel **tidak** memakai warna semantic (success/warning/
  danger) — warna itu khusus untuk status, bukan dekorasi.
- Satu halaman idealnya hanya punya **satu tombol primary** (CTA utama).
- Empty state, error state (halaman penuh), dan toast/snackbar adalah **tiga
  komponen berbeda** dengan perilaku berbeda (durasi, blocking/non-blocking)
  — jangan digabung jadi satu komponen generik.
- Kebijakan yang **belum diputuskan** (jangan asumsikan implementasi tanpa
  tanya user dulu):
  - Notifikasi ke reader saat artikel yang sudah dibaca diedit signifikan.
  - Nasib bookmark/like saat artikel yang direferensikan dihapus (rekomendasi
    saat ini: tampil sebagai "artikel tidak tersedia", bukan hilang total).

## Prioritas MVP vs NTV (Next To Have)

Saat implementasi, **dahulukan MVP**; fitur NTV hanya dikerjakan jika
diminta eksplisit oleh user.

| Area | MVP | NTV (nanti) |
|------|-----|--------------|
| Author | Draft/publish, edit setelah publish, unpublish/hapus, analytics dasar | Scheduling publish, notifikasi like/komentar, moderasi komentar sendiri, multi-author |
| Reader | Sync guest→login, search dasar, report konten, reading progress (level artikel) | Follow author, bookmark folder, notifikasi granular, reading progress presisi, multi-device sync |
| Admin | Manajemen pengguna, moderasi laporan, kelola kategori/tag | Analytics platform mendalam, banner/pengumuman, filter kata otomatis |

## Design System

Referensi lengkap ada di PRD bagian 8 (Color Token, Daftar Komponen, Cakupan
State). Poin penting untuk development:

- Warna pakai **role-based token** (mis. `primary`, `text-primary`,
  `surface-1`, `danger`), bukan nama warna literal — implementasikan sebagai
  CSS variable/Tailwind theme token, satu titik ubah untuk seluruh tema.
- Setiap komponen interaktif idealnya dibuatkan story untuk semua state-nya
  (Default, Hover, Disabled, Error, Loading/Skeleton, dst) di Storybook —
  jangan cuma bikin versi default.
- Border kiri tipis + ikon berwarna untuk toast (bukan background solid
  penuh warna).

## Catatan Implementasi Teknis

- Homepage adalah **satu template**, dua mode data source
  (personalized-first vs popularity-first) — bukan dua halaman terpisah.
- Section "Sedang Populer" tetap tampil saat login, hanya beda urutan
  prioritas (di bawah rekomendasi personal).
- Kategori, hasil search, dan library butuh dropdown sort (popular/terbaru).
- Hasil search menampilkan dua tipe hasil: artikel dan profil (author).

## Konvensi Kerja untuk Agent

- Selalu cek PRD dulu untuk keputusan UX/alur sebelum menebak — banyak
  keputusan sudah eksplisit didokumentasikan (lihat di atas).
- Kalau ada requirement yang belum jelas/belum diputuskan di PRD, tanyakan
  ke user, jangan berasumsi diam-diam.
- Gunakan TypeScript strict — hindari `any` kecuali benar-benar diperlukan.
- Jalankan `pnpm lint` sebelum menyatakan task selesai.
