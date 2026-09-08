import { AppShell } from '../../shared/components/organism/app-shell/app-shell';
import { TopicTags } from '../../shared/components/organism/topic-tags/topic-tags';
import { SortSelect } from '../../shared/components/molecule/sort-select/sort-select';
import { ArticleList } from '../../shared/components/organism/article-list/article-list';
import { fetchArticles } from '../../lib/api';

const TOPICS = ['Semua', 'Teknologi', 'Wisata', 'Makanan', 'Pekerjaan', 'Pengembangan diri', 'Kehidupan'];
const SORT_OPTIONS = ['Populer', 'Terbaru'];

interface ExplorePageProps {
  searchParams: Promise<{ topic?: string; sort?: string }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const { topic, sort } = await searchParams;
  const activeTopic = topic ?? 'Semua';
  const activeSort = sort === 'Terbaru' ? 'Terbaru' : 'Populer';

  // 1. Ambil data asli langsung dari Supabase
  const rawArticles = await fetchArticles();

  // 2. Mapping data dari API (trendPercent sengaja dikosongkan/undefined agar badge tidak muncul)
  let articles = rawArticles.map((art) => ({
    id: art.id,
    author: art.author,
    avatarUrl: art.avatarUrl,
    date: new Date(art.createdAt * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    title: art.title,
    description: art.description,
    imageUrl: art.imageUrl,
    likes: art.likes,
    comments: art.commentsCount,
    trendPercent: undefined, // <-- DIKOSONGKAN AGAR TIDAK ADA BADGE POPULER DI EXPLORE
    category: (art as any).category || 'Pengembangan diri', 
  }));

  // 3. Filter berdasarkan Topik yang dipilih (jika bukan 'Semua')
  if (activeTopic !== 'Semua') {
    articles = articles.filter((art) => 
      art.category.toLowerCase() === activeTopic.toLowerCase() ||
      art.title.toLowerCase().includes(activeTopic.toLowerCase()) ||
      art.description.toLowerCase().includes(activeTopic.toLowerCase())
    );
  }

  // 4. Urutkan berdasarkan Sort (Populer atau Terbaru)
  if (activeSort === 'Populer') {
    articles = articles.sort((a, b) => b.likes - a.likes);
  } else {
    articles = articles.sort((a, b) => {
      const articleA = rawArticles.find((article) => article.id === a.id);
      const articleB = rawArticles.find((article) => article.id === b.id);
      return (articleB?.createdAt ?? 0) - (articleA?.createdAt ?? 0);
    });
  }

  return (
    <AppShell activeSidebarKey="search">
      <div className="bg-background w-full px-17-5 pt-top pb-12-5">
        <div className="flex max-w-(--max-w-explore) flex-col items-start gap-4-25">
          
          <div className="flex w-full flex-col gap-7-25">
            <h1 className="font-sans text-(length:--font-size-title) font-bold leading-(--leading-tight) text-text-primary m-0 p-0">
              Eksplor topik
            </h1>
            
            <div className="flex w-full flex-col gap-6">
              <div className="w-full">
                <TopicTags topics={TOPICS} activeTopic={activeTopic} basePath="/explore" />
              </div>
              
              <div className="flex justify-start">
                <SortSelect 
                  options={SORT_OPTIONS} 
                  defaultValue={activeSort} 
                />
              </div>
            </div>
          </div>

          {/* Daftar Artikel (showTrendBadge diset false agar bersih tanpa badge populer) */}
          <div className="flex w-full flex-col gap-(--spacing-10-5) mt-(--spacing-2-5)">
            <ArticleList articles={articles} showTrendBadge={false} />
          </div>

        </div>
      </div>
    </AppShell>
  );
}