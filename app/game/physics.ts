import {
  velocityFromShot,
  type Point,
  type Velocity,
} from "@/src/domain/basketball";

export type { Point, Velocity };
export { velocityFromShot };

export function positionAtTime(
  origin: Point,
  velocity: Velocity,
  gravity: number,
  t: number,
): Point {
  return {
    x: origin.x + velocity.vx * t,
    y: origin.y + velocity.vy * t - (gravity * t * t) / 2,
  };
}
