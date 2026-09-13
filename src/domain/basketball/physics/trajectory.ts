import type { Point, Quadratic, Velocity } from "../types";

export const GRAVITY = 350;

/** Coeficientes de y(x) = ax² + bx + c no eixo do jogo (Y para cima). */
export function parabolaCoefficients(
  origin: Point,
  velocity: Velocity,
  gravity: number,
): Quadratic | null {
  if (Math.abs(velocity.vx) < 1e-6) {
    return null;
  }

  const a = -gravity / (2 * velocity.vx * velocity.vx);
  const b = velocity.vy / velocity.vx - 2 * a * origin.x;
  const c = origin.y - a * origin.x * origin.x - b * origin.x;

  if (Math.abs(a) < 1e-9) {
    return null;
  }

  return { a, b, c };
}

export function evaluateQuadratic(q: Quadratic, x: number): number {
  return q.a * x * x + q.b * x + q.c;
}
