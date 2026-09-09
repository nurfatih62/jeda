# Struktur Domain-Driven Design (DDD) – JEDA

Dokumentasi migrasi ke arsitektur DDD sesuai spesifikasi.

## 1. Ringkasan Aturan

- **Pisahkan berdasarkan Bounded Context, bukan tipe file.**
- Setiap domain memiliki layer sendiri:
  - `domain/` – aturan bisnis murni (entities, value objects, invariants, errors)
  - `application/` – use cases & ports (interfaces)
  - `infrastructure/` – adapter API / repository
  - `presentation/` – UI khas domain (Atomic Design)
- Design System universal berada di `src/shared/` (Atomic + `.stories.tsx`)

## 2. Struktur Folder Baru

```
src/
├── app/                          # Next.js App Router – Page Shell saja
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── favicon.ico
├── shared/                       # Design System Universal
│   ├── atoms/                    # Button, Avatar, Input, Logo, Typography, Toast, etc.
│   │   ├── avatar/
│   │   ├── button/button/
│   │   ├── button/pagination-*
│   │   ├── input/input/
│   │   ├── input/textarea/
│   │   └── ...
│   ├── molecules/                # confirmation-modal, tabs, stat-card, hero-section
│   ├── organisms/                # header-guest, sidebar, main-layout
│   ├── templates/                # (jika ada layout universal)
│   ├── tokens/                   # colors.ts
│   └── utils/                    # cn.ts
└── domains/
    ├── auth/                     # Bounded Context: Auth
    │   ├── domain/               # entities.ts, value-objects.ts, errors.ts
    │   ├── application/          # ports/auth-repository.port.ts, use-cases/
    │   ├── infrastructure/       # api/auth.api.ts, repositories/
    │   └── presentation/
    │       ├── atoms/            # button-verifikasi, google-login-button, input-login, password-strength-bar, ...
    │       ├── molecules/        # input-email, input-password, benefit-list-item
    │       ├── organisms/        # login-modal, register-modal, otp-verification-modal, ...
    │       └── templates/        # auth-template
    ├── article/                  # Artikel, komentar, explore, homepage, library
    │   ├── domain/
    │   ├── application/
    │   ├── infrastructure/
    │   └── presentation/
    ├── admin/
    ├── user-profile/
    ├── notification/
    ├── report/
    └── author-dashboard/
```

> Lihat `src/domains/<domain>/presentation/` – setiap level Atomic (`atoms/`, `molecules/`, `organisms/`, `templates/`) **wajib** menyertakan `*.stories.tsx` untuk Storybook.

## 3. Mapping Migrasi

### 3.1 `src/shared/` (Universal)
Diambil dari `stories/componen/atom/*` & `molecule/*` yang generic:
- `avatar`, `button/button`, `pagination-*`, `check-option`, `radio-option`, `dropdown`, `icon/*`, `input`, `textarea`, `logo`, `typography`, `toast`, `status-badge`, `progress-bar`, `toolbar-button`
- `confirmation-modal`, `hero-section`, `section-tabs`, `stat-card`, `time-range-dropdown`, `doc-section-block`
- `header-guest`, `sidebar`, `main-layout` (guest layout → shared organisms)

### 3.2 Bounded Contexts
- **auth**: `button-verifikasi`, `google-login-button`, `input-login`, `password-strength-bar`, `login-modal`, `register-modal`, `otp-verification-modal`, `forgot-password-modal`, `terms-modal`, `become-author-modal`, `category-selection-modal`, `auth-template`
- **article**: `article-badge`, `button-tags`, `input-comment`, `article-card`, `author-info`, `comment-card`, `cover-image-uploader`, `rich-text-toolbar`, `article-detail-section`, `create-article`, `eksplor-*`, `homepage-section`, `article-template`, `library-template`, dll.
- **admin**: `admin-confirm-modal`, `category-name-field`, `admin-dashboard`, `manajemen-pengguna`, `modal-*`, `CategoryManagementSection`, `admin-template`
- **user-profile**: `avatar-uploader`, `change-password-form`, `edit-profile-form`, `profile-page`, `profile-template`
- **notification**: `notification-item`, `notification-section`, `notification-template`
- **report**: `report-detail-modal`, `report-modal`, `warning-modal`
- **author-dashboard**: `article-performance-card`, `author-draft-writing-card`, `author-dashboard`, `author-dashboard-template`

## 4. Aliases Path

`tsconfig.json`:
```json
"paths": {
  "@/*": ["./src/*"],
  "@/shared/*": ["./src/shared/*"],
  "@/domains/*": ["./src/domains/*"],
  "@/app/*": ["./src/app/*"]
},
"baseUrl": "."
```

Penggunaan:
```ts
import { Button } from "@/shared/atoms/button/button/button";
import { LoginModal } from "@/domains/auth/presentation/organisms/login-modal/login-modal";
import { ArticleCard } from "@/domains/article/presentation/molecules/card/article-card";
```

Vite (Storybook) alias ditambahkan di `.storybook/main.ts` → `viteFinal`.

## 5. Layering Details per Domain

### `domain/`
Pure TypeScript – tidak ada dependensi React/Next.
Contoh `auth/domain/entities.ts`:
- `User`, `AuthSession`, `isValidEmail()`, `canBecomeAuthor()`

### `application/`
- **Ports**: interface repository (mis. `AuthRepositoryPort`)
- **Use Cases**: fungsi pure yang menerima `port` + params, melakukan validasi domain, lalu delegasi ke repo.

### `infrastructure/`
- `api/*.api.ts` – fetch ke `/api/*`, mapping DTO
- `repositories/*.impl.ts` – implementasi `Port` dengan `api`

### `presentation/`
Atomic UI + stories. Semua import **harus** via alias `@/`.

## 6. Storybook

- Konfigurasi `.storybook/main.ts` sekarang menonton:
  ```ts
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../stories/**/*.stories..."]
  ```
- `preview.tsx` mengimpor `../src/app/globals.css`
- Setiap komponen di `src/shared` & `src/domains/*/presentation` memiliki `.stories.tsx`

Jalankan:
```bash
pnpm storybook
pnpm build-storybook
```

## 7. Migrasi `stories/` Lama

Folder `stories/` **deprecated** – dipertahankan sementara untuk referensi. Semua komponen baru wajib ditaruh di `src/` sesuai DDD. Setelah stabil, `stories/` akan dihapus.

## 8. Verifikasi

```bash
pnpm build        # Next.js + TypeScript OK (src/app)
pnpm lint         # ESLint
pnpm storybook    # Storybook Vite dengan alias @/
```

---

**Sumber**: AGENTS.md – DDD + Atomic per bounded context.
