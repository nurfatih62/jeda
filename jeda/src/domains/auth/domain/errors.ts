export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "INVALID_CREDENTIALS"
      | "EMAIL_NOT_VERIFIED"
      | "OTP_EXPIRED"
      | "OTP_INVALID"
      | "USER_EXISTS"
      | "WEAK_PASSWORD"
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export function mapAuthErrorVariant(
  code: AuthError["code"]
): "error-email-password" | "error-otp" | "error-unknown" {
  switch (code) {
    case "INVALID_CREDENTIALS":
      return "error-email-password";
    case "OTP_INVALID":
    case "OTP_EXPIRED":
      return "error-otp";
    default:
      return "error-unknown";
  }
}
