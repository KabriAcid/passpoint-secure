import { ClickPoint } from "@/types/clickpoint";

export const clickpoints: ClickPoint[] = [
  { user_id: 1, x: 0.25, y: 0.4, order: 1 },
  { user_id: 1, x: 0.6, y: 0.15, order: 2 },
  { user_id: 1, x: 0.33, y: 0.75, order: 3 },
  { user_id: 1, x: 0.8, y: 0.2, order: 4 },
];

export function addClickPoints(userId: number, points: Omit<ClickPoint, "user_id">[]) {
  // Remove existing points for user
  const idx = clickpoints.findIndex((c) => c.user_id === userId);
  if (idx !== -1) {
    const filtered = clickpoints.filter((c) => c.user_id !== userId);
    clickpoints.length = 0;
    clickpoints.push(...filtered);
  }
  points.forEach((p) => clickpoints.push({ ...p, user_id: userId }));
}

export function getClickPointsForUser(userId: number): ClickPoint[] {
  return clickpoints.filter((c) => c.user_id === userId).sort((a, b) => a.order - b.order);
}
