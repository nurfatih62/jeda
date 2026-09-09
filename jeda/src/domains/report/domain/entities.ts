export type ReportReason = "spam" | "harassment" | "misinformation" | "plagiarism" | "other";
export type ReportStatus = "pending" | "reviewed" | "dismissed" | "actioned";

export interface Report {
  id: string;
  reporterId: string;
  targetId: string;
  targetType: "article" | "comment" | "user";
  reason: ReportReason;
  description: string;
  status: ReportStatus;
  createdAt: string;
}

export function isValidReason(reason: string, description: string): boolean {
  if (!reason) return false;
  if (reason === "other" && description.trim().length < 10) return false;
  return true;
}
