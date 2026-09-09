import type { AdminStats, Category, ManagedUser } from "../../domain/entities";

export interface AdminRepositoryPort {
  getStats(): Promise<AdminStats>;
  listUsers(params: { page: number; limit: number; search?: string }): Promise<{ data: ManagedUser[]; total: number }>;
  suspendUser(userId: string, reason: string): Promise<void>;
  activateUser(userId: string): Promise<void>;
  listCategories(): Promise<Category[]>;
  createCategory(name: string): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
}
