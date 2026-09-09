import type { Report } from "../../domain/entities";

export interface ReportRepositoryPort {
  submit(payload: Omit<Report, "id" | "status" | "createdAt">): Promise<Report>;
  listPending(): Promise<Report[]>;
  updateStatus(id: string, status: Report["status"]): Promise<void>;
}
