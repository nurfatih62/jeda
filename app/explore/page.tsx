import { AppShell } from '../../shared/components/organism/app-shell/app-shell';
import { TopicTags } from '../../shared/components/organism/topic-tags/topic-tags';
import { SortSelect } from '../../shared/components/molecule/sort-select/sort-select';
import { ArticleList } from '../../shared/components/organism/article-list/article-list';
import { generatePopularArticles, generateLatestArticles } from '../../lib/mock-data';

const TOPICS = ['Teknologi', 'Wisata', 'Makanan', 'Perkerjaan', 'Pengembangan diri', 'Kehidupan'];
const SORT_OPTIONS = ['Populer', 'Terbaru'];

interface ExplorePageProps {
  searchParams: Promise<{ topic?: string; sort?: string }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const { topic, sort } = await searchParams;
  const activeTopic = topic ?? 'Semua';
  
  // Ambil sort dari URL, jika tidak ada, default ke 'Populer'
  const activeSort = sort === 'Terbaru' ? 'Terbaru' : 'Populer';

  // Simulasi delay jaringan biar loading.tsx kelihatan efeknya.
  await new Promise((resolve) => setTimeout(resolve, 400));

  const articles =
    activeSort === 'Populer' ? generatePopularArticles(3) : generateLatestArticles(3);

  return (
    <AppShell activeSidebarKey="search">
      <div className="px-11.5 py-11">
        <h1 className="font-sans mb-11 text-4xl font-bold leading-8 text-text-primary">
          Eksplor topik
        </h1>
        
        {/* Jika komponen TopicTags mendukung penggabungan query param, pastikan terbawa. 
            Atau jika TopicTags mereset URL, pastikan ia menangani query yang ada. */}
        <TopicTags topics={TOPICS} activeTopic={activeTopic} basePath="/explore" />
        
        <div className="mt-6">
          {/* Kirim activeSort ke defaultValue/value SortSelect agar ikut sinkron dengan URL */}
          <SortSelect 
            options={SORT_OPTIONS} 
            defaultValue={activeSort} 
          />
        </div>

        <div className="mt-11">
          <ArticleList articles={articles} />
        </div>
      </div>
    </AppShell>
  );
}