import type { UserProfile } from "../../domain/entities";

export interface ProfileRepositoryPort {
  getProfile(): Promise<UserProfile>;
  updateProfile(payload: Partial<UserProfile>): Promise<UserProfile>;
  changePassword(oldPassword: string, newPassword: string): Promise<void>;
  uploadAvatar(file: File): Promise<string>;
}
