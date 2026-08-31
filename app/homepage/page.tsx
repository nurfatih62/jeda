import { AppShell } from '../../shared/components/organism/app-shell/app-shell';
import { Hero } from '../../shared/components/organism/hero/hero';
import { TabsLink } from '../../shared/components/organism/tabs/tabs-link';
import type { TabsLinkKey } from '../../shared/components/organism/tabs/tabs-link';
import { ArticleList } from '../../shared/components/organism/article-list/article-list';
import { generatePopularArticles, generateLatestArticles } from '../../lib/mock-data';

export interface HomepageProps {
  searchParams: Promise<{ tab?: string }>;
}

const ARTICLE_COUNT = 6;

/**
 * Isi asli homepage — dipindah ke sini dari app/page.tsx supaya page.tsx
 * bisa jadi wrapper tipis (dibutuhkan untuk alur/fitur selanjutnya).
 * Tetap async Server Component, tetap SSR penuh (searchParams -> faker).
 */
export default async function Homepage({ searchParams }: HomepageProps) {
  const { tab } = await searchParams;
  const activeTab: TabsLinkKey = tab === 'terbaru' ? 'terbaru' : 'populer';

  // Simulasi delay jaringan biar loading.tsx kelihatan efeknya.
  // Hapus baris ini kalau nanti sudah connect ke API/database asli.
  await new Promise((resolve) => setTimeout(resolve, 400));

  const articles =
    activeTab === 'populer'
      ? generatePopularArticles(ARTICLE_COUNT)
      : generateLatestArticles(ARTICLE_COUNT);

  return (
    <AppShell activeSidebarKey="home">
      <Hero />

      <div className="mx-auto max-w-341 px-11.5">
        <div className="mb-8">
          <TabsLink
            activeTab={activeTab}
            basePath=""
          />
        </div>

        <ArticleList articles={articles} />
      </div>
    </AppShell>
  );
}