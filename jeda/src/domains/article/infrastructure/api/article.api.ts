import type { PaginationParams } from "../../domain/value-objects";

export const articleApi = {
  async list(params: PaginationParams) {
    const qs = new URLSearchParams({
      page: String(params.page),
      limit: String(params.limit),
      ...(params.sortBy ? { sortBy: params.sortBy } : {}),
      ...(params.category ? { category: params.category } : {}),
      ...(params.search ? { search: params.search } : {}),
    });
    const res = await fetch(`/api/articles?${qs.toString()}`);
    if (!res.ok) throw new Error("Gagal memuat artikel");
    return res.json();
  },
  async getById(id: string) {
    const res = await fetch(`/api/articles/${id}`);
    if (!res.ok) throw new Error("Artikel tidak ditemukan");
    return res.json();
  },
};
