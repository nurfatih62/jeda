import type { Article, Comment } from "../../domain/entities";
import type { PaginatedResult, PaginationParams } from "../../domain/value-objects";

export interface ArticleRepositoryPort {
  findMany(params: PaginationParams): Promise<PaginatedResult<Article>>;
  findById(id: string): Promise<Article | null>;
  findBySlug(slug: string): Promise<Article | null>;
  create(payload: Partial<Article>): Promise<Article>;
  update(id: string, payload: Partial<Article>): Promise<Article>;
  delete(id: string): Promise<void>;
  getComments(articleId: string): Promise<Comment[]>;
  addComment(articleId: string, content: string): Promise<Comment>;
  toggleLike(articleId: string): Promise<{ liked: boolean; likes: number }>;
}
