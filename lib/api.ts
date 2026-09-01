// lib/api.ts
export interface ArticleFromAPI {
  id: string;
  author: string;
  avatarUrl: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  commentsCount: number;
  trendPercent?: number;
  isPopular?: boolean;
  contentParagraphs: string[];
  createdAt: string;
}

export interface CommentFromAPI {
  id: string;
  articleId: string;
  author: string;
  avatarUrl: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
}

const BASE_URL = 'https://6a9659bafa33b37f821b2961.mockapi.io';

// Mengambil semua artikel dari MockAPI
export async function fetchArticles(): Promise<ArticleFromAPI[]> {
  try {
    const res = await fetch(`${BASE_URL}/articles`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Gagal mengambil data artikel');
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Mengambil satu artikel spesifik berdasarkan ID dari MockAPI
export async function fetchArticleById(id: string): Promise<ArticleFromAPI | null> {
  try {
    const res = await fetch(`${BASE_URL}/articles/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Artikel tidak ditemukan');
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// lib/api.ts

// ... (kode fetchArticles dan fetchArticleById biarkan tetap sama)

export async function fetchCommentsByArticleId(articleId: string): Promise<CommentFromAPI[]> {
  try {
    // 1. Coba ambil dari endpoint nested standard MockAPI (/articles/:articleId/comments)
    const res = await fetch(`${BASE_URL}/articles/${articleId}/comments`, { cache: 'no-store' });
    
    if (res.ok) {
      return await res.json();
    }

    // 2. Jika endpoint nested gagal/404, fallback ke pengambilan semua komentar lalu filter manual
    const fallbackRes = await fetch(`${BASE_URL}/comments`, { cache: 'no-store' });
    if (!fallbackRes.ok) throw new Error('Gagal mengambil data komentar');
    
    const allComments: CommentFromAPI[] = await fallbackRes.json();
    
    // Filter komentar yang memiliki articleId yang cocok
    return allComments.filter((c) => String(c.articleId) === String(articleId));
    
  } catch (error) {
    console.error('Error mengambil komentar, mengembalikan array kosong:', error);
    return [];
  }
}