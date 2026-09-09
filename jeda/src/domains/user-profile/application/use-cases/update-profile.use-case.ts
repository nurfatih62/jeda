import type { ProfileRepositoryPort } from "../ports/profile-repository.port";
import { isValidBio, isValidName } from "../../domain/entities";

export async function updateProfileUseCase(repo: ProfileRepositoryPort, payload: { name?: string; bio?: string }) {
  if (payload.name && !isValidName(payload.name)) throw new Error("Nama tidak valid");
  if (payload.bio && !isValidBio(payload.bio)) throw new Error("Bio maksimal 200 karakter");
  return repo.updateProfile(payload);
}
