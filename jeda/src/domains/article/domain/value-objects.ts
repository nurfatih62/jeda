export type ArticleId = string & { readonly brand: unique symbol };
export type Tag = string & { readonly brand: unique symbol };

export function createTag(raw: string): Tag {
  const t = raw.trim().toLowerCase();
  if (t.length < 2) throw new Error("Tag minimal 2 karakter");
  return t as Tag;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: "latest" | "trending" | "most-read";
  category?: string;
  search?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
