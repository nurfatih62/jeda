# Platform Artikel & Blog — Project Context

> Dokumen ini adalah gabungan Product Requirements Document (PRD) + tech stack proyek, disusun agar AI coding assistant (opencode) memahami tujuan, fitur, alur, dan aturan desain proyek secara lengkap sebelum mulai membangun/mengedit kode.

---

## 0. Tech Stack (dari `package.json`)

- **Project name:** `jeda-fix`
- **Framework:** Next.js `16.3.1` (App Router diasumsikan, konfirmasi ke struktur folder yang ada)
- **UI library:** React `19.2.8` + React DOM `19.2.8`
- **Styling:** Tailwind CSS `^4` (via `@tailwindcss/postcss`)
- **Icons:** `lucide-react ^0.577.0`
- **Mock/dummy data:** `@faker-js/faker ^10.6.0` — dipakai untuk generate data dummy (artikel, user, komentar, dsb) selama belum ada backend nyata
- **Language:** TypeScript `^5`
- **Package manager:** pnpm `11.21.0` (wajib pakai pnpm, bukan npm/yarn)
- **Linting:** ESLint `^9` + `eslint-config-next`
- **Component dev & docs:** Storybook `10.5.9` (`storybook dev -p 6006`, `storybook build`), dengan addon: a11y, docs, mcp, vitest
- **Testing:** Vitest + `@vitest/browser-playwright` + `@vitest/coverage-v8`, Playwright, Chromatic untuk visual testing Storybook

**Scripts:**
| Script | Perintah |
|---|---|
| `pnpm dev` | `next dev` |
| `pnpm build` | `next build` |
| `pnpm start` | `next start` |
| `pnpm lint` | `eslint` |
| `pnpm storybook` | `storybook dev -p 6006` |
| `pnpm build-storybook` | `storybook build` |

**Implikasi untuk pengembangan:**
- Semua komponen UI idealnya dibuat/didokumentasikan sebagai Storybook story (lihat §8 untuk daftar komponen & state yang wajib ada).
- Karena belum ada dependency data-fetching/backend (tidak ada Prisma, tRPC, Supabase, dsb di `package.json`), asumsikan fase ini masih **frontend-first dengan data dummy (faker)** — struktur data & interaksi harus dibuat modular supaya gampang disambungkan ke backend/API asli nanti.
- Tailwind v4 dipakai lewat PostCSS plugin baru (`@tailwindcss/postcss`), bukan config `tailwind.config.js` gaya v3 — cek konvensi v4 (CSS-based config, `@theme`) saat styling.

---

## 1. Gambaran Umum

Platform ini adalah **aplikasi web untuk membaca, menulis, dan mengelola artikel** (blog/article platform). Terdapat tiga peran pengguna: **Reader** (pembaca), **Author** (penulis), dan **Admin** (pengelola platform).

Satu akun dapat memiliki peran ganda — reader yang menjadi author tetap bisa membaca, menyukai, dan berkomentar seperti biasa; status author bersifat **tambahan (additive)**, bukan menggantikan peran reader.

### 1.1 Peran Pengguna

| Peran | Deskripsi | Akses Utama |
|---|---|---|
| **Reader** | Pengguna yang membaca, menyukai, berkomentar, dan menyimpan artikel | Homepage, detail artikel, profil, bookmark/library |
| **Author** | Reader yang juga menulis artikel (self-service, **tanpa approval admin**) | Semua akses reader + dashboard author |
| **Admin** | Mengelola pengguna, moderasi konten, dan kategori | Dashboard admin |

> Pendaftaran menjadi author bersifat **self-service** — tidak ada alur pengajuan/approval oleh admin.

---

## 2. Daftar Fitur

### 2.1 Fitur untuk Reader
- Melihat homepage dengan konten personalisasi (jika login) atau umum (jika belum login)
- Membaca detail artikel
- Menyukai (like) dan berkomentar pada artikel — memerlukan login
- Melihat rekomendasi "Artikel Terkait" di bawah artikel
- Menyimpan artikel (bookmark)
- Melihat riwayat baca dan melanjutkan bacaan yang belum selesai ("Lanjutkan membaca")
- Mencari artikel (search)
- Melaporkan (report) artikel atau komentar yang melanggar
- Mengelola profil pribadi (like, bookmark, komentar, pengaturan akun)
- Melihat profil publik author

### 2.2 Fitur untuk Author
- Menulis artikel baru (judul, gambar sampul, isi, ringkasan, kategori, tag)
- Menyimpan sebagai draft atau langsung publish, dengan auto-save berkala
- Preview artikel sebelum publish
- Mengedit dan menghapus (unpublish) artikel yang sudah terbit
- Melihat dashboard: ringkasan performa (views, likes, komentar) dan daftar semua artikel
- Melihat statistik detail per artikel (grafik views, sumber traffic, komentar terbaru)
- Mengelola komentar yang masuk ke artikelnya (lihat dan hapus)

### 2.3 Fitur untuk Admin
- Dashboard ringkasan platform (total pengguna, author, artikel, laporan pending)
- Manajemen pengguna: cari, filter berdasarkan peran, suspend/aktifkan akun
- Moderasi laporan: meninjau, menghapus konten, memperingatkan pengguna, atau menolak laporan
- Riwayat laporan yang sudah ditindak dan yang ditolak
- Manajemen kategori dan tag artikel

---

## 3. Logika Rekomendasi "Artikel Terkait"

| Kondisi Pengguna | Basis Rekomendasi |
|---|---|
| Login, sudah punya histori like | **Personalized** — berdasarkan kategori/tag dari artikel yang pernah disukai |
| Login, belum ada histori like | **Content-based** — dari pilihan kategori yang dipilih saat onboarding |
| Belum login | Content-based atau fallback ke artikel populer |

Jumlah rekomendasi yang ditampilkan: **3–4 artikel** per halaman detail artikel (menghindari paradox of choice).

---

## 4. Struktur Halaman (Sitemap)

### 4.1 Halaman Reader
| Halaman | Keterangan |
|---|---|
| Homepage | Beranda dengan state berbeda untuk login vs belum login |
| Detail Artikel | Isi artikel, like/komentar, artikel terkait — state berbeda login vs belum login |
| Explore / Semua Artikel | Tujuan tombol "Lihat semua artikel", listing lengkap dengan filter kategori |
| Halaman Populer | Daftar artikel trending berdasarkan engagement |
| Hasil Pencarian | Hasil pencarian berdasarkan judul/tag |
| Login / Daftar | Autentikasi pengguna |
| Onboarding | Pemilihan kategori favorit saat pertama daftar (mengatasi cold-start rekomendasi) |
| Profil Reader | Info akun, like, bookmark, riwayat baca, komentar, pengaturan |
| Profil Publik Author | Ditampilkan saat reader klik nama author |
| 404 / Artikel Tidak Ditemukan | Halaman error saat artikel dihapus/tidak ada |

### 4.2 Halaman Author
| Halaman | Keterangan |
|---|---|
| Dashboard Author | Ringkasan performa dan daftar artikel (filter status: semua/published/draft) |
| Form Tulis Artikel | Mode create dan edit dalam satu halaman |
| Statistik Detail Artikel | Grafik views, sumber traffic, komentar terbaru per artikel |

### 4.3 Halaman Admin
| Halaman | Keterangan |
|---|---|
| Dashboard Admin (Overview) | Ringkasan metrik platform dan antrian laporan pending |
| Manajemen Pengguna | Tabel pengguna dengan filter peran dan aksi suspend |
| Laporan | Tab Pending, Ditindak, Ditolak — masing-masing dengan riwayat aksi dan siapa yang menindak |
| Kategori | Kelola kategori (aktif/nonaktif) dan lihat tag terpopuler |

> Fitur "Editorial Pick" dan "Pengajuan Author (approval)" **tidak digunakan** pada versi ini.

---

## 5. Alur Utama (User Flow)

### 5.1 Alur Setelah Membaca Artikel
1. Reader membaca artikel sampai selesai
2. Melihat/melakukan interaksi like dan komentar
3. Sistem menampilkan "Artikel Terkait" (3–4 item) di bawah interaksi
4. Jika reader klik salah satu → masuk ke detail artikel baru (loop kembali ke langkah 1)
5. Jika reader tidak tertarik dan scroll terus → tampil section "Artikel Populer" atau tombol "Lihat Semua Artikel"
6. "Lihat Semua Artikel" mengarahkan ke halaman Explore (bukan langsung ke homepage), dengan filter kategori aktif sesuai artikel terakhir dibaca
7. Homepage hanya dicapai melalui navigasi utama (bottom nav / top nav), **tidak ada redirect otomatis paksa**

### 5.2 Alur Publikasi Artikel
1. Author menulis artikel di form (auto-save berkala ke draft)
2. Author memilih: simpan sebagai draft, atau publish langsung
3. Setelah publish, artikel otomatis masuk ke feed "Terbaru" (berdasarkan waktu)
4. Status "Populer" bersifat **earned** — artikel masuk kategori ini setelah mengumpulkan cukup engagement (views, likes, komentar) dalam periode tertentu, bukan otomatis saat publish

### 5.3 Alur Reader Belum Login
- Artikel tetap bisa dibaca penuh tanpa login
- Like dan komentar ditampilkan (angka total tetap terlihat) namun dalam kondisi non-aktif, dengan ajakan "Masuk untuk menyukai dan berkomentar"
- Artikel terkait tetap tampil menggunakan basis content-based/populer
- **Tidak ada modal paksa** saat artikel dibuka — ajakan login hanya muncul di titik interaksi (like/komentar), bukan mengganggu niat baca di awal

### 5.4 Alur Moderasi Laporan (Admin)
1. Reader melaporkan artikel/komentar yang dianggap melanggar
2. Laporan masuk ke antrian "Pending" di dashboard admin
3. Admin meninjau dan memilih salah satu aksi: Hapus konten / Peringatkan pengguna / Tolak laporan
4. Laporan berpindah ke tab "Ditindak" (jika dihapus/diperingatkan) atau "Ditolak" (jika dianggap tidak melanggar), lengkap dengan catatan siapa dan kapan keputusan diambil

### 5.5 Tata Kelola Peran (Role Governance)
- **Akun Admin bersifat eksklusif** — terpisah dari akun personal (reader/author). Admin tidak merangkap sebagai reader/author pada akun yang sama, untuk menghindari conflict of interest saat moderasi (mis. admin yang juga author berpotensi tidak netral menilai laporan pada kontennya sendiri) dan untuk membatasi permukaan risiko keamanan pada akun berakses tinggi.
- Admin memiliki halaman Profil sendiri (nama, foto, email, ganti password) — diperlukan terutama saat admin lebih dari satu orang, karena entri log moderasi ("Ditindak oleh ...") perlu menyebut admin yang bersangkutan secara spesifik, bukan generik "Admin".
- Reader dapat menjadi Author melalui model self-service (tanpa approval), **tetapi tidak sebaliknya** — status Author tidak bisa membuka akses Admin. Pemberian akses Admin dilakukan secara internal/manual, di luar alur self-service produk.
- Reader yang menjadi Author tetap mempertahankan seluruh riwayat dan akses sebagai reader (like, bookmark, riwayat baca) — status Author bersifat tambahan (additive), bukan penggantian peran.

---

## 6. Prioritas Fitur: MVP vs Next To Have (NTV)

### 6.1 Author
| MVP | NTV (iterasi berikutnya) |
|---|---|
| Draft vs publish | Jadwal publish (scheduling) |
| Edit setelah publish | Notifikasi ke author saat dapat like/komentar |
| Unpublish/hapus artikel | Moderasi komentar oleh author sendiri |
| Analytics dasar (views, likes, komentar) | Multiple author/co-writer |

### 6.2 Reader
| MVP | NTV (iterasi berikutnya) |
|---|---|
| Sinkronisasi guest → login | Follow author |
| Search dasar (judul/tag) | Bookmark dengan koleksi/folder |
| Report konten | Preferensi notifikasi granular |
| Reading progress tersimpan (level artikel) | Reading progress presisi (posisi scroll) |
| — | Multi-device sync real-time |

### 6.3 Admin
| MVP | NTV (iterasi berikutnya) |
|---|---|
| Manajemen pengguna (daftar, suspend) | Analytics platform-wide mendalam |
| Moderasi laporan (report queue) | Kelola banner/pengumuman |
| Kelola kategori/tag master | Filter kata otomatis pada komentar |

---

## 7. Empty State, Error State, dan Toast

Ketiga jenis notifikasi kondisi ini berbeda perilaku dan sebaiknya dibangun sebagai **komponen terpisah**, bukan digabung jadi satu.

### 7.1 Perbandingan
| | Empty State | Error State (halaman penuh) | Toast / Snackbar |
|---|---|---|---|
| Posisi | Mengisi seluruh area konten | Mengisi seluruh area konten | Mengambang, sementara |
| Durasi | Permanen sampai kondisi berubah | Permanen sampai user beraksi | 2–4 detik, hilang otomatis |
| Sifat | Blocking (isi halaman) | Blocking | Non-blocking |
| Contoh | "Belum ada bookmark" | "Artikel tidak ditemukan (404)" | "Berhasil disimpan!" |

### 7.2 Anatomi Komponen Empty State / Error State
- Ikon atau ilustrasi bulat di tengah
- Judul singkat (1 baris)
- Deskripsi 1–2 baris
- CTA (opsional untuk empty state, hampir selalu ada untuk error state)

> Dibangun sebagai satu komponen dengan 3 varian warna ikon: netral/abu-abu (empty state biasa), hijau/success ("good empty state" seperti antrian laporan kosong), dan merah/danger (error yang butuh perhatian).

### 7.3 Daftar Lengkap Empty State & Error State

**Homepage & Feed**
- Belum ada artikel sama sekali (platform baru)
- Kategori kosong (filter tidak menghasilkan artikel)
- Gagal memuat homepage

**Explore / Search**
- Hasil pencarian tidak ditemukan
- Belum mengetik apa-apa (state awal search)
- Filter kategori tidak ada hasil

**Detail Artikel**
- Artikel tidak ditemukan (404)
- Artikel di-unpublish oleh author
- Belum ada komentar
- Belum ada artikel terkait
- Gagal memuat artikel

**Reader — Profil Personal**
- Belum ada artikel yang di-like
- Bookmark kosong
- Riwayat baca kosong
- Belum pernah berkomentar

**Author — Dashboard**
- Belum punya artikel sama sekali
- Filter Draft kosong
- Filter Published kosong
- Belum ada komentar masuk
- Statistik belum ada data (artikel baru publish)

**Form Tulis Artikel**
- Gagal publish — validasi (field wajib belum diisi)
- Gagal publish — server error
- Auto-save gagal
- Upload gambar gagal

**Admin**
- Antrian laporan Pending kosong (good state)
- Belum ada riwayat Ditindak
- Belum ada riwayat Ditolak
- Hasil pencarian pengguna tidak ditemukan
- Belum ada kategori dibuat
- Kategori tanpa artikel

**Sistem / Global**
- Tidak ada koneksi internet
- Loading (skeleton screen)
- Sesi login habis (session expired)
- Akses ditolak — 403 (misal reader mencoba akses dashboard admin)
- Kesalahan server umum — 500
- Akun yang di-suspend mencoba login

### 7.4 Daftar Toast / Snackbar

Toast dipakai sebagai feedback instan atas aksi pengguna, bukan untuk kondisi halaman yang kosong/rusak. Tiga varian: **Success** (hijau), **Error** (merah), **Info/Netral** (abu-abu).

**Reader**
- Artikel disimpan ke bookmark
- Artikel dihapus dari bookmark
- Komentar berhasil dikirim
- Berhasil melaporkan konten
- Berhasil keluar (logout)

**Author**
- Draft berhasil disimpan
- Artikel berhasil dipublish
- Artikel berhasil diperbarui
- Artikel berhasil dihapus
- Gagal mengupload gambar

**Admin**
- Konten berhasil dihapus
- Pengguna berhasil di-suspend
- Laporan ditolak
- Kategori berhasil ditambahkan/diperbarui

**Global**
- Koneksi terputus (versi singkat, sebelum eskalasi ke error state penuh jika berkepanjangan)
- Perubahan berhasil disimpan (pengaturan akun, dll)

> Catatan desain: gunakan border kiri tipis (±3px) berwarna sesuai varian + ikon berwarna untuk membedakan jenis toast — hindari background solid berwarna penuh agar tidak terkesan terlalu agresif untuk notifikasi yang sifatnya sekilas.

---

## 8. Design System — Warna & Komponen

### 8.1 Color Token

Warna disusun berdasarkan **peran/fungsi (role-based token)**, bukan nama warna, agar penggantian tema cukup dilakukan di satu titik.

**Brand & Aksi**
| Token | Hex | Dipakai untuk |
|---|---|---|
| `primary` | `#4F46E5` | CTA utama per halaman (satu per layar) — mis. tombol "Masuk", "Tulis artikel baru", "Publish"/"Kirim"; tab/kategori/menu aktif; link aksen ("Lihat semua"); avatar background |
| `on-primary` | `#FFFFFF` | Teks/ikon di atas warna primary |

> `primary` sengaja dibatasi pemakaiannya — idealnya hanya 1 tombol primary per layar. Tombol sekunder/batal memakai varian outline/transparent, bukan primary.

**Netral (Gray Scale)**
| Token | Hex | Dipakai untuk |
|---|---|---|
| `text-primary` | `#111827` | Judul, teks utama |
| `text-secondary` | `#4B5563` | Deskripsi, body text |
| `text-muted` | `#9CA3AF` | Timestamp, placeholder, label kecil, helper text default |
| `surface-1` | `#FFFFFF` | Background card/halaman |
| `surface-2` | `#F3F4F6` | Background elemen sekunder (thumbnail placeholder, chip, skeleton loading) |
| `border` | `#E5E7EB` | Garis pembatas antar section |

**Semantic (Status)**
| Token | Hex | Dipakai untuk |
|---|---|---|
| `success` | `#16A34A` | Badge "Published"/"Aktif", tombol Publish, toast sukses, indikator naik (↑), ikon empty state positif |
| `warning` | `#D97706` | Badge tingkat urgensi menengah (mis. "Misinformasi") |
| `danger` | `#DC2626` | Badge "Suspended", tombol hapus/tolak, toast error, border input error, error state halaman (404, no-connection) |
| `neutral-status` | `#6B7280` | Badge "Draft"/"Nonaktif" — status netral tanpa penilaian baik/buruk |

**Aturan Pemakaian**
- Satu token = satu makna di seluruh produk. `danger` hanya untuk hal negatif/butuh perhatian, tidak dipakai untuk dekorasi biasa.
- Kategori/tag artikel **tidak** memakai warna semantic (success/warning/danger) — kategori memakai variasi dari primary atau abu-abu netral.
- Definisikan warna sebagai design token/CSS variable (mis. Tailwind v4 `@theme`), bukan hex manual per komponen, agar penggantian satu warna otomatis berlaku ke seluruh instance.

### 8.2 Daftar Komponen (dikelompokkan)

| Kelompok | Komponen |
|---|---|
| Buttons & Actions | Button (Primary/Secondary/Danger/Success — Default, Hover, Disabled), Icon Button |
| Form & Input | Text Input, Textarea, Search Bar, Dropdown, Checkbox, Radio Button — masing-masing dengan state Default, Focus, Error, Disabled |
| Navigation | Sidebar (Active/Inactive), Bottom Nav (mobile), Top Nav/Header (per role: Guest/Reader/Author/Admin), Category Chip, Tab Bar, Pagination |
| Cards & Lists | Article Card (horizontal & vertical), Stat Card, Comment Card, Profile Card, User List Item, Report Item Card, Notification Item |
| Feedback & Status | Badge/Status Label, Toast (Success/Error/Info), Empty State, Error State (halaman penuh) |
| Data Display | Avatar (kecil/sedang/besar), Skeleton Loading, Progress Bar |

### 8.3 Cakupan State per Komponen

| Komponen | State yang perlu dibuat |
|---|---|
| Button | Default, Hover, Disabled — per varian warna (Primary/Secondary/Danger/Success) |
| Text Input / Textarea | Default (dengan helper text), Focus, Error (dengan inline error message), Disabled |
| Dropdown | Default, Error |
| Checkbox | Unchecked, Checked/Selected |
| Input Foto/Gambar | Default, Error (mis. ukuran file terlalu besar) — termasuk border pada elemen bulat/kotaknya, bukan hanya teks di bawahnya |
| Article Card / List Item | Terisi (normal), Skeleton loading |
| Sidebar / Nav Item | Active, Inactive, dengan/tanpa badge notifikasi angka |
| Empty State | Netral (abu-abu), Positif/Success (hijau), Error/Danger (merah) |
| Halaman (Homepage, Bookmark, dsb.) | Terisi normal, Empty state, Loading, Error |

> Inline error message (teks kecil di bawah input saat validasi gagal) dan helper text (versi netralnya) menempati slot yang sama pada 1 field — keduanya bagian dari variant "Error" dan "Default" pada komponen Input yang sama, bukan dua komponen terpisah.

---

## 9. Catatan Tambahan untuk Developer

- Homepage memiliki **dua mode rendering**: personalized-first (login) dan popularity-first (belum login) — **bukan dua halaman terpisah**, melainkan satu template dengan data source berbeda.
- Section "Sedang Populer" tetap tampil pada kondisi login, hanya berbeda urutan prioritas (di bawah rekomendasi personal).
- Status author bersifat additive pada akun (flag `is_author`), bukan role terpisah yang saling meniadakan — reader yang menjadi author tidak kehilangan akses/riwayat sebagai reader.
- **Belum diputuskan (disarankan masuk NTV):** kebijakan jika artikel diedit signifikan setelah publish — apakah reader yang sudah membaca diberi tahu ada perubahan.
- **Kebijakan yang disarankan:** jika artikel dihapus, bookmark/like reader yang sudah tersimpan terhadap artikel tersebut ditampilkan sebagai "artikel tidak tersedia", bukan hilang tanpa jejak.
- Pada kategori, hasil search, dan library disediakan dropdown untuk sorting dari popular/terbaru.
- Hasil search menampilkan dua opsi: artikel dan profil (author).

---

## 10. Ringkasan untuk AI Coding Agent (opencode)

Saat mengerjakan task di repo `jeda-fix`, ingat konteks berikut:

1. **Tiga role**: Reader, Author (additive terhadap Reader), Admin (akun eksklusif/terpisah). Author self-service, tidak ada approval. Admin diberikan manual, bukan lewat produk.
2. **Belum ada backend real** — pakai `@faker-js/faker` untuk data dummy, tapi desain tipe data/interface agar mudah diganti API asli nanti.
3. Homepage = **satu template, dua data source** (login vs guest), bukan dua route berbeda.
4. Status "Populer" itu **earned by engagement**, bukan flag manual saat publish.
5. Guest tetap bisa baca artikel penuh; interaksi (like/komentar) di-disable dengan CTA login, **tanpa modal paksa**.
6. Bangun **Empty State, Error State (full page), dan Toast** sebagai 3 komponen terpisah (lihat §7) — pakai varian warna netral/success/danger yang konsisten dengan token di §8.1.
7. Ikuti **role-based color token** (`primary`, `text-*`, `surface-*`, `border`, `success`, `warning`, `danger`, `neutral-status`) — jangan hardcode hex per komponen.
8. Fokus MVP dulu sesuai §6 sebelum membangun fitur NTV (scheduling, follow author, koleksi bookmark, dll).
9. Semua komponen UI baru sebaiknya juga mendapat Storybook story dengan state-state yang relevan (lihat §8.3), karena Storybook sudah jadi bagian dari toolchain proyek.