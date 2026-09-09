import type { AuthRepositoryPort } from "../ports/auth-repository.port";
import { createPassword } from "../../domain/value-objects";
import { isValidEmail } from "../../domain/entities";
import { AuthError } from "../../domain/errors";

export async function loginUseCase(
  repo: AuthRepositoryPort,
  params: { email: string; password: string }
) {
  if (!isValidEmail(params.email)) {
    throw new AuthError("Email tidak valid", "INVALID_CREDENTIALS");
  }
  const password = createPassword(params.password);
  return repo.login({ email: params.email, password });
}

export async function registerUseCase(
  repo: AuthRepositoryPort,
  params: { email: string; password: string; name: string; role: "reader" | "author" }
) {
  if (!isValidEmail(params.email)) throw new AuthError("Email tidak valid", "INVALID_CREDENTIALS");
  const password = createPassword(params.password);
  return repo.register({ email: params.email, password, name: params.name, role: params.role });
}
