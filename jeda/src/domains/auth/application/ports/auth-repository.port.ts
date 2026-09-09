import type { AuthSession, User } from "../../domain/entities";
import type { LoginCredentials, RegisterPayload, OtpCode } from "../../domain/value-objects";

export interface AuthRepositoryPort {
  login(credentials: LoginCredentials): Promise<AuthSession>;
  register(payload: RegisterPayload): Promise<User>;
  verifyOtp(email: string, code: OtpCode): Promise<AuthSession>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(email: string, code: OtpCode, newPassword: string): Promise<void>;
  logout(): Promise<void>;
  getSession(): Promise<AuthSession | null>;
}
