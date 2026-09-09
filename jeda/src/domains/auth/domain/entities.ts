/**
 * Auth Domain - Entities & Business Rules (Pure, no framework deps)
 * Bounded Context: auth
 */

export type UserRole = "guest" | "reader" | "author" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

/** Domain invariant: email must be valid */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Domain invariant: password strength rules */
export function isStrongPassword(password: string): boolean {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

export function canBecomeAuthor(user: User, agreedToTerms: boolean): boolean {
  return user.role === "reader" && user.isVerified && agreedToTerms;
}
