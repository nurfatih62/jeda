import type { AuthRepositoryPort } from "../../application/ports/auth-repository.port";
import type { AuthSession } from "../../domain/entities";
import { authApi } from "../api/auth.api";

export class AuthRepositoryImpl implements AuthRepositoryPort {
  async login(credentials: { email: string; password: string }): Promise<AuthSession> {
    const dto = await authApi.login(credentials);
    return {
      user: {
        id: dto.user.id,
        email: dto.user.email,
        name: dto.user.name,
        role: dto.user.role as AuthSession["user"]["role"],
        isVerified: dto.user.isVerified,
        createdAt: new Date().toISOString(),
      },
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
      expiresAt: dto.expiresAt,
    };
  }

  async register(payload: { email: string; password: string; name: string; role: "reader" | "author" }) {
    const dto = await authApi.register(payload);
    return dto.user as unknown as AuthSession["user"];
  }

  async verifyOtp(): Promise<AuthSession> {
    throw new Error("Not implemented – wire to backend");
  }
  async forgotPassword(email: string): Promise<void> {
    return authApi.forgotPassword(email);
  }
  async resetPassword(): Promise<void> {
    throw new Error("Not implemented");
  }
  async logout(): Promise<void> {
    // clear storage / call API
  }
  async getSession(): Promise<AuthSession | null> {
    return null;
  }
}
