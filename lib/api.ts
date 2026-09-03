export interface ArticleFromAPI {
  id: string;
  author: string;
  authorUsername?: string;
  avatarUrl: string;
  title: string;
  description: string;
  imageUrl: string;
  likes: number;
  commentsCount: number;
  trendPercent?: number;
  isPopular?: boolean;
  contentParagraphs: string[];
  category?: string;
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

type SupabaseArticle = {
  id: string;
  profiles:
    | {
        username: string;
        display_name: string;
        avatar_url: string;
      }
    | {
        username: string;
        display_name: string;
        avatar_url: string;
      }[]
    | null;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  likes?: { count: number }[];
  comments?: { count: number }[];
  created_at: string;
};

type SupabaseComment = {
  id: string;
  article_id: string;
  parent_id: string | null;
  profiles:
    | {
        username: string;
        display_name: string;
        avatar_url: string;
      }
    | {
        username: string;
        display_name: string;
        avatar_url: string;
      }[]
    | null;
  content: string;
  likes: number;
  comments: number;
  created_at: string;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function getSupabaseConfig() {
  const url = SUPABASE_URL?.trim().replace(/\/$/, '');
  const key = SUPABASE_KEY?.trim();

  if (!url || !key || key === 'your-publishable-key' || key === 'your-anon-key') {
    throw new Error(
      'Supabase belum dikonfigurasi. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY di .env.local.'
    );
  }

  return {
    url,
    key,
  };
}

async function fetchSupabase<T>(resource: string, query = ''): Promise<T> {
  const { url, key } = getSupabaseConfig();
  const response = await fetch(`${url}/rest/v1/${resource}${query}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const details = await response.text();
    let message = `Supabase request gagal (${response.status})`;

    if (details) {
      try {
        const body = JSON.parse(details) as { message?: string; error?: string; hint?: string };
        const reason = body.message ?? body.error;
        if (reason) message += `: ${reason}`;
        if (body.hint) message += ` (${body.hint})`;
      } catch {
        message += `: ${details.slice(0, 200)}`;
      }
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

function mapArticle(article: SupabaseArticle): ArticleFromAPI {
  const profile = Array.isArray(article.profiles) ? article.profiles[0] : article.profiles;
  const author =
    profile?.display_name?.trim() ||
    profile?.username?.trim() ||
    'Pengguna';
  return {
    id: article.id,
    author,
    authorUsername: profile?.username?.trim() || undefined,
    avatarUrl: profile?.avatar_url ?? '',
    title: article.title,
    description: article.excerpt,
    imageUrl: article.cover_image,
    likes: article.likes?.[0]?.count ?? 0,
    commentsCount: article.comments?.[0]?.count ?? 0,
    category: article.category,
    contentParagraphs: article.content.split(/\n\s*\n/).filter(Boolean),
    createdAt: Math.floor(new Date(article.created_at).getTime() / 1000),
  };
}

function mapComment(comment: SupabaseComment): CommentFromAPI {
  const profile = Array.isArray(comment.profiles) ? comment.profiles[0] : comment.profiles;
  const author =
    profile?.display_name?.trim() ||
    profile?.username?.trim() ||
    'Pengguna';
  return {
    id: comment.id,
    articleId: comment.article_id,
    parentId: comment.parent_id,
    author,
    avatarUrl: profile?.avatar_url ?? '',
    content: comment.content,
    likes: comment.likes,
    comments: comment.comments,
    createdAt: Math.floor(new Date(comment.created_at).getTime() / 1000),
  };
}

// Mengambil semua artikel dari Supabase.
export async function fetchArticles(): Promise<ArticleFromAPI[]> {
  try {
    const articles = await fetchSupabase<SupabaseArticle[]>(
      'articles',
      '?select=*,profiles!articles_author_id_fkey(username,display_name,avatar_url),likes(count),comments(count)&order=created_at.desc'
    );
    return articles.map(mapArticle);
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Mengambil satu artikel spesifik berdasarkan ID dari Supabase.
export async function fetchArticleById(id: string): Promise<ArticleFromAPI | null> {
  try {
    const articles = await fetchSupabase<SupabaseArticle[]>(
      'articles',
      `?select=*,profiles!articles_author_id_fkey(username,display_name,avatar_url),likes(count),comments(count)&id=eq.${encodeURIComponent(id)}&limit=1`
    );
    return articles[0] ? mapArticle(articles[0]) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Mengambil komentar berdasarkan article ID (data mentah, belum disusun nested).
export async function fetchCommentsByArticleId(articleId: string): Promise<CommentFromAPI[]> {
  try {
    const comments = await fetchSupabase<SupabaseComment[]>(
      'comments',
      `?select=*,profiles!comments_author_id_fkey(username,display_name,avatar_url)&article_id=eq.${encodeURIComponent(articleId)}&order=created_at.asc`
    );
    return comments.map(mapComment);
  } catch (error) {
    console.error('Error mengambil komentar:', error);
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