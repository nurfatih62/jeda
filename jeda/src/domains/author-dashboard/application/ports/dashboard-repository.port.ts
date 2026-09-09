import type { ArticlePerformance, DashboardStat, DraftArticle } from "../../domain/entities";

export interface DashboardRepositoryPort {
  getStats(range?: string): Promise<DashboardStat[]>;
  getPerformances(limit?: number): Promise<ArticlePerformance[]>;
  getDrafts(): Promise<DraftArticle[]>;
}
