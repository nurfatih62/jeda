import { AppShell } from '../shared/components/organism/app-shell/app-shell';
import { Hero } from '../shared/components/organism/hero/hero';
import { TabsLink } from '../shared/components/organism/tabs/tabs-link';
import type { TabsLinkKey } from '../shared/components/organism/tabs/tabs-link';
import { ArticleList } from '../shared/components/organism/article-list/article-list';
import { RefreshButton } from '../shared/components/molecule/refresh-button/refresh-button';
import { generatePopularArticles, generateLatestArticles } from '../lib/mock-data';

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

const ARTICLE_COUNT = 6;

export default async function Page({ searchParams }: PageProps) {
  const { tab } = await searchParams;
  const activeTab: TabsLinkKey = tab === 'terbaru' ? 'terbaru' : 'populer';

  // Simulasi delay jaringan biar loading.tsx & spinner Refresh kelihatan efeknya.
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
        <div className="flex items-end justify-between">
          <TabsLink activeTab={activeTab} />
          <RefreshButton />
        </div>

        <ArticleList articles={articles} />
      </div>
    </AppShell>
  );
}
