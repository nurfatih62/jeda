# DEPRECATED – `stories/` Folder

Folder ini dipertahankan sementara untuk referensi migrasi.

**Sumber kebenaran baru (DDD):**
- `src/shared/` – Design System Universal (atoms, molecules, organisms, templates + `.stories.tsx`)
- `src/domains/<domain>/presentation/` – UI khas domain (Atomic per domain + `.stories.tsx`)
- `src/app/` – Next.js App Router

Storybook sekarang hanya mengindeks `src/**/*.stories.tsx` (lihat `.storybook/main.ts`).

### Action Required
- **Jangan** menambah komponen baru di `stories/`.
- Tambahkan komponen baru di `src/shared` atau `src/domains/<domain>/presentation`.
- Setelah semua consumer bermigrasi, folder `stories/` akan dihapus.

Lihat `DDD-STRUCTURE.md` untuk mapping lengkap.
