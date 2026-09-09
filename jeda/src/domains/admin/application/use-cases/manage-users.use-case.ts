import type { AdminRepositoryPort } from "../ports/admin-repository.port";
import { isValidCategoryName } from "../../domain/entities";

export async function suspendUserUseCase(repo: AdminRepositoryPort, userId: string, reason: string) {
  if (!reason.trim()) throw new Error("Alasan suspend wajib diisi");
  return repo.suspendUser(userId, reason);
}

export async function createCategoryUseCase(repo: AdminRepositoryPort, name: string) {
  if (!isValidCategoryName(name)) throw new Error("Nama kategori tidak valid");
  return repo.createCategory(name.trim());
}
