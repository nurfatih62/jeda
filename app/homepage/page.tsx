import { AppShell } from '../../shared/components/organism/app-shell/app-shell';
import { Hero } from '../../shared/components/organism/hero/hero';
import { TabsLink } from '../../shared/components/organism/tabs/tabs-link';
import type { TabsLinkKey } from '../../shared/components/organism/tabs/tabs-link';
import { ArticleList } from '../../shared/components/organism/article-list/article-list';
import { HomepagePagination } from './homepage-pagination';
import { fetchArticles } from '../../lib/api';

export interface HomepageProps {
  searchParams: Promise<{ tab?: string; page?: string; keyword?: string }>;
}

export default async function Homepage({ searchParams }: HomepageProps) {
  const resolvedParams = await searchParams;
  const tab = resolvedParams?.tab;
  const pageParam = resolvedParams?.page;
  const keyword = resolvedParams?.keyword?.toLowerCase() || '';

  const activeTab: TabsLinkKey = tab === 'terbaru' ? 'terbaru' : 'populer';
  const currentPage = Math.max(1, parseInt(pageParam || '1', 10));
  const ITEMS_PER_PAGE = 5;

  // Ambil data asli dari MockAPI
  const rawArticles = await fetchArticles();

  // Mapping data dasar dari API
  let articles = rawArticles.map((art) => ({
    id: art.id,
    author: art.author,
    avatarUrl: art.avatarUrl,
    date: new Date(art.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    title: art.title,
    description: art.description,
    imageUrl: art.imageUrl,
    likes: art.likes,
    comments: art.commentsCount,
    trendPercent: art.trendPercent,
  }));

  // 1. Filter berdasarkan Keyword Pencarian (jika ada yang diketik di SearchBar)
  if (keyword) {
    articles = articles.filter(
      (art) =>
        art.title.toLowerCase().includes(keyword) ||
        art.description.toLowerCase().includes(keyword) ||
        art.author.toLowerCase().includes(keyword)
    );
  }

  // 2. Filter atau Urutkan Berdasarkan Tab (Populer / Terbaru)
  if (activeTab === 'populer') {
    articles = articles
      .filter((a: any) => a.trendPercent || a.likes > 100)
      .sort((a, b) => b.likes - a.likes);

    articles = articles.map((article, index) => ({
      ...article,
      trendPercent: index === 0 ? (article.trendPercent || 15) : undefined,
    }));
  } else {
    articles = articles
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((article) => ({
        ...article,
        trendPercent: undefined,
      }));
  }

  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <AppShell activeSidebarKey="home">
      <Hero />
      <div className="flex flex-col w-full px-(--spacing-container-x) py-(--spacing-container-y) gap-gap">
        <div className="w-full">
          <TabsLink activeTab={activeTab} basePath="/homepage" />
        </div>

        {/* Jika hasil pencarian kosong */}
        {paginatedArticles.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            Tidak ditemukan artikel yang cocok dengan kata kunci &quot;{keyword}&quot;.
          </div>
        ) : (
          <>
            <ArticleList articles={paginatedArticles} showTrendBadge={activeTab === 'populer' && currentPage === 1} />

            {totalPages > 1 && (
              <HomepagePagination
                currentPage={currentPage}
                totalPages={totalPages}
                activeTab={activeTab}
              />
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}