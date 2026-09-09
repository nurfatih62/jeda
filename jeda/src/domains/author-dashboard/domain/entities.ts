export interface DashboardStat {
  label: string;
  value: number;
  trend?: number;
  trendLabel?: string;
}

export interface ArticlePerformance {
  articleId: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
}

export interface DraftArticle {
  id: string;
  title: string;
  lastEditedAt: string;
  progress: number;
}

export function calculateEngagementRate(views: number, likes: number, comments: number): number {
  if (views === 0) return 0;
  return ((likes + comments) / views) * 100;
}
