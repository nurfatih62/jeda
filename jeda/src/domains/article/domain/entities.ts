export type ArticleStatus = "draft" | "published" | "archived";
export type ArticleBadgeVariant = "paling-banyak-dibaca" | "trending" | "cocok-denganmu" | "terbaru" | "lanjutkan-membaca" | "draft" | "none";

export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  coverImageUrl?: string;
  badgeVariant: ArticleBadgeVariant;
  tags: string[];
  category?: string;
  status: ArticleStatus;
  author: Author;
  likes: number;
  commentsCount: number;
  views: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: Author;
  content: string;
  createdAt: string;
}

export function isArticlePublishable(article: Pick<Article, "title" | "content" | "tags">): boolean {
  return article.title.trim().length >= 10 && article.content.trim().length >= 100 && article.tags.length > 0;
}

export function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}
