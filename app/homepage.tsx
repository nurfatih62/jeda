import { Header } from "@/shared/components/organism/header/header";
import { Hero } from "@/shared/components/organism/hero/hero";
import { Tabs } from "@/shared/components/organism/tabs/tabs";
import { ArticleList } from "@/shared/components/organism/article-list/article-list";

export function Homepage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <Hero />

      {/* CONTENT */}
      <section className="mx-auto max-w-[1364px] px-5 md:px-[46px]">
        
        {/* TABS */}
        <div className="pt-8">
          <Tabs
            defaultTab="populer"
            items={[
              {
                id: "populer",
                label: "Populer",
              },
              {
                id: "terbaru",
                label: "Terbaru",
              },
            ]}
          />
        </div>

        {/* ARTICLE LIST */}
        <ArticleList
          articles={[
            {
              author: "nufa",
              avatar:
                "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
              comments: 12,
              date: "24 Agustus 2026",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              image:
                "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&h=400&fit=crop",
              likes: 237,
              title: "Lorem ipsum dolor sit amet",
            },
            {
              author: "nufa",
              avatar:
                "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
              comments: 8,
              date: "23 Agustus 2026",
              description:
                "Contoh artikel kedua untuk melihat tampilan list.",
              image:
                "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&h=400&fit=crop",
              likes: 120,
              title: "Artikel kedua",
            },
            {
              author: "nufa",
              avatar:
                "https://i.pinimg.com/originals/5d/85/13/5d8513af8546f40b8942e87acf8c283f.jpg",
              comments: 4,
              date: "22 Agustus 2026",
              description: "Contoh artikel ketiga.",
              image:
                "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop",
              likes: 89,
              title: "Artikel ketiga",
            },
          ]}
        />
      </section>
    </main>
  );
}