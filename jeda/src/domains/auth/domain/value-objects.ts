export type OtpCode = string & { readonly brand: unique symbol };

export function createOtpCode(raw: string): OtpCode {
  if (!/^\d{6}$/.test(raw)) throw new Error("OTP must be 6 digits");
  return raw as OtpCode;
}

export type Password = string & { readonly brand: unique symbol };

export function createPassword(raw: string): Password {
  if (raw.length < 8) throw new Error("Password minimal 8 karakter");
  return raw as Password;
}

export interface LoginCredentials {
  email: string;
  password: Password;
}

export interface RegisterPayload {
  email: string;
  password: Password;
  name: string;
  role: "reader" | "author";
}
