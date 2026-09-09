/**
 * Infrastructure Adapter: Auth API
 * Implements HTTP calls for Auth bounded context.
 * Isolated from domain – only maps DTOs.
 */

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    isVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export const authApi = {
  async login(payload: LoginRequestDto): Promise<AuthResponseDto> {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Login gagal");
    return res.json();
  },

  async register(payload: { email: string; password: string; name: string }) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Register gagal");
    return res.json();
  },

  async forgotPassword(email: string) {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("Forgot password gagal");
  },
};
