import type { Notification } from "../../domain/entities";

export interface NotificationRepositoryPort {
  list(): Promise<Notification[]>;
  markAsRead(id: string): Promise<void>;
  markAllAsRead(): Promise<void>;
}
