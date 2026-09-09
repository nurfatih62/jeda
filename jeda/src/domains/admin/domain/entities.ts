export type AdminRole = "super-admin" | "moderator";

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "suspended" | "pending";
  joinedAt: string;
  avatarUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  articleCount: number;
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalArticles: number;
  pendingReports: number;
  activeCategories: number;
}

export function canSuspendUser(actorRole: AdminRole, target: ManagedUser): boolean {
  if (target.status === "suspended") return false;
  return actorRole === "super-admin" || actorRole === "moderator";
}

export function isValidCategoryName(name: string): boolean {
  return name.trim().length >= 3 && name.trim().length <= 40;
}
