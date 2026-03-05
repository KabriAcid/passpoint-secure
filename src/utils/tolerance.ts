import { ClickPoint } from "@/types/clickpoint";

const TOLERANCE_RADIUS = 0.05;

export function isPointMatch(
  stored: { x: number; y: number },
  input: { x: number; y: number },
  tolerance = TOLERANCE_RADIUS
): boolean {
  const dx = stored.x - input.x;
  const dy = stored.y - input.y;
  return Math.sqrt(dx * dx + dy * dy) <= tolerance;
}

export function validateClickPoints(
  stored: ClickPoint[],
  input: { x: number; y: number }[]
): boolean {
  if (stored.length !== input.length) return false;
  return stored.every((sp, i) => isPointMatch(sp, input[i]));
}
