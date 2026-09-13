import type { Velocity } from "../types";

export const MIN_SPEED = 280;
export const MAX_SPEED = 800;

export function speedFromForce(forcePct: number): number {
  return MIN_SPEED + ((MAX_SPEED - MIN_SPEED) * forcePct) / 100;
}

export function velocityFromShot(speed: number, angleDeg: number): Velocity {
  const theta = (angleDeg * Math.PI) / 180;
  return {
    vx: speed * Math.cos(theta),
    vy: speed * Math.sin(theta),
  };
}
