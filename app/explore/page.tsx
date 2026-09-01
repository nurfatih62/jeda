import { AppShell } from '../../shared/components/organism/app-shell/app-shell';
import { TopicTags } from '../../shared/components/organism/topic-tags/topic-tags';
import { SortSelect } from '../../shared/components/molecule/sort-select/sort-select';
import { ArticleList } from '../../shared/components/organism/article-list/article-list';
import { generatePopularArticles, generateLatestArticles } from '../../lib/mock-data';

const TOPICS = ['Semua', 'Teknologi', 'Wisata', 'Makanan', 'Pekerjaan', 'Pengembangan diri', 'Kehidupan'];
const SORT_OPTIONS = ['Populer', 'Terbaru'];

interface ExplorePageProps {
  searchParams: Promise<{ topic?: string; sort?: string }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const { topic, sort } = await searchParams;
  const activeTopic = topic ?? 'Semua';
  const activeSort = sort === 'Terbaru' ? 'Terbaru' : 'Populer';

  // Simulasi jeda jaringan
  await new Promise((resolve) => setTimeout(resolve, 300));

  const articles =
    activeSort === 'Populer' ? generatePopularArticles(3) : generateLatestArticles(3);

  return (
    <AppShell activeSidebarKey="search">
      {/* Menggunakan token langsung tanpa [var(--...)] */}
      <div className="bg-background w-full px-17-5 pt-top pb-12-5">
        
        {/* max-width menggunakan format arbitrary value Tailwind v4, spacing langsung */}
        <div className="flex max-w-(--max-w-explore) flex-col items-start gap-4-25">
          
          {/* Frame 95: gap menggunakan token langsung */}
          <div className="flex w-full flex-col gap-7-25">
            
            {/* Judul: Menggunakan font-sans dan ukuran token langsung */}
            <h1 className="font-sans text-(length:--font-size-title) font-bold leading-(--leading-tight) text-text-primary m-0 p-0">
              Eksplor topik
            </h1>
            
            {/* Frame 94 & Frame 83 (Filter Topic & Sort Select) */}
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

          {/* Daftar Artikel dengan gap & margin menggunakan token */}
          <div className="flex w-full flex-col gap-(--spacing-10-5) mt-(--spacing-2-5)">
            <ArticleList articles={articles} />
          </div>

        </div>
      </div>
    </AppShell>
  );
}