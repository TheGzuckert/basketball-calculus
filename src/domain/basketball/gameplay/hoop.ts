import { quadraticRoots } from "../calculus/roots";
import { evaluateQuadratic } from "../physics/trajectory";
import type { HoopCheck, Point, Quadratic } from "../types";

export const HIT_RADIUS = 26;

export function checkHoop(
  q: Quadratic,
  hoop: Point,
  origin: Point,
  tolerance: number,
): HoopCheck {
  const yCalculated = evaluateQuadratic(q, hoop.x);
  const roots = quadraticRoots(q);
  const landingX = roots?.x2 ?? Number.POSITIVE_INFINITY;
  const reached = origin.x < hoop.x && hoop.x <= landingX;
  const hit = reached && Math.abs(yCalculated - hoop.y) <= tolerance;

  return {
    x: hoop.x,
    yCalculated,
    yHoop: hoop.y,
    hit,
    reached,
  };
}
