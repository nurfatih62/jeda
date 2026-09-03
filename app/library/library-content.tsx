"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase/client";
import { ArticleCard, type ArticleCardData } from "../../shared/components/organism/article-card/article-card";

const FILTER_TABS = [
  { label: "Riwayat dibaca", value: "Riwayat dibaca" },
  { label: "Artikel disimpan", value: "Artikel disimpan" },
  { label: "Artikel disuka", value: "Artikel disuka" },
  { label: "Komentar", value: "Komentar" },
];

type LibraryArticle = {
  id: string;
  title: string;
  excerpt: string;
  cover_image: string;
  created_at: string;
  profiles?: {
    username?: string;
    display_name?: string;
    avatar_url?: string;
  } | {
    username?: string;
    display_name?: string;
    avatar_url?: string;
  }[] | null;
  likes?: { count: number }[];
  comments?: { count: number }[];
};

type LibraryRow = { articles?: LibraryArticle | LibraryArticle[] | null };

export function LibraryContent({ initialTab }: { initialTab?: string }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [articles, setArticles] = useState<ArticleCardData[]>([]);
  const [loading, setLoading] = useState(false);
  const activeTab = FILTER_TABS.some((tab) => tab.value === initialTab)
    ? initialTab
    : FILTER_TABS[0].value;

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setIsLoggedIn(Boolean(data.session?.user));
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setIsLoggedIn(Boolean(session?.user));
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    let cancelled = false;

    async function loadLibraryItems() {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      if (!userId || activeTab === "Artikel disimpan") {
        setArticles([]);
        setLoading(false);
        return;
      }

      const source = activeTab === "Riwayat dibaca"
        ? "reading_history"
        : activeTab === "Artikel disuka"
          ? "likes"
          : "comments";
      const userColumn = source === "comments" ? "author_id" : "user_id";
      const { data, error } = await supabase
        .from(source)
        .select(`created_at, articles!inner(id,title,excerpt,cover_image,created_at,profiles!articles_author_id_fkey(username,display_name,avatar_url),likes(count),comments(count))`)
        .eq(userColumn, userId)
        .order("created_at", { ascending: false });

      if (cancelled) return;
      if (error) {
        console.error("Gagal memuat library:", error);
        setArticles([]);
      } else {
        const seen = new Set<string>();
        const mapped = (data ?? []).flatMap((item) => {
          const row = item as unknown as LibraryRow;
          const articleValue = row.articles;
          const article = Array.isArray(articleValue) ? articleValue[0] : articleValue;
          if (!article || seen.has(article.id)) return [];
          seen.add(article.id);
          const profile = Array.isArray(article.profiles) ? article.profiles[0] : article.profiles;
          return [{
            id: article.id,
            author: profile?.display_name || profile?.username || "Pengguna",
            authorUsername: profile?.username,
            avatarUrl: profile?.avatar_url || "",
            date: new Date(article.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
            title: article.title,
            description: article.excerpt,
            imageUrl: article.cover_image,
            likes: article.likes?.[0]?.count ?? 0,
            comments: article.comments?.[0]?.count ?? 0,
          }];
        });
        setArticles(mapped);
      }
      setLoading(false);
    }

    void loadLibraryItems();
    return () => { cancelled = true; };
  }, [activeTab, isLoggedIn]);

  if (isLoggedIn === null) return null;

  if (!isLoggedIn) {
    return (
      <section className="flex flex-col items-center gap-3 px-4 pt-20 text-center">
        <h2 className="text-title font-bold text-text-primary">Bergabung untuk mendapat pengalaman lebih</h2>
        <p className="max-w-content text-desc font-medium leading-7 text-text-muted">
          Ayo bergabung untuk dapat menyimpan riwayat baca, simpan artikel, suka dan komentar
        </p>
        <Link href="/login" className="mt-3 rounded-sm bg-primary px-4 py-2 font-medium text-white">
          Masuk
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full">
      <nav className="flex w-full items-end gap-8 overflow-x-auto border-b border-primary px-4" aria-label="Filter library">
        {FILTER_TABS.map((tab) => (
          <Link
            key={tab.value}
            href={`/library?tab=${encodeURIComponent(tab.value)}`}
            className={`min-w-max px-0 pb-3 pt-2 text-base font-medium no-underline ${
              activeTab === tab.value
                ? "border-b-[3px] border-primary text-primary"
                : "text-primary/50"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="flex flex-col items-center gap-[22px] px-4 pt-top text-center">
        <h2 className="text-2xl font-bold leading-8 text-text-primary md:text-title">Mulai bangun library kamu</h2>
        <p className="max-w-content text-lg font-medium leading-7 text-text-muted md:text-desc">
          Baca artikel, simpan artikel yang menarik, dan berikan komentarmu untuk mengisi library kamu
        </p>
      </div>
      {loading && <p className="mt-8 text-center text-text-muted">Memuat library...</p>}
      {!loading && articles.length > 0 && (
        <div className="mt-8 flex flex-col gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} isLoggedIn />
          ))}
        </div>
      )}
    </section>
  );
}
