export type NotificationType = "like" | "comment" | "follow" | "system" | "report";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  actor?: { name: string; avatarUrl: string };
}

export function groupNotificationsByDate(notifications: Notification[]): Record<string, Notification[]> {
  return notifications.reduce((acc, n) => {
    const key = new Date(n.createdAt).toDateString();
    (acc[key] ||= []).push(n);
    return acc;
  }, {} as Record<string, Notification[]>);
}
