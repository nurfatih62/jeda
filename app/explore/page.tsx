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
      {/* Menggunakan kelas kanonik Tailwind untuk padding */}
      <div className="bg-background w-full px-17.5 pt-top pb-12.5">
        
        {/* max-width dan gap menggunakan rekomendasi kanonik */}
        <div className="flex max-w-288.75 flex-col items-start gap-4.25">
          
          {/* Frame 95: gap disesuaikan */}
          <div className="flex w-full flex-col gap-7.25">
            
            {/* Judul: Eksplor topik menggunakan token warna tema */}
            <h1 className="font-['Poppins'] text-[36px] font-bold leading-[32px] text-text-primary m-0 p-0">
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

          {/* Daftar Artikel dengan gap kanonik */}
          <div className="flex w-full flex-col gap-10.5 mt-2.5">
            <ArticleList articles={articles} />
          </div>

        </div>
      </div>
    </AppShell>
  );
}