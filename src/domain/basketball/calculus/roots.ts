import type { Quadratic } from "../types";

export function quadraticRoots(q: Quadratic): { x1: number; x2: number } | null {
  if (Math.abs(q.a) < 1e-9) {
    return null;
  }

  const discriminant = q.b * q.b - 4 * q.a * q.c;
  if (discriminant < 0) {
    return null;
  }

  const sqrt = Math.sqrt(discriminant);
  const x1 = (-q.b - sqrt) / (2 * q.a);
  const x2 = (-q.b + sqrt) / (2 * q.a);

  return {
    x1: Math.min(x1, x2),
    x2: Math.max(x1, x2),
  };
}
