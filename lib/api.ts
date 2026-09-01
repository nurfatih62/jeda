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
  createdAt: number; // Unix timestamp dalam detik
}

export interface CommentFromAPI {
  id: string;
  articleId: string;
  parentId: string | null; // ✅ BARU: null = komentar utama, ada isi = balasan untuk komentar lain
  author: string;
  avatarUrl: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: number; // Unix timestamp dalam detik
}

// ✅ BARU: tipe untuk komentar yang sudah disusun jadi nested tree (dengan balasannya)
export interface CommentWithReplies extends CommentFromAPI {
  replies: CommentFromAPI[];
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

// Mengambil komentar berdasarkan article ID (data mentah, belum disusun nested)
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

// ✅ BARU: Mengambil komentar SUDAH disusun jadi nested (komentar utama + reply-nya)
export async function fetchNestedCommentsByArticleId(
  articleId: string
): Promise<CommentWithReplies[]> {
  const allComments = await fetchCommentsByArticleId(articleId);

  const topLevel = allComments.filter((c) => !c.parentId);
  const getReplies = (parentId: string) =>
    allComments
      .filter((c) => c.parentId === parentId)
      .sort((a, b) => a.createdAt - b.createdAt); // reply lama duluan

  return topLevel
    .map((c) => ({
      ...c,
      replies: getReplies(c.id),
    }))
    .sort((a, b) => b.createdAt - a.createdAt); // komentar utama terbaru duluan
}