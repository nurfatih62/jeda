import Link from 'next/link';

export type TabsLinkKey = 'untukmu' | 'populer' | 'terbaru';

export interface TabsLinkProps {
  activeTab: TabsLinkKey;
  /** Path dasar buat bikin href, default "/" */
  basePath?: string;
  /** Varian tab untuk pengguna publik atau pengguna yang sudah login. */
  variant?: 'default' | 'logged-in';
}

const defaultItems: { key: TabsLinkKey; label: string; query: string }[] = [
  { key: 'populer', label: 'Populer', query: '' },
  { key: 'terbaru', label: 'Terbaru', query: '?tab=terbaru' },
];

const loggedInItems: { key: TabsLinkKey; label: string; query: string }[] = [
  { key: 'untukmu', label: 'Untukmu', query: '?tab=untukmu' },
  { key: 'populer', label: 'Populer', query: '?tab=populer' },
  { key: 'terbaru', label: 'Terbaru', query: '?tab=terbaru' },
];

/**
 * Versi SSR dari organism Tabs — dipakai di Server Component (page.tsx).
 * Ganti tab = navigasi <Link> ke query string baru, server re-render dengan
 * data faker baru. Tidak pakai useState/onClick, jadi tidak perlu "use client".
 */
export function TabsLink({ activeTab, basePath = '/', variant = 'default' }: TabsLinkProps) {
  const items = variant === 'logged-in' ? loggedInItems : defaultItems;
  const activeIndex = items.findIndex((item) => item.key === activeTab);

  return (
    <div className="pt-tabs-top">
      <div className="flex items-center gap-2.5">
        {items.map((item) => (
          <Link
            key={item.key}
            href={`${basePath}${item.query}`}
            aria-current={item.key === activeTab ? 'page' : undefined}
            className={`font-sans rounded-md px-4 py-2 text-base font-medium leading-6 transition-colors hover:bg-primary-overlay-hover ${
              item.key === activeTab ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="relative mb-6 h-px bg-primary-border">
        <div
          className="absolute -top-px h-indicator-h w-indicator-w bg-primary transition-all"
          style={{ left: activeIndex * (variant === 'logged-in' ? 106 : 106) }}
        />
      </div>
    </div>
  );
}