import type { ArticleRepositoryPort } from "../ports/article-repository.port";
import type { PaginationParams } from "../../domain/value-objects";

export async function getArticlesUseCase(repo: ArticleRepositoryPort, params: PaginationParams) {
  return repo.findMany(params);
}

export async function getArticleDetailUseCase(repo: ArticleRepositoryPort, id: string) {
  const article = await repo.findById(id);
  if (!article) throw new Error("Artikel tidak ditemukan");
  return article;
}
