import { AppShell } from '../../shared/components/organism/app-shell/app-shell';
import { TopicTags } from '../../shared/components/organism/topic-tags/topic-tags';
import { ArticleList } from '../../shared/components/organism/article-list/article-list';
import { generateLatestArticles } from '../../lib/mock-data';

const TOPICS = [
  'Kesehatan Mental',
  'Produktivitas',
  'Relasi',
  'Gaya Hidup',
  'Karier',
  'Refleksi Diri',
];

interface ExplorePageProps {
  searchParams: Promise<{ topic?: string }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const { topic } = await searchParams;
  const activeTopic = topic ?? 'Semua';

  // Simulasi delay jaringan biar loading.tsx kelihatan efeknya.
  // Hapus baris ini kalau nanti sudah connect ke API/database asli.
  await new Promise((resolve) => setTimeout(resolve, 400));

  const articles = generateLatestArticles(3);

  return (
    <AppShell activeSidebarKey="search">
      <div className="px-11.5 py-11">
        <h1 className="font-sans mb-11 text-4xl font-bold leading-8 text-text-primary">
          Eksplor topik
        </h1>
        <TopicTags topics={TOPICS} activeTopic={activeTopic} basePath="/explore" />
        <div className="mt-11">
          <ArticleList articles={articles} />
        </div>
      </div>
    </AppShell>
  );
}
