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
 * Komponen utama Homepage — selaras dengan token Figma & Tailwind v4.
 * Menggunakan struktur full-width fleksibel di dalam AppShell.
 */
export default async function Homepage({ searchParams }: HomepageProps) {
  const { tab } = await searchParams;
  const activeTab: TabsLinkKey = tab === 'terbaru' ? 'terbaru' : 'populer';

  // Simulasi delay jaringan untuk efek loading.tsx
  await new Promise((resolve) => setTimeout(resolve, 400));

  let articles =
    activeTab === 'populer'
      ? generatePopularArticles(ARTICLE_COUNT)
      : generateLatestArticles(ARTICLE_COUNT);

  // Jika tab populer, hanya artikel pertama (index 0) yang diberi nilai trendPercent agar badge muncul
  if (activeTab === 'populer' && articles.length > 0) {
    articles = articles.map((article, index) => ({
      ...article,
      trendPercent: index === 0 ? 15 : undefined, 
    }));
  }

  return (
    <AppShell activeSidebarKey="home">
      {/* Hero Section */}
      <Hero />

      {/* Konten Utama (Menggunakan token spacing global.css) */}
      <div className="flex flex-col w-full px-(--spacing-container-x) py-(--spacing-container-y) gap-gap">
        
        {/* Navigasi Tab (Populer / Terbaru) */}
        <div className="w-full">
          <TabsLink
            activeTab={activeTab}
            basePath="/homepage"
          />
        </div>

        {/* Daftar Artikel dengan struktur card yang presisi */}
        <ArticleList 
          articles={articles} 
          showTrendBadge={activeTab === 'populer'} 
        />
        
      </div>
    </AppShell>
  );
}